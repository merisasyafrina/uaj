# Khusyuk Itu Mudah

Landing page untuk buku digital **Khusyuk Itu Mudah**: unduh PDF dengan email, sinopsis, form feedback, donasi QRIS, dan section acara (editable via config).

**Stack:** Next.js 14 (App Router) + TypeScript + Supabase  
**Hosting:** Vercel (gratis)  
**Bahasa:** Semua konten dalam Bahasa Indonesia  
**Desain:** Mobile-first, responsive (sm/lg breakpoints), touch-friendly

---

## Fitur MVP

- **Buku:** Judul, meta, share (WhatsApp / X / salin link), banner, bismillah, sinopsis
- **Unduh:** Input email → simpan ke Supabase → buka PDF di tab baru
- **Feedback:** Form (email, dropdown "Apa yang bisa kami bantu?", pesan) → simpan ke Supabase
- **Donasi:** Gambar QRIS + catatan singkat
- **Acara:** Daftar event (flyer + deskripsi) dari config JSON di repo

**Rencana ke depan:** Multi-book routes, login, skalabel dari repo yang sama.

---

## Struktur Project

```
khusyuk-itu-mudah/
├── public/                 # Aset statis
│   ├── banner.jpg         # Sampul buku (opsional)
│   ├── qris.png           # Gambar QRIS donasi
│   └── events/            # Flyer acara (referensi dari config)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── download/   # POST: simpan email → return PDF URL
│   │   │   └── feedback/  # POST: simpan feedback
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Landing page tunggal
│   │   └── globals.css
│   ├── components/
│   │   └── sections/
│   │       ├── BookSection.tsx
│   │       ├── DownloadSection.tsx
│   │       ├── FeedbackSection.tsx
│   │       ├── DonateSection.tsx
│   │       └── EventsSection.tsx
│   ├── config/
│   │   └── events.json    # Data acara (edit untuk ubah konten)
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts   # Browser client
│   │       └── server.ts   # Server client (API routes)
│   └── types/
│       ├── database.ts
│       └── events.ts
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Setup

### 1. Clone & install

```bash
git clone <repo-url>
cd khusyuk-itu-mudah
npm install
```

### 2. Supabase

1. Buat project di [Supabase](https://supabase.com/dashboard).
2. Di **SQL Editor**, jalankan skema berikut:

```sql
-- Tabel untuk email unduh PDF
create table if not exists download_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz default now()
);

-- Tabel untuk feedback
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  topic text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Opsional: RLS (Row Level Security) – izinkan insert tanpa login
alter table download_leads enable row level security;
alter table feedback enable row level security;

create policy "Allow anonymous insert on download_leads"
  on download_leads for insert with check (true);

create policy "Allow anonymous insert on feedback"
  on feedback for insert with check (true);
```

3. Di **Project Settings → API**: copy **Project URL** dan **anon public** key.

### 3. Environment variables

```bash
cp .env.example .env.local
```

Isi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_BOOK_PDF_URL=https://...   # URL publik PDF (Supabase Storage atau hosting lain)
```

**Opsional:** `NEXT_PUBLIC_SITE_URL` untuk share URL (default: URL Vercel).

### 4. Aset (opsional)

- **Sampul buku:** simpan sebagai `public/banner.jpg`.
- **QRIS:** simpan sebagai `public/qris.png`.
- **Flyer acara:** simpan di `public/events/` dan set `flyerUrl` di `src/config/events.json` (mis. `/events/flyer-1.jpg`).

### 5. Jalankan dev

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### 6. Deploy ke Vercel

1. Push ke GitHub.
2. Import project di [Vercel](https://vercel.com); pilih repo ini.
3. Tambahkan env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_BOOK_PDF_URL`.
4. Deploy.

---

## Mengedit Konten Acara

Edit `src/config/events.json`:

```json
{
  "title": "Acara",
  "subtitle": "Kajian dan kegiatan terkait buku.",
  "events": [
    {
      "id": "event-1",
      "title": "Judul Acara",
      "description": "Deskripsi acara...",
      "flyerUrl": "/events/flyer-1.jpg",
      "startDate": "2025-03-15",
      "endDate": "2025-03-15",
      "ctaUrl": "https://...",
      "ctaLabel": "Daftar Sekarang"
    }
  ]
}
```

- **flyerUrl:** path di `public/` (mis. `/events/flyer.jpg`) atau URL eksternal.
- **startDate / endDate:** format ISO (YYYY-MM-DD).
- **ctaUrl / ctaLabel:** tombol link (opsional).

---

## Scripts

| Perintah     | Keterangan              |
|-------------|--------------------------|
| `npm run dev`   | Dev server (localhost:3000) |
| `npm run build` | Build production         |
| `npm run start` | Jalankan build (setelah `npm run build`) |
| `npm run lint`  | ESLint                   |

---

## TODO (setelah setup)

- [ ] Ganti `NEXT_PUBLIC_BOOK_PDF_URL` dengan URL PDF nyata (Supabase Storage atau hosting lain).
- [ ] Upload `public/banner.jpg` dan `public/qris.png` sesuai kebutuhan.
- [ ] Sesuaikan sinopsis dan teks di `BookSection.tsx` / `DonateSection.tsx` jika perlu.
- [ ] Atur domain custom di Vercel (opsional) dan set `NEXT_PUBLIC_SITE_URL` jika dipakai untuk share.
