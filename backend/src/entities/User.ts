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

    @Column("varchar")
    password!: string // This will store the hashed password

    @Column("varchar", { default: UserRole.SEEKER })
    role!: UserRole

    @CreateDateColumn()
    createdAt!: Date

    @Column("boolean", { default: true })
    isActive!: boolean
}
