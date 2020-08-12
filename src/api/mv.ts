import myAxios from './axiosConf';

export default {
  getRecommendMv() {
    return myAxios.get('/personalized/mv');
  },
  getNewMv() {
    return myAxios.get('/mv/first?limit=10');
  },
  getNeteaseMv() {
    return myAxios.get('/mv/exclusive/rcmd?limit=10');
  },
  getMvUrl(id: number) {
    return myAxios.get(`/mv/url?id=${id}`);
  },
  getMvDetail(id: number) {
    return myAxios.get(`/mv/detail?mvid=${id}`);
  },
  getMvRanking(area: '内地' | '港台' | '欧美' | '日本' | '韩国' | '总榜') {
    return myAxios.get(`/top/mv?limit=20&area=${area === '总榜' ? '' : area}`);
  },
  getAllMv(
    area: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国',
    type: '全部' | '官方版' | '原生' | '现场版' | '网易出品',
    order: '上升最快' | '最热' | '最新',
    offset: number,
    limit = 30,
  ) {
    return myAxios.get(
      `/mv/all?area=${area === '全部' ? '' : area}&type=${
        type === '全部' ? '' : type
      }&order=${
        order === '上升最快' ? '' : order
      }&limit=${limit}&offset=${offset}`,
    );
  },
};
