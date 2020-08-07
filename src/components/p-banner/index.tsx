import React, { useState, useEffect } from 'react';
import styles from './index.less';

import Api from '@/api/index.ts';

export default () => {
  const [bannerList, setBanner] = useState([]);
  useEffect(() => {
    // Api.selected.getBanner().then(({ data }) => {
    // console.log(data.banners);
    // setBanner(data.banners);
    // });
  }, []);
  return <div className={styles.banner_wrap}></div>;
};
