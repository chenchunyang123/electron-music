import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { Tabs } from 'antd';
const { remote } = window as any;

import { apiMv } from '@/api';
const { TabPane } = Tabs;
const TABS_NAV = ['总榜', '内地', '港台', '欧美', '韩国', '日本'];

const MvBox = (props: any) => {
  const { rank, detail } = props;
  const handleToMV = () => {
    let win = new remote.BrowserWindow({
      width: 800,
      height: 620,
      resizable: false,
      maximizable: false,
    });
    win.on('close', () => {
      win = null;
    });
    win.loadURL(`http://localhost:8000#mv/detail?id=${detail.id}`);
  };
  return (
    <div className={styles.mb_wrap}>
      <div className={styles.mb_rank}>{rank}</div>
      <div className={styles.mb_rightContent}>
        <img src={detail.cover} alt="" onClick={handleToMV} />
        <div className={styles.mb_desc}>
          <p>{detail.name}</p>
          <p>{detail.artistName}</p>
          <p>热度：{detail.score}</p>
        </div>
      </div>
    </div>
  );
};

const CONTENT = (props: { list: Array<IObjArray> }) => {
  const { list } = props;
  return (
    <div className={styles.tp_wrap}>
      {list.map((item, idx) => (
        <MvBox rank={idx + 1} detail={item} key={idx} />
      ))}
    </div>
  );
};

interface IObjArray {
  [index: number]: { [props: string]: any };
}

export default () => {
  const [rankingList, setList] = useState<Array<IObjArray>>([]); // 排行榜数据
  const [key, setKey] = useState<number | string>(0); // tabs当前的key

  useEffect(() => {
    console.log('key改变了');
    const getData = async () => {
      // setList([]);
      const result = ((await getMvList(key)) as unknown) as Array<IObjArray>;
      setList(result);
    };
    getData();
  }, [key]);

  // 获取某个种类的排行榜数据
  const getMvList = async (key: number | string) => {
    const keyDesc = TABS_NAV[+key] as
      | '内地'
      | '港台'
      | '欧美'
      | '日本'
      | '韩国'
      | '总榜';
    const result = await apiMv.getMvRanking(keyDesc);
    return result.data.data;
  };

  return (
    <div className={styles.vr_wrap}>
      <Tabs
        defaultActiveKey="0"
        onTabClick={key => {
          setKey(key);
        }}
      >
        {TABS_NAV.map((item, idx) => (
          <TabPane tab={item} key={idx}>
            <CONTENT list={rankingList} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
