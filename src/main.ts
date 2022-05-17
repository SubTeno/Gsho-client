import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from "./App.vue";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";




const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "http://localhost:3001/graphql",
});


const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
app.mount("#app")
