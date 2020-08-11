import React, { useState, useEffect } from 'react';
import styles from './index.less';

import { apiMv } from '@/api/index.ts';

export default () => {
  const [bannerList, setBanner] = useState([]);
  useEffect(() => {
    apiMv.getRecommendMv().then(res => {
      const { data } = res;
      console.log('推荐mv—下面');
      console.log(data.result);
      setBanner(data.result);
    });
  }, []);

  return <div className={styles.banner_wrap}>123</div>;
};
