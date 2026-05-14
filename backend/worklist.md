

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

### 7. Match Explanations & Filtering
- [ ] Use Gemini to generate a natural-language explanation detailing why a candidate matched the JD
- [ ] Implement recruiter-defined filtering (by skills, experience, location) before vector matching
- [ ] Add pagination or configurable volume control (top N candidates)

### 8. Feedback & Status Management
- [ ] Implement AI-generated profile improvement feedback for seekers with no matches
- [ ] Allow recruiters to update the status of a candidate (e.g., "Shortlisted", "Hired")
- [ ] Remove hired candidates from the active recommendation pool
- [ ] Stress testing to simulate 10,000+ concurrent users and files
