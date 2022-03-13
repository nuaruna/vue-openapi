import { IApiBlock } from '@/interfaces/ApiBlock';
import * as types from './mutation-types';

export default {
	[types.SET_API_BLOCKS](state: IApiBlock.State, apiBlocks: IApiBlock.ApiBlock[]) {
		state.apiBlocks = apiBlocks;
	},
	[types.SET_PENDING](state: IApiBlock.State, status: boolean) {
		state.pending = status;
	}
};
