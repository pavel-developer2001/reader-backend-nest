import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinToTeamDto } from './dto/join-to-team.dto';
import { TeamMemberEntity } from './entities/team-member.entity';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMemberEntity)
    private repository: Repository<TeamMemberEntity>,
  ) {}

  async getTeams(id: number) {
    try {
      const teams = await this.repository.find({ where: { user: { id } } });
      return teams;
    } catch (error) {
      console.log('EEEEEEEEERRRRRRRRROOOOOR', error);
    }
  }

  async joinToTeam(joinToTeamDto: JoinToTeamDto, userId: number) {
    const addMember = await this.repository.save({
      roleInTeam: joinToTeamDto.rank,
      user: { id: userId },
      team: { id: joinToTeamDto.teamId },
    });
    return this.repository.findOne({ where: { id: addMember.id } });
  }
  async removeMember(id: string) {
    const member = await this.repository.findOne({ where: { id } });
    await this.repository.delete(member.id);
    return member;
  }

  create() {
    return 'This action adds a new teamMember';
  }

  findAll() {
    return `This action returns all teamMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMember`;
  }

  update() {
    return `This action updates a #$ teamMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMember`;
  }
}
