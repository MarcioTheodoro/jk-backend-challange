import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { IndividualPerson } from './IndividualPerson';
import { BusinessPerson } from './BusinessPerson';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ['individual', 'business'] })
  type: 'individual' | 'business';

  @OneToOne(() => IndividualPerson, (individual) => individual.user)
  individual: IndividualPerson;

  @OneToOne(() => BusinessPerson, (business) => business.user)
  business: BusinessPerson;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
