import { Module } from '@nestjs/common';
import { CommentMangaService } from './comment-manga.service';
import { CommentMangaController } from './comment-manga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentMangaEntity } from './entities/comment-manga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentMangaEntity])],
  controllers: [CommentMangaController],
  providers: [CommentMangaService],
})
export class CommentMangaModule {}
