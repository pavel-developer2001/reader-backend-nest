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

@Entity('team-mangas')
export class TeamMangaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeamEntity, { eager: true })
  team: TeamEntity;

  @ManyToOne(() => MangaEntity, { eager: true })
  manga: MangaEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
