// @ts-nocheck
// 后期改成hook写法再打开这里的ts检查
import React from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import { connect } from 'umi';

import { formatSecToMin } from '@/utils';

const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    columns: [
      {
        title: '音乐标题',
        dataIndex: 'title',
        width: 200,
      },
      {
        title: '歌手',
        dataIndex: 'artist',
        width: 150,
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: '专辑',
        dataIndex: 'album',
        width: 150,
      },
      {
        title: '时长',
        dataIndex: 'duration',
        width: 100,
      },
    ],
  };

  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const { list } = this.props;
    const data = list.map((item, idx) => {
      return {
        key: idx,
        id: item.id,
        title: item.name,
        artist: item.ar.map(artist => artist.name).join(' / '),
        album: item.al.name,
        duration: formatSecToMin(item.dt / 1000),
      };
    });

    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <div className={styles.st_wrap}>
        <Table
          bordered
          components={this.components}
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={record => {
            return {
              onDoubleClick: event => {
                // 放当前双击的歌
                this.props.dispatch({
                  type: 'all/getMusicAllDetailsAndPlay',
                  payload: record.id,
                });
                // 把当前的播放列表替换
                this.props.dispatch({
                  type: 'all/setPlayList',
                  payload: list,
                });
              },
            };
          }}
        />
        ;
      </div>
    );
  }
}

export default connect()(Demo);
