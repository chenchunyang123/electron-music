import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { connect, IAllModelState, ConnectProps } from 'umi';

interface IProgressProps {
  all: IAllModelState;
  dispatch: ConnectProps['dispatch'];
}

const Progress: React.FC<IProgressProps> = ({ all }) => {
  const [percentage, setPercentage] = useState(0);
  const { nowMusicTime, nowMusicDetail } = all;

  useEffect(() => {
    if (nowMusicDetail.dt) {
      const musicDuration = nowMusicDetail.dt / 1000;
      console.log(+((nowMusicTime / musicDuration) * 100).toFixed(2));
      setPercentage(+((nowMusicTime / musicDuration) * 100).toFixed(2));
    }
  }, [nowMusicTime]);

  return (
    <div className={styles.pg_wrap}>
      <div className={styles.pg_container}>
        <div
          className={styles.pg_bar}
          style={{ width: percentage + '%' }}
        ></div>
      </div>
    </div>
  );
};

export default connect(({ all }: { all: IAllModelState }) => ({
  all,
}))(Progress);
