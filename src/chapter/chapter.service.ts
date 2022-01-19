import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChapterEntity } from './entities/chapter.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(ChapterEntity)
    private repository: Repository<ChapterEntity>,
  ) {}

  async create(createChapterDto: CreateChapterDto, userId: number) {
    try {
      return await this.repository.save({
        ...createChapterDto,
        user: { id: userId },
        manga: { id: createChapterDto.mangaId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.repository.find({
      where: { manga: { id } },
      order: {
        id: 'DESC',
      },
    });
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
