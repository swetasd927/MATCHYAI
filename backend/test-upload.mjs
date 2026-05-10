import fs from 'fs';

async function run() {
  try {
    const testEmail = `tester_${Date.now()}@matchyai.com`;

    // 1. Register a test seeker user
    const regRes = await fetch("http://localhost:5000/api/users/register", {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          firstName: "Auto", 
          lastName: "Tester", 
          email: testEmail, 
          password: "password123", 
          role: "seeker"
      })
    });
    console.log("Register Status:", await regRes.text());
    
    // 2. Login to get the JWT Token
    const login = await fetch("http://localhost:5000/api/users/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: testEmail, password: "password123"})
    });
    const loginData = await login.json();
    console.log("Login Response:", loginData);
    const token = loginData.token;
    
    if (!token) {
        console.error("Failed to login and get token!");
        return;
    }
    console.log("Successfully logged in and got JWT Token!");

    // 3. Prepare the PDF file as multipart/form-data
    console.log("Uploading D:\\Portfolio\\Sweta_CV.pdf to the AI Pipeline...");
    const formData = new FormData();
    const fileBuffer = fs.readFileSync("D:\\Portfolio\\Sweta_CV.pdf");
    const blob = new Blob([fileBuffer], { type: "application/pdf" });
    formData.append("pdf", blob, "Sweta_CV.pdf");

    // 4. Send the POST request to the upload route
    const upload = await fetch("http://localhost:5000/api/resume/upload", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData
    });
    
    const result = await upload.json();
    console.log("\nAI PARSING RESULT");
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
      console.error("Test Script Error:", error);
  }
}
run();
