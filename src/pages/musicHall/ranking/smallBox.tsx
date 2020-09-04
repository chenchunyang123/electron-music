import React from 'react';
import styles from './index.less';
import { history } from 'umi';

import { IGlobal } from './index';

export default (props: { detail: IGlobal }) => {
  const { detail } = props;
  return (
    <div
      className={styles.sbx_wrap}
      onClick={() => history.push(`/singlist/detail?id=${detail.id}`)}
    >
      <img src={detail.coverImgUrl} alt="" />
    </div>
  );
};
