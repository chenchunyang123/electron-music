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

  // 重定向
  useEffect(() => {
    if (location.pathname === '/') {
      history.replace('/musichall/selected');
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/mv/detail') {
      return;
    }
    const dom = audioElement.current as HTMLAudioElement;
    // 得到一个全局的audio标签放到dva的state里面
    if (dispatch) {
      dispatch({
        type: 'all/setAudioElement',
        payload: dom,
      });
      // 绑定监听音乐播放的方法
      dom.addEventListener('timeupdate', () => {
        // 因为1s内会触发多次，影响性能，这里后面需要优化
        dispatch({
          type: 'all/setNowMusicTime',
          payload: dom.currentTime,
        });
      });
      // 绑定监听音乐结束的方法
      dom.addEventListener('ended', () => {
        dispatch({
          type: 'all/nextSong',
          payload: true,
        });
      });
    } else {
      console.error('dispatch没传入layout');
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
