import { Supply } from "src/supplies/entities/supply.entity";
import { Tool } from "src/tools/entities/tool.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"

@Entity({name:'suppliers'})
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: number;

    @ManyToMany(() => Supply, (supply) => supply.suppliers)
    @JoinTable({
        name:'supplier_supplies',
        joinColumn: {
            name: 'supplier_id',
        },
        inverseJoinColumn: {
            name: 'supplies_id',
        },
    })
    supplies: Supply[]

    @ManyToMany(() => Tool, (tool) => tool.suppliers)
    @JoinTable({
        name:'supplier_tools',
        joinColumn: {
            name:'supplier_id',
        },
        inverseJoinColumn: {
            name:'tools_id',
        },
    })
    tools: Tool[];
}