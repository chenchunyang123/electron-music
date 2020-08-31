import React, { useState, useEffect } from 'react';
import styles from './index.less';

import PBanner from '@/components/p-banner';
import VWrap from '@/components/v-wrap';
import { apiMv, apiMusic } from '@/api';

export default () => {
  const [recommendMv, setRecommendList] = useState([]); // 推荐mv
  const [newMv, setNewList] = useState([]); // 新mv
  const [neteaseMv, setNeteaseList] = useState([]); // 网易出品mv

  useEffect(() => {
    apiMv.getRecommendMv().then(res => {
      const { data } = res;
      setRecommendList(data.result);
    });
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
      <VWrap title="最新" list={newMv} />
      {/* 推荐放到音乐首页，改成最热 */}
      <VWrap title="推荐" list={recommendMv} />
      <VWrap title="网易出品" list={neteaseMv} />
    </>
  );
};
