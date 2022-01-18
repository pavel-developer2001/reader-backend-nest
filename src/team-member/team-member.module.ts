import { Module } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { ConfigModule } from '@nestjs/config';
import { TeamMemberEntity } from './entities/team-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forFeature([TeamMemberEntity]),
  ],
  providers: [TeamMemberService],
  exports: [TeamMemberService],
})
export class TeamMemberModule {}
