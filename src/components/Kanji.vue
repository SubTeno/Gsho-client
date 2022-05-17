<script setup lang="ts">
defineProps(["kanji", "reading", "katakana"]);
</script>
<template>
  <div class="baritem">
    <template v-if="kanji">
      <div class="reading">{{ reading.elem }}</div>
      {{ kanji.elem }}
    </template>
    <template v-else-if="reading">
      {{ reading.elem }}
    </template>
  </div>
</template>
