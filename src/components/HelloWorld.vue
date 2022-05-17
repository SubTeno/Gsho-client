<script setup lang="ts">
import gql from "graphql-tag";
import "../assets/CSS/style.scss";
import { useLazyQuery } from "@vue/apollo-composable";
import { computed, ref, watch } from "@vue/runtime-dom";
import QueryItem from "./QueryItem.vue";
// QUERY
var QUERY = gql`
  query ($query: String, $skip: Int) {
    entry(query: $query, skip: $skip, limit: 5) {
      seq
      jlpt
      reading {
        entry
        elem
        restr
        info
      }
      sense {
        pos
        info
        gloss {
          sID
          gloss
        }
      }
      kanji {
        entry
        elem
        info
      }
    }
  }
`;
const newQuery = ref({
  query: "",
});

var { load, loading, error, result, variables, fetchMore } = useLazyQuery(
  QUERY,
  {
    query: "",
    skip: 0,
  }
);

const res = computed(() => result.value?.entry ?? []);

function makeQuery() {
  load();
  variables.value = {
    query: newQuery.value.query,
    skip: 0,
  };
}

function loadMore() {
  fetchMore({
    variables: { skip: res.value.length },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult;
      return {
        ...previousResult,
        entry: [...previousResult.entry, ...fetchMoreResult.entry],
      };
    },
  });
}
</script>

<template>
  <div class="main">
    <!-- FORM -->
    <div class="form">
      <form @submit.prevent="makeQuery">
        <input v-model="newQuery.query" type="search" placeholder="Search" />
      </form>
    </div>

    <!-- IF LOADING -->
    <div v-if="loading">LOADING</div>
    <!-- ELSE IF ERROR -->
    <div v-else-if="error">ERROR : {{ error.message }}</div>
    <!-- IF RES != NULL -->
    <template v-else-if="res[0]">
      <div class="content">
        <QueryItem
          v-for="entry of res"
          :key="entry.seq"
          :sense="entry.sense"
          :reading="entry.reading"
          :kanji="entry.kanji"
        />
      </div>
    </template>

    <!-- Load More Button -->
    <div v-if="res[0]">
      <a @click="loadMore"> Load More </a>
    </div>
    <!--  -->
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
</style>
