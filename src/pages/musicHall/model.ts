import { Effect, Reducer } from 'umi';

// export interface HeroModelState {
//   name: string;
// }

// export interface HeroModelType {
//   namespace: 'hero';
//   state: HeroModelState;
//   effects: {
//     query: Effect;
//   };
//   reducers: {
//     save: Reducer<HeroModelState>;
//   };
// }

// const HeroModel: HeroModelType = {
const MusicHallModel = {
  namespace: 'musicHall',

  state: {},

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default MusicHallModel;
