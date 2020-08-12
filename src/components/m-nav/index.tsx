import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface INav {
  callBack: React.Dispatch<React.SetStateAction<number>>;
  activeKey: number;
  list: string[];
}

export default (props: INav) => {
  const { list, activeKey, callBack } = props;
  return (
    <ul className={styles.nav_wrap}>
      {list.map((item, idx) => (
        <li
          className={activeKey === idx ? styles.nav_active : null}
          key={idx}
          onClick={() => callBack(idx)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
