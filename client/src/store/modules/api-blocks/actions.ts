import { IApiBlock, TActionContext } from '@/interfaces/ApiBlock';
import * as types from './mutation-types';
import { api } from '@/helpers/api';

const baseUrl = 'http://localhost:3000';

export default {
  async fetchApiBlocksList({ commit }: TActionContext): Promise<boolean> {
    try {
      commit(types.SET_PENDING, true);
      const result: IApiBlock.ApiBlock = await api.get(`${baseUrl}`);
      commit(types.SET_API_BLOCKS, result);

      commit(types.SET_PENDING, false);
      return true;
    } catch (e) {
      console.error('Error, fetch api blocks list action.', e);
      return false;
    } finally {
      commit(types.SET_PENDING, false);
    }
  },

  async fetchApiBlock({ commit }: TActionContext, id: string): Promise<IApiBlock.ApiBlock | null> {
    try {
      commit(types.SET_PENDING, true);
      const result = await api.get(`${baseUrl}/${id}`);
      commit(types.SET_PENDING, false);
      return result || null;
    } catch (e) {
      console.error('Error, fetch api block action.', e);
      return null;
    } finally {
      commit(types.SET_PENDING, false);
    }
  },

  async createApiBlock(
    { commit }: TActionContext,
    createData: Partial<IApiBlock.ApiBlock>
  ): Promise<IApiBlock.ApiBlock | null> {
    try {
      commit(types.SET_PENDING, true);
      const result = await api.post(`${baseUrl}`, createData, {});
      commit(types.SET_PENDING, false);
      return result || null;
    } catch (e) {
      console.error('Error, fetch api block action.', e);
      return null;
    } finally {
      commit(types.SET_PENDING, false);
    }
  },
  
  clearState({ commit }: TActionContext): boolean {
    commit(types.SET_API_BLOCKS, []);
    commit(types.SET_PENDING, false);
    return true;
  },
};
