import React from 'react';
import styles from './index.less';
import { history } from 'umi';

import { IOfficial } from './index';

export default (props: { detail: IOfficial }) => {
  const { detail } = props;
  return (
    <div
      className={styles.bbx_wrap}
      onClick={() => history.push(`/singlist/detail?id=${detail.id}`)}
    >
      <div className={styles.bbx_left}>
        <img src={detail.coverImgUrl} alt="" />
      </div>
      <div className={styles.bbx_right}>
        <div className={styles.bbx_title}>{detail.name}</div>
        <ul>
          {detail.songs.slice(0, 3).map((item, idx) => (
            <li key={idx}>
              {idx + 1}&nbsp;&nbsp;&nbsp;{item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
