<template>
  <div class="apiBlockInfo">
    <Loader v-if="pending || loading" />
    <div v-else>
      <h4 class="apiBlockInfo__name title">{{ selectedBlockId ? currentBlock.name : 'Create new Api block' }}</h4>
      <div class="row" v-if="!selectedBlockId">
        <div class="input-field">
          <label for="baseUrl">Name</label>
          <input id="baseUrl" type="text" v-model="currentBlock.name" :readonly="readonly" />
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="baseUrl" :class="readonly ? 'active' : ''">Base Url</label>
          <input id="baseUrl" type="text" v-model="currentBlock.baseUrl" :readonly="readonly" />
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="endpoint" :class="readonly ? 'active' : ''">Endpoint</label>
          <input id="endpoint" type="text" v-model="currentBlock.endpoint" :readonly="readonly" />
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="method" :class="readonly ? 'active' : ''">Method</label>
          <input id="method" type="text" v-model="currentBlock.method" :readonly="readonly" />
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="headers" :class="readonly ? 'active' : ''">Headers</label>
          <textarea
            id="headers"
            class="materialize-textarea"
            style="height: 200px"
            v-model="currentBlock.headers"
            :readonly="readonly"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="body" :class="readonly ? 'active' : ''">Body</label>
          <textarea
            id="body"
            class="materialize-textarea"
            style="height: 200px"
            v-model="currentBlock.body"
            :readonly="readonly"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="query" :class="readonly ? 'active' : ''">Query</label>
          <textarea
            id="query"
            class="materialize-textarea"
            style="height: 200px"
            v-model="currentBlock.query"
            :readonly="readonly"
          ></textarea>
        </div>
      </div>
      <button class="btn" @click="initCreateBlock" v-if="!selectedBlockId">Save</button>
      <button class="btn" @click="initExecuteBlock" v-else>Execute</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { API_BLOCKS_STORE_NAME } from '@/config';
import { IApiBlock } from '@/interfaces/ApiBlock';
import { api } from '@/helpers/api';
import axios, { Method } from 'axios';

const apiBlocksStore = namespace(API_BLOCKS_STORE_NAME);

@Component({
  components: {
    Loader: () => import('@/components/Loader.vue'),
  },
})
export default class BlockInfo extends Vue {
  @apiBlocksStore.State('apiBlocks') private apiBlocks!: IApiBlock.ApiBlock[];
  @apiBlocksStore.Action('fetchApiBlock') private fetchApiBlock!: (id: string) => Promise<IApiBlock.ApiBlock>;
  @apiBlocksStore.Action('createApiBlock') private createApiBlock!: (
    params: Partial<IApiBlock.ApiBlock>
  ) => Promise<IApiBlock.ApiBlock>;
  @apiBlocksStore.State('pending') private pending!: boolean;

  @Prop({ required: true }) private selectedBlockId!: string | null;

  private loading = false;
  private currentBlock: IApiBlock.ApiBlock = {
    id: '',
    name: '',
    body: '',
    method: '',
    baseUrl: '',
    headers: '',
    query: '',
    endpoint: '',
  };

  private get readonly(): boolean {
    return !!this.selectedBlockId;
  }

  private async initCreateBlock() {
    const createParams: Partial<IApiBlock.ApiBlock> = {
      name: this.currentBlock.name,
      baseUrl: this.currentBlock.baseUrl,
      endpoint: this.currentBlock.endpoint,
      body: this.currentBlock.body,
      headers: this.currentBlock.headers,
      query: this.currentBlock.query,
      method: this.currentBlock.method,
    };
    this.loading = true;
    await this.createApiBlock(createParams);
    this.currentBlock = {
      id: '',
      name: '',
      body: '',
      method: '',
      baseUrl: '',
      headers: '',
      query: '',
      endpoint: '',
    };
    this.loading = false;
    this.$emit('created');
  }

  @Watch('selectedBlockId', { immediate: true })
  private async onSelectedBlockIdChange(id: string | null): Promise<void> {
    if (id) {
      this.loading = true;
      this.currentBlock = await this.fetchApiBlock(id);
      this.loading = false;
    } else {
      this.currentBlock = {
        id: '',
        name: '',
        body: '',
        method: '',
        baseUrl: '',
        headers: '',
        query: '',
        endpoint: '',
      };
    }
  }

  private async initExecuteBlock() {
    const executingBlock = await this.fetchApiBlock(this.currentBlock.id);
    const http = axios.create();

    const response = await http({
      baseURL: `${executingBlock.baseUrl}${executingBlock.endpoint}`,
      data: executingBlock.body ? JSON.parse(executingBlock.body) || '' : undefined,
      headers: executingBlock.headers ? JSON.parse(executingBlock.headers) || '' : undefined,
      method: executingBlock.method as Method,
      params: executingBlock.query ? JSON.parse(executingBlock.query) || '' : undefined,
    });

    console.log(response);
  }
}
</script>
<style lang="scss" scoped>
.apiBlockInfo {
  padding: 40px;
  &__name {
    color: blue;
  }
}
</style>
