import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Categoria } from "./Categoria.js";

@Entity("produtos")
export class Produto {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  nome: string;

  @Column({ type: "varchar", nullable: true })
  descricao?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ type: "int", nullable: false })
  estoque: number;

  @CreateDateColumn({ type: "timestamp" })
  dataCriacao: Date;

  @UpdateDateColumn({ type: "timestamp" })
  dataAtualizacao: Date;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, { nullable: false })
  @JoinColumn({ name: "categoriaId" })
  categoria: Categoria;

  @Column({ type: "uuid" })
  categoriaId: string;
}
