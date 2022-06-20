import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 512 })
  shortContent?: string;

  @Column('text')
  content: string;

  @Column({ type: 'varchar', length: 256 })
  image: string;

  @Column({ type: 'int', default: 0 })
  totalViewCount: number;

  @Column({ type: 'int', default: 0 })
  uniqueViewCount: number;

  @CreateDateColumn()
  atCreated: Date;

  @UpdateDateColumn()
  atUpdated: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
