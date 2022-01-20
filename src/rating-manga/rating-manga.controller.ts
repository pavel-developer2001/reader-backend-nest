import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RatingMangaService } from './rating-manga.service';
import { CreateRatingMangaDto } from './dto/create-rating-manga.dto';
import { UpdateRatingMangaDto } from './dto/update-rating-manga.dto';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('rating')
export class RatingMangaController {
  constructor(private readonly ratingMangaService: RatingMangaService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() userId: number) {
    return this.ratingMangaService.findOne(+id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(
    @Body() createRatingMangaDto: CreateRatingMangaDto,
    @User() userId: number,
  ) {
    return this.ratingMangaService.create(createRatingMangaDto, userId);
  }

  @Get()
  findAll() {
    return this.ratingMangaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  update(
    @Body() updateRatingMangaDto: UpdateRatingMangaDto,
    @User() userId: number,
  ) {
    return this.ratingMangaService.update(updateRatingMangaDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingMangaService.remove(+id);
  }
}
