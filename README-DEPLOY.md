# 💖 Lovetheme untuk Lixie - Website Ulang Tahun Romantis

Website interaktif romantis dengan 8 halaman untuk ulang tahun Lixie yang ke-22!

## 🎨 Fitur Utama

### 8 Halaman Interaktif:
1. **Landing Page** - Typing animation dengan floating petals
2. **Password Gate** - Input password dengan bunny mascot lucu (Password: 22122024)
3. **Music Selection** - 4 kategori musik (Sedih, Mood, Semangat, Favorit)
4. **Timeline** - Perjalanan relationship dengan 3 momen penting
5. **Love Check** - Interactive game dengan runaway "No" button
6. **Birthday Wishes** - AI-generated ucapan ulang tahun menggunakan Claude Sonnet 4.5
7. **Thank You** - AI-generated pesan terima kasih panjang
8. **Smooth Transitions** - Animasi halus antar halaman dengan framer-motion

### 💕 Theme & Design:
- Pink pastel romantic aesthetic
- Playful fonts (Pinyon Script, Gaegu, Fredoka)
- Floating flower petals background
- Confetti effects
- Cute emoji & characters
- Mobile-first responsive design

## 🚀 Cara Deploy ke Netlify

### Persiapan:

1. **Extract zip file** ini
2. **Install dependencies:**
   ```bash
   # Frontend
   cd frontend
   yarn install
   
   # Backend (optional - hanya jika deploy backend terpisah)
   cd ../backend
   pip install -r requirements.txt
   ```

3. **Upload file musik MP3:**
   - Buka folder `frontend/public/music/`
   - Lihat file `README.txt` untuk list lagu
   - Upload file MP3 sesuai kategori (sedih, mood, semangat, favorit)

### Deploy Frontend ke Netlify:

#### Opsi 1: Netlify CLI (Recommended)
```bash
cd frontend

# Build production
yarn build

# Install Netlify CLI (jika belum)
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

#### Opsi 2: Netlify Dashboard
1. Login ke [Netlify](https://netlify.com)
2. Klik "Add new site" > "Deploy manually"
3. Drag & drop folder `frontend/build/` (setelah `yarn build`)
4. Tunggu deploy selesai!

### Deploy Backend:

**Catatan:** Backend menggunakan Claude Sonnet 4.5 untuk AI text generation. Ada 2 opsi:

#### Opsi A: Deploy Backend Terpisah
1. Deploy backend ke platform seperti Railway, Render, atau Heroku
2. Update `REACT_APP_BACKEND_URL` di `frontend/.env` dengan URL backend kamu
3. Pastikan set environment variable `EMERGENT_LLM_KEY` di backend

#### Opsi B: Gunakan Fallback Text (Tanpa Backend)
- AI generation akan otomatis gunakan fallback text yang sudah ada
- Tidak perlu deploy backend, tapi ucapan tidak dynamically generated

## 🎵 Upload Musik MP3

File MP3 harus diupload ke folder yang sesuai:

### Sedih (`frontend/public/music/sedih/`):
- `menerima-luka.mp3` - Natasya Sabella
- `bersenja-gurau.mp3` - Raim Laode
- `dirimu-yang-dulu.mp3` - Anggis Devaki

### Mood (`frontend/public/music/mood/`):
- `mistletoe.mp3` - Justin Bieber
- `18.mp3` - One Direction
- `trouble.mp3` - ciaffa, fedo DJ

### Semangat (`frontend/public/music/semangat/`):
- `payphone.mp3` - Maroon 5
- `perfect.mp3` - One Direction
- `where-we-are.mp3` - One Direction

### Favorit (`frontend/public/music/favorit/`):
- `kota-ini.mp3` - Nadhif Basalamah
- `masa-ini.mp3` - Nuca
- `8-letters.mp3` - Why Don't We

## 🔐 Password

Password untuk masuk: **22122024** (tanggal jadian)

## 🛠️ Tech Stack

### Frontend:
- React 19
- React Router v7
- Framer Motion (animations)
- React Confetti (effects)
- Typewriter Effect
- Tailwind CSS
- Lucide React Icons

### Backend:
- FastAPI
- MongoDB (Motor)
- Claude Sonnet 4.5 via Emergent Integrations
- Python 3.11+

## 📱 Testing Lokal

```bash
# Frontend
cd frontend
yarn start
# Buka http://localhost:3000

# Backend (optional)
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
# Buka http://localhost:8001/api/
```

## 🎯 Customization

### Ganti Password:
Edit file `frontend/src/pages/Password.js` line 14:
```javascript
if (password === '22122024') {  // Ganti dengan password baru
```

### Ganti Teks Personal:
- Timeline momen: Edit `frontend/src/pages/Timeline.js`
- Data personal: Edit `backend/server.py` di prompt AI

### Ganti Warna Theme:
Edit `frontend/tailwind.config.js` bagian `colors`

## 💡 Tips Deployment Netlify

1. **Environment Variables**: Jika deploy backend terpisah, set `REACT_APP_BACKEND_URL` di Netlify dashboard
2. **Build Command**: `yarn build`
3. **Publish Directory**: `build`
4. **File Upload**: Upload MP3 files sebelum build, atau upload manual setelah deploy

## 🎉 Fitur Spesial

- **Floating Petals**: Background animasi bunga jatuh di semua halaman
- **Runaway Button**: Tombol "No" yang lari saat di-hover (Love Check page)
- **Confetti Effect**: Meledak saat klik "Yes" di Love Check
- **AI Generated Text**: Ucapan ulang tahun & terima kasih di-generate real-time
- **Mobile Optimized**: Responsive untuk Android (375px viewport)

## 📝 Notes

- Musik tidak akan play jika file MP3 belum diupload
- AI generation memerlukan backend yang running
- Fallback text otomatis muncul jika backend tidak tersedia
- Website fully functional offline (kecuali AI generation)

## 💖 Dibuat dengan Cinta

Dari Ryzen untuk Lixie 💕

Selamat Ulang Tahun yang ke-22! 🎂✨

---

**Deployment Date**: 28 Januari 2025
**Tech**: Built with Emergent AI
