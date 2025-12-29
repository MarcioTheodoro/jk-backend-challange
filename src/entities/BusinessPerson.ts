import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User'

@Entity('business_person')
export class BusinessPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fantasy_name: string;

  @Column({ length: 18, unique: true })
  cnpj: string;

  @Column({ length: 100, nullable: true })
  company_name?: string;

  @Column({ length: 100, nullable: true })
  job_title?: string;

  @OneToOne(() => User, (user) => user.business)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
