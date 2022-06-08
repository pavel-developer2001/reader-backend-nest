import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberEntity } from './entities/team-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMemberEntity]),
  ],
  providers: [TeamMemberService],
  exports: [TeamMemberService],
})
export class TeamMemberModule {}
