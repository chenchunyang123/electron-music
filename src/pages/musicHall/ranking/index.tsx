import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { AxiosResponse } from 'axios';

import BigBox from './bigBox';
import SmallBox from './smallBox';
import { apiMusic } from '@/api';

type songsList = Array<{ name: string }>;

export interface IOfficial {
  id: number;
  coverImgUrl: string;
  name: string;
  songs: songsList;
}

export type IGlobal = IOfficial;

export default () => {
  const [officialList, setOfficial] = useState<Array<IOfficial>>([]);
  const [globalList, setGlobal] = useState<Array<IGlobal>>([]);

  useEffect(() => {
    apiMusic.getAllRankingList().then(res => {
      let list: Array<IOfficial> = res.data.list;
      // 存所有榜单的歌曲的promise
      const allPlayListPromise = list.map(item =>
        apiMusic.getPlayListDetail(item.id),
      );
      // 发请求获得每个歌单的歌曲信息
      Promise.all(allPlayListPromise).then(
        (
          resArr: AxiosResponse<{
            playlist: { id: number; tracks: songsList };
          }>[],
        ) => {
          // 给list添加个songs字段
          list.forEach(
            item =>
              (item.songs =
                resArr.find(
                  resArrItem => resArrItem.data.playlist.id === item.id,
                )?.data.playlist.tracks || []),
          );
          // 官方榜单与全球榜单划分
          const official = list.slice(0, 4);
          const global = list.slice(4);
          // 写入官方榜单
          setOfficial(official);
          // 写入全球榜单
          setGlobal(global);
        },
      );
    });
  }, []);

  return (
    <div className={styles.mr_wrap}>
      <div className={styles.mr_top}>
        <div className={styles.mr_Title}>官方榜</div>
        <div className={styles.mr_topContainer}>
          {officialList.map(item => (
            <BigBox key={item.id} detail={item} />
          ))}
        </div>
      </div>
      <div className={styles.mr_bottom}>
        <div className={styles.mr_Title}>全球榜</div>
        <div className={styles.mr_bottomContainer}>
          {globalList.map(item => (
            <SmallBox key={item.id} detail={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
