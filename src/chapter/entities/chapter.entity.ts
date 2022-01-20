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

@Entity({ name: 'chapters', schema: 'public' })
export class ChapterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberChapter: string;

  @Column()
  volumeChapter: string;

  @Column()
  titleChapter: string;

  @Column()
  language: string;

  @Column({ default: 0 })
  countLikes: number;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @ManyToOne(() => MangaEntity, { eager: true })
  manga: MangaEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
