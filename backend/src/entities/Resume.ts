import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";

export interface Experience {
    title: string;
    company: string;
    duration: string;
}

export interface Education {
    degree: string;
    institution: string;
    year: string;
}

@Entity()
export class Resume {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    // Relates this resume to the Job Seeker who uploaded it
    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;

    @Column("int")
    userId!: number;

    @Column("varchar", { nullable: true })
    name!: string;

    @Column("varchar", { nullable: true })
    address!: string;

    // We use 'jsonb' which is highly optimized in PostgreSQL for storing JSON arrays/objects
    @Column("jsonb", { default: [] })
    skills!: string[];

    @Column("jsonb", { default: [] })
    experience!: Experience[];

    @Column("jsonb", { default: [] })
    education!: Education[];

    // This stores the numerical vector representing the exact meaning of the entire resume!
    // Gemini's text-embedding-004 model outputs exactly 768 dimensions.
    @Column("vector", { length: 768, nullable: true })
    embedding!: string; // pgvector handles the array conversion automatically

    @CreateDateColumn()
    createdAt!: Date;
}
