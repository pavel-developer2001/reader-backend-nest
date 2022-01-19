import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private repository: Repository<GenreEntity>,
  ) {}
  async create(name: any) {
    const find = await this.repository.find({ where: { name: name.name } });
    if (find.length > 0) {
      throw new HttpException('Такой жанр уже создан', HttpStatus.FORBIDDEN);
    }
    return this.repository.save({ name: name.name });
  }

  findAll() {
    return `This action returns all genre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }

  async findOrCreate(name: string) {
    const category = await this.repository.find({ where: { name } });
    if (category.length > 0) {
      return category[0];
    }
    return this.repository.save({ name });
  }
}
