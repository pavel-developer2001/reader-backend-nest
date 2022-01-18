import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('book-marks')
export class BookMarkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @ManyToOne(() => MangaEntity, { eager: true })
  manga: MangaEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
