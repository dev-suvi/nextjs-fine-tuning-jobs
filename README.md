# 🧠 AI Model Fine-Tuning Job Manager

A robust and user-friendly frontend interface for managing AI model fine-tuning jobs. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, this project emphasizes scalability, modern form handling, precise validation, and responsive design.

📺 **Live Demo:** _[View the deployed app](#)_  
🧪 **API Reference:** [Swagger Viewer](https://editor-next.swagger.io/) | [OpenAPI JSON](https://fe-test-api-production.up.railway.app/api/openapi.json)

---

## 🚀 Tech Stack

- **Next.js (App Router)** – File-based routing with server/client component support  
- **TypeScript** – Static typing for improved reliability  
- **Tailwind CSS** – Utility-first CSS for rapid, responsive design  
- **React Hook Form + Zod** – Declarative form state and schema-based validation  
- **Axios** – Simplified HTTP requests with full async/await support  
- **Jest + React Testing Library** *(optional)* – Component and logic unit testing  

---

## ✅ Features Overview

### 🔧 Job Creation

Create fine-tuning jobs with a form that includes dynamic, interdependent validations:

| Field              | Validation Rule                                                             |
|-------------------|------------------------------------------------------------------------------|
| **Job Name**       | 3–50 characters; alphanumeric and dashes only                               |
| **Base Model**     | Must be selected from the available list fetched via API                    |
| **Training Epochs**| Must be a positive integer                                                  |
| **Eval Epochs**    | Must be less than or equal to training epochs                               |
| **Warm-up Epochs** | Must be less than or equal to training epochs                               |
| **Learning Rate**  | Decimal between 0 and 1 (exclusive)                                         |

- Real-time validation feedback using **Zod**
- Disabled submit state with loading indicator
- Optimistic UI updates and API error handling

---

### 📊 Job Dashboard

Monitor and manage all submitted fine-tuning jobs in a single view:

- Job attributes: Name, Model, Epochs, Learning Rate, Status
- **Color-coded statuses**: `Running`, `Completed`, `Failed`
- **Live data fetching** via API
- **Summary panel** with job statistics:
  - Total Jobs
  - Running Jobs
  - Completed Jobs
  - Failed Jobs
- *(Optional)* Delete functionality with confirmation modal

---

## 🌐 API Integration

**Base URL:** `https://fe-test-api-production.up.railway.app/api`  
**All requests require an `x-api-key` header**

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| GET    | `/jobs`      | List all fine-tuning jobs |
| POST   | `/jobs`      | Submit a new job          |
| GET    | `/models`    | Get list of base models   |
| DELETE | `/jobs/:id`  | *(Optional)* Delete a job |

---

## 🧪 Validations & Error Handling

- Built with **Zod** schema validation and **React Hook Form**
- Intelligent interdependent logic (e.g., eval/warm-up ≤ training epochs)
- Robust error feedback directly from API responses
- Custom reusable form components
- Enhanced UX with spinners, disabled states, and transitions

---

## 🎨 UI/UX Design

The application UI is based on professional mockups:

- 📋 [Job Dashboard](https://drive.google.com/file/d/1WvE8XgdmB5o0U_092JZroOcBPv_0kf7N/view)
- ➕ [Create Job Flow](https://drive.google.com/file/d/1Egp7WP610Gi2Z-Mwo6D2ogyTlp5q2kaf/view)
- 🔁 [View Jobs Flow](https://drive.google.com/file/d/1pqFSy4fJR59DKQ2dEXr5P2nsa9DoTqRZ/view)
- 🗑️ [Delete Job Flow](https://drive.google.com/file/d/1LhahXErJOlcBO8IN6IIQ0bfNoosyjdu3/view)

---

## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dev-suvi/nextjs-fine-tuning-jobs.git
cd nextjs-fine-tuning-jobs


### 1. Clone the repository

```bash
git clone https://github.com/dev-suvi/nextjs-fine-tuning-jobs.git
cd nextjs-fine-tuning-jobs
```

### 2. Install dependencies
```bash
npm install
# or
yarn install

```

### 3. Run the development server
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```bash
/app              → Next.js app directory (App Router)
/components       → Shared UI components
/lib              → Utility functions and form schemas
/types            → TypeScript type definitions
/services         → API logic using Axios
```

## 📌 Notes

- All form validations are centralized and strongly typed  
- Modular and clean architecture for long-term scalability  
- Job data is live-fetched and reflects current backend state  
- Fully responsive and accessible  
