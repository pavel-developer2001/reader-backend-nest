import { Length } from 'class-validator';

export class CreateChapterDto {
  numberChapter: string;

  volumeChapter: string;

  titleChapter?: string;

  language: string;

  mangaId: number;

  teamId?: number;
}
