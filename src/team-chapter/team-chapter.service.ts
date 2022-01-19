import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamChapterDto } from './dto/create-team-chapter.dto';
import { UpdateTeamChapterDto } from './dto/update-team-chapter.dto';
import { TeamChapterEntity } from './entities/team-chapter.entity';

@Injectable()
export class TeamChapterService {
  constructor(
    @InjectRepository(TeamChapterEntity)
    private repository: Repository<TeamChapterEntity>,
  ) {}
  create(createTeamChapterDto: CreateTeamChapterDto) {
    return 'This action adds a new teamChapter';
  }

  async addChapterForTeam(chapterId: number, mangaId: number, teamId: number) {
    const candidate = await this.repository.findOne({
      where: {
        chapter: { id: chapterId },
        manga: { id: mangaId },
        team: { id: teamId },
      },
    });
    if (candidate) {
      throw new HttpException(
        'Данная глава этой командой уже добавлена!',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.repository.save({
      chapter: { id: chapterId },
      manga: { id: mangaId },
      team: { id: teamId },
    });
  }

  findAll() {
    return `This action returns all teamChapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamChapter`;
  }

  update(id: number, updateTeamChapterDto: UpdateTeamChapterDto) {
    return `This action updates a #${id} teamChapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamChapter`;
  }
}
