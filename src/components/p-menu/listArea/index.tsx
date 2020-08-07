import React from 'react';
import { history } from 'umi';
import styles from './index.less';

const URL_ARRAY = [
  { name: '音乐馆', url: '/musichall/selected' },
  { name: '视频', url: '/musicvideo/recommend' },
  { name: '电台', url: '/musicstation' },
];

export default () => {
  const handleClick = (url: string) => {
    history.push(url);
  };

  return (
    <div className={styles.listArea_wrap}>
      <div className={styles.listArea_title}>在线音乐</div>
      <ul>
        {URL_ARRAY.map((item, idx) => (
          <li onClick={() => handleClick(item.url)} key={idx}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
