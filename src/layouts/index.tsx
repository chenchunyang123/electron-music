import React, { useState, useEffect, useRef } from 'react';
import {
  IRouteComponentProps,
  ConnectProps,
  IAllModelState,
  connect,
} from 'umi';
import styles from './index.less';

import PMenu from '@/components/p-menu';
import PNavbar from '@/components/p-navbar';
import PPlaybar from '@/components/p-playbar';
import PPlayList from '@/components/p-playList';
import PMusicMain from '@/components/p-musicMain';

interface ILayoutProps extends IRouteComponentProps {
  dispatch: ConnectProps['dispatch'];
  all: IAllModelState;
}

const Layout: React.FC<ILayoutProps> = ({
  children,
  location,
  route,
  history,
  match,
  dispatch,
  all,
}) => {
  const [playListVisible, setPlVisible] = useState(false); // 当前播放列表侧边栏显隐
  const [musicMainVisible, setMmVisible] = useState(false); // 播放控制器主界面显隐
  const togglePlV = () => setPlVisible(!playListVisible);
  const closeMmV = () => setMmVisible(false);
  const openMmV = () => setMmVisible(true);
  const audioElement = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 得到一个全局的audio标签放到dva的state里面
    if (dispatch) {
      dispatch({
        type: 'all/setAudioElement',
        payload: audioElement.current,
      });
    }
  }, []);

  // 针对不同的路由用不同的模版
  if (location.pathname === '/mv/detail') {
    // mv详情
    return <>{children}</>;
  }

  return (
    <div className={styles.i_wrap}>
      {/* audio音乐播放 */}
      <audio src={all.nowMusicUrl} ref={audioElement}></audio>
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

export default connect(({ all }: { all: IAllModelState }) => ({
  all,
}))(Layout);
