# Full Stack Device Management App

This project contains a full stack application built with:

- **Backend:** [NestJS](https://nestjs.com/) (in the `api` folder)
- **Frontend:** [Next.js](https://nextjs.org/) (in the `web` folder)

## 📁 Project Structure

```
root/
│
├── api/        # NestJS backend server
└── web/        # Next.js frontend application
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## 💠 Backend (NestJS API)

### 📍 Location: `/api`

### 🔧 Installation & Run

```bash
cd api
npm install
npm run start:dev
```

### 🔌 API Base URL

```
http://localhost:8000
```

### 📡 API Endpoints

| Method | Endpoint           | Description                         |
|--------|--------------------|-------------------------------------|
| POST   | `/auth/login`      | Login with `username` and `password`|
| GET    | `/devices`         | Get all devices                     |
| GET    | `/devices/:id`     | Get a device by its ID              |

---

## 🌐 Frontend (Next.js App)

### 📍 Location: `/web`

### 🔧 Installation & Run

```bash
cd web
npm install
npm run dev
```

### 🌍 Web App URL

```
http://localhost:3000
```

### 📄 Available Pages

| Route           | Description                  |
|----------------|------------------------------|
| `/login`        | Login page                   |
| `/`             | Devices list page            |
| `/devices/:id`  | Device details page          |

---

## ✅ Usage

1. Start both the **API** (`localhost:8000`) and the **Web App** (`localhost:3000`).
2. Navigate to `http://localhost:3000/login` to login.
3. Once logged in, you'll be redirected to the devices list.
4. Click on a device to view its details.

---

## 📌 Notes

- Ensure both services are running in parallel.
- Update any `.env` configurations if needed for connection or API URLs.

---

## 📬 Contact

For any issues or feedback, feel free to open an issue or contact the maintainer.

