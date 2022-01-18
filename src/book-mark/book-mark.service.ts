import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookMarkDto } from './dto/create-book-mark.dto';
import { UpdateBookMarkDto } from './dto/update-book-mark.dto';
import { BookMarkEntity } from './entities/book-mark.entity';

@Injectable()
export class BookMarkService {
  constructor(
    @InjectRepository(BookMarkEntity)
    private repository: Repository<BookMarkEntity>,
  ) {}

  async create(createBookMarkDto: CreateBookMarkDto, userId: number) {
    const candidate = await this.repository.findOne({
      where: { manga: { id: createBookMarkDto.mangaId }, user: { id: userId } },
    });
    if (candidate && createBookMarkDto.category != 'Удалить из закладок') {
      return candidate;
    }
    if (createBookMarkDto.category == 'Удалить из закладок') {
      await this.repository.delete(candidate.id);
      return candidate;
    }
    return this.repository.create({
      ...createBookMarkDto,
      user: { id: userId },
    });
  }

  findAll() {
    return this.repository.find();
  }

  getAllMarksForUser(id: number) {
    return this.repository.find({ where: { user: { id } } });
  }
  getMarkForManga(id: number, userId: number) {
    return this.repository.find({ where: { id, user: { id: userId } } });
  }

  async update(
    id: number,
    updateBookMarkDto: UpdateBookMarkDto,
    userId: number,
  ) {
    await this.repository.update(id, {
      category: updateBookMarkDto.category,
      user: { id: userId },
      manga: { id: updateBookMarkDto.mangaId },
    });
    return this.repository.findOne({
      where: { manga: { id: updateBookMarkDto.mangaId }, user: { id: userId } },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} bookMark`;
  }
}
