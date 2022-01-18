import { Module } from '@nestjs/common';
import { TeamChapterService } from './team-chapter.service';
import { ConfigModule } from '@nestjs/config';
import { TeamChapterEntity } from './entities/team-chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([TeamChapterEntity]),
  ],
  providers: [TeamChapterService],
  exports: [TeamChapterService],
})
export class TeamChapterModule {}
