import React from 'react';
import styles from './index.less';
import ListArea from './listArea';

export default () => {
  return (
    <div className={styles.menu_wrap}>
      <div className={styles.menu_head}></div>
      <div className={styles.menu_musicHall}>
        <ListArea />
      </div>
    </div>
  );
};
