import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { connect, IAllModelState, ConnectProps } from 'umi';

import { formatSecToMin } from '@/utils';

interface ISongItemProps {
  all: IAllModelState;
  dispatch: ConnectProps['dispatch'];
  detail: any;
}

const active = false;

const SongItem: React.FC<ISongItemProps> = ({ detail, dispatch, all }) => {
  const playClickSong = () => {
    dispatch &&
      dispatch({
        type: 'all/getMusicAllDetailsAndPlay',
        payload: detail.id,
      });
  };

  return (
    <div
      className={classnames(styles.si_wrap, {
        [styles.si_active]: all.nowMusicId === detail.id ? true : false,
      })}
      onDoubleClick={playClickSong}
    >
      <img src={detail.al.picUrl} alt="" />
      <div className={styles.si_names}>
        <span>{detail.name}</span>
        <span>{detail.ar.map(artist => artist.name).join(' / ')}</span>
      </div>
      <span>{formatSecToMin(detail.dt ? detail.dt / 1000 : 0)}</span>
    </div>
  );
};

export default connect(({ all }: { all: IAllModelState }) => ({
  all,
}))(SongItem);
