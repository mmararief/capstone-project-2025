# API Rekomendasi Tempat Wisata Jakarta

API rekomendasi tempat wisata Jakarta menggunakan FastAPI dan machine learning untuk memberikan rekomendasi tempat wisata berdasarkan content-based filtering dan lokasi geografis.

## Fitur

- **Rekomendasi Berdasarkan Tempat**: Mendapatkan rekomendasi tempat wisata berdasarkan tempat yang dipilih
- **Rekomendasi Berdasarkan Kategori**: Mencari tempat wisata berdasarkan kategori tertentu
- **Tempat Wisata Terpopuler**: Mendapatkan daftar tempat wisata dengan rating tertinggi
- **Rekomendasi Berdasarkan Lokasi**: Mencari tempat wisata terdekat berdasarkan koordinat geografis

## Teknologi yang Digunakan

- **FastAPI**: Framework web modern untuk membangun API
- **Pandas**: Manipulasi dan analisis data
- **Scikit-learn**: Machine learning library untuk TF-IDF dan cosine similarity
- **Joblib**: Serialisasi model machine learning
- **NumPy**: Komputasi numerik
- **Pydantic**: Validasi data

## Instalasi

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd Api-Rekomendasi
   ```

2. **Buat virtual environment**

   ```bash
   python -m venv venv
   ```

3. **Aktivasi virtual environment**

   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Pastikan file model dan data tersedia**
   - `tfidf_vectorizer.pkl`: Model TF-IDF vectorizer
   - `cosine_similarity_df.pkl`: Matrix cosine similarity
   - `tourism_jakarta_with_images.csv`: Dataset tempat wisata Jakarta

## Menjalankan API

```bash
uvicorn main:app --reload
```

API akan berjalan di `http://localhost:8000`

## Dokumentasi API

Setelah menjalankan server, akses dokumentasi interaktif di:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoint API

### 1. Health Check

```
GET /
```

Mengecek status API dan model yang dimuat.

**Response:**

```json
{
  "status": "running",
  "models_loaded": true,
  "data_loaded": true
}
```

### 2. Rekomendasi Berdasarkan Tempat

```
POST /recommend
```

**Request Body:**

```json
{
  "place_name": "Monas",
  "k": 10
}
```

**Response:**

```json
[
  {
    "Place_Name": "Museum Nasional",
    "Description": "Museum dengan koleksi sejarah Indonesia",
    "Category": "Museum",
    "Lat": -6.1751,
    "Long": 106.8294,
    "Image_URL": "https://example.com/image.jpg"
  }
]
```

### 3. Rekomendasi Berdasarkan Kategori

```
GET /recommend/category?category=Museum&limit=6
```

**Parameters:**

- `category` (required): Kategori tempat wisata
- `limit` (optional, default=6): Jumlah rekomendasi

### 4. Tempat Wisata Terpopuler

```
GET /recommend/most_popular?limit=6
```

**Parameters:**

- `limit` (optional, default=6): Jumlah tempat wisata

### 5. Rekomendasi Berdasarkan Lokasi

```
GET /recommend/nearby?lat=-6.2088&long=106.8456&limit=6
```

**Parameters:**

- `lat` (required): Latitude
- `long` (required): Longitude
- `limit` (optional, default=6): Jumlah rekomendasi

## Struktur Data

Dataset harus memiliki kolom berikut:

- `Place_Name`: Nama tempat wisata
- `Description`: Deskripsi tempat wisata
- `Category`: Kategori tempat wisata
- `Lat`: Latitude
- `Long`: Longitude
- `Image_URL`: URL gambar tempat wisata
- `Rating`: Rating tempat wisata (untuk fitur most popular)

## Model Machine Learning

API ini menggunakan:

1. **TF-IDF Vectorizer**: Untuk mengkonversi teks deskripsi menjadi vektor numerik
2. **Cosine Similarity**: Untuk menghitung kemiripan antar tempat wisata
3. **Haversine Formula**: Untuk menghitung jarak geografis antar lokasi

## Error Handling

API menangani berbagai error seperti:

- Model tidak dapat dimuat
- Tempat wisata tidak ditemukan
- Kategori tidak tersedia
- Error encoding file CSV

## Pengembangan

Untuk pengembangan lebih lanjut:

1. **Menambah fitur baru**: Tambahkan endpoint baru di `main.py`
2. **Update model**: Ganti file `.pkl` dengan model yang sudah dilatih ulang
3. **Menambah data**: Update file CSV dengan data tempat wisata baru

## Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## Kontak

Project Link: [https://github.com/username/Api-Rekomendasi](https://github.com/username/Api-Rekomendasi)
