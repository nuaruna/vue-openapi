import { IApiBlock } from '@/interfaces/ApiBlock';

const state = (): IApiBlock.State => {
	return {
        apiBlocks: [],
		pending: false
	};
};

export default state;
