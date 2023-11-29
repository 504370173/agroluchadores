import { Category } from 'src/categories/entities/category.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
// import { Season } from 'src/seasons/entities/season.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'products' })
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

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];

  @OneToMany(() => Transaction, (transactions) => transactions.inventory)
  transactions: Transaction[];

  // @Column()
  // seasonId: number;

  // @ManyToOne(() => Season, (season) => season.products)
  // season: Season;
}
