

Work to do

Project initialization and database
Authentication System
AI resume parsing pipeline
Vector Embeddings
Job Description Pipeline

## Next Steps (To-Do)

### 5. Job Description Pipeline
- [x] Create `Job` entity (title, requirements, skills, embedding) linked to Recruiter
- [x] Build Job upload/creation routes for Recruiters
- [x] Use Gemini to extract structured JSON data from Job Descriptions
- [x] Generate 768-dimension Vector Embeddings for Jobs

### 6. The Core Matching Engine
- [x] Write the Cosine Similarity mathematical function (or SQL query) to compare vectors
- [x] Build the `/api/match` endpoint to take a Job ID and return the Top 5 Resumes
- [x] Format match results with a "Match Percentage" score
