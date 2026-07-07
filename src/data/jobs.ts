export type ScreeningQuestion = {
  id: string;
  question: string;
  type: "choice" | "number";
  options?: string[];
  accept: (answer: string) => boolean;
};

export type Job = {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  compensation: string;
  active: boolean;
  summary: string;
  sections: { heading: string; body?: string; bullets?: string[] }[];
  screening: ScreeningQuestion[];
};

export const jobs: Job[] = [
  {
    id: "sdr-2026",
    slug: "sales-development-representative",
    title: "Sales Development Representative (SDR)",
    location: "Remote",
    type: "Performance-Based",
    compensation: "Performance-Based Engagement",
    active: true,
    summary:
      "Identify prospective clients, initiate conversations with decision-makers, qualify opportunities, and schedule meetings for the consulting team.",
    sections: [
      {
        heading: "About BitwellForge",
        body:
          "BitwellForge is a client acquisition and growth consulting firm that partners with agencies, consultants, coaches, and B2B service businesses to help them build structured outbound acquisition systems that generate qualified sales opportunities and predictable pipeline growth.\n\nAs part of our expansion efforts, we are seeking a highly professional and results-oriented Sales Development Representative (SDR) to support our outbound business development initiatives.",
      },
      {
        heading: "Position Overview",
        body:
          "The SDR will be responsible for identifying prospective clients, initiating conversations with decision-makers, qualifying opportunities, and scheduling meetings for the consulting team.\n\nThis role is ideal for individuals who possess strong communication skills, commercial awareness, and the ability to engage confidently with business owners and senior decision-makers.",
      },
      {
        heading: "Key Responsibilities",
        bullets: [
          "Identify and research prospective clients that align with our target market.",
          "Conduct outbound prospecting activities through cold calling, LinkedIn outreach, email communication, and strategic follow-ups.",
          "Engage founders, consultants, agency owners, and executives in meaningful business conversations.",
          "Assess prospect suitability based on predefined qualification criteria.",
          "Schedule meetings with qualified prospects for the consulting team.",
          "Maintain accurate records of outreach activity, prospect interactions, and pipeline progression.",
          "Consistently achieve outreach, qualification, and appointment-setting objectives.",
        ],
      },
      {
        heading: "Candidate Profile",
        bullets: [
          "Excellent verbal and written communication skills in English.",
          "Strong interpersonal and relationship-building capabilities.",
          "Professionalism, maturity, and commercial awareness when interacting with decision-makers.",
          "Self-motivation and the ability to operate effectively within a remote environment.",
          "A proactive approach to problem-solving and business development.",
          "Prior experience in Sales Development, Business Development, Appointment Setting, Lead Generation, Cold Calling, or B2B Sales is advantageous.",
        ],
      },
      {
        heading: "What We Offer",
        bullets: [
          "The opportunity to work directly with a growing consulting firm serving B2B businesses.",
          "A performance-driven environment where results are recognised and rewarded.",
          "Flexibility to work remotely.",
          "Clear growth opportunities for high-performing professionals as the organisation expands.",
        ],
      },
      {
        heading: "Compensation",
        body:
          "This is a performance-based engagement designed for individuals who are confident in their ability to generate business opportunities and contribute to revenue growth.\n\nSpecific compensation details will be discussed during the interview process.",
      },
      {
        heading: "Application Process",
        body:
          "Interested candidates are invited to submit their LinkedIn profile and/or resume. Shortlisted candidates will be invited for an initial discussion and assessment.\n\nBitwellForge is committed to building a team of ambitious professionals who value professionalism, accountability, and long-term growth.",
      },
    ],
    screening: [
      {
        id: "q1",
        question: "Do you have prior experience in cold calling or appointment setting?",
        type: "choice",
        options: ["Yes", "No"],
        accept: (a) => a === "Yes",
      },
      {
        id: "q2",
        question: "How many cold calls can you realistically make per day?",
        type: "choice",
        options: ["Less than 10", "10 to 24", "25 to 50", "More than 50"],
        accept: (a) => a === "25 to 50" || a === "More than 50",
      },
      {
        id: "q3",
        question:
          "How many months of experience do you have in cold calling, appointment setting, or outbound sales?",
        type: "choice",
        options: ["Less than 1 month", "1 month", "2 to 6 months", "6 to 12 months", "More than 12 months"],
        accept: (a) => a !== "Less than 1 month" && a !== "1 month",
      },
      {
        id: "q4",
        question: "Are you comfortable working in a performance-based commission structure?",
        type: "choice",
        options: ["Yes", "No"],
        accept: (a) => a === "Yes",
      },
      {
        id: "q5",
        question:
          "Are you comfortable speaking with business owners and decision-makers in English?",
        type: "choice",
        options: ["Yes", "No"],
        accept: (a) => a === "Yes",
      },
    ],
  },
];

export const activeJobs = () => jobs.filter((j) => j.active);
export const hasActiveOpenings = () => activeJobs().length > 0;
export const getJobBySlug = (slug: string) => jobs.find((j) => j.slug === slug);
