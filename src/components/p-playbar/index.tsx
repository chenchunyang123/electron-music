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

import Progress from './progress';

export default (props: { togglePlVisible: () => void }) => {
  const { togglePlVisible } = props;
  return (
    <div className={styles.playbar_wrap}>
      {/* 进度条 */}
      <Progress />
      {/* 信息展示 */}
      <div className={styles.playbar_content}>
        <div className={styles.playbar_contentLeft}>
          <img
            src="http://p3.music.126.net/5a8JbNUEwmlzspiPYr8MDQ==/109951164538801813.jpg"
            alt=""
          />
          <span>麻雀</span>
          <span>&nbsp;-&nbsp;</span>
          <span>李荣浩</span>
        </div>
        <div className={styles.playbar_contentCenter}>
          <FontAwesomeIcon icon={faRandom} />
          <FontAwesomeIcon icon={faStepBackward} size="2x" />
          <FontAwesomeIcon
            icon={faPlayCircle}
            size="3x"
            color="rgb(36, 196, 130)"
          />
          <FontAwesomeIcon icon={faStepForward} size="2x" />
          <FontAwesomeIcon icon={faVolumeDown} />
        </div>
        <div className={styles.playbar_contentRight}>
          <span>00:00 / 04:33</span>
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
