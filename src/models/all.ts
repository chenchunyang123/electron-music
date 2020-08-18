import { Effect, Reducer, Subscription } from 'umi';

export interface IAllModelState {
  nowAudioId: number;
}

interface IAllModelType {
  namespace: string;
  state: IAllModelState;
  reducers: {
    setNowAudioId: Reducer<IAllModelState>;
  };
  effects: {
    query: Effect;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IAllModelType = {
  namespace: 'all',
  state: {
    nowAudioId: 0,
  },
  reducers: {
    setNowAudioId(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *query({ payload }, { call, put }) {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {});
    },
  },
};

export default IndexModel;
