import React, { useEffect, useState } from 'react';
import styles from './index.less';

import PBanner, { IList } from '@/components/p-banner';
import VWrap from '@/components/v-wrap';
import PMusic from '@/components/p-music';
import { apiMusic, apiMv } from '@/api/index.ts';

export default () => {
  const [bannerList, setBannerList] = useState<IList>([]);
  const [recommendMv, setRecommendList] = useState([]); // 推荐mv
  const [recommendSongList, setSongList] = useState([]); // 推荐歌单
  const [newSongList, setNewList] = useState([]); // 新歌速递

  useEffect(() => {
    apiMusic.getMusicBanner().then(res => {
      const { data } = res;
      setBannerList(data.banners);
    });
    apiMv.getRecommendMv().then(res => {
      const { data } = res;
      setRecommendList(data.result);
    });
    apiMusic.getRecommendPlayList(29).then(res => {
      const { data } = res;
      setSongList(data.result);
    });
    apiMusic.getNewSongList(0).then(res => {
      const { data } = res;
      setNewList(data.data.slice(0, 20));
      console.log(data.data);
    });
  }, []);

  return (
    <div className={styles.sd_wrap}>
      <PBanner list={bannerList} />
      {/* 推荐歌单 */}
      <VWrap title="推荐歌单" list={recommendSongList} type="music" />
      {/* 推荐MV */}
      <VWrap title="推荐MV" list={recommendMv} type="mv" />
      {/* 最新专辑 */}
      <VWrap title="新歌速递" list={newSongList} type="music" />
    </div>
  );
};
