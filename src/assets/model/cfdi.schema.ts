import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class CfdiSchema {
  @PrimaryColumn()
  uuid: string;

  @Column()
  rfcEmisor: string;
  @Column({nullable: true})
  nombreEmisor: string;
  @Column()
  rfcReceptor: string;
  @Column({nullable: true})
  nombreReceptor: string;
  @Column("float", {nullable: true})
  subtotal: string;
  @Column("float", {nullable: true})
  total: string;
  @Column("date", {nullable: true})
  fecha: string;

  /*
    @ManyToOne(()=> ConceptosSchema,conceptosSchema => conceptosSchema.uuid)
    conceptosSchema = ConceptosSchema;*/
  @Column({nullable: true})
  tipoComprobante: string;
  @Column({nullable: true})
  moneda: string;
}
