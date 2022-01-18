import { Module } from '@nestjs/common';
import { CommentMangaService } from './comment-manga.service';
import { CommentMangaController } from './comment-manga.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentMangaEntity } from './entities/comment-manga.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([CommentMangaEntity]),
  ],
  controllers: [CommentMangaController],
  providers: [CommentMangaService],
})
export class CommentMangaModule {}
