import React, { useEffect, useState } from 'react';
import styles from './index.less';
import {
  IRouteComponentProps,
  connect,
  IAllModelState,
  ConnectProps,
} from 'umi';
import { Tabs } from 'antd';
import moment from 'moment';

import { apiMusic } from '@/api';
// import Comments from './comments';
import Comments from '@/components/m-comments';
import MSongTable from '@/components/m-songTable';

interface IObjArray {
  [props: string]: any;
}

const { TabPane } = Tabs;
const TABS = ['歌曲列表', '专辑信息', '评论'];

const AlbumDes = (props: { detail: string }) => {
  const { detail } = props;
  return (
    <div className={styles.ad_wrap}>
      <div>专辑介绍</div>
      <p>{detail}</p>
    </div>
  );
};

const renderTabPane = (
  idx: number,
  detail: string,
  songs: Array<IObjArray>,
  commentObj: any,
) => {
  switch (idx) {
    case 0:
      return <MSongTable list={songs} />;
    case 1:
      return <AlbumDes detail={detail} />;
    case 2:
      return <Comments commentObj={commentObj} />;
    default:
      return null;
  }
};

interface IAlbumsProps extends IRouteComponentProps {
  all: IAllModelState;
  dispatch: ConnectProps['dispatch'];
}

const Albums: React.FC<IAlbumsProps> = ({ location, dispatch, all }) => {
  const { id } = location.query as { id: number };
  const [activeKey, setKey] = useState('0');
  const [detail, setDetail] = useState(''); // 专辑详情
  const [songs, setSongs] = useState<Array<IObjArray>>([]); // 歌曲列表
  const [commentObj, setComments] = useState<any>({}); // 评论
  const [albumObj, setAlbum] = useState<any>({}); // 专辑

  useEffect(() => {
    const getData = async () => {
      const { data } = await apiMusic.getAlbumDetail(id);
      setDetail(data.album.description);
      setSongs(data.songs);
      setAlbum(data.album);
    };
    getData();
  }, []);

  useEffect(() => {
    // 切换到评论时，每次去拉取数据
    if (activeKey === '2') {
      const getData = async () => {
        const { data } = await apiMusic.getAlbumComments(id);
        setComments(data);
      };
      getData();
    }
  }, [activeKey]);

  const addAllToPlayList = () => {
    console.log(songs);
    if (dispatch) {
      // 将所有歌曲信息保存到播放列表
      dispatch({
        type: 'all/setPlayList',
        payload: songs,
      });
      const firstSongId = songs[0].id;
      // 找到第一首歌播放
      dispatch({
        type: 'all/getMusicAllDetailsAndPlay',
        payload: firstSongId,
      });
    }
  };

  return (
    <div className={styles.as_wrap}>
      <div className={styles.as_top}>
        <img src={albumObj.picUrl} alt="" />
        <div className={styles.as_desc}>
          <h2>{albumObj.name}</h2>
          <p>{albumObj.artists?.map((item: any) => item.name).join(' / ')}</p>
          <p>{moment(albumObj.publishTime).format('YYYY-MM-DD')}</p>
          <div className={styles.as_btnsWrap}>
            <div onClick={addAllToPlayList}>播放全部</div>
          </div>
        </div>
      </div>
      <div className={styles.as_tabsContent}>
        <Tabs defaultActiveKey={activeKey} onChange={key => setKey(key)}>
          {TABS.map((item, idx) => (
            <TabPane tab={item} key={idx}>
              {renderTabPane(idx, detail, songs, commentObj)}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default connect(({ all }: { all: IAllModelState }) => ({
  all,
}))(Albums);
