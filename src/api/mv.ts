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
};
