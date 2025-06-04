# Machine Learning - Sistem Rekomendasi Tempat Wisata Jakarta

Bagian Machine Learning dari proyek capstone yang mengimplementasikan sistem rekomendasi tempat wisata Jakarta menggunakan content-based filtering dan location-based filtering.

## 📁 Struktur Direktori

```
ML/
├── Api-Rekomendasi/       # FastAPI service untuk rekomendasi
│   ├── main.py           # Main FastAPI application
│   ├── requirements.txt  # Python dependencies
│   ├── README.md         # Dokumentasi API detail
│   ├── *.pkl            # Pre-trained models (TF-IDF, Cosine Similarity)
│   └── *.csv            # Dataset tempat wisata Jakarta
├── Dataset/              # Raw datasets dan data processing scripts
└── Notebook/             # Jupyter notebooks untuk eksperimen dan training
```

## 🎯 Fitur Machine Learning

### 1. Content-Based Filtering

- **TF-IDF Vectorization**: Mengkonversi deskripsi tempat wisata menjadi vektor numerik
- **Cosine Similarity**: Menghitung kemiripan antar tempat wisata berdasarkan deskripsi
- **Rekomendasi Berdasarkan Tempat**: Memberikan rekomendasi tempat serupa

### 2. Category-Based Filtering

- Pencarian tempat wisata berdasarkan kategori (Museum, Taman, Mall, dll.)
- Sampling acak untuk variasi rekomendasi

### 3. Popularity-Based Filtering

- Ranking berdasarkan rating tempat wisata
- Menampilkan tempat wisata terpopuler

### 4. Location-Based Filtering

- **Haversine Formula**: Menghitung jarak geografis antar lokasi
- Rekomendasi tempat wisata terdekat berdasarkan koordinat
