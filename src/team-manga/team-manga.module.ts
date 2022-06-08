import { Module } from '@nestjs/common';
import { TeamMangaService } from './team-manga.service';
import { TeamMangaEntity } from './entities/team-manga.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMangaEntity])],
  providers: [TeamMangaService],
  exports: [TeamMangaService],
})
export class TeamMangaModule {}
