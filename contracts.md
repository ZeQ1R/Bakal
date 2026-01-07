# BAKAL : CUISINES - API Contracts

## Overview
This document captures the API contracts between frontend and backend for the reservation system.

## Base URL
- Backend API: `${REACT_APP_BACKEND_URL}/api`

---

## Reservations API

### 1. Create Reservation
**Endpoint:** `POST /api/reservations`

**Request Body:**
```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "guests": "string (required)",
  "date": "string (required, YYYY-MM-DD format)",
  "time": "string (required, e.g., '7:00 PM')",
  "requests": "string (optional)"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string | null",
  "guests": "string",
  "date": "string",
  "time": "string",
  "requests": "string | null",
  "status": "pending",
  "created_at": "ISO datetime"
}
```

### 2. Get All Reservations
**Endpoint:** `GET /api/reservations`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string | null",
    "guests": "string",
    "date": "string",
    "time": "string",
    "requests": "string | null",
    "status": "pending | confirmed | cancelled",
    "created_at": "ISO datetime"
  }
]
```

### 3. Get Single Reservation
**Endpoint:** `GET /api/reservations/{reservation_id}`

**Response (200):** Same as single reservation object above
**Response (404):** `{"detail": "Reservation not found"}`

### 4. Update Reservation Status
**Endpoint:** `PATCH /api/reservations/{reservation_id}/status?status={status}`

**Query Parameters:**
- `status`: "pending" | "confirmed" | "cancelled"

**Response (200):** `{"message": "Reservation status updated to {status}"}`
**Response (400):** `{"detail": "Invalid status..."}`
**Response (404):** `{"detail": "Reservation not found"}`

### 5. Delete Reservation
**Endpoint:** `DELETE /api/reservations/{reservation_id}`

**Response (200):** `{"message": "Reservation deleted successfully"}`
**Response (404):** `{"detail": "Reservation not found"}`

---

## Data Flow

### Frontend → Backend
1. User fills reservation form in `Reservations.jsx`
2. Form validation on frontend (required fields)
3. Submit via axios POST to `/api/reservations`
4. Show success message on 201 response
5. Show error message on failure

### Database Schema (MongoDB)
**Collection:** `reservations`
```
{
  id: string (UUID),
  name: string,
  email: string,
  phone: string | null,
  guests: string,
  date: string,
  time: string,
  requests: string | null,
  status: string ("pending" | "confirmed" | "cancelled"),
  created_at: string (ISO datetime)
}
```

---

## Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error
