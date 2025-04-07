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

## 🛠 Backend (NestJS API)

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
| GET    | `/devices/:id`     | Get a device by its ID (**Admin only**) |

> ℹ️ Only users with the `admin` role can access `/devices/:id` to view device details.

### 👥 Sample Users

Use one of the following users to log in:

| Username     | Password      | Role      |
|--------------|---------------|-----------|
| adminuser    | password123   | admin     |
| opuser       | password456   | operator  |
| viewer1      | viewerpass1   | operator  |
| viewer2      | viewerpass2   | operator  |
| manager2     | managerpass2  | admin     |

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
| `/devices/:id`  | Device details page (**Admin only**) |

---

## ✅ Usage

1. Start both the **API** (`localhost:8000`) and the **Web App** (`localhost:3000`).
2. Navigate to `http://localhost:3000/login` to login.
3. Use one of the sample users above to log in.
4. Once logged in:
   - All users can view the device list.
   - Only **admin** users can view device details by navigating to `/devices/:id`.

---

## 📌 Notes

- Ensure both services are running in parallel.
- Update any `.env` configurations if needed for connection or API URLs.

---

## 📬 Contact

For any issues or feedback, feel free to open an issue or contact the maintainer.

