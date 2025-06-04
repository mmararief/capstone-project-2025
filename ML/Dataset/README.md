# Dataset - Tempat Wisata Jakarta

Direktori ini berisi dataset dan script untuk preprocessing data tempat wisata Jakarta yang digunakan dalam sistem rekomendasi.

## 📁 Struktur Direktori

```
Dataset/
├── raw/                    # Raw datasets (belum diproses)
├── processed/              # Processed datasets (siap digunakan)
├── scripts/                # Data processing scripts
│   ├── data_cleaning.py   # Script pembersihan data
│   ├── feature_engineering.py  # Script feature engineering
│   └── data_validation.py # Script validasi data
└── README.md              # Dokumentasi dataset
```

## 📊 Deskripsi Dataset

### Dataset Utama: `tourism_jakarta_with_images.csv`

Dataset berisi informasi tempat wisata Jakarta dengan kolom-kolom berikut:

| Kolom         | Tipe Data | Deskripsi                      | Contoh                          |
| ------------- | --------- | ------------------------------ | ------------------------------- |
| `Place_Name`  | String    | Nama tempat wisata             | "Monumen Nasional (Monas)"      |
| `Description` | String    | Deskripsi detail tempat wisata | "Monumen setinggi 132 meter..." |
| `Category`    | String    | Kategori tempat wisata         | "Monument", "Museum", "Park"    |
| `Lat`         | Float     | Latitude koordinat             | -6.1751                         |
| `Long`        | Float     | Longitude koordinat            | 106.8294                        |
| `Image_URL`   | String    | URL gambar tempat wisata       | "https://example.com/image.jpg" |
| `Rating`      | Float     | Rating tempat wisata (1-5)     | 4.5                             |

### Statistik Dataset

- **Total Records**: ~100 tempat wisata
- **Kategori Utama**: Museum, Taman, Mall, Monument, Kuliner, dll.
- **Coverage Area**: DKI Jakarta dan sekitarnya
- **Rating Range**: 1.0 - 5.0
