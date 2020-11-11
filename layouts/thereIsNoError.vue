<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <br />
      <br />
      <br />
      <v-flex>
        <h3 v-if="error.statusCode === 404" class="display-3">
          <strong>bwHealthCloud</strong> <br> query expired / page not found
        </h3>
        <h3 v-else class="display-3">
          <strong>bwHealthCloud</strong> <br> an error occured
        </h3>
        <span class="subheading">
        
          <br />
          <v-icon light>home</v-icon> <nuxt-link to="/"> Go to bwHealthCloud Home</nuxt-link>

          or
          
          <nuxt-link to="/query">Submit New Query?</nuxt-link>
        </span>
        <v-divider class="my-3"></v-divider>
      </v-flex>
    </v-container>
  </v-responsive>
</template>

<script>

export default {
  props: ["error"]
};
</script>