<script setup lang="ts">
import Gloss from "./Gloss.vue";
defineProps(["gloss"]);


</script>

<template>
  <div class="sense">
    {{ gloss.pos }}
    <div class="gloss">
      <Gloss
        v-for="(meaning,index) of gloss.gloss"
        :key="gloss.sID"
        :meaning="gloss.gloss.length != index+1 ? `${meaning.gloss}; ` : meaning.gloss "
      />
      
    </div>
  </div>
</template>
