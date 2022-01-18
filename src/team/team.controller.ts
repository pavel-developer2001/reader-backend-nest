import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/decorators/user.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TeamMemberService } from 'src/team-member/team-member.service';
import { TeamMangaService } from 'src/team-manga/team-manga.service';
import { CreateTeamMangaDto } from 'src/team-manga/dto/create-team-manga.dto';
import { TeamInvitationService } from 'src/team-invitation/team-invitation.service';
import { CreateTeamInvitationDto } from 'src/team-invitation/dto/create-team-invitation.dto';
import { JoinToTeamDto } from 'src/team-member/dto/join-to-team.dto';

@Controller('teams')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly teamMemberService: TeamMemberService,
    private readonly teamMangaService: TeamMangaService,
    private readonly teamInvitationService: TeamInvitationService,
    @Inject(forwardRef(() => CloudinaryService))
    private cloudinary: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @UseInterceptors(FileInterceptor('teamCover'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeamDto: CreateTeamDto,
    @User() userId: number,
  ) {
    const newTeam = this.teamService.create(createTeamDto, userId);
    await this.cloudinary.uploadTeamCover(file, newTeam.id);
    return this.teamService.findOne(newTeam.id);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Get('user/:id')
  getAllTeamForUser(@Param('id') id: string) {
    return this.teamMemberService.getTeams(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('manga/add')
  addMangaForTeam(@Body() createTeamMangaDto: CreateTeamMangaDto) {
    return this.teamMangaService.create(createTeamMangaDto);
  }

  @Get('manga/:id')
  getAllTeamsForManga(@Param('id') id: string) {
    return this.teamMangaService.getTeamsForManga(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invitation/add')
  invitationInTeamForUser(
    @Body() createTeamInvitationDto: CreateTeamInvitationDto,
    @User() userId: number,
  ) {
    return this.teamInvitationService.create(createTeamInvitationDto, userId);
  }

  @Get('invitation/user/:id')
  getAllInvitationsForUser(@Param('id') id: string) {
    return this.teamInvitationService.getInvitationsForUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invitation/user/join')
  async agreeToJoinInTeam(
    @Body() joinToTeamDto: JoinToTeamDto,
    @User() userId: number,
  ) {
    const newMember = await this.teamMemberService.joinToTeam(
      joinToTeamDto,
      userId,
    );
    const deleteInvitation = await this.teamInvitationService.removeInvitation(
      joinToTeamDto.invitationId,
    );
    return { newMember, deleteInvitation };
  }

  @Delete('invitation/user/refusal/:id')
  refusalToJoinTeam(@Param('id') id: number) {
    return this.teamInvitationService.removeInvitation(id);
  }

  @Delete('member/:id')
  removeMemberFromTeam(@Param('id') id: string) {
    return this.teamMemberService.removeMember(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
