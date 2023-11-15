import { Supplier } from "src/suppliers/entities/supplier.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"

@Entity({name:'supplies'})
export class Supply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    amount: number;

    @Column()
    measure: string;

    @ManyToMany(() => Supplier, (supplier) => supplier.supplies)
    suppliers: Supplier[];
}