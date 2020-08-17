import React, { useState } from 'react';
import styles from './index.less';

export default () => {
  const [percentage, setPercentage] = useState('0%');

  return (
    <div className={styles.pg_wrap}>
      <div className={styles.pg_container}>
        <div className={styles.pg_bar} style={{ width: percentage }}></div>
      </div>
    </div>
  );
};
