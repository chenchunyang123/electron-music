import React from 'react';
import styles from './index.less';

import VRanking from '@/components/v-ranking';

export default () => {
  return (
    <div className={styles.r_wrap}>
      <div className={styles.r_header}>
        <img src={require('@/assets/mv-ranking.png')} alt="" />
        <div className={styles.title}>巅峰榜.MV</div>
      </div>
      <div className={styles.r_content}>
        <VRanking />
      </div>
    </div>
  );
};
