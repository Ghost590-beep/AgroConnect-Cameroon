# 🌾 === AGROCONNECT CAMEROON ====

A simple online marketplace for agriculture in Cameroon.
Farmers, buyers, and service providers can buy, sell, and offer services in one place.

# 📌 === What is AGROCONNECT =====

A web app based platform that connects:
-Farmers → sell crops or rent equipmen.
-Buyers → buy products like crops, animals, or tools.
-Service Providers → offer services like transport, labour, or veterinary care.

# 🚀 ====== Project Goal =========

To make agriculture easier, faster, and more connected in Cameroon.

# ⚙️ Tech Stack

-Frontend: React + Tailwind CSS + Typescript
-Backend: Node.js + Express
-Database: MYSQL
-Auth: JWT + bycrypt
-API call: Axios
-File Uploads: Multer
-Deployment: Vercel (frontend), Render (backend), Railway(database)

# 📄 ==== Main Pages ====

-/ → Landing page
-/auth → Login & Register
-/dashboard → User home
-/marketplace → Browse products
-/profile → Manage account

# 👤 ==== User Modes ====

-Seller → create listings
-Buyer → buy products
-Service Provider → offer services

# 🛒 ===== Categories ======

Crops & Seeds
Animals
Machines & Tools
Services
Medications

# 📁 ==== Project Structure =====

agro_connect/
├── client/ # Frontend (React)
├── server/ # Backend (Express)
├── database/ # MySQL schema
├── .github/ # CI/CD workflows
├── README.md
└── PROGRESS.md

# 🌿 ==== Branch Rules ====

feat/... → new feature
fix/... → bug fix
docs/... → documentation

# 🚀 ===== Development Plan ====

Build frontend
Design database
Build backend
Connect frontend + backend
Test & deploy

# ===== 📊 Project Status =======

See PROGRESS.md for details.
✅ Repo created
✅ Wireframes done
⏳ Everything else in progress

# ===== ▶️ Run Locally ======

# Clone project

git clone https://github.com/Ghost590-bee/AgroConnect-Cameroon.git

# Frontend

cd client
npm install
npm run dev

# Backend

cd ../server
npm install
cp .env.example .env
node index.js

# 🔐 ==== Environment Variables =====

Create .env in /server:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=agroconnect
JWT_SECRET=your_secret

# 🤝 ==== Contributing ======

Create a branch
Make changes
Open Pull Request
Merge after review

## 👥 ======= Team & Workflow =======

This project is designed for a **team of 5 members** working together using **Agile Scrum methodology**.

### 🧑‍🤝‍🧑 Team Roles

Each member has a clear responsibility:

- **Product Owner** → Defines features and project goals
- **Scrum Master** → Organizes the team and removes blockers
- **Frontend Developer(s)** → Build the user interface
- **Backend Developer(s)** → Build APIs and server logic
- **Database/DevOps Engineer** → Manages database and deployment

💡 Roles can be flexible depending on the team.

### 🔄 How We Work (Scrum Process)

The team works in short cycles called **Sprints** (usually 1–2 weeks):

1. **Planning** → Decide what to build
2. **Development** → Build features
3. **Review** → Check completed work
4. **Retrospective** → Improve how the team works

### 📋 Task Management

We use a project board with the following stages:

- **To Do** → Tasks not started
- **In Progress** → Currently being worked on
- **In Review** → Waiting for approval
- **Done** → Completed tasks

---

### 🎯 Milestones

The project is divided into 5 milestones:

- **M1** → Setup & design
- **M2** → Frontend development
- **M3** → Backend development
- **M4** → Integration
- **M5** → Testing & deployment

---

💡 This workflow helps the team stay organized, collaborate effectively, and deliver features step by step.

# 📄 ====== License =====

MIT — built for agriculture in Cameroon 🇨🇲

---

## Codebase annotations — purpose, OOP concepts, and SOLID mapping

This section provides concise comments about the structure and design principles used across the repository.

- `server/` (backend)
  - `controllers/`: HTTP handlers that validate input and delegate to `services`.
  - `services/`: business rules, orchestration, and cross-cutting logic.
  - `repositories/`: SQL queries and DB mapping. Single place for persistence code.

- `client/` (frontend)
  - `pages/`: route-level components that compose UI from `components/`.
  - `components/`: reusable UI building blocks.
  - `services/`: API wrappers used by the UI to talk to the backend.

OOP concepts found in code:

- Abstraction: clear separation of HTTP, business logic, and persistence.
- Encapsulation: each module exposes a small focused API (e.g., repositories expose `findById`, `create`).
- Composition: services compose repositories and utilities rather than using inheritance.

SOLID principles (where they apply):

- SRP: Each file has one reason to change (routes, controllers, services, repositories).
- OCP: New features are added via new service methods or new routes, minimizing edits to existing code.
- LSP: Components that implement similar contracts can be swapped out for tests/mocks.
- ISP: Modules expose narrow APIs tailored to their consumer (controllers vs repositories).
- DIP: High-level modules depend on service interfaces; lower-level details (DB) can be replaced in tests.

If you want a commit that adds a top-of-file comment block to every JS/TS file describing its purpose and mapping to SOLID principles, I can generate and apply that automatically.
