import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CommentMangaService } from './comment-manga.service';
import { CreateCommentMangaDto } from './dto/create-comment-manga.dto';
import { UpdateCommentMangaDto } from './dto/update-comment-manga.dto';

@Controller('comments')
export class CommentMangaController {
  constructor(private readonly commentMangaService: CommentMangaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(
    @Body() createCommentMangaDto: CreateCommentMangaDto,
    @User() userId: number,
  ) {
    return this.commentMangaService.create(createCommentMangaDto, userId);
  }

  @Get()
  findAll() {
    return this.commentMangaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentMangaService.getCommentsForManga(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCommentMangaDto: UpdateCommentMangaDto,
  ) {
    return this.commentMangaService.update(+id, updateCommentMangaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() userId: number) {
    return this.commentMangaService.remove(+id, userId);
  }
}
