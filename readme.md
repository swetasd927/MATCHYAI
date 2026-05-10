# MatchyAI: AI-Powered CV Parsing and Job Recommendation System

MatchyAI is an intelligent recruitment platform that uses Retrieval-Augmented Generation (RAG), large language models, and vector similarity search to connect job seekers with relevant opportunities and help recruiters efficiently identify the best candidates.

Instead of manually applying to jobs, candidates upload their resume once and receive continuous, profile-based recommendations. The system focuses on semantic understanding of both resumes and job descriptions to ensure accurate and meaningful matches.

---

## Key Idea

Traditional job portals rely on keyword matching and manual filtering, which leads to irrelevant applications and inefficient hiring. MatchyAI replaces this with an AI-driven pipeline that understands context, skills, and experience using embeddings and structured reasoning.

---

## Core Features

### Job Seeker

* Upload resume in PDF format
* AI-based resume parsing into structured data
* Personalized job recommendations based on semantic matching
* Feedback when no suitable jobs are found
* Automatic removal after hiring

### Recruiter

* Post and manage job descriptions
* Define hiring filters (skills, experience, education, location)
* Get ranked candidate shortlists
* Control shortlist size (e.g., top 50, 100, 1000)
* View AI-generated explanations for candidate selection
* Update hiring status

---

## System Architecture

MatchyAI uses a hybrid AI pipeline combining structured filtering and vector similarity search.

### Resume Processing Flow

1. PDF resume upload
2. Text extraction
3. LLM-based structured parsing (Gemini via LangChain)
4. Storage in PostgreSQL
5. Embedding generation using Gemini Embeddings
6. Vector storage using pgvector

---

### Matching Engine

For each job description:

* Pre-filter candidates using structured attributes (skills, experience, education, location)
* Compute cosine similarity between job and resume embeddings
* Rank candidates based on similarity score
* Apply structured scoring refinement
* Return top N candidates as defined by recruiter
* Generate explanation for each match using LLM

---

## Tech Stack

**Backend**

* Node.js
* Express.js
* TypeScript

**Frontend**

* Next.js
* React
* Tailwind CSS
* TypeScript

**Database**

* PostgreSQL
* pgvector (vector similarity search)

**AI Layer**

* Google Gemini API
* LangChain
* Embeddings via Gemini

---

## Project Structure

```text
MatchyAI/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   └── index.ts
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── pages/
│
├── ai/
│   ├── parsing/
│   ├── embeddings/
│   └── prompts/
│
├── database/
│   └── schema.sql
```

---

## Environment Variables

```env
PORT=5000

DATABASE_URL=postgresql://user:password@localhost:5432/matchyai

GEMINI_API_KEY=your_api_key

JWT_SECRET=your_secret
```

---

## Setup Instructions

```bash
git clone https://github.com/swetasd927/MATCHYAI.git
cd MATCHYAI
```

Backend setup:

```bash
cd backend
npm install
npm run dev
```

Frontend setup:

```bash
cd frontend
npm install
npm run dev
```

Enable pgvector:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

---

## What Makes This Project Strong

* End-to-end AI system (parsing → embeddings → retrieval → ranking)
* Hybrid matching (semantic + structured scoring)
* Real-world recruiter workflow simulation
* Scalable architecture for large datasets (10k+ users)
* Production-style backend with modular services
* Use of modern AI stack (LLMs + embeddings + vector DB)

---

## Future Enhancements

* Skill gap analysis engine
* Interview scheduling system
* Resume improvement AI assistant
* Real-time job alerts
* Advanced ML ranking model
* Multi-language resume support

---

## Author

Sweta Dahal
Full Stack Developer

---
