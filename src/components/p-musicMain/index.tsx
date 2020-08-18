import React, { Dispatch } from 'react';
import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IAllModelState, ConnectProps, connect } from 'umi';

import PPlayBar from '@/components/p-playbar';

interface IMusicMainPageProps {
  dispatch: ConnectProps['dispatch'];
  all: IAllModelState;
  togglePlVisible: () => void;
  visible: boolean;
  close: () => void;
}

const MusicMain: React.FC<IMusicMainPageProps> = ({
  all,
  togglePlVisible,
  visible,
  close,
}) => {
  // const { nowAudioId } = all;
  return (
    <div className={styles.mm_wrap} style={{ top: visible ? '0' : '100%' }}>
      <div className={styles.mm_down} onClick={close}>
        <FontAwesomeIcon icon={faChevronDown} color="#999" />
      </div>
      <div className={styles.mm_content}>
        <img
          src="http://file06.16sucai.com/2016/0506/6ff4d8c8e7714e84347356f7fd1092d4.jpg"
          alt=""
        />
        <div className={styles.mm_lyricsWrap}>
          <h3>麻雀</h3>
          <div>
            <span>歌手：</span>
            <span>李荣浩</span>
          </div>
          <div>
            <span>专辑：</span>
            <span>麻雀</span>
          </div>
          <div></div>
        </div>
      </div>
      <PPlayBar
        togglePlVisible={togglePlVisible}
        classNames={styles.mm_customBar}
      />
    </div>
  );
};

export default connect(({ all }: { all: IAllModelState }) => ({
  all,
}))(MusicMain);
