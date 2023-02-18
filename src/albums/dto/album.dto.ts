export class AlbumDTO {
  id: number;
  title: string;
  remark: string;
}

export class CreateAlbumDTO extends AlbumDTO {};
export class UpdateAlbumDTO {
  title: string;
  remark: string;
};