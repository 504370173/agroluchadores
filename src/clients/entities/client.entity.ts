import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clients'})
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: number

    @Column()
    status: boolean;
}