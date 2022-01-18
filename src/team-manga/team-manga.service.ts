import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamMangaDto } from './dto/create-team-manga.dto';
import { UpdateTeamMangaDto } from './dto/update-team-manga.dto';
import { TeamMangaEntity } from './entities/team-manga.entity';

@Injectable()
export class TeamMangaService {
  constructor(
    @InjectRepository(TeamMangaEntity)
    private repository: Repository<TeamMangaEntity>,
  ) {}

  async create(createTeamMangaDto: CreateTeamMangaDto) {
    const candidate = await this.repository.findOne({
      where: {
        manga: { id: createTeamMangaDto.mangaId },
        team: { id: createTeamMangaDto.teamId },
      },
    });
    if (candidate) {
      throw new HttpException(
        'Данная манга уже переводистся этой командой!',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.repository.create({
      //@ts-ignore
      manga: { id: createTeamMangaDto.mangaId },
      team: { id: createTeamMangaDto.teamId },
    });
  }
  getTeamsForManga(id: string) {
    return this.repository.find({ where: { manga: { id } } });
  }

  findAll() {
    return `This action returns all teamManga`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamManga`;
  }

  update(id: number, updateTeamMangaDto: UpdateTeamMangaDto) {
    return `This action updates a #${id} teamManga`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamManga`;
  }
}
