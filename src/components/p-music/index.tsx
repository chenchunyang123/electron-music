import React from 'react';
import styles from './index.less';
import { history } from 'umi';

interface IMusic {
  detail: {
    picUrl?: string;
    album?: {
      picUrl: string;
      publishTime: number;
    };
    coverImgUrl?: string;
    artists?: [{ name: string }];
    name: string;
    id: number;
  };
}

export default (props: IMusic) => {
  const {
    detail: { picUrl, name, album, artists, coverImgUrl, id },
  } = props;

  const handleJump = () => history.push(`/singlist/detail?id=${id}`);

  return (
    <div className={styles.pm_wrap}>
      <img
        src={picUrl || album?.picUrl || coverImgUrl}
        alt=""
        onClick={handleJump}
      />
      <div className={styles.pm_name}>{name}</div>
      <div>{artists?.map(item => item.name).join(' / ')}</div>
    </div>
  );
};
