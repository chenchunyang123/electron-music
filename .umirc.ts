import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: false, path: '/', component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/selected/index' },
      ],
    },
  ],
  history: {
    type: 'hash',
  },
});
