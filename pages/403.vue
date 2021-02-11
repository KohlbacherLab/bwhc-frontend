<template>
  <v-container fluid grid-list-md>
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> access denied</h3>
      <span class="subheading font-weight-thin">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >There is nothing to see here <i class="far fa-times-circle"></i> try to
        <strong @click="$router.push('/main')">go back!</strong>
      </span>
    </v-flex>
    <v-divider class="my-3"></v-divider>

    <v-flex d-flex xs12 sm6 md3>
      <v-card
        class="mx-auto"
        flat
        color="grey lighten-3"
        light
        max-width="400"
        v-ripple="{ center: true }"
      >
        <v-card-text class="headline font-weight-thin">
          <p>🙅🏻‍♂️</p>
          <strong>403</strong>
          <br />Forbidden.
        </v-card-text>
      </v-card>
    </v-flex>
    <br />
    <v-flex d-flex xs12 sm6 md12>
      <span class="headline font-weight-thin"
        ><strong>That's an error!</strong><br />We're sorry but you don't have
        access this page or resource.
      </span>
    </v-flex>
  </v-container>
</template>
