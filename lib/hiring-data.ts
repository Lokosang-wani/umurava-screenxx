import { supabase } from "./supabase";

export type CandidateDecision = "Strong Hire" | "Consider" | "Risky Hire";
export type CandidateStatus = "screened" | "interview" | "hired";
export type InterviewStatus = "scheduled" | "completed" | "cancelled";

export interface JobRow {
  id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface CandidateRow {
  id: string;
  name: string;
  email: string | null;
  cv_text: string;
  job_id: string;
  match_score: number;
  potential_score: number;
  decision: CandidateDecision;
  status: CandidateStatus;
  created_at: string;
}

export interface InterviewRow {
  id: string;
  candidate_id: string;
  job_id: string;
  scheduled_at: string;
  meeting_link: string | null;
  status: InterviewStatus;
  created_at: string;
}

export interface DashboardJob extends JobRow {
  candidates: CandidateRow[];
  interviews: InterviewRow[];
}

export interface DashboardData {
  jobs: DashboardJob[];
  stats: {
    totalJobs: number;
    totalCandidates: number;
    screenedCandidates: number;
    interviewCandidates: number;
    hiredCandidates: number;
    upcomingInterviews: number;
  };
}

export async function createJob(input: {
  title: string;
  description: string;
  createdBy: string;
}) {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      title: input.title,
      description: input.description,
      created_by: input.createdBy,
    })
    .select()
    .single<JobRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function addCandidate(input: {
  name: string;
  email?: string | null;
  cvText: string;
  jobId: string;
  matchScore: number;
  potentialScore: number;
  decision: CandidateDecision;
  status?: CandidateStatus;
}) {
  const { data, error } = await supabase
    .from("candidates")
    .insert({
      name: input.name,
      email: input.email ?? null,
      cv_text: input.cvText,
      job_id: input.jobId,
      match_score: input.matchScore,
      potential_score: input.potentialScore,
      decision: input.decision,
      status: input.status ?? "screened",
    })
    .select()
    .single<CandidateRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function createInterview(input: {
  candidateId: string;
  jobId: string;
  scheduledAt: string;
  meetingLink?: string | null;
  status?: InterviewStatus;
}) {
  const { data, error } = await supabase
    .from("interviews")
    .insert({
      candidate_id: input.candidateId,
      job_id: input.jobId,
      scheduled_at: input.scheduledAt,
      meeting_link: input.meetingLink ?? null,
      status: input.status ?? "scheduled",
    })
    .select()
    .single<InterviewRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCandidateStatus(
  candidateId: string,
  status: CandidateStatus,
) {
  const { data, error } = await supabase
    .from("candidates")
    .update({ status })
    .eq("id", candidateId)
    .select()
    .single<CandidateRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchDashboardData(userId: string): Promise<DashboardData> {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select(
      `
        id,
        title,
        description,
        created_by,
        created_at,
        candidates (
          id,
          name,
          email,
          cv_text,
          job_id,
          match_score,
          potential_score,
          decision,
          status,
          created_at
        ),
        interviews (
          id,
          candidate_id,
          job_id,
          scheduled_at,
          meeting_link,
          status,
          created_at
        )
      `,
    )
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const normalizedJobs: DashboardJob[] = (jobs ?? []).map((job) => ({
    ...job,
    candidates: (job.candidates ?? []) as CandidateRow[],
    interviews: (job.interviews ?? []) as InterviewRow[],
  }));

  const allCandidates = normalizedJobs.flatMap((job) => job.candidates);
  const allInterviews = normalizedJobs.flatMap((job) => job.interviews);
  const now = new Date().toISOString();

  return {
    jobs: normalizedJobs,
    stats: {
      totalJobs: normalizedJobs.length,
      totalCandidates: allCandidates.length,
      screenedCandidates: allCandidates.filter(
        (candidate) => candidate.status === "screened",
      ).length,
      interviewCandidates: allCandidates.filter(
        (candidate) => candidate.status === "interview",
      ).length,
      hiredCandidates: allCandidates.filter(
        (candidate) => candidate.status === "hired",
      ).length,
      upcomingInterviews: allInterviews.filter(
        (interview) =>
          interview.status === "scheduled" && interview.scheduled_at >= now,
      ).length,
    },
  };
}
