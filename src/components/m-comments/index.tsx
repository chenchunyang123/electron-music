import React from 'react';
import styles from './index.less';
import moment from 'moment';

const OneComment = (props: { commentDetail: {} }) => {
  const { commentDetail } = props;
  const {
    content,
    time,
    user: { nickname, avatarUrl },
    beReplied,
  } = commentDetail as any;
  return (
    <>
      <div className={styles.oc_wrap}>
        <img src={avatarUrl} alt="" />
        <div className={styles.oc_des}>
          <p>
            <span className={styles.oc_nickname}>{nickname}：</span>
            {content}
          </p>
          {beReplied.length ? (
            <p className={styles.oc_replyTo}>
              <span className={styles.oc_nickname}>
                @{beReplied[0]?.user?.nickname}：
              </span>
              {beReplied[0]?.content}
            </p>
          ) : null}
        </div>
      </div>
      <div className={styles.oc_bottomWrap}>
        <span>{moment(time).format('M月D日 hh:mm')}</span>
        {/* 点赞转发回复待写 */}
      </div>
    </>
  );
};

export default (props: { commentObj: any }) => {
  const { commentObj } = props;
  const { comments = [], hotComments = [] } = commentObj;
  return (
    <div className={styles.ac_wrap}>
      {/* <div className={styles.ac_textWrap}>
        <textarea />
      </div>
      <div className={styles.btnsWrap}>
        <div>评论</div>
      </div> */}
      {/* 评论列表 */}
      <div className={styles.ac_commentsList}>
        {hotComments.length ? (
          <div className={styles.ac_hotComments}>
            <h4>热门评论</h4>
            {hotComments &&
              (hotComments as []).map((item, idx) => (
                <OneComment commentDetail={item} key={idx} />
              ))}
          </div>
        ) : null}
        {comments.length ? (
          <div className={styles.ac_recentComments}>
            <h4>最新评论</h4>
            {comments &&
              (comments as []).map((item, idx) => (
                <OneComment commentDetail={item} key={idx} />
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
