import React from 'react';
import styles from './index.less';
import ListArea from './listArea';

export default () => {
  return (
    <div className={styles.m_wrap}>
      <div className={styles.m_head}></div>
      <div className={styles.m_musicHall}>
        <ListArea />
      </div>
    </div>
  );
};
