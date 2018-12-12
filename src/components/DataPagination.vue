<template>
  <div class="data-table__pagination">
    <ul>
      <li>
        <button @click="prevPage(active - 1)" :disabled="active === 1">
          <i class="material-icons"> keyboard_arrow_left </i>
        </button>
      </li>
      <li v-for="(page, index) in pages" :key="index" :class="{'is-active': page === active}">
        <a :href="'#page=' + page + ''" @click="nextPage(page)" v-if="page">
          {{ page }}
        </a>
      </li>
      <li>
        <button @click="nextPage(active + 1)" :disabled="active === (pages.length - 1)">
          <i class="material-icons"> keyboard_arrow_right </i>
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class DataPagination extends Vue {
  @Prop({ required: true }) pages!: number[];

  @Prop({ required: true }) active!: number;

  @Prop({ required: true }) nextPage!: (nextPage: number) => void;

  @Prop({ required: true }) prevPage!: (nextPage: number) => void;
}
</script>
