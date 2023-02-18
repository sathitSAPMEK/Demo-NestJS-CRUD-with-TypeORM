import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AlbumsService } from './albums.service';
import { AlbumDTO, UpdateAlbumDTO } from './dto/album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAlbums() {
    const albums = await this.albumsService.getAlbums();

    if (albums) {
      return {
        success: true,
        albums,
      };
    }

    throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
  }

  @Get(':albumId')
  async getAlbumById(@Param('albumId') albumId: number) {
    const albums = await this.albumsService.getAlbumById(albumId);

    if (albums) {
      return {
        success: true,
        albums,
      };
    }

    throw new HttpException('ALBUM_NOT_FOUND', HttpStatus.NOT_FOUND);
  }

  @Post()
  async createAlbum(@Body() albumDTO: AlbumDTO) {
    const albums = await this.albumsService.createAlbum(albumDTO);

    if (albums) {
      return {
        success: true,
        albums,
      };
    }

    throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
  }

  @Put(':albumId')
  async updateAlbum(
    @Param('albumId') albumId: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ) {
    const album = await this.albumsService.updateAlbum(albumId, updateAlbumDTO);

    if (album) {
      return {
        success: true,
        countUpdate: album.affected,
      };
    }

    throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
  }

  @Delete(':albumId')
  async deleteAlbum(@Param('albumId') albumId: number) {
    const album = await this.albumsService.deleteAlbum(albumId);

    if (album) {
      return {
        success: true,
        countDelete: album.affected,
      };
    }

    throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
  }
}
