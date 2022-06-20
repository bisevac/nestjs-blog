import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class BlogView {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Blog)
  blog: Blog;

  @Column()
  blogId: number;

  @Index()
  @Column({ type: 'varchar', length: 256 })
  ip: string;

  @Column({ type: 'int', default: 1 })
  viewCount?: number;

  @CreateDateColumn()
  atCreated: Date;

  @UpdateDateColumn()
  atUpdated: Date;
}
