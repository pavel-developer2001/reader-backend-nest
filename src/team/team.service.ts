import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamChapterEntity } from 'src/team-chapter/entities/team-chapter.entity';
import { TeamMangaEntity } from 'src/team-manga/entities/team-manga.entity';
import { TeamMemberEntity } from 'src/team-member/entities/team-member.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamEntity } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private repository: Repository<TeamEntity>,
    @InjectRepository(TeamMemberEntity)
    private teamMemberRepository: Repository<TeamMemberEntity>,
    @InjectRepository(TeamMangaEntity)
    private teamMangaRepository: Repository<TeamMangaEntity>,
    @InjectRepository(TeamChapterEntity)
    private teamChapterRepository: Repository<TeamChapterEntity>,
  ) {}

  create(createTeamDto: CreateTeamDto, userId: number) {
    return this.repository.save({ ...createTeamDto, user: { id: userId } });
  }
  async addTeamCover(teamCover: string, id: number) {
    try {
      if (!teamCover) {
        return null;
      }
      await this.repository.update(id, { teamCover });
      return await this.repository.findOne({ where: { id } });
    } catch (error) {
      console.error('error', error);
    }
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const team = await this.repository.findOne({ where: { id } });
    const members = await this.teamMemberRepository.find({
      where: { team: { id: team.id } },
    });
    const mangas = await this.teamMangaRepository.find({
      where: { team: { id: team.id } },
    });
    const chapters = await this.teamChapterRepository.find({
      where: { team: { id: team.id } },
    });
    return { team, members, mangas, chapters };
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
