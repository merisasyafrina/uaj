export type EventItem = {
  id: string;
  title: string;
  description: string;
  flyerUrl: string; // path in public/ or full URL
  date?: string;
  ctaUrl?: string;
  ctaLabel?: string;
};

export type EventsConfig = {
  title: string;
  subtitle?: string;
  events: EventItem[];
};
