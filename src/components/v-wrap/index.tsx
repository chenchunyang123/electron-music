import React, { useState, useRef, useEffect, ReactChild } from 'react';
import styles from './index.less';
import classnames from 'classnames';

import VMv from '@/components/v-mv';
import PMusic from '@/components/p-music';

interface IObjArray {
  id: number;
  picUrl: string;
  name: string;
}

interface IVwrap {
  title: string;
  list: Array<IObjArray>;
  type: 'mv' | 'music';
}

const SIZE = {
  // 每页的个数
  mv: 3,
  music: 4,
};

export default (props: IVwrap) => {
  const { list, title, type } = props;
  const [page, setPage] = useState(0); // 当前页数
  const [btnsVisible, setVisible] = useState(false); // 翻页按钮显隐
  const wrapEl = useRef<HTMLDivElement>(null); // 获取wrap的dom
  const btnsStyle = classnames({
    [styles.w_btns]: true,
    [styles.w_visible]: btnsVisible,
  });
  const pageSize = SIZE[type];

  useEffect(() => {
    const onEnter = () => {
      setVisible(true);
      console.log('enter');
    };
    const onLeave = () => {
      setVisible(false);
      console.log('leave');
    };
    const dom = wrapEl.current;
    dom?.addEventListener('mouseenter', onEnter);
    dom?.addEventListener('mouseleave', onLeave);
    return () => {
      dom?.removeEventListener('mouseenter', onEnter);
      dom?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleChangePage = (direction: 'prev' | 'next') => {
    let newPage: number;
    switch (direction) {
      case 'prev':
        newPage = page - 1;
        break;
      case 'next':
        newPage = page + 1;
        break;
      default:
        newPage = 0;
        break;
    }
    if (newPage < 0) {
      newPage = Math.ceil(list.length / pageSize) - 1;
    } else {
      newPage = newPage % Math.ceil(list.length / pageSize);
    }
    setPage(newPage);
  };

  return (
    <div className={styles.w_wrap} ref={wrapEl}>
      <h2>{title}</h2>
      <div className={styles.w_container}>
        {list.slice(page * pageSize, page * pageSize + pageSize).map(item => {
          return type === 'music' ? (
            <PMusic key={item.id} detail={item} />
          ) : (
            <VMv key={item.id} detail={item} />
          );
        })}
      </div>
      <div className={btnsStyle}>
        <div
          className={styles.w_left}
          onClick={() => handleChangePage('prev')}
        ></div>
        <div
          className={styles.w_right}
          onClick={() => handleChangePage('next')}
        ></div>
      </div>
    </div>
  );
};
