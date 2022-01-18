import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private repository: Repository<TagEntity>,
  ) {}
  async create(name: any) {
    const find = await this.repository.find({ where: { name: name.name } });
    if (find.length > 0) {
      throw new HttpException('Такой тег уже создан', HttpStatus.FORBIDDEN);
    }
    return this.repository.save({ name: name.name });
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  async findOrCreate(name: string) {
    const category = await this.repository.find({ where: { name } });
    if (category.length > 0) {
      return category[0];
    }
    return this.repository.create({ name });
  }
}
