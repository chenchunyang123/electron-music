import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import classnames from 'classnames';

export type IList = Array<{
  imageUrl: string;
}>;

export default (props: { list: IList }) => {
  const [page, setPage] = useState(0); // 当前页数
  const [btnsVisible, setVisible] = useState(false); // 翻页按钮显隐
  const bannerEl = useRef<HTMLDivElement>(null); // 获取wrap的dom
  const btnsStyle = classnames({
    [styles.banner_btns]: true,
    [styles.banner_visible]: btnsVisible,
  });
  const { list } = props;
  console.log(list);

  useEffect(() => {
    const onEnter = () => {
      setVisible(true);
      console.log('enter');
    };
    const onLeave = () => {
      setVisible(false);
      console.log('leave');
    };
    const dom = bannerEl.current;
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
      newPage = Math.ceil(list.length / 2) - 1;
    } else {
      newPage = newPage % Math.ceil(list.length / 2);
    }
    setPage(newPage);
  };

  return (
    <div className={styles.banner_wrap} ref={bannerEl}>
      {/* 图片主体 */}
      <div className={styles.banner_container}>
        {list.slice(page * 2, page * 2 + 2).map((item, idx) => (
          <div className={styles.banner_imgWrap} key={idx}>
            <img src={item.imageUrl} alt="" />
          </div>
        ))}
      </div>
      {/* 左右翻页按钮 */}
      <div className={btnsStyle}>
        <div
          className={styles.banner_left}
          onClick={() => handleChangePage('prev')}
        ></div>
        <div
          className={styles.banner_right}
          onClick={() => handleChangePage('next')}
        ></div>
      </div>
      {/* 小圆点 */}
      <div className={styles.banner_dotsWrap}>
        {// 生成数组长度一半的dot（向上取整）
        new Array(Math.ceil(list.length / 2)).fill(1).map((item, idx) => (
          <div
            className={classnames({
              [styles.banner_dot]: true,
              [styles.banner_dot_active]: idx === page ? true : false,
            })}
            onClick={() => setPage(idx)}
            key={idx}
          ></div>
        ))}
      </div>
    </div>
  );
};
