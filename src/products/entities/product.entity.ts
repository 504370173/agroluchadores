import { Category } from 'src/categories/entities/category.entity';
// import { Season } from 'src/seasons/entities/season.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'

@Entity({name:'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; 

    @Column()
    amount: number; 

    @Column()
    measure: string; 

    @Column()
    season: string; 

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    // @Column()
    // seasonId: number;

    // @ManyToOne(() => Season, (season) => season.products)
    // season: Season;
}