<script setup lang="ts">
import Gloss from "./Gloss.vue";
defineProps(["gloss"]);


</script>

<template>
  <div class="sense">
    {{ gloss.pos }}
    <div class="gloss">
      <Gloss
        v-for="meaning of gloss.gloss"
        :key="gloss.sID"
        :meaning="meaning"
      />
    </div>
  </div>
</template>
