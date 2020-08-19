import { Effect, Reducer, Subscription } from 'umi';
import { apiMusic } from '@/api';

export interface IAllModelState {
  nowMusicId: number;
  nowMusicLyric: string;
  nowMusicDetail: { [key: string]: any };
  nowMusicUrl: string;
  audioElement: null | HTMLAudioElement;
  playing: boolean;
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
  },
  effects: {
    *getMusicAllDetailsAndPlay({ payload: id }, { call, put }) {
      yield put({ type: 'setPlaying', payload: false });
      const { data: resMusicUrl } = yield call(apiMusic.getMusicUrl, id);
      const { data: resMusicLyric } = yield call(apiMusic.getMusicLyric, id);
      const { data: resMusicDetail } = yield call(apiMusic.getMusicDetail, id);
      yield put({ type: 'setNowMusicId', payload: id });
      yield put({ type: 'setNowMusicUrl', payload: resMusicUrl.data[0].url });
      yield put({ type: 'setNowMusicLyric', payload: resMusicLyric.lrc.lyric });
      yield put({
        type: 'setNowMusicDetail',
        payload: resMusicDetail.songs[0],
      });
      yield put({ type: 'setPlaying', payload: true });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {});
    },
  },
};

export default IndexModel;
