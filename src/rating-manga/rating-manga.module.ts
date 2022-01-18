import { Module } from '@nestjs/common';
import { RatingMangaService } from './rating-manga.service';
import { RatingMangaController } from './rating-manga.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingMangaEntity } from './entities/rating-manga.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([RatingMangaEntity]),
  ],
  controllers: [RatingMangaController],
  providers: [RatingMangaService],
})
export class RatingMangaModule {}
