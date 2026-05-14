import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Job {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    // Relates this job to the Recruiter who posted it
    @ManyToOne(() => User)
    @JoinColumn({ name: "recruiterId" })
    recruiter!: User;

    @Column("int")
    recruiterId!: number;

    @Column("varchar")
    title!: string;

    @Column("text", { nullable: true })
    description!: string;

    @Column("jsonb", { default: [] })
    requirements!: string[];

    @Column("jsonb", { default: [] })
    skills!: string[];

    @Column("float", { array: true, nullable: true })
    embedding!: number[];

    @CreateDateColumn()
    createdAt!: Date;
}
