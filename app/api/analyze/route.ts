export async function POST(req: Request) {
  try {
    const { cvText, jobDescription } = await req.json();
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!cvText) {
      return Response.json({ error: "cvText is required" }, { status: 400 });
    }

    if (!geminiApiKey) {
      return Response.json(
        { error: "Server is missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        geminiApiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Analyze the candidate CV against the job description.

Return ONLY valid JSON:
{
  "match_score": number (0-100),
  "potential_score": number (0-100),
  "strengths": string[],
  "weaknesses": string[],
  "missing_skills": string[],
  "transferable_skills": string[],
  "decision": "Strong Hire" | "Consider" | "Risky Hire",
  "explanation": string (clear, recruiter-friendly, concise)
}

Rules:
- Be concise but insightful
- Focus on real hiring signals
- Highlight potential, not just experience
- Identify overlooked strengths

CV:
${cvText}

JOB DESCRIPTION:
${jobDescription || "Not provided"}
                `,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to analyze CV" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Extract the text content from the response
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      return Response.json(
        { error: "No content in response" },
        { status: 500 },
      );
    }

    // Parse JSON from markdown code block if present
    let analysisData;
    try {
      const jsonMatch = textContent.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[1]);
      } else {
        // Try to parse as plain JSON
        analysisData = JSON.parse(textContent);
      }
    } catch {
      return Response.json(
        { error: "Failed to parse response" },
        { status: 500 },
      );
    }

    return Response.json({ analysis: analysisData });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
