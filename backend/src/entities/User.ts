import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("varchar")
    firstName!: string

    @Column("varchar")
    lastName!: string

    @Column("boolean")
    isActive!: boolean
}