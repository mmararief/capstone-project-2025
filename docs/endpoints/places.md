# Tempat Wisata

## List Semua Tempat

**GET** `/places`

**Response:**

```json
[
  {
    "id": 1,
    "name": "string",
    "description": "string",
    "category": "string",
    "latitude": -6.2,
    "longitude": 106.8,
    "price": 10000,
    "image_url": "https://...",
    "avgRating": 4.2
  }
]
```

---

## Detail Tempat Wisata

**GET** `/places/{id}`

**Response:**

```json
{
  "id": 1,
  "name": "string",
  "description": "string",
  "category": "string",
  "latitude": -6.2,
  "longitude": 106.8,
  "price": 10000,
  "image_url": "https://...",
  "avgRating": 4.2,
  "userRating": 5
}
```

- `avgRating`: Rata-rata rating dari semua user untuk tempat ini.
- `userRating`: Rating yang diberikan user yang sedang login (null jika belum pernah memberi rating).

---

## Tambah Tempat Wisata

**POST** `/places`

**Body:**
Sama seperti response di atas (tanpa id).

---

## Update Tempat Wisata

**PUT** `/places/{id}`

**Body:**
Sama seperti response di atas (tanpa id).

---

## Hapus Tempat Wisata

**DELETE** `/places/{id}`

---

## Beri Rating Tempat Wisata

**POST** `/places/{id}/rate` _(Butuh JWT Auth)_

**Body:**

```json
{
  "value": 4
}
```

**Response:**

```json
{
  "id": 1,
  "value": 4,
  "userId": 1,
  "placeId": 1
}
```
