import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";

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
    experience!: any[];

    @Column("jsonb", { default: [] })
    education!: any[];

    // --- LATER: We will add the Vector Embeddings column here! ---

    @CreateDateColumn()
    createdAt!: Date;
}
