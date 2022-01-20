import { channel } from 'diagnostics_channel';
import { ChapterEntity } from 'src/chapter/entities/chapter.entity';
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

@Entity({ name: 'images-chapters' })
export class ImagesChapterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageChapter: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @ManyToOne(() => MangaEntity, { eager: true })
  manga: MangaEntity;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.imageChapters)
  chapter: ChapterEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
