import { Length, IsOptional } from 'class-validator';

export class CreateMangaDto {
  @Length(3, 255)
  title: string;

  @Length(3)
  englishTitle: string;

  @Length(3, 255)
  originalTitle: string;

  @Length(3)
  mangaDescription: string;

  @Length(3, 255)
  typeManga: string;

  @Length(3)
  statusManga: string;

  @Length(3, 255)
  ageRatingManga: string;

  @Length(3)
  yearOfIssue: string;

  tags: [];

  genres: [];
}
