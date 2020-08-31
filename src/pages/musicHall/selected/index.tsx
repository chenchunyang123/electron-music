import React, { useEffect, useState } from 'react';
import styles from './index.less';

import PBanner, { IList } from '@/components/p-banner';
import { apiMusic } from '@/api/index.ts';

export default () => {
  const [bannerList, setBannerList] = useState<IList>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getMusicBanner();
      setBannerList(result.banners);
    };
    getData();
  }, []);

  const getMusicBanner = async () => {
    const result = await apiMusic.getMusicBanner();
    return result.data;
  };

  return (
    <div className={styles.sd_wrap}>
      <PBanner list={bannerList} />
      {/* 推荐歌单 */}
      {/* 推荐MV */}
      {/* 最新专辑 */}
    </div>
  );
};
