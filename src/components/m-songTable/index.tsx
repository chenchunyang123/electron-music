// @ts-nocheck
// 后期改成hook写法再打开这里的ts检查
import React from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';

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
        dataIndex: 'time',
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
    console.log(list);
    const data = list.map((item, idx) => {
      return {
        key: idx,
        title: item.name,
        artist: item.ar.map(artist => artist.name).join(' / '),
        album: item.al.name,
        time: '数据未找到',
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
        />
        ;
      </div>
    );
  }
}

export default Demo;
