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

    // TEMPORARY FIX FOR WINDOWS:
    // Since pgvector requires a complex installation on local Windows databases, 
    // we will store the embedding as a standard float array for now so your app doesn't crash!
    @Column("float", { array: true, nullable: true })
    embedding!: number[];

    @CreateDateColumn()
    createdAt!: Date;
}
