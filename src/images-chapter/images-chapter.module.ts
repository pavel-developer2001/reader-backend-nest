import { Module } from '@nestjs/common';
import { ImagesChapterService } from './images-chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesChapterEntity } from './entities/images-chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesChapterEntity])],
  providers: [ImagesChapterService],
  exports: [ImagesChapterService],
})
export class ImagesChapterModule {}
