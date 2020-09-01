import React, { useState, useEffect } from 'react';
import styles from './index.less';

import VWrap from '@/components/v-wrap';
import { apiMv } from '@/api';

export default () => {
  const [newMv, setNewList] = useState([]); // 新mv
  const [hotMv, setHotList] = useState([]); // 热门mv
  const [neteaseMv, setNeteaseList] = useState([]); // 网易出品mv

  useEffect(() => {
    apiMv.getNewMv().then(res => {
      const { data } = res;
      setNewList(data.data);
    });
    apiMv.getMvRanking('总榜', 10).then(res => {
      const { data } = res;
      setHotList(data.data);
    });
    apiMv.getNeteaseMv().then(res => {
      const { data } = res;
      setNeteaseList(data.data);
    });
  }, []);

  return (
    <>
      <VWrap title="最新" list={newMv} type="mv" />
      <VWrap title="最热" list={hotMv} type="mv" />
      <VWrap title="网易出品" list={neteaseMv} type="mv" />
    </>
  );
};
