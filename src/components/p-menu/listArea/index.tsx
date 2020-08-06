import React from 'react';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.listArea_wrap}>
      <div className={styles.listArea_title}>音乐馆</div>
      <ul>
        <li>精选</li>
        <li>排行</li>
        <li>歌单</li>
        <li>电台</li>
        <li>MV</li>
      </ul>
    </div>
  );
};
