import { GenreEntity } from 'src/genre/entities/genre.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'mangas' })
export class MangaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  yearOfIssue: string;

  @Column()
  englishTitle: string;

  @Column()
  originalTitle: string;

  @Column({ length: 1500 })
  mangaDescription: string;

  @Column()
  statusManga: string;

  @Column()
  typeManga: string;

  @Column({ length: 1500 })
  ageRatingManga: string;

  @Column({ nullable: true })
  mangaCover?: string;

  @Column({ default: 0 })
  watchCount?: number;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @ManyToMany((type) => TagEntity, (tag) => tag.mangas, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  tags: TagEntity[];

  @ManyToMany((type) => GenreEntity, (genre) => genre.mangas, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  genres: GenreEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
