<template>
  <div class="apiBlocksList">
    <h4 class="title">Api blocks</h4>
    <Loader v-if="pending" />
    <div v-else class="apiBlocksList__content">
      <div class="collection">
        <a
          href="#!"
          class="collection-item"
          v-for="block of apiBlocks"
          :key="block.id"
          :class="selectedBlockId === block.id ? 'active' : ''"
          @click="initSelectBock(block)"
          >{{ block.name }}</a
        >
      </div>
      <button class="btn" v-if="selectedBlockId" @click="initAddBlock">Add Api block</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { API_BLOCKS_STORE_NAME } from '@/config';
import { IApiBlock } from '@/interfaces/ApiBlock';

const apiBlocksStore = namespace(API_BLOCKS_STORE_NAME);

@Component({
  components: {
    Loader: () => import('@/components/Loader.vue'),
  },
})
export default class BlocksList extends Vue {
  @apiBlocksStore.State('apiBlocks') private apiBlocks!: IApiBlock.ApiBlock[];
  @apiBlocksStore.State('pending') private pending!: boolean;

  @Prop({ required: true }) private selectedBlock!: IApiBlock.ApiBlock | null;
  

  private get selectedBlockId(): string | null {
    if (this.selectedBlock) {
      return this.selectedBlock.id;
    }
    return null;
  }

  private initAddBlock() {
    this.$emit('blockAdd');
  }

  private initSelectBock(block: IApiBlock.ApiBlock) {
    this.$emit('change', block);
  }
}
</script>
<style lang="scss" scoped>
.apiBlocksList {
  padding: 40px;
  &__content {

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  }
}
</style>
