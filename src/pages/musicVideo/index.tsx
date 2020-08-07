import React from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './index.less';

import PTabs from '@/components/p-tabs';

const TABS_ARRAY = [
  { name: '推荐', url: '/musicvideo/recommend' },
  { name: '排行榜', url: '/musicvideo/ranking' },
  { name: '视频库', url: '/musicvideo/library' },
];

export default ({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) => {
  return (
    <div className={styles.musicVideo_wrap}>
      <h1>视频</h1>
      <PTabs list={TABS_ARRAY} />
      {children}
    </div>
  );
};
