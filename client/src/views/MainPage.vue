<template>
  <div class="mainPage">
    <BlocksList @change="onSelectedBlockChange" @blockAdd="onBlockAdd" :selectedBlock="selectedBlock" />
    <BlockInfo :selectedBlockId="selectedBlockId" @created="refreshApiBlockList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { API_BLOCKS_STORE_NAME } from '@/config';
import { IApiBlock } from '@/interfaces/ApiBlock';
import { namespace } from 'vuex-class';

const apiBlocksStore = namespace(API_BLOCKS_STORE_NAME);

@Component({
  components: {
    BlocksList: () => import('@/components/BlocksList.vue'),
    BlockInfo: () => import('@/components/BlockInfo.vue'),
  },
})
export default class MainPage extends Vue {
  @apiBlocksStore.Action('fetchApiBlocksList') private fetchApiBlocksList!: () => Promise<boolean>;
  @apiBlocksStore.State('apiBlocks') private apiBlocksList!: IApiBlock.ApiBlock[];

  private selectedBlock: IApiBlock.ApiBlock | null = null;

  private get selectedBlockId(): string | null {
    if (this.selectedBlock) {
      return this.selectedBlock.id;
    }
    return null;
  }

  beforeMount() {
    this.refreshApiBlockList();
  }

  private refreshApiBlockList() {
    this.fetchApiBlocksList().then(() => {
      if (this.apiBlocksList?.length) {
        this.selectedBlock = this.apiBlocksList[0];
      }
    });
  }

  private onSelectedBlockChange(block: IApiBlock.ApiBlock) {
    this.selectedBlock = block;
  }

  private onBlockAdd() {
    this.selectedBlock = null;
  }
}
</script>
<style lang="scss">
.mainPage {
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 20px;
}
</style>
