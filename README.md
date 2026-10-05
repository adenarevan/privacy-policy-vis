# Visual Inspection System Privacy Policy

Website produksi: https://privacy-policy-vis-nu.vercel.app

Download PDF: https://privacy-policy-vis-nu.vercel.app/vis-privacy-policy.pdf

Halaman kebijakan privasi responsif dengan Next.js 15, React 19, TypeScript, dan CSS. Halaman tersedia di `/` dan `/privacy-policy`.

Isi kebijakan disalin dari HTML Visual Inspection System yang diberikan pengguna, termasuk seluruh 12 bagian, subjudul, daftar, penekanan teks, tanggal **12 July 2023**, identitas **Japan International Cooperation Agency Team**, website, dan email kontak. Bahasa kebijakan dipertahankan dalam bahasa Inggris. Desain responsif Next.js tetap menggunakan tampilan yang telah dibuat.

## Jalankan lokal

Gunakan Node.js 20.9 atau lebih baru (Node.js 22 LTS direkomendasikan untuk deployment).

```bash
npm ci
npm run dev
```

Buka http://localhost:3000. Tidak perlu database atau variabel environment.

## Ganti isi kebijakan

Edit `src/content/privacy-policy.ts` untuk mengubah identitas, tanggal pembaruan, pengantar, atau isi setiap bagian. Setiap bagian memiliki `blocks` yang mempertahankan urutan paragraf (`p`), subjudul (`h3` / `h4`), dan daftar (`list`). Penekanan `<strong>` ditampilkan melalui elemen React, tanpa injeksi HTML. ID bagian harus unik; ketika mengubah ID kontak, sesuaikan tautan `#contact-us` di `src/components/policy-page.tsx`.

Desain berada di `src/app/globals.css`. Halaman ini tidak memasang analitik, formulir pengumpulan data, atau font eksternal; pernyataan dalam kebijakan mengikuti dokumen yang diberikan untuk layanan Visual Inspection System. Tombol **Download PDF** mengunduh file yang diberikan pengguna dari `public/vis-privacy-policy.pdf`, dengan nama unduhan **VIS Privacy Policy.pdf**. Untuk memperbarui unduhan, ganti file di folder `public` tersebut. File ini ikut tersedia saat proyek dideploy ke Vercel. Tombol **Print / save PDF** tetap memakai dialog cetak browser.

## Verifikasi produksi

```bash
npm run typecheck
npm run build
npm start
```

## Push ke GitHub

Repository proyek: https://github.com/adenarevan/privacy-policy-vis. Untuk checkout baru yang belum memiliki konfigurasi Git, jalankan perintah berikut di folder proyek.

```bash
git init
git add .
git commit -m "Build Visual Inspection System privacy policy website"
git branch -M main
git remote add origin https://github.com/adenarevan/privacy-policy-vis.git
git push -u origin main
```

`.gitignore` mengecualikan dependency, hasil build, dan file environment. `package-lock.json` disertakan untuk instalasi yang konsisten.

## Deploy ke Vercel

1. Masuk ke Vercel, pilih **Add New → Project**, lalu import repository GitHub.
2. Gunakan preset **Next.js**, root directory proyek, build command `npm run build`, dan nonaktifkan override **Output Directory** agar memakai bawaan `.next`. Build produksi menggunakan `.next`; server development lokal memakai `.next-dev` agar tidak berbenturan dengan build produksi.
3. Pilih runtime Node.js 22.x di pengaturan proyek, lalu klik **Deploy**.
4. Buka URL hasil deployment. Perubahan berikutnya yang di-push ke branch produksi akan dideploy oleh integrasi GitHub Vercel.

Panduan resmi: https://vercel.com/docs/frameworks/full-stack/nextjs

File PDF untuk unduhan disertakan di `public/vis-privacy-policy.pdf`. Deployment Vercel dapat dilakukan dengan mengimpor repository GitHub di atas.
