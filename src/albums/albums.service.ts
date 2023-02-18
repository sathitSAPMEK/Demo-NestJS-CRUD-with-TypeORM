import { AlbumDTO, CreateAlbumDTO, UpdateAlbumDTO } from './dto/album.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Album } from './entities/albums.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async createAlbum(createAlbumDTO: CreateAlbumDTO): Promise<AlbumDTO> {
    console.log(createAlbumDTO);
    const album = new Album();
    album.title = createAlbumDTO.title;
    album.remark = createAlbumDTO.remark;
    return this.albumRepository.save(album);
  }

  async updateAlbum(
    albumId: string,
    updateAlbumDTO: UpdateAlbumDTO,
  ): Promise<UpdateResult> {
    return this.albumRepository.update(albumId, updateAlbumDTO);
  }

  async getAlbumById(id: number): Promise<AlbumDTO | null> {
    return this.albumRepository.findOne({ where: { id: id } });
  }

  async getAlbums(): Promise<AlbumDTO[]> {
    return this.albumRepository.find();
  }

  async deleteAlbum(id: number): Promise<DeleteResult> {
    return this.albumRepository.delete(id);
  }
}
