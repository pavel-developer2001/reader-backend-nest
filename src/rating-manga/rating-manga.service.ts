import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingMangaDto } from './dto/create-rating-manga.dto';
import { UpdateRatingMangaDto } from './dto/update-rating-manga.dto';
import { RatingMangaEntity } from './entities/rating-manga.entity';

@Injectable()
export class RatingMangaService {
  constructor(
    @InjectRepository(RatingMangaEntity)
    private repository: Repository<RatingMangaEntity>,
  ) {}

  async create(createRatingMangaDto: CreateRatingMangaDto, userId: number) {
    const candidate = await this.repository.find({
      where: {
        manga: { id: createRatingMangaDto.mangaId },
        user: { id: userId },
      },
    });
    if (candidate.length > 0) {
      return candidate;
    }
    return this.repository.save({
      ...createRatingMangaDto,
      user: { id: userId },
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number, userId: number) {
    return this.repository.findOne({
      where: { manga: { id }, user: { id: userId } },
    });
  }

  async update(
    id: string,
    updateRatingMangaDto: UpdateRatingMangaDto,
    userId: number,
  ) {
    const findRating = await this.repository.find({
      where: {
        id,
      },
    });
    if (findRating.length > 0) {
      await this.repository.update(id, {
        rating: updateRatingMangaDto.rating,
        manga: { id: updateRatingMangaDto.mangaId },
        user: { id: userId },
      });
      return await this.repository.findOne({ where: { id } });
    }
    return 'Вы не можете обновить рейтинг';
  }

  remove(id: number) {
    return `This action removes a #${id} ratingManga`;
  }
}
