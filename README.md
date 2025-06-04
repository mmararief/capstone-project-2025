# Wisata Jakarta Recommendation API

API ini memberikan rekomendasi tempat wisata di Jakarta berbasis content-based filtering.

## Setup

1. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

2. **Pastikan database PostgreSQL berjalan dan sudah terisi data**

   - Connection string default: `postgresql://postgres:postgres@localhost:5433/wisata_jakarta`
   - Struktur tabel sesuai dengan model User, Place, Rating (lihat skema di atas)

3. **Pastikan file model ML tersedia di folder `models_ml/`**

   - `cosine_similarity_matrix.joblib`
   - `place_indices.joblib`
   - `tfidf_vectorizer.joblib`

4. **Jalankan API**
   ```bash
   uvicorn main:app --reload
   ```

## Endpoint

- `GET /recommend/place/{place_id}?top_n=5`
  - Mengembalikan rekomendasi tempat wisata mirip berdasarkan `place_id`.
  - Response: List tempat wisata (id, name, category, description, latitude, longitude, price, image_url)
