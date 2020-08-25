import { Effect, Reducer, Subscription } from 'umi';
import { apiMusic } from '@/api';

export interface IAllModelState {
  nowMusicId: number;
  nowMusicLyric: string;
  nowMusicDetail: { [key: string]: any };
  nowMusicUrl: string;
  audioElement: null | HTMLAudioElement;
  playing: boolean;
  nowMusicTime: number;
  playList: Array<object>;
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
      return { ...state, playList: payload };
    },
  },
  effects: {
    // 通过传入歌曲的id并播放
    *getMusicAllDetailsAndPlay({ payload: id }, { call, put, select }) {
      // 如果点击播放的音乐是正在播放的，则不处理
      const { nowMusicId } = yield select((state: any) => state.all);
      if (nowMusicId === id) {
        return;
      }
      // 再进行下面逻辑
      yield put({ type: 'setPlaying', payload: false });
      yield put({ type: 'setNowMusicId', payload: id });
      const { data: resMusicUrl } = yield call(apiMusic.getMusicUrl, id);
      const { data: resMusicLyric } = yield call(apiMusic.getMusicLyric, id);
      const { data: resMusicDetail } = yield call(apiMusic.getMusicDetail, id);
      yield put({ type: 'setNowMusicUrl', payload: resMusicUrl.data[0].url });
      yield put({ type: 'setNowMusicLyric', payload: resMusicLyric.lrc.lyric });
      yield put({
        type: 'setNowMusicDetail',
        payload: resMusicDetail.songs[0],
      });
      yield put({ type: 'setPlaying', payload: true });
    },
    // 下一首
    *nextSong({ payload }, { put, select }) {
      const { playList, nowMusicId } = yield select((state: any) => state.all);
      let idx = playList.findIndex((item: any) => item.id === nowMusicId);
      if (idx === playList.length - 1) {
        // 处理最后一首跳到第一首
        idx = 0;
      } else {
        idx++;
      }
      const nextSongId = playList[idx].id;
      yield put({ type: 'getMusicAllDetailsAndPlay', payload: nextSongId });
    },
    // 上一首
    *prevSong({ payload }, { put, select }) {
      const { playList, nowMusicId } = yield select((state: any) => state.all);
      let idx = playList.findIndex((item: any) => item.id === nowMusicId);
      if (idx === 0) {
        // 处理第一首跳到最后一首
        idx = playList.length - 1;
      } else {
        idx--;
      }
      const prevSongId = playList[idx].id;
      yield put({ type: 'getMusicAllDetailsAndPlay', payload: prevSongId });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {});
    },
  },
};

export default IndexModel;
