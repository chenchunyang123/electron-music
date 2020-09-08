import { Effect, Reducer, Subscription } from 'umi';
import { apiMusic } from '@/api';
import { shuffle } from 'lodash';

export interface IAllModelState {
  nowMusicId: number;
  nowMusicLyric: string;
  nowMusicDetail: { [key: string]: any };
  nowMusicUrl: string;
  audioElement: null | HTMLAudioElement;
  playing: boolean;
  nowMusicTime: number;
  playList: Array<object>;
  randomList: Array<object>; // 随机的播放列表
  cycleType: 1 | 2 | 3; // 1是列表循环，2是单曲循环，3是随机播放
}

interface IAllModelType {
  namespace: string;
  state: IAllModelState;
  // reducers: {
  //   setAudioElement: Reducer<IAllModelState>;
  // };
  reducers: {
    [key: string]: (state: IAllModelState, action: any) => IAllModelState;
  };
  effects: {
    [key: string]: Effect;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IAllModelType = {
  namespace: 'all',
  state: {
    nowMusicId: 0,
    nowMusicLyric: '',
    nowMusicDetail: {},
    nowMusicUrl: '',
    audioElement: null,
    playing: false,
    nowMusicTime: 0,
    playList: [],
    randomList: [],
    cycleType: 2,
  },
  reducers: {
    setAudioElement(state, { payload }: { payload: HTMLAudioElement }) {
      return {
        ...state,
        audioElement: payload,
      };
    },
    setNowMusicId(state, { payload }: { payload: number }) {
      return {
        ...state,
        nowMusicId: payload,
      };
    },
    setNowMusicLyric(state, { payload }: { payload: string }) {
      return {
        ...state,
        nowMusicLyric: payload,
      };
    },
    setNowMusicDetail(state, { payload }: { payload: object }) {
      return {
        ...state,
        nowMusicDetail: payload,
      };
    },
    setNowMusicUrl(state, { payload }: { payload: string }) {
      return {
        ...state,
        nowMusicUrl: payload,
      };
    },
    setPlaying(state, { payload }: { payload: boolean }) {
      if (payload) {
        state.audioElement?.play();
      } else {
        state.audioElement?.pause();
      }
      return {
        ...state,
        playing: payload,
      };
    },
    setNowMusicTime(state, { payload }: { payload: number }) {
      return { ...state, nowMusicTime: payload };
    },
    setPlayList(state, { payload }: { payload: Array<object> }) {
      const randomList = shuffle([...payload]);
      return { ...state, playList: payload, randomList };
    },
    setCycleType(state) {
      let newCycleType = state.cycleType;
      newCycleType++;
      if (newCycleType > 3) {
        newCycleType = 1;
      }
      return { ...state, cycleType: newCycleType as 1 | 2 | 3 };
    },
  },
  effects: {
    // 通过传入歌曲的id并播放
    *getMusicAllDetailsAndPlay({ payload: id }, { call, put, select }) {
      const { nowMusicId, audioElement } = yield select(
        (state: any) => state.all,
      );
      if (nowMusicId === id) {
        // 如果点击播放的音乐是正在播放的，包括单曲循环
        // 从头开始重新播放
        audioElement.currentTime = 0;
        audioElement.play();
        return;
      }
      // 再进行下面逻辑
      yield put({ type: 'setPlaying', payload: false });
      yield put({ type: 'setNowMusicId', payload: id });
      const { data: resMusicUrl } = yield call(apiMusic.getMusicUrl, id);
      const { data: resMusicLyric } = yield call(apiMusic.getMusicLyric, id);
      const { data: resMusicDetail } = yield call(apiMusic.getMusicDetail, id);
      yield put({ type: 'setNowMusicUrl', payload: resMusicUrl.data[0].url });
      yield put({
        type: 'setNowMusicLyric',
        payload: resMusicLyric.lrc?.lyric,
      });
      yield put({
        type: 'setNowMusicDetail',
        payload: resMusicDetail.songs[0],
      });
      yield put({ type: 'setPlaying', payload: true });
    },
    // 下一首
    *nextSong({ payload: ifJudgeReplay = false }, { put, select }) {
      const { playList, nowMusicId, randomList, cycleType } = yield select(
        (state: any) => state.all,
      );
      let lock = false; // 用来判断需不需要让索引++
      if (ifJudgeReplay && cycleType === 2) {
        // 歌曲自然结束传入了该payload是true，其他调用时不用传该参数
        // 做一个标记不同对idx进行++操作
        lock = true;
      }
      // 再进入下面逻辑
      let nowPlayList, idx; // 当前计算用的列表及当前歌曲的索引
      // 先判断循环类型
      if (cycleType === 1 || cycleType === 2) {
        nowPlayList = playList;
      } else if (cycleType === 3) {
        nowPlayList = randomList;
      } else {
        console.error('cycleType 输入错误');
      }
      idx = nowPlayList.findIndex((item: any) => item.id === nowMusicId);
      // 索引加
      if (lock) {
        // 不处理idx
      } else {
        if (idx === playList.length - 1) {
          // 处理最后一首跳到第一首
          idx = 0;
        } else {
          idx++;
        }
      }
      const nextSongId = nowPlayList[idx].id;
      yield put({ type: 'getMusicAllDetailsAndPlay', payload: nextSongId });
    },
    // 上一首
    *prevSong({}, { put, select }) {
      const { playList, nowMusicId, randomList, cycleType } = yield select(
        (state: any) => state.all,
      );
      let nowPlayList, idx; // 当前计算用的列表及当前歌曲的索引
      // 先判断循环类型
      if (cycleType === 1 || cycleType === 2) {
        nowPlayList = playList;
      } else if (cycleType === 3) {
        nowPlayList = randomList;
      } else {
        console.error('cycleType 输入错误');
      }
      idx = nowPlayList.findIndex((item: any) => item.id === nowMusicId);
      // 索引加
      if (idx === 0) {
        // 处理第一首到最后一首
        idx = playList.length - 1;
      } else {
        idx--;
      }
      const nextSongId = nowPlayList[idx].id;
      yield put({ type: 'getMusicAllDetailsAndPlay', payload: nextSongId });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {});
    },
  },
};

export default IndexModel;
