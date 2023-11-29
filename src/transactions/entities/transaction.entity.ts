import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.transactions)
  inventory: Inventory;

  @ManyToOne(() => Product, (product) => product.transactions)
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
