import React from 'react';
import styles from './index.less';

import SongItem from './songItem';

export default (props: { visible: boolean }) => {
  const { visible } = props;
  return (
    <div className={styles.pl_wrap} style={{ right: visible ? '0' : '-320px' }}>
      <div className={styles.pl_head}>
        <span>播放列表</span>
        <span>共10首歌曲</span>
      </div>
      <div className={styles.pl_listWrap}>
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
      </div>
    </div>
  );
};
