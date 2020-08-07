import React from 'react';
import styles from './index.less';
import { history } from 'umi';

interface ITabsList {
  list: { name: string; url: string }[];
}

export default (props: ITabsList) => {
  const { list } = props;

  const handleTabs = (url: string) => {
    history.push(url);
  };

  return (
    <div className={styles.tabs_wrap}>
      <ul>
        {list.map((item, idx) => (
          <li onClick={() => handleTabs(item.url)} key={idx}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
