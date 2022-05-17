<script setup lang="ts">
defineProps(["katakana"]);
</script>
<template>
  <template v-if="katakana">
    <div class="baritem">
        {{ katakana.elem }}
    </div>
  </template>
</template>
