import React from 'react';
import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { IRouteComponentProps } from 'umi';

export default (props: { history: IRouteComponentProps['history'] }) => {
  const { history } = props;
  return (
    <div className={styles.navbar_wrap}>
      <FontAwesomeIcon icon={faChevronLeft} className={styles.navbar_left} />
      <FontAwesomeIcon icon={faChevronRight} className={styles.navbar_right} />
      <div className={styles.navbar_input}>
        <FontAwesomeIcon icon={faSearch} className={styles.navbar_search} />
        <input type="text" placeholder="搜索音乐" />
        <FontAwesomeIcon icon={faTimes} className={styles.navbar_clear} />
      </div>
    </div>
  );
};
