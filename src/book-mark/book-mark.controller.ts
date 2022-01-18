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
import { BookMarkService } from './book-mark.service';
import { CreateBookMarkDto } from './dto/create-book-mark.dto';
import { UpdateBookMarkDto } from './dto/update-book-mark.dto';

@Controller('marks')
export class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(@Body() createBookMarkDto: CreateBookMarkDto, @User() userId: number) {
    return this.bookMarkService.create(createBookMarkDto, userId);
  }

  @Get()
  findAll() {
    return this.bookMarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookMarkService.getAllMarksForUser(+id);
  }

  @Get('manga/:id')
  getBookMarkForManga(@Param('id') id: string, @User() userId: number) {
    return this.bookMarkService.getMarkForManga(+id, userId);
  }

  @Patch('change/:id')
  update(
    @Param('id') id: string,
    @Body() updateBookMarkDto: UpdateBookMarkDto,
    @User() userId: number,
  ) {
    return this.bookMarkService.update(+id, updateBookMarkDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookMarkService.remove(+id);
  }
}
