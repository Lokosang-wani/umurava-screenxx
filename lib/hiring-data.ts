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
  is_published?: boolean;
  location?: string;
  salary_range?: string;
  type?: string;
  experience_level?: string;
}

export interface CandidateRow {
  id: string;
  name: string;
  email: string | null;
  cv_text: string;
  job_id: string;
  match_score: number;
  potential_score: number;
  strengths: string[];
  weaknesses: string[];
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

export interface InterviewDetails extends InterviewRow {
  candidate: Pick<CandidateRow, "id" | "name" | "status"> | null;
  job: Pick<JobRow, "id" | "title"> | null;
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

export interface CandidateProfileRow {
  id: string;
  user_id: string;
  age: number | null;
  address: string | null;
  default_cv_text: string | null;
  default_cv_file_url: string | null;
  created_at: string;
}

export interface ApplicationRow {
  id: string;
  candidate_profile_id: string;
  job_id: string;
  cv_text: string | null;
  cv_file_url: string | null;
  status: "submitted" | "analyzed" | "interview" | "hired" | "rejected";
  created_at: string;
}

export interface ProfileRow {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "admin" | "candidate";
  created_at: string;
}

export async function fetchJobsForUser(userId: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, description, created_by, created_at")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as JobRow[];
}

export async function fetchPublishedJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, description, created_by, created_at, is_published")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as JobRow[];
}

export async function fetchPublishedJobById(jobId: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, description, created_by, created_at, is_published")
    .eq("id", jobId)
    .eq("is_published", true)
    .single<JobRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchOwnProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .eq("id", userId)
    .single<ProfileRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateOwnProfile(input: {
  userId: string;
  fullName?: string;
}) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: input.fullName ?? null,
    })
    .eq("id", input.userId)
    .select("id, email, full_name, role, created_at")
    .single<ProfileRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchOwnCandidateProfile(userId: string) {
  const { data, error } = await supabase
    .from("candidate_profiles")
    .select(
      "id, user_id, age, address, default_cv_text, default_cv_file_url, created_at",
    )
    .eq("user_id", userId)
    .maybeSingle<CandidateProfileRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function createJob(input: {
  title: string;
  description: string;
  createdBy: string;
  isPublished?: boolean;
}) {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      title: input.title,
      description: input.description,
      created_by: input.createdBy,
      is_published: input.isPublished ?? false,
    })
    .select()
    .single<JobRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function upsertCandidateProfile(input: {
  userId: string;
  age?: number | null;
  address?: string | null;
  defaultCvText?: string | null;
  defaultCvFileUrl?: string | null;
}) {
  const { data, error } = await supabase
    .from("candidate_profiles")
    .upsert(
      {
        user_id: input.userId,
        age: input.age ?? null,
        address: input.address ?? null,
        default_cv_text: input.defaultCvText ?? null,
        default_cv_file_url: input.defaultCvFileUrl ?? null,
      },
      {
        onConflict: "user_id",
      },
    )
    .select()
    .single<CandidateProfileRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function submitApplication(input: {
  candidateProfileId: string;
  jobId: string;
  cvText?: string | null;
  cvFileUrl?: string | null;
}) {
  const { data, error } = await supabase
    .from("applications")
    .insert({
      candidate_profile_id: input.candidateProfileId,
      job_id: input.jobId,
      cv_text: input.cvText ?? null,
      cv_file_url: input.cvFileUrl ?? null,
    })
    .select()
    .single<ApplicationRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function uploadCandidateCv(userId: string, file: File) {
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${userId}/${Date.now()}-${safeFileName}`;

  const { data, error } = await supabase.storage
    .from("candidate-cvs")
    .upload(path, file, {
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("candidate-cvs").getPublicUrl(data.path);

  return publicUrl;
}

export async function addCandidate(input: {
  name: string;
  email?: string | null;
  cvText: string;
  jobId: string;
  matchScore: number;
  potentialScore: number;
  strengths: string[];
  weaknesses: string[];
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
      strengths: input.strengths,
      weaknesses: input.weaknesses,
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

export async function fetchInterviewById(interviewId: string) {
  const { data, error } = await supabase
    .from("interviews")
    .select(
      `
        id,
        candidate_id,
        job_id,
        scheduled_at,
        meeting_link,
        status,
        created_at,
        candidate:candidates (
          id,
          name,
          status
        ),
        job:jobs (
          id,
          title
        )
      `,
    )
    .eq("id", interviewId)
    .single();

  if (error) {
    throw error;
  }

  return {
    ...data,
    candidate: Array.isArray(data.candidate) ? (data.candidate[0] ?? null) : null,
    job: Array.isArray(data.job) ? (data.job[0] ?? null) : null,
  } as InterviewDetails;
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

export async function updateInterviewStatus(
  interviewId: string,
  status: InterviewStatus,
) {
  const { data, error } = await supabase
    .from("interviews")
    .update({ status })
    .eq("id", interviewId)
    .select()
    .single<InterviewRow>();

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
          strengths,
          weaknesses,
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

export interface CandidateDashboardData {
  applications: (ApplicationRow & { job: JobRow })[];
  interviews: (InterviewRow & { job: JobRow })[];
  profile: CandidateProfileRow | null;
}

export async function fetchCandidateDashboardData(
  userId: string,
): Promise<CandidateDashboardData> {
  // 1. Fetch profile and email
  const profile = await fetchOwnProfile(userId);
  const candidateProfile = await fetchOwnCandidateProfile(userId);

  // 2. Fetch applications with jobs
  let applications: (ApplicationRow & { job: JobRow })[] = [];
  if (candidateProfile) {
    const { data: apps, error: appError } = await supabase
      .from("applications")
      .select("*, job:jobs(*)")
      .eq("candidate_profile_id", candidateProfile.id)
      .order("created_at", { ascending: false });

    if (appError) throw appError;
    applications = (apps ?? []) as (ApplicationRow & { job: JobRow })[];
  }

  // 3. Fetch interviews with jobs
  // We match by email in the candidates table to find interviews
  let interviews: (InterviewRow & { job: JobRow })[] = [];
  if (profile?.email) {
    const { data: cands, error: candError } = await supabase
      .from("candidates")
      .select("id")
      .eq("email", profile.email);

    if (candError) throw candError;

    if (cands && cands.length > 0) {
      const candidateIds = cands.map((c) => c.id);
      const { data: intvs, error: intvError } = await supabase
        .from("interviews")
        .select("*, job:jobs(*)")
        .in("candidate_id", candidateIds)
        .order("scheduled_at", { ascending: true });

      if (intvError) throw intvError;
      interviews = (intvs ?? []) as (InterviewRow & { job: JobRow })[];
    }
  }

  return {
    applications,
    interviews,
    profile: candidateProfile,
  };
}
