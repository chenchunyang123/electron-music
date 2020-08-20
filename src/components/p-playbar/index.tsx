import React from 'react';
import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faList,
  faPlayCircle,
  faPauseCircle,
  faStepBackward,
  faStepForward,
  faRandom,
  faRedoAlt,
  faVolumeDown,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { connect, IAllModelState, ConnectProps } from 'umi';

import Progress from './progress';
import { formatSecToMin } from '@/utils';

interface IPlayBarProps {
  all: IAllModelState;
  togglePlVisible: () => void;
  classNames?: string;
  openMmV?: () => void;
  dispatch: ConnectProps['dispatch'];
}

const PlayBar: React.FC<IPlayBarProps> = ({
  togglePlVisible,
  classNames,
  openMmV,
  all,
  dispatch,
}) => {
  const { playing, nowMusicDetail, nowMusicTime } = all;
  return (
    <div className={classnames(styles.playbar_wrap, classNames)}>
      {/* 进度条 */}
      <Progress />
      {/* 信息展示 */}
      <div className={styles.playbar_content}>
        <div className={styles.playbar_contentLeft}>
          <img
            src={nowMusicDetail.al?.picUrl}
            alt=""
            onClick={openMmV ? openMmV : undefined}
          />
          <span>{nowMusicDetail?.name}</span>
          <span>&nbsp;-&nbsp;</span>
          <span>{nowMusicDetail.ar && nowMusicDetail.ar[0].name}</span>
        </div>
        <div className={styles.playbar_contentCenter}>
          <FontAwesomeIcon icon={faRandom} />
          <FontAwesomeIcon icon={faStepBackward} size="2x" />
          <FontAwesomeIcon
            icon={playing ? faPauseCircle : faPlayCircle}
            size="3x"
            color="rgb(36, 196, 130)"
            onClick={() =>
              dispatch &&
              dispatch({
                type: 'all/setPlaying',
                payload: playing ? false : true,
              })
            }
          />
          <FontAwesomeIcon icon={faStepForward} size="2x" />
          <FontAwesomeIcon icon={faVolumeDown} />
        </div>
        <div className={styles.playbar_contentRight}>
          <span>
            {formatSecToMin(nowMusicTime)} /{' '}
            {formatSecToMin(nowMusicDetail.dt ? nowMusicDetail.dt / 1000 : 0)}
          </span>
          <div onClick={() => togglePlVisible()}>
            <FontAwesomeIcon
              icon={faList}
              className={styles.playbar_listIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ all }: { all: IAllModelState }) => ({
  all,
}))(PlayBar);
