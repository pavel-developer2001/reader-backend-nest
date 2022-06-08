import { Module } from '@nestjs/common';
import { RatingMangaService } from './rating-manga.service';
import { RatingMangaController } from './rating-manga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingMangaEntity } from './entities/rating-manga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingMangaEntity])],
  controllers: [RatingMangaController],
  providers: [RatingMangaService],
})
export class RatingMangaModule {}
