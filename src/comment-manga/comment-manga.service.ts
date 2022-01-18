import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentMangaDto } from './dto/create-comment-manga.dto';
import { UpdateCommentMangaDto } from './dto/update-comment-manga.dto';
import { CommentMangaEntity } from './entities/comment-manga.entity';

@Injectable()
export class CommentMangaService {
  constructor(
    @InjectRepository(CommentMangaEntity)
    private repository: Repository<CommentMangaEntity>,
  ) {}

  create(createCommentMangaDto: CreateCommentMangaDto, userId: number) {
    return this.repository.create({
      ...createCommentMangaDto,
      user: { id: userId },
    });
  }

  findAll() {
    return `This action returns all commentManga`;
  }

  getCommentsForManga(id: number) {
    return this.repository.find({ where: { manga: { id } } });
  }

  async update(id: number, updateCommentMangaDto: UpdateCommentMangaDto) {
    await this.repository.update(id, {
      commentText: updateCommentMangaDto.commentText,
      spoiler: updateCommentMangaDto.spoiler,
    });
    return this.repository.findOne({ where: { id } });
  }

  async remove(id: number, userId: number) {
    const comment = await this.repository.findOne({ where: { id } });
    if (!comment) {
      throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
    }
    if (comment.user.id !== userId) {
      throw new HttpException(
        'Вы не можете удалить эту статью',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.repository.delete(id);
    return comment;
  }
}
