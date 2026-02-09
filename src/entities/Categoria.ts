import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Produto } from "./Produto.js";

@Entity("categorias")
export class Categoria {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  nome: string;

  @Column({ type: "varchar", nullable: true })
  descricao?: string;

  @CreateDateColumn({ type: "timestamp" })
  dataCriacao: Date;

  @UpdateDateColumn({ type: "timestamp" })
  dataAtualizacao: Date;

  @OneToMany(() => Produto, produto => produto.categoria)
  produtos: Produto[];
}
