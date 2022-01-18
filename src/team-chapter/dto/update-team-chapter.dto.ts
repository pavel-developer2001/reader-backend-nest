import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamChapterDto } from './create-team-chapter.dto';

export class UpdateTeamChapterDto extends PartialType(CreateTeamChapterDto) {}
