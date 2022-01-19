import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesChapterEntity } from './entities/images-chapter.entity';

@Injectable()
export class ImagesChapterService {
  constructor(
    @InjectRepository(ImagesChapterEntity)
    private repository: Repository<ImagesChapterEntity>,
  ) {}
  async create(
    imageChapter: string,
    chapterId: number,
    mangaId: number,
    userId: number,
  ) {
    return this.repository.save({
      imageChapter,
      user: { id: userId },
      manga: { id: mangaId },
      chapter: { id: chapterId },
    });
  }

  async getImages(id: string) {
    console.log('id', id);
    const images = await this.repository.find({
      where: { chapter: { id: id } },
    });
    console.log('sdvsa', images);
    return images;
  }

  findAll() {
    return `This action returns all imagesChapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagesChapter`;
  }

  update(id: number) {
    return `This action updates a #${id} imagesChapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagesChapter`;
  }
}
