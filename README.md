# Capstone Project 2025 - Sistem Rekomendasi Tempat Wisata Jakarta

Proyek capstone ini adalah sistem rekomendasi tempat wisata Jakarta yang terdiri dari komponen Machine Learning untuk rekomendasi dan aplikasi Frontend-Backend untuk antarmuka pengguna.

## 📁 Struktur Proyek

```
capstone-project-2025/
├── ML/                     # Machine Learning Components
│   ├── Api-Rekomendasi/   # API Rekomendasi FastAPI
│   ├── Dataset/           # Dataset dan data processing
│   └── Notebook/          # Jupyter notebooks untuk eksperimen
├── FE-BE/                 # Frontend & Backend Application
└── README.md              # Dokumentasi utama
```

## 🎯 Tujuan Proyek

Mengembangkan sistem rekomendasi tempat wisata Jakarta yang dapat:

- Memberikan rekomendasi tempat wisata berdasarkan preferensi pengguna
- Mencari tempat wisata berdasarkan kategori
- Menampilkan tempat wisata terpopuler
- Memberikan rekomendasi berdasarkan lokasi geografis

## 🛠️ Teknologi yang Digunakan

### Machine Learning

- **FastAPI**: API framework untuk machine learning service
- **Scikit-learn**: Content-based filtering dengan TF-IDF dan Cosine Similarity
- **Pandas & NumPy**: Data processing dan manipulasi
- **Joblib**: Model serialization

### Frontend & Backend

- Machine Learning: 
TF-IDF (Content-Based Filtering)
Fitur Ekstraksi Teks & Rekomendasi
Model Deep Learning untuk Rekomendasi
Arsitektur dan Pelatihan
Evaluasi & Penyimpanan Model
Regresi Linear (Prediksi Usia Pengguna)
Model Prediktif Umur Berdasarkan Pola Rating
Persiapan Data

Front-End dan Back-End Developer: 
UI Design & Mockup
System Architecture Design : kami merancang arsitektur sistem berbasis client-server yang mencakup frontend (React.js), backend (Node.js/Express), database (PostgreSQL), dan integrasi machine learning. Perancangan ini mencakup alur data, komunikasi antar komponen, serta penggunaan API eksternal.
Backend Development : menggunakan Node.js dan Express. Data disimpan dan dikelola menggunakan PostgreSQL.
Frontend Development : dengan React.js yang interaktif dan responsif. Tailwind CSS digunakan untuk mempercepat proses styling, sementara state management diterapkan untuk mengelola data dari API secara real-time.
API Integration & Testing : frontend dengan backend menggunakan RESTful API dan melakukan pengujian menggunakan Postman untuk memastikan setiap endpoint berfungsi dengan baik, termasuk koneksi ke layanan rekomendasi machine learning.
Deployment : aplikasi frontend kami deploy menggunakan Netlify, sementara backend di-host secara terpisah. Kami mengatur environment variable dan memastikan aplikasi berjalan lancar setelah peluncuran.

## 🚀 Quick Start

### 1. Machine Learning API

```bash
cd ML/Api-Rekomendasi
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend & Backend

```bash
cd FE-BE
# [Instruksi akan ditambahkan sesuai teknologi yang digunakan]
```

## 📖 Dokumentasi Detail

- [ML - Machine Learning Components](./ML/README.md)
- [FE-BE - Frontend & Backend](./FE-BE/README.md)

## 👥 Tim Pengembang (CC25-CF082)
(ML) MC009D5Y0680 - Mifta Rizaldirahmat - Universitas Gunadarma - [Aktif]
(ML) MC009D5Y1029 - Muhammad Naufal Hilmy - Universitas Gunadarma - [Aktif]
(ML) MC009D5Y0498 - Muhammad Ammar Arief - Universitas Gunadarma - [Aktif]
(FEBE) FC009D5X2473 - Fayza Kamila - Universitas Gunadarma - [Aktif]
(FEBE) FC009D5Y1612 - Muhamad Aditya Umar Faiz - Universitas Gunadarma - [Aktif]
(FEBE) FC009D5Y0580 - Dwiki Diandra Putra - Universitas Gunadarma - [Aktif]
_
