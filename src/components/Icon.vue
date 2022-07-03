<template>
  <svg aria-hidden="true" class="icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup name="Icon">
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
