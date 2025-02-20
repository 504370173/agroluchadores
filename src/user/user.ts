import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    email: string;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}