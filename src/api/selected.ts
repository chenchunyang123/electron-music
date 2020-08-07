import myAxios from './axiosConf';

export default {
  getBanner() {
    return myAxios.get('/banner?type=2');
  },
};
