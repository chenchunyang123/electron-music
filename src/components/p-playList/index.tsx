import React from 'react';
import styles from './index.less';
import { connect, IAllModelState, ConnectProps } from 'umi';

import SongItem from './songItem';

interface IPlayListProps {
  visible: boolean;
  all: IAllModelState;
}

const PlayList: React.FC<IPlayListProps> = ({ visible, all }) => {
  const { playList } = all;
  return (
    <div className={styles.pl_wrap} style={{ right: visible ? '0' : '-320px' }}>
      <div className={styles.pl_head}>
        <span>播放列表</span>
        <span>共{playList.length}首歌曲</span>
      </div>
      <div className={styles.pl_listWrap}>
        {playList.map((item, idx) => (
          <SongItem detail={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default connect(({ all }: { all: IAllModelState }) => ({
  all,
}))(PlayList);
