import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';

import { apiMusic } from '@/api';
import { AxiosResponse } from 'axios';
import PlayList from './playList';

const TypeItem = (props: { text: string }) => {
  const { text } = props;
  const handleFunc = () => {
    if (text === '全部') {
      history.push('/singlist/types/all');
    } else {
      history.push(`/singlist/types/${text}`);
    }
  };
  return (
    <div className={styles.ti_wrap} onClick={handleFunc}>
      {text}
    </div>
  );
};

export default () => {
  const [hotTypes, setHotTypes] = useState<Array<string>>([]);

  useEffect(() => {
    apiMusic
      .getPlayListHotTypes()
      .then((res: AxiosResponse<{ tags: Array<{ name: string }> }>) => {
        const { data } = res;
        let formatData = data.tags.map(item => item.name);
        formatData.push('全部');
        setHotTypes(formatData);
      });
  }, []);

  return (
    <div className={styles.ts_wrap}>
      <div className={styles.ts_types}>
        {hotTypes.map((item, idx) => (
          <TypeItem key={idx} text={item} />
        ))}
      </div>
      <div className={styles.ts_songsList}>
        <h3>精选歌单</h3>
        <PlayList />
      </div>
    </div>
  );
};
