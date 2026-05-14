**BACKEND**

**packages**
npm init -y

npm install express
npm install --save-dev typescript ts-node nodemon @types/node @types/express
npm install -D typescript ts-node nodemon @types/express @types/node

**langchain**

**for gemini**
npm install @langchain/google-genai dotenv
npm install -D @types/node

**BackendRun**
npm run dev

**TypeORM with PostgreSQL**
cd ts-node-typeorm-api

npm installexpress typeorm pg reflect-metadata
npm install -D typescript ts-node @types/node

npm install --save-dev typescript ts-node @types/node @types/express

npm install typeorm reflect-metadata pg


Work to do

Project initialization and database
Authentication System
AI resume parsing pipeline
Vector Embeddings

## Next Steps (To-Do)

### 5. Job Description Pipeline
- [x] Create `Job` entity (title, requirements, skills, embedding) linked to Recruiter
- [x] Build Job upload/creation routes for Recruiters
- [x] Use Gemini to extract structured JSON data from Job Descriptions
- [x] Generate 768-dimension Vector Embeddings for Jobs

### 6. The Core Matching Engine
- [ ] Write the Cosine Similarity mathematical function (or SQL query) to compare vectors
- [ ] Build the `/api/match` endpoint to take a Job ID and return the Top 5 Resumes
- [ ] Format match results with a "Match Percentage" score
