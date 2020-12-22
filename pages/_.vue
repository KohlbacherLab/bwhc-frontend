<template>
  <v-container fluid grid-list-md>
   <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> </h3>
      <span class="subheading subheading font-weight-thin">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Seems like you got lost. 
        <strong @click="$router.push('help')">Help?</strong>
      </span>
    </v-flex>
    <v-divider class="my-3"></v-divider>

    <v-flex d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="grey lighten-1"
          light
          max-width="400"
          v-ripple="{ center: true }"
        >
          <v-card-text class="headline font-weight-thin">
            <p>🤷🏻‍♂️</p>
            <strong>404</strong>
            <br />Page not found.
          </v-card-text>
        </v-card>
      </v-flex>
    
  </v-container>
</template>
