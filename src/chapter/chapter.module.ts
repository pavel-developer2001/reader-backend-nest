import { forwardRef, Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { ConfigModule } from '@nestjs/config';
import { ChapterEntity } from './entities/chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TeamChapterModule } from 'src/team-chapter/team-chapter.module';
import { ImagesChapterModule } from 'src/images-chapter/images-chapter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([ChapterEntity]),
    forwardRef(() => CloudinaryModule),
    TeamChapterModule,
    ImagesChapterModule,
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {}
