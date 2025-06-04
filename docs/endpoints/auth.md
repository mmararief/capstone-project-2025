# Autentikasi

## Register

**POST** `/auth/register`

**Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "preferences": ["string"],
  "age": 20
}
```

**Response:**

```json
{
  "id": 1,
  "name": "string",
  "email": "string",
  "preferences": ["string"]
}
```

---

## Login

**POST** `/auth/login`

**Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "jwt_token"
}
```
