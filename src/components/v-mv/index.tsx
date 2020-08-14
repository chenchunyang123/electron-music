import React from 'react';
import styles from './index.less';

const { remote } = window as any;

interface IMv {
  detail: { [propName: string]: any };
}

export default (props: IMv) => {
  const { cover, name, artistName, id, imgurl } = props.detail;
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
    win.loadURL(`http://localhost:8000#mv/detail?id=${id}`);
  };

  return (
    <div className={styles.mv_wrap}>
      <img src={cover || imgurl} alt="" onClick={handleToMV} />
      <div className={styles.mv_name}>{name}</div>
      {imgurl ? null : <div className={styles.mv_artistName}>{artistName}</div>}
    </div>
  );
};
