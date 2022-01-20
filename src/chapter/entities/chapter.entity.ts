import { ImagesChapterEntity } from 'src/images-chapter/entities/images-chapter.entity';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'chapters' })
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

  @ManyToOne(() => MangaEntity)
  manga: MangaEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => ImagesChapterEntity, (imageChapter) => imageChapter.chapter)
  imageChapters: ImagesChapterEntity[];

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
