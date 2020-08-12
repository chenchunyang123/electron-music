import React, { useState, useEffect } from 'react';
import styles from './index.less';

import VMv from '@/components/v-mv';
import MNav from '@/components/m-nav';
import { apiMv } from '@/api';

const AREA = ['全部', '内地', '港台', '欧美', '韩国', '日本'];
const TYPE = ['全部', '官方版', '原生', '现场版', '网易出品'];
const ORDER = ['最新', '最热', '上升最快'];

interface IObjArray {
  [index: number]: { [props: string]: any };
}

export default () => {
  const [areaSelect, setArea] = useState(0); // 地区
  const [typeSelect, setType] = useState(0); // 种类
  const [orderSelect, setOrder] = useState(0); // 排序
  const [offset, setOffset] = useState(0); // 分页量
  const [mvList, setMvList] = useState<Array<IObjArray>>([]);

  useEffect(() => {
    const getData = async () => {
      const allMvList = await getAllMvResult();
      console.log(allMvList);
      setMvList(allMvList);
    };
    getData();
  }, [areaSelect, typeSelect, orderSelect]);

  const getAllMvResult = async () => {
    const area = AREA[areaSelect] as
      | '全部'
      | '内地'
      | '港台'
      | '欧美'
      | '日本'
      | '韩国';
    const type = TYPE[typeSelect] as
      | '全部'
      | '官方版'
      | '原生'
      | '现场版'
      | '网易出品';
    const order = ORDER[orderSelect] as '上升最快' | '最热' | '最新';
    const result = await apiMv.getAllMv(area, type, order, offset);
    return result.data.data;
  };

  return (
    <div className={styles.lib_wrap}>
      <div>
        <MNav list={AREA} activeKey={areaSelect} callBack={setArea} />
        <MNav list={TYPE} activeKey={typeSelect} callBack={setType} />
      </div>
      <div className={styles.lib_content}>
        <div className={styles.lib_contentTop}>
          <h2>全部MV</h2>
          <div className={styles.lib_order}>
            {ORDER.map((item, idx) => (
              <div
                key={idx}
                className={orderSelect === idx ? styles.lib_activeOrder : null}
                onClick={() => setOrder(idx)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.lib_contentBottom}>
          {mvList.map((item, idx) => (
            <VMv detail={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
