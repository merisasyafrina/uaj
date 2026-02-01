import { BookSection } from '@/components/sections/BookSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { FeedbackSection } from '@/components/sections/FeedbackSection';
import { DonateSection } from '@/components/sections/DonateSection';
import { EventsSection } from '@/components/sections/EventsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <BookSection />
      <DownloadSection />
      <FeedbackSection />
      <DonateSection />
      <EventsSection />
    </main>
  );
}
