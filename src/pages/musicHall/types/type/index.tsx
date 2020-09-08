import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { IRouteComponentProps } from 'umi';

import { apiMusic } from '@/api';
import PMusic from '@/components/p-music';

export default (props: IRouteComponentProps) => {
  const { type } = props.match.params as { type: string };
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    const params = { cat: type };
    apiMusic.getPlayList(params).then(res => {
      const { data } = res;
      setSongList(data.playlists);
    });
  }, []);

  return (
    <div className={styles.tt_wrap}>
      <h2>{type}</h2>
      <div className={styles.tt_container}>
        {songList.map((item, idx) => (
          <PMusic key={idx} detail={item} />
        ))}
      </div>
    </div>
  );
};
