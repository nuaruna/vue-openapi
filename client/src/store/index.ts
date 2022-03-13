import Vue from 'vue';
import Vuex from 'vuex';

import { IRootState } from '@/interfaces/ApiBlock';
import { API_BLOCKS_STORE_NAME } from '@/config';
import ApiBlocks from './modules/api-blocks';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    value: 'vuex works',
  } as IRootState,
  modules: {
    [API_BLOCKS_STORE_NAME]: ApiBlocks,
  },
});
