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
    "image_url": "https://..."
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
  "image_url": "https://..."
}
```

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
