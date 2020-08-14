import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Tabs } from 'antd';
import { IRouteComponentProps } from 'umi';
import moment from 'moment';
import { history } from 'umi';

import { apiMusic } from '@/api';
import VMv from '@/components/v-mv';

interface IObjArray {
  [index: number]: {
    [props: string]: any;
  };
}

const { TabPane } = Tabs;
const TABS = ['专辑', 'MV', '歌手详情', '相似歌手'];

const Album = (props: { detail: object }) => {
  const { detail } = props;
  return (
    <div className={styles.ab_wrap}>
      <img
        src={(detail as any).picUrl}
        alt=""
        onClick={() => history.push(`/singer/albums?id=${(detail as any).id}`)}
      />
      <p>{(detail as any).name}</p>
      <p>{moment((detail as any).publishTime).format('YYYY-MM-DD')}</p>
    </div>
  );
};

const RenderAlbum = (props: { list: Array<IObjArray> }) => {
  const { list } = props;
  return (
    <div className={styles.ra_wrap}>
      {list.map((item, idx) => (
        <Album detail={item} key={idx} />
      ))}
    </div>
  );
};

const RenderMv = (props: { list: Array<IObjArray> }) => {
  const { list } = props;
  return (
    <div className={styles.rm_wrap}>
      {list.map((item, idx) => (
        <div style={{ marginBottom: '30px' }} key={idx}>
          <VMv detail={item} />
        </div>
      ))}
    </div>
  );
};

const RenderDetail = (props: { desc: Array<IObjArray> }) => {
  const { desc } = props;
  return (
    <div className={styles.rd_wrap}>
      {desc.map((item, idx) => (
        <div key={idx}>
          <h4>{(item as any).ti}</h4>
          <p>{(item as any).txt}</p>
        </div>
      ))}
    </div>
  );
};

const RenderSimilar = (props: { list: Array<IObjArray> }) => {
  const { list } = props;
  return <div>会报301错误，暂时先不写</div>;
};

const renderTabPane = (
  idx: number,
  albums: Array<IObjArray>,
  mvList: Array<IObjArray>,
  desc: Array<IObjArray>,
  similarSingers: Array<IObjArray>,
) => {
  switch (idx) {
    case 0:
      return <RenderAlbum list={albums} />;
    case 1:
      return <RenderMv list={mvList} />;
    case 2:
      return <RenderDetail desc={desc} />;
    case 3:
      return <RenderSimilar list={similarSingers} />;
    default:
      return null;
  }
};

interface Iartist {
  [props: string]: any;
}

export default ({ location }: IRouteComponentProps) => {
  const [activeKey, setKey] = useState('0');
  const [artist, setArtist] = useState<Iartist>({});
  const [mvList, setMvList] = useState<Array<IObjArray>>([]);
  const [desc, setDesc] = useState<Array<IObjArray>>([]);
  const [briefDesc, setBrief] = useState('');
  const [similarSingers, setSimi] = useState<Array<IObjArray>>([]);
  const [albums, setAlbums] = useState<Array<IObjArray>>([]);

  useEffect(() => {
    const { id } = location.query as { id: number };
    const getData = async () => {
      const { data: resDesc } = await apiMusic.getSingerDesc(id);
      const { data: resMv } = await apiMusic.getSingerMv(id);
      // const { data: resSimi } = await apiMusic.getSimilarSinger(id);
      const { data: resAlbum } = await apiMusic.getSingerAlbum(id);
      setMvList(resMv.mvs);
      setDesc(resDesc.introduction);
      setBrief(resDesc.briefDesc);
      // setDesc(resDesc.introduction);
      setAlbums(resAlbum.hotAlbums);
      setArtist(resAlbum.artist);
    };
    getData();
  }, []);

  return (
    <div className={styles.sd_wrap}>
      <div className={styles.sd_top}>
        <div className={styles.sd_imgWrap}>
          <img src={artist.picUrl} alt="" />
        </div>
        <div className={styles.sd_des}>
          <h2>{artist.name}</h2>
          <p>
            <span>单曲数:</span>
            <span>{artist.musicSize}</span>
            <span>专辑数:</span>
            <span>{artist.albumSize}</span>
            <span>mv数:</span>
            <span>xx</span>
          </p>
          <p className={styles.sd_descDetail}>
            <span>歌手简介:</span>
            {briefDesc}
          </p>
        </div>
      </div>
      <div className={styles.sd_tabWrap}>
        <Tabs defaultActiveKey={activeKey}>
          {TABS.map((item, idx) => (
            <TabPane tab={item} key={idx}>
              {renderTabPane(idx, albums, mvList, desc, similarSingers)}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
