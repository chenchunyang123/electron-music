import React from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './index.less';
import './reset.css';

import PMenu from '@/components/p-menu';
import PNavbar from '@/components/p-navbar';
import PPlaybar from '@/components/p-playbar'

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return (
    <div className={styles.i_wrap}>
      <PMenu />
      <div className={styles.i_container}>
        <PNavbar />
        { children }
      </div>
      <PPlaybar />
    </div>
  );
}
