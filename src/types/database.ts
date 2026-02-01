export type DownloadLead = {
  id: string;
  email: string;
  created_at: string;
};

export type FeedbackEntry = {
  id: string;
  email: string;
  topic: string; // "Apa yang bisa kami bantu?" dropdown value
  message: string;
  created_at: string;
};
