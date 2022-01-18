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

@Entity('comment-mangas')
export class CommentMangaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  commentText: string;

  @Column()
  spoiler: boolean;

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
