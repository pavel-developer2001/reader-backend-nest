import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamInvitationDto } from './create-team-invitation.dto';

export class UpdateTeamInvitationDto extends PartialType(CreateTeamInvitationDto) {}
