import { Location } from 'src/locations/entities/locations.entity';
import { Product } from 'src/products/entities/product.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'inventories' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: boolean;

  @ManyToOne(() => Product, (product) => product.inventories)
  product: Product;

  @ManyToOne(() => Location, (location) => location.inventories)
  location: Location;

  @OneToMany(() => Transaction, (transactions) => transactions.inventory)
  transactions: Transaction[];

  @Column()
  stock: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
