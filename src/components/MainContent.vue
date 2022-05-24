<script setup lang="ts">
import gql from "graphql-tag";
import "../assets/CSS/style.scss";
import { useLazyQuery } from "@vue/apollo-composable";
import { computed, watch } from "@vue/runtime-dom";
import QueryItem from "./QueryItem.vue";
import { useRouter, useRoute } from "vue-router";

const res = computed(() => result.value?.entry ?? []);
const newQuery = "";
const route = useRoute();
const router = useRouter();
// QUERY
var QUERY = gql`
  query ($query: String, $skip: Int, $limit: Int) {
    entry(query: $query, skip: $skip, limit: $limit) {
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

var { load, loading, error, result, variables, fetchMore } = useLazyQuery(
  QUERY,
  { 
    query: "",
    skip: 0,
    limit: 5,
  }
);

function makeQuery() {
  load();
  variables.value = {
    query: route.params.id as string,
    skip: 0,
    limit: 5,
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

watch(
  () => route.params.id,
  () => makeQuery()
);
</script>

<template>
  <div class="main">
    <!-- FORM -->
    <div class="form">
      <form @submit.prevent="router.push(newQuery)">
        <input v-model="newQuery" type="search" placeholder="Search" />
      </form>
    </div>
    <!-- IF LOADING -->
    <template v-if="loading">LOADING</template>
    <!-- ELSE IF ERROR -->
    <template v-else-if="error">ERROR : {{ error.message }}</template>
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
    <div class="button" v-if="res[0]">
      <template v-if="res.length % 5 === 0"
        ><a @click="loadMore"> Load More </a></template
      >
    </div>
    <!--  -->
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap");
</style>
