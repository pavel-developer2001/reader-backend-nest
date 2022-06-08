import { Module } from '@nestjs/common';
import { TeamChapterService } from './team-chapter.service';
import { TeamChapterEntity } from './entities/team-chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeamChapterEntity])],
  providers: [TeamChapterService],
  exports: [TeamChapterService],
})
export class TeamChapterModule {}
