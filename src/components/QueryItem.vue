<script setup lang="ts">
import Sense from "./Sense.vue";
import Kanji from "./Kanji.vue";
import { cloneDeep } from "@apollo/client/utilities/common/cloneDeep";
import * as wanakana from "wanakana";
import Katakana from "./Katakana.vue";
const prop = defineProps(["sense", "reading", "kanji"]);

var filtered_array: Array<any> = cloneDeep(prop.sense);
var words: string[] = [];
filtered_array.forEach((e, i) => {
  if (words.includes(e.pos)) {
    filtered_array.at(i).pos = "";
  } else {
    words.push(e.pos);
  }
});
</script>

<template>
  <div class="results">
    <div class="bartop">
      <template v-if="kanji[0]">
        <Kanji
          v-for="(kan, index) in kanji"
          :key="kan.entry"
          :reading="
            reading[index] && !wanakana.isKatakana(reading[index].elem)
              ? reading[index]
              : reading[0]
          "
          :kanji="kan"
        />
        <Katakana
          v-for="(read, index) in reading"
          :key="read.entry"
          :katakana="read && wanakana.isKatakana(read.elem) ? read : null"
        />
      </template>
      <template v-else>
        <Kanji v-for="read in reading" :key="read.entry" :reading="read" />
      </template>
    </div>
    <Sense v-for="gloss in filtered_array" :gloss="gloss" :key="gloss.sID" />
  </div>
</template>
