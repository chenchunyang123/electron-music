import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { Menu, Dropdown } from 'antd';

import { apiMusic } from '@/api';
import MNav from '@/components/m-nav';

const AREA = ['全部', '华语', '欧美', '日本', '韩国', '其他'];
const TYPE = ['全部', '男歌手', '女歌手', '乐队组合'];

enum AREA_MAP {
  '全部' = -1,
  '华语' = 7,
  '欧美' = 96,
  '日本' = 8,
  '韩国' = 16,
  '其他' = 0,
}
enum TYPE_MAP {
  '全部' = -1,
  '男歌手' = 1,
  '女歌手' = 2,
  '乐队组合' = 3,
}

const SingerBox = (props: {
  detail: { picUrl: string; name: string; id: number };
}) => {
  const { detail } = props;
  return (
    <div
      className={styles.sx_wrap}
      onClick={() => history.push(`/singer/detail?id=${detail.id}`)}
    >
      <img src={detail.picUrl} alt="" />
      <p>{detail.name}</p>
    </div>
  );
};

export default () => {
  const [areaActive, setArea] = useState(0);
  const [typeActive, setType] = useState(0);
  const [singerList, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getSingerList();
      setList(result.artists);
    };
    getData();
  }, [areaActive, typeActive]);

  const getSingerList = async () => {
    const area = AREA_MAP[AREA[areaActive] as any] as any;
    const type = TYPE_MAP[TYPE[typeActive] as any] as any;
    const initial = -1;
    const result = await apiMusic.getSingerList(type, area, initial);
    return result.data;
  };

  return (
    <div className={styles.sg_wrap}>
      <div className={styles.sg_nav}>
        <MNav activeKey={areaActive} list={AREA} callBack={setArea} />
        <MNav activeKey={typeActive} list={TYPE} callBack={setType} />
      </div>
      <div className={styles.sg_singerList}>
        {singerList.map((item, idx) => (
          <SingerBox detail={item} key={idx} />
        ))}
      </div>
    </div>
  );
};
