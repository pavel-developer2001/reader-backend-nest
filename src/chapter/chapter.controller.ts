import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/decorators/user.decorator';
import { ImagesChapterService } from 'src/images-chapter/images-chapter.service';
import { TeamChapterService } from 'src/team-chapter/team-chapter.service';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Controller('chapters')
export class ChapterController {
  constructor(
    private readonly chapterService: ChapterService,
    private readonly imagesChapterService: ImagesChapterService,
    private readonly teamChapterService: TeamChapterService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('addChapter')
  @UseInterceptors(FilesInterceptor('imagesList'))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createChapterDto: CreateChapterDto,
    @User() userId: number,
  ) {
    const chapter = await this.chapterService.create(createChapterDto, userId);
    await files.map((file) =>
      this.cloudinary.uploadChapterImages(
        file,
        chapter.id,
        chapter.mangaId,
        userId,
      ),
    );
    await this.teamChapterService.addChapterForTeam(
      chapter.id,
      chapter.mangaId,
      createChapterDto.teamId,
    );
    return chapter;
  }

  @Get()
  findAll() {
    return this.chapterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterService.findOne(+id);
  }
  @Get('images/:id')
  getAllImagesForChapter(@Param('id') id: string) {
    return this.imagesChapterService.getImages(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterService.remove(+id);
  }
}
