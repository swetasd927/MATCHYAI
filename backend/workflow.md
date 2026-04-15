# MatchyAI: CV Parsing & Recommendation System

## Overview

MatchyAI is an AI-powered recruitment platform that connects job seekers with relevant opportunities using Retrieval-Augmented Generation (RAG) and a Vector Database. The core philosophy eliminates the need for candidates to apply to every job posting manually — instead, they upload their resume once and receive intelligent, profile-based recommendations.

---

## User Roles

### Job Seeker
The job seeker uploads their resume to the platform and passively receives job recommendations tailored to their profile. The system accounts for qualification fit in both directions — an overqualified candidate will not be recommended for a role they exceed, ensuring meaningful matches only. Seekers can browse job descriptions to understand market requirements across location, timing, and role type. They also receive feedback on their profile, including guidance on areas to improve if no suitable matches are found. Once a seeker is hired, they are removed from the active recommendation pool.

### Recruiter
The recruiter posts job descriptions and defines hiring criteria. They can view a shortlisted pool of candidates, manually review CVs, and filter applicants by education, experience, and skills. Recruiters specify the number of candidates they wish to shortlist (for example, 100 or 1,000). Once a candidate is hired, the recruiter updates their status accordingly, removing them from future recommendations.

---

## Functional Requirements

- Upload and parse candidate resumes
- Post and manage job descriptions
- Search job descriptions against standard industry tools and technologies
- Surface recommendations to seekers based on their profile
- Provide profile improvement feedback when no matches are found *(low priority)*
- Allow recruiters to manually review shortlisted CVs
- Enable recruiter-defined filtering and candidate volume control
- Update hired status from the recruiter side *(low priority)*
- Core matching engine between resumes and job descriptions
- Stress testing to simulate 10,000+ concurrent users and files

---

## AI Parsing & API Design

Resumes are parsed using an AI model with a structured system prompt. The model receives a CV in PDF form and returns a standardised JSON object.

**System Prompt:** *"You are an expert at parsing CV/PDF files."*

**Output Schema:**
```json
{
  "name": "",
  "address": "",
  "skills": [],
  "experience": [],
  "education": [],
  ...
}
```

---

## Batch Processing Pipeline

1. Accept uploaded PDF resume
2. Extract raw text from the PDF using a file-reading library
3. Send extracted text to the AI API and receive structured JSON
4. Store the structured JSON in the primary database
5. Convert the structured data into vector embeddings via a second API call
6. Store the resulting vectors in the Vector Database

---

## Matching Engine

**Objective:** For a given Job Description (JD), identify the best *N* candidate matches as specified by the recruiter.

**Inputs available to the engine:**
- Vector representations of all resumes
- Vector representation of the target JD
- JSON data of all resumes
- JSON data of the target JD

**Matching Process:**

| Step | Action |
|------|--------|
| Pre-filter | Filter the full resume pool by job title, experience level, skills, education, location, and availability → produces an initial set *X* |
| Step 1 | Compute cosine similarity between each resume vector in *X* and the JD vector |
| Step 2 | Select the top *Y* resumes from *X* by similarity score |
| Step 3 | Apply structured logic matching across *Y* resumes, scoring against skills, education, experience, and other attributes |
| Step 4 | Extract the top *Z* resumes from *Y*, where *Z* is defined by the recruiter |
| Step 5 | Generate a natural-language explanation for each of the *Z* shortlisted candidates, detailing why they were selected |

## Tech stack with tools
Backend: NodeJS, ExpressJS, Typescript
Fronted: NextJS, React, Tailwind CSS
Database: PostgreSQL + pgvector
AIParsing: Langchain + Gemini API
Embeddings: Gemini Embeddings
Vector Store: pgvector(inside PostgreSQL)
