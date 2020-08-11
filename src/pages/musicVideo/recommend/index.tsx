import React, { useState, useEffect } from 'react';
import styles from './index.less';

import PBanner from '@/components/p-banner';
import VWrap from '@/components/v-wrap';
import { apiMv } from '@/api';

export default () => {
  const [newMv, setNewList] = useState([]); // 新mv
  const [neteaseMv, setNeteaseList] = useState([]); // 网易出品mv

  useEffect(() => {
    apiMv.getNewMv().then(res => {
      const { data } = res;
      setNewList(data.data);
    });
    apiMv.getNeteaseMv().then(res => {
      const { data } = res;
      setNeteaseList(data.data);
    });
  }, []);

  return (
    <>
      <PBanner />
      <VWrap title="最新" list={newMv} />
      <VWrap title="网易出品" list={neteaseMv} />
    </>
  );
};
