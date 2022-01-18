import { Module } from '@nestjs/common';
import { TeamMangaService } from './team-manga.service';
import { ConfigModule } from '@nestjs/config';
import { TeamMangaEntity } from './entities/team-manga.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([TeamMangaEntity]),
  ],
  providers: [TeamMangaService],
  exports: [TeamMangaService],
})
export class TeamMangaModule {}
