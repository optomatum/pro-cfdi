import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ConceptosSchema {

  @PrimaryGeneratedColumn()
  id: string;
  @Index()
  @Column()
  uuid: string;
  @Column("float", {nullable: true})
  cantidad: string;
  @Column("varchar", {length: 50, nullable: true})
  descripcion: string;
  @Column("float", {nullable: true})
  valorUnitario: string;
  @Column("float", {nullable: true})
  importe: string;


  /*@OneToMany(()=> CfdiSchema, cfdiSchema => cfdiSchema.uuid)
  conceptos: ConceptosSchema[];*/
}
