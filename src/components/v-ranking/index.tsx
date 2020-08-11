import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Tabs } from 'antd';
import { apiMv } from '@/api';
const { TabPane } = Tabs;
const TABS_NAV = ['总榜', '内地', '港台', '欧美', '韩国', '日本'];

const MvBox = () => (
  <div className={styles.mb_wrap}>
    <div className={styles.mb_rank}>1</div>
    <div className={styles.mb_rightContent}>
      <img src={require('@/assets/mv-ranking.png')} alt="" />
    </div>
  </div>
);

const CONTENT = (props: { list: object[] }) => {
  const { list } = props;
  return list.map(() => (
    <div className={styles.tp_wrap}>
      {new Array(20).fill(1).map(() => (
        <MvBox />
      ))}
    </div>
  ));
};

export default () => {
  const [rankingList, setList] = useState([]);

  useEffect(() => {
    apiMv.getMvRanking('总榜').then(res => {
      const { data } = res;
      console.log(data.data);
      setList(data.data);
    });
  }, []);

  return (
    <div className={styles.vr_wrap}>
      <Tabs
        defaultActiveKey="1"
        onTabClick={() => {
          console.log(1);
        }}
      >
        {TABS_NAV.map((item, idx) => (
          <TabPane tab={item} key={idx + 1}>
            <CONTENT list={rankingList} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
