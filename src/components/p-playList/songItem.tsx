import React from 'react';
import styles from './index.less';
import classnames from 'classnames';

const active = false;

export default () => {
  return (
    <div
      className={classnames(styles.si_wrap, {
        [styles.si_active]: active ? true : false,
      })}
    >
      <img
        src="http://p3.music.126.net/5a8JbNUEwmlzspiPYr8MDQ==/109951164538801813.jpg"
        alt=""
      />
      <div className={styles.si_names}>
        <span>麻雀</span>
        <span>李荣浩</span>
      </div>
      <span>03:22</span>
    </div>
  );
};
