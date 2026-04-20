export async function POST(req: Request) {
  try {
    const { cvText, jobDescription } = await req.json();

    if (!cvText) {
      return Response.json({ error: "cvText is required" }, { status: 400 });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
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
Analyze this CV and job description.

Return JSON with:
- match_score (0-100)
- potential_score (0-100)
- skills (array)
- strengths (array)
- weaknesses (array)
- explanation (string)

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
    } catch (parseError) {
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
