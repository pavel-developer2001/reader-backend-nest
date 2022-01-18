import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreService } from 'src/genre/genre.service';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';
import { getConnection, Repository } from 'typeorm';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangaEntity } from './entities/manga.entity';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(MangaEntity)
    private repository: Repository<MangaEntity>,
    private tagService: TagService,
    private genreService: GenreService,
    private userService: UserService,
  ) {}

  async create(createMangaDto: CreateMangaDto, userId: number) {
    try {
      const connection = getConnection();
      if (createMangaDto.title.length === 0) {
        throw new HttpException(
          'Вы не ввели название манги!',
          HttpStatus.FORBIDDEN,
        );
      }
      const tags = [];
      for (const tag of createMangaDto.tags) {
        const savedTag = await this.tagService.findOrCreate(tag);
        tags.push(savedTag);
      }
      const genres = [];
      for (const genre of createMangaDto.genres) {
        const savedGenre = await this.genreService.findOrCreate(genre);
        genres.push(savedGenre);
      }
      const manga = new MangaEntity();
      manga.title = createMangaDto.title;
      manga.englishTitle = createMangaDto.englishTitle;
      manga.originalTitle = createMangaDto.originalTitle;
      manga.ageRatingManga = createMangaDto.ageRatingManga;
      manga.mangaDescription = createMangaDto.mangaDescription;
      manga.typeManga = createMangaDto.typeManga;
      manga.yearOfIssue = createMangaDto.yearOfIssue;
      manga.statusManga = createMangaDto.statusManga;
      manga.user = await this.userService.findById(userId);
      manga.tags = tags;
      manga.genres = genres;
      return await connection.manager.save(manga);
    } catch (error) {
      console.log(error);
    }
  }
  async addMangaCover(mangaCover: string, id: number) {
    try {
      if (!mangaCover) {
        return null;
      }
      await this.repository.update(id, { mangaCover });
      return await this.repository.findOne({ where: { id } });
    } catch (error) {
      console.error('error', error);
    }
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateMangaDto: UpdateMangaDto) {
    return `This action updates a #${id} manga`;
  }

  remove(id: number) {
    return `This action removes a #${id} manga`;
  }
}
