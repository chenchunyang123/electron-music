import myAxios from './axiosConf';

type GetSingerListType = -1 | 1 | 2 | 3;
type GetSingerListArea = -1 | 7 | 96 | 8 | 16 | 0;
type GetSingerListInitial = -1 | 0 | string;
type ID = number | string;

export default {
  getSingerList(
    type: GetSingerListType,
    area: GetSingerListArea,
    initial: GetSingerListInitial,
    offset: number = 0,
    limit: number = 30,
  ) {
    return myAxios.get(
      `/artist/list?type=${type}&area=${area}&initial=${initial}&offset=${offset}&limit=${limit}`,
    );
  },
  getSingerTopSong(id: ID) {
    return myAxios.get(`/artist/top/song?id=${id}`);
  },
  getSingerAllSong(id: ID) {
    return myAxios.get(`/artist/songs?id=${id}`);
  },
  getSingerOneSong(id: ID) {
    return myAxios.get(`/artists?id=${id}`);
  },
  getSingerMv(id: ID, limit: number = 30, offset: number = 0) {
    return myAxios.get(`/artist/mv?id=${id}&limit=${limit}&offset=${offset}`);
  },
  getSingerAlbum(id: ID, limit: number = 50, offset: number = 0) {
    return myAxios.get(
      `/artist/album?id=${id}&limit=${limit}&offset=${offset}`,
    );
  },
  getSingerDesc(id: ID) {
    return myAxios.get(`/artist/desc?id=${id}`);
  },
  getSimilarSinger(id: ID) {
    return myAxios.get(`/simi/artist?id=${id}`);
  },
  getAlbumDetail(id: ID) {
    return myAxios.get(`/album?id=${id}`);
  },
  getAlbumComments(id: ID) {
    return myAxios.get(`/comment/album?id=${id}`);
  },
};
