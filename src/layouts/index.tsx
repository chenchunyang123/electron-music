import React, { useState } from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './index.less';

import PMenu from '@/components/p-menu';
import PNavbar from '@/components/p-navbar';
import PPlaybar from '@/components/p-playbar';
import PPlayList from '@/components/p-playList';
import PMusicMain from '@/components/p-musicMain';

export default ({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) => {
  const [playListVisible, setPlVisible] = useState(false); // 当前播放列表侧边栏显隐
  const [musicMainVisible, setMmVisible] = useState(true); // 播放控制器主界面显隐
  const togglePlV = () => setPlVisible(!playListVisible);
  const closeMmV = () => setMmVisible(false);
  const openMmV = () => setMmVisible(true);

  // 针对不同的路由用不同的模版
  if (location.pathname === '/mv/detail') {
    // mv详情
    return <>{children}</>;
  }

  return (
    <div className={styles.i_wrap}>
      <PMenu />
      <div className={styles.i_container}>
        <PNavbar history={history} />
        <div className={styles.i_inner}>{children}</div>
        <PPlayList visible={playListVisible} />
        <PPlaybar togglePlVisible={togglePlV} openMmV={openMmV} />
        <PMusicMain
          togglePlVisible={togglePlV}
          visible={musicMainVisible}
          close={closeMmV}
        />
      </div>
    </div>
  );
};
