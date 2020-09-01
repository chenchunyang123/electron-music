import React from 'react';
import styles from './index.less';

interface IMusic {
  detail: {
    picUrl?: string;
    album?: {
      picUrl: string;
      publishTime: number;
    };
    artists?: [{ name: string }];
    name: string;
  };
}

export default (props: IMusic) => {
  const {
    detail: { picUrl, name, album, artists },
  } = props;

  return (
    <div className={styles.pm_wrap}>
      <img src={picUrl || album?.picUrl} alt="" />
      <div className={styles.pm_name}>{name}</div>
      <div>{artists?.map(item => item.name).join(' / ')}</div>
    </div>
  );
};
