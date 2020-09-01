import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { IRouteComponentProps } from 'umi';

import { apiMv } from '@/api';

interface IQuery {
  id: number;
}

interface IMvDetail {
  name?: string;
  artistName?: string;
  playCount?: number;
  publishTime?: string;
  [propsName: string]: any;
}

export default ({ location }: IRouteComponentProps) => {
  const { id } = location.query as IQuery;
  const [videoUrl, setUrl] = useState('');
  const [mvDetail, setDetail] = useState<IMvDetail>({});

  useEffect(() => {
    apiMv.getMvUrl(id).then(res => {
      const {
        data: { url },
      } = res.data;
      setUrl(url);
    });
    apiMv.getMvDetail(id).then(res => {
      const { data } = res.data;
      setDetail(data);
    });
  }, []);

  return (
    <div className={styles.md_wrap}>
      <div className={styles.md_mvBox}>
        <video
          src={videoUrl}
          autoPlay
          controls
          controlsList="nodownload"
        ></video>
      </div>
      <div className={styles.md_des}>
        <h2>{mvDetail?.name}</h2>
        <div>
          <span>演唱:</span>
          <span>{mvDetail?.artistName}</span>
          <span>{((mvDetail?.playCount || 0) / 10000).toFixed(1)}万次观看</span>
          <span>发布时间：{mvDetail?.publishTime}</span>
        </div>
      </div>
    </div>
  );
};
