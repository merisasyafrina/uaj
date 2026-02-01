export type EventItem = {
  id: string;
  title: string;
  description: string;
  flyerUrl: string; // path in public/ or full URL
  startDate?: string; // ISO date
  endDate?: string;
  ctaUrl?: string;
  ctaLabel?: string;
};

export type EventsConfig = {
  title: string;
  subtitle?: string;
  events: EventItem[];
};
