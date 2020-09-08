import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';

import { apiMusic } from '@/api';

type IAllTypes = Array<{ title: string; values: { name: string }[][] }>;

interface IData {
  categories: { [propName: string]: string };
  sub: [{ category: number; name: string }];
}

export default () => {
  const [allTypes, setAllTypes] = useState<IAllTypes>([]);

  useEffect(() => {
    apiMusic.getPlayListAllTypes().then(res => {
      const data: IData = res.data;
      const formatData = Object.keys(data.categories).map(key => {
        const currentSub = data.sub.filter(item => item.category === +key);
        const values = new Array(Math.ceil(currentSub.length / 6))
          .fill('')
          .map((item, idx) => {
            let newArray = new Array(6).fill({ name: '' });
            currentSub.slice(6 * idx, 6 * (idx + 1)).forEach((sub, subIdx) => {
              newArray[subIdx] = sub;
            });
            return newArray;
          });
        return { title: data.categories[key], values: values };
      });
      setAllTypes(formatData);
    });
  }, []);

  return (
    <div className={styles.ta_wrap}>
      <h1>全部分类</h1>
      {allTypes.map((item, idx) => (
        <table key={idx}>
          <tbody>
            {item.values.map((child, childIdx) => {
              return (
                <tr key={childIdx}>
                  {childIdx === 0 ? <td rowSpan={0}>{item.title}</td> : null}
                  {child.map((item, childChildIdx) => (
                    <td
                      key={childChildIdx}
                      className={styles.ta_trItem}
                      onClick={() =>
                        history.push(`/singlist/types/${item.name}`)
                      }
                    >
                      {item.name}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );
};
