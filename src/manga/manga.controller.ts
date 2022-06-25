import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Inject,
  forwardRef,
  Query,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/decorators/user.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SearchMangaDto } from './dto/search-manga.dto';

@Controller('mangas')
export class MangaController {
  constructor(
    private readonly mangaService: MangaService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
  ) {}

  @Get('search')
  searchManga(@Query() dto: SearchMangaDto) {
    return this.mangaService.search(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('mangaCover'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMangaDto: CreateMangaDto,
    @User() userId: number,
  ) {
    const newManga = await this.mangaService.create(createMangaDto, userId);
    await this.cloudinary.uploadMangaCover(file, newManga.id);
    return this.mangaService.findOne(newManga.id);
  }

  @Get()
  findAll() {
    return this.mangaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(+id, updateMangaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangaService.remove(+id);
  }
}
