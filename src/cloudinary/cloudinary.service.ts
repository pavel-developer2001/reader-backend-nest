import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { ImagesChapterService } from 'src/images-chapter/images-chapter.service';
import { MangaService } from 'src/manga/manga.service';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(forwardRef(() => MangaService))
    private mangaService: MangaService,
    @Inject(forwardRef(() => TeamService))
    private teamService: TeamService,
    private imagesChapterService: ImagesChapterService,
  ) {}
  async uploadMangaCover(file: Express.Multer.File, id: number): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.mangaService.addMangaCover(result.url, id);
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
  async uploadTeamCover(file: Express.Multer.File, id: number): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.teamService.addTeamCover(result.url, id)
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
  async uploadChapterImages(
    file: Express.Multer.File,
    chapterId: number,
    mangaId: number,
    userId: number,
  ): Promise<any> {
    try {
      if (!file) {
        return '';
      }
      v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            console.error('ERRRRRRRRRROOOOOOOOORR ', error);
          }
          this.imagesChapterService.create(
            result.url,
            chapterId,
            mangaId,
            userId,
          );
        })
        .end(file.buffer);
    } catch (error) {
      console.error(error);
    }
  }
}
