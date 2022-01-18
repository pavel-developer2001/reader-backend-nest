import { Module } from '@nestjs/common';
import { ImagesChapterService } from './images-chapter.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesChapterEntity } from './entities/images-chapter.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([ImagesChapterEntity]),
  ],
  providers: [ImagesChapterService],
  exports: [ImagesChapterService],
})
export class ImagesChapterModule {}
