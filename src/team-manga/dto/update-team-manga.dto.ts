import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMangaDto } from './create-team-manga.dto';

export class UpdateTeamMangaDto extends PartialType(CreateTeamMangaDto) {}
