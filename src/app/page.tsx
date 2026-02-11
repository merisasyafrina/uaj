import { BookSection } from '@/components/sections/BookSection';
import { BulkOrderSection } from '@/components/sections/BulkOrderSection';
import { BuySection } from '@/components/sections/BuySection';
// import { FeedbackSection } from '@/components/sections/FeedbackSection'; // Hidden for static export (Option B – Domainesia)
import { DonateSection } from '@/components/sections/DonateSection';
import { EventsSection } from '@/components/sections/EventsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <BookSection />
      <BuySection />
      {/* <FeedbackSection /> */}
      <BulkOrderSection />
      <DonateSection />
      <EventsSection />
    </main>
  );
}
