MatchyAI: CV parsing recommendation system using RAG and Vector DB

***JobSeeker**


Upload Resume
Someone who seeks for intern get full experienced person since its job description matches but it is overqualified, it should not get recommendation, 
main core: no need to apply to every single company
user leaves resume once, then get recommendated accordingly no need to apply in all job description
Seeker:search job description[to know the requirements of ideal job which company opens vacancy acc to location, time and qualification role]
where i am getting recommended based on my profile
based on feedback, recomendation what im getting
non qualified to any then improve feedback

**Recruiter**
Posts job description
Who gets job, no longer is a seeker so is not getting recommended further.
[updates from recruiter side] -> Hire candicate
Select best find

Should see shortlisted people manually[CV]
Filter based on : education, experience, skills,
No of match choose for example: 100 or 1000

**FunctionalRequirements**
Upload and parse resume
Post description of job
Search job description: find on intenet standard tools and technologies
Get where i'm recommended
Feedback based on profile: low priority
see shortlisted people from cv manually
filter number of people based on priority that you want to hire
Recruiter should update hired status: low priority
Matching
Stress testing: simulate 10K+ users and files

**AIParsingAPICalls**
Input : system prompt: you are expert at CV pdf file parsing
Output: JSON schema text resume
{
    name: 
    address:
    skilss: & more
}

**BatchProcessing**
Parse resume
Pdf file
Read pdf file a libary to text
Make API call to get structured data
Upload pdf file and pass data to DB
Call another API to convert structured data end to end: text to vector embedding, store vector to DB , stop

Obj: For a given Job Description{JD}, find best 'N' matches

Given:
1. Vector of all resumes
2. Vector of 1 specific JD
3. JSON data of all resumes
4. JSON Data of JD

Filters resume by 
Job Titles
Experience
Skills
Education
Location
Time availablility

Initially filtered 'x' resume

step 1: Get cosine similarity between 1 and 2
step 2: Select 'y' top matching resumes out of 'x
step 3: code logic, matching servers for 'y' top resumes considering skills, education,....
step 4: get top 'z' resumes from 'y', 'z' is given by recruiter
step 5: generate explanation of why each resume/seeker is shortlisted [for z resumes] based on skills, education