export type UserRole = "seeker" | "recruiter";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}

export interface Experience {
    title: string;
    company: string;
    duration: string;
}

export interface Education {
    degree: string;
    institute: string;
    year: string;
}

export interface Resume {
    id: number;
    name: string;
    address: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
}

export interface Job {
    id: number;
    title: string;
    description: string;
    requirements: string[];
    skills: string[];
    createdAt: string;
}

export interface Match {
    resumeId: number;
    name: string;
    skills: string[];
    experience: string[];
    education: string[];
    matchPercentage: number;
    similarityScore: number;
}