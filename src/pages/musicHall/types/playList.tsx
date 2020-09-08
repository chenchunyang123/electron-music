import React, { useEffect, useState } from 'react';
import styles from './index.less';

import PMusic from '@/components/p-music';
import { apiMusic } from '@/api';

export default () => {
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    const params = {};
    apiMusic.getPlayList(params).then(res => {
      const { data } = res;
      setSongList(data.playlists);
    });
  }, []);

  return (
    <div className={styles.pl_wrap}>
      {songList.map((item, idx) => (
        <PMusic key={idx} detail={item} />
      ))}
    </div>
  );
};
