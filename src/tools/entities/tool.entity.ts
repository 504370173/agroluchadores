import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'tools' })
export class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  amount: number;

  @ManyToMany(() => Supplier, (supplier) => supplier.tools)
  suppliers: Supplier[];
}
