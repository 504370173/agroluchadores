import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity({name:'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; 

    @Column()
    status: boolean; 

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]; //List of Products
} 