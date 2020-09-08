import myAxios from './axiosConf';

type GetSingerListType = -1 | 1 | 2 | 3;
type GetSingerListArea = -1 | 7 | 96 | 8 | 16 | 0;
type GetSingerListInitial = -1 | 0 | string;
type ID = number | string;
type GetNewSongType = 0 | 7 | 8 | 16 | 96;

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
  getMusicUrl(id: ID) {
    return myAxios.get(`/song/url?id=${id}`);
  },
  getMusicDetail(id: ID) {
    return myAxios.get(`/song/detail?ids=${id}`);
  },
  getMusicLyric(id: ID) {
    return myAxios.get(`/lyric?id=${id}`);
  },
  getMusicBanner() {
    return myAxios.get(`/banner?type=0`);
  },
  getRecommendPlayList(limit: number = 30) {
    return myAxios.get(`/personalized?limit=${limit}`);
  },
  getNewSongList(type: GetNewSongType) {
    return myAxios.get(`/top/song?type=${type}`);
  },
  getAllRankingList() {
    return myAxios.get('/toplist');
  },
  getPlayListDetail(id: ID) {
    return myAxios.get(`/playlist/detail?id=${id}`);
  },
  getPlayListComments(id: ID) {
    return myAxios.get(`/comment/playlist?id=${id}`);
  },
  getPlayListAllTypes() {
    return myAxios.get(`/playlist/catlist`);
  },
  getPlayListHotTypes() {
    return myAxios.get(`/playlist/hot`);
  },
  getPlayList(params: {
    cat?: string;
    limit?: number;
    offset?: number;
    order?: 'new' | 'hot';
  }) {
    const { cat = '全部', limit = 12, offset = 1, order = 'hot' } = params;
    return myAxios.get(
      `/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}&order=${order}`,
    );
  },
};
