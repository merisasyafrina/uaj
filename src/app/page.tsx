import { BookSection } from '@/components/sections/BookSection';
import { BuySection } from '@/components/sections/BuySection';
import { FeedbackSection } from '@/components/sections/FeedbackSection';
import { DonateSection } from '@/components/sections/DonateSection';
import { EventsSection } from '@/components/sections/EventsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <BookSection />
      <BuySection />
      <FeedbackSection />
      <DonateSection />
      <EventsSection />
    </main>
  );
}
