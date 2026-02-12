'use client';

import { useState } from 'react';
import Image from 'next/image';

const WHATSAPP_NUMBER = '628131214371';

const CONFIRMATION_TEXT = `Assalamualaikum warahmatullahi wabarakatuh, 
Bismillah konfirmasi pemesanan buku Khusyuk Itu Mudah (bulk order).

[Nama pemesan]:
[Jumlah buku]:
[Total transfer]:
[Bank pengirim]:

Terlampir bukti transfer nya.`;

const whatsappConfirmUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIRMATION_TEXT)}`;

export function BulkOrderSection() {
  const [coverError, setCoverError] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyConfirmationText = async () => {
    try {
      await navigator.clipboard.writeText(CONFIRMATION_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="bulk-order" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
            Pesan banyak untuk sekolahmu, komunitasmu, keluargamu, kantormu, dan lainnya.
        </h2>

        <div className="flex justify-center mb-8">
            {!coverError ? (
                <Image
                src="/bulkOrder.jpeg"
                alt="Sampul buku Khusyuk Itu Mudah"
                width={800}
                height={1200}
                className="w-[16.5rem] h-auto rounded-xl block"
                sizes="264px"
                onError={() => setCoverError(true)}
                />
            ) : (
                <div className="w-[16.5rem] aspect-[2/3] rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Sampul buku</span>
                </div>
            )}
        </div>
        <p className="text-xs sm:text-sm italic text-slate-500 dark:text-slate-500 text-center mb-6 sm:mb-8">
            *Minimal pemesanan 50 buku.
            <br />
            *Harga per buku adalah Rp. 110.000.
            <br />
            <span className="not-italic">Contoh: Order 50 buku, dengan harga total Rp. 5.500.000.</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={whatsappConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 min-h-[52px] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 active:bg-orange-700 active:translate-y-0 active:shadow touch-manipulation"
          >
            Konfirmasi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}