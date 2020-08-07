import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';
import classnames from 'classnames';

import VMv from '@/components/v-mv';

export default () => {
  const [btnsVisible, setVisible] = useState(false); // 翻页按钮显隐
  const containerEl = useRef(null); // 获取container的dom
  console.log(containerEl.current);

  const btnsStyle = classnames('w_btns', {
    [styles.w_visible]: btnsVisible ? true : false,
  });

  // useEffect()

  return (
    <div className={styles.w_wrap}>
      <h2>最新</h2>
      <div className={styles.w_container} ref={containerEl}>
        <VMv />
        <VMv />
        <VMv />
      </div>
      <div className={btnsStyle}>
        <div className={styles.w_left}></div>
        <div className={styles.w_right}></div>
      </div>
    </div>
  );
};
