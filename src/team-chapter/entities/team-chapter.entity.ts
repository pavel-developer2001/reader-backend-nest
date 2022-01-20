import { ChapterEntity } from 'src/chapter/entities/chapter.entity';
import { MangaEntity } from 'src/manga/entities/manga.entity';
import { TeamEntity } from 'src/team/entities/team.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'team-chapters', schema: 'public' })
export class TeamChapterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamEntity, { eager: true })
  team: TeamEntity;

  @ManyToOne(() => MangaEntity, { eager: true })
  manga: MangaEntity;

  @ManyToOne(() => ChapterEntity, { eager: true })
  chapter: ChapterEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
