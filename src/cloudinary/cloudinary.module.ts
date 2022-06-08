import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImagesChapterModule } from 'src/images-chapter/images-chapter.module';
import { MangaModule } from 'src/manga/manga.module';
import { TeamModule } from 'src/team/team.module';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => MangaModule),
    forwardRef(() => TeamModule),
    ImagesChapterModule,
  ],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
