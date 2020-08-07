import React from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './index.less';

import PTabs from '@/components/p-tabs';

const TABS_ARRAY = [
  { name: '精选', url: '/musichall/selected' },
  { name: '排行', url: '/musichall/ranking' },
  { name: '歌手', url: '/musichall/singer' },
  { name: '分类歌单', url: '/musichall/types' },
];

export default ({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) => {
  return (
    <div className={styles.musicHall_wrap}>
      <h1>音乐馆</h1>
      <PTabs list={TABS_ARRAY} />
      {children}
    </div>
  );
};
