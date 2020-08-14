import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    hmr: true, //表示是否启用 dva model 的热更新。
    // immer: true, //表示是否启用 immer 以方便修改 reducer
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          exact: false,
          path: '/musichall',
          component: '@/pages/musicHall/index',
          routes: [
            {
              exact: true,
              path: '/musichall/selected',
              component: '@/pages/musicHall/selected/index',
            },
            {
              exact: true,
              path: '/musichall/ranking',
              component: '@/pages/musicHall/ranking/index',
            },
            {
              exact: true,
              path: '/musichall/singer',
              component: '@/pages/musicHall/singer/index',
            },
            {
              exact: true,
              path: '/musichall/types',
              component: '@/pages/musicHall/types/index',
            },
          ],
        },
        {
          exact: false,
          path: '/musicvideo',
          component: '@/pages/musicVideo/index',
          routes: [
            {
              exact: true,
              path: '/musicvideo/recommend',
              component: '@/pages/musicVideo/recommend/index',
            },
            {
              exact: true,
              path: '/musicvideo/ranking',
              component: '@/pages/musicVideo/ranking/index',
            },
            {
              exact: true,
              path: '/musicvideo/library',
              component: '@/pages/musicVideo/library/index',
            },
          ],
        },
        {
          exact: true,
          path: '/musicstation',
          component: '@/pages/musicStation/index',
        },
        {
          exact: true,
          path: '/mv/detail',
          component: '@/pages/browserWindow/mvDetail/index',
        },
        {
          exact: true,
          path: '/singer/detail',
          component: '@/pages/musicHall/singer/detail/index',
        },
        {
          exact: true,
          path: '/singer/albums',
          component: '@/pages/musicHall/singer/albums/index',
        },
      ],
    },
  ],
  history: {
    type: 'hash',
  },
});
