import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

export enum UserRole {
    SEEKER = "seeker",
    RECRUITER = "recruiter"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("varchar")
    firstName!: string

    @Column("varchar")
    lastName!: string

    @Column("varchar", { unique: true })
    email!: string

    @Column("varchar", { nullable: true })
    password?: string // Nullable for OAuth users

    @Column("varchar", { nullable: true, unique: true })
    googleId?: string

    @Column("varchar", { nullable: true })
    avatarUrl?: string

    @Column("varchar", { default: UserRole.SEEKER })
    role!: UserRole

    @CreateDateColumn()
    createdAt!: Date

    @Column("boolean", { default: true })
    isActive!: boolean
}
