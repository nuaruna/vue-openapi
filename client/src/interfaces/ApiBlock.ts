import { ActionContext } from 'vuex';

export namespace IApiBlock {
  export interface ApiBlock {
    id: string;
    name?: string;
    baseUrl?: string;
    endpoint?: string;
    method?: string;
    headers?: string;
    body?: string;
    query?: string;
  }
  export interface State {
    apiBlocks: ApiBlock[];
    pending: boolean;
  }
}

export interface IRootState {
  value: string;
}

export type TActionContext = ActionContext<IApiBlock.State, IRootState>;
