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
      manga: { id: createRatingMangaDto.mangaId },
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

  async update(updateRatingMangaDto: UpdateRatingMangaDto, userId: number) {
    const findRating = await this.repository.findOne({
      where: {
        manga: {
          id: updateRatingMangaDto.mangaId,
          rating: updateRatingMangaDto.rating,
        },
      },
    });
    if (findRating) {
      await this.repository.update(findRating.id, {
        rating: updateRatingMangaDto.rating,
        manga: { id: updateRatingMangaDto.mangaId },
        user: { id: userId },
      });
      return await this.repository.findOne({ where: { id: findRating.id } });
    }
    return 'Вы не можете обновить рейтинг';
  }

  async count(id: number) {
    const qb = this.repository.createQueryBuilder().where({ manga: { id } });
    return await qb.getCount();
  }

  remove(id: number) {
    return `This action removes a #${id} ratingManga`;
  }
}
