import { Length } from 'class-validator';

export class CreateChapterDto {
  @Length(3, 255)
  numberChapter: string;

  @Length(3, 255)
  volumeChapter: string;

  @Length(3, 255)
  titleChapter: string;

  @Length(3, 255)
  language: string;

  mangaId: number;

  teamId?: number;
}
