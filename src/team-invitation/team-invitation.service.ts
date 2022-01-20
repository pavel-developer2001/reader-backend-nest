import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamInvitationDto } from './dto/create-team-invitation.dto';
import { UpdateTeamInvitationDto } from './dto/update-team-invitation.dto';
import { TeamInvitationEntity } from './entities/team-invitation.entity';

@Injectable()
export class TeamInvitationService {
  constructor(
    @InjectRepository(TeamInvitationEntity)
    private repository: Repository<TeamInvitationEntity>,
  ) {}
  async create(createTeamInvitationDto: CreateTeamInvitationDto) {
    const candidate = await this.repository.findOne({
      where: {
        rank: createTeamInvitationDto.rank,
        user: { id: createTeamInvitationDto.userId },
        team: { id: createTeamInvitationDto.teamId },
      },
    });
    if (candidate) {
      throw new HttpException(
        'Данное приглашенние уже существует!',
        HttpStatus.FORBIDDEN,
      );
    }
    const addInvitation = await this.repository.save({
      rank: createTeamInvitationDto.rank,
      team: { id: createTeamInvitationDto.teamId },
      user: { id: createTeamInvitationDto.userId },
    });
    return this.repository.findOne({ where: { id: addInvitation.id } });
  }
  getInvitationsForUser(id: string) {
    return this.repository.find({ where: { user: { id } } });
  }
  async removeInvitation(id: number) {
    const invitation = await this.repository.findOne({ where: { id } });
    await this.repository.delete(invitation.id);
    return invitation;
  }

  findAll() {
    return `This action returns all teamInvitation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamInvitation`;
  }

  update(id: number, updateTeamInvitationDto: UpdateTeamInvitationDto) {
    return `This action updates a #${id} teamInvitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamInvitation`;
  }
}
