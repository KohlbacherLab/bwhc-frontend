<template>
  <v-container fluid grid-list-md>
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> nicht gefunden</h3>
      <span class="subheading subheading font-weight-thin">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Sie scheinen sich veerirrt zu haben. 
        <strong @click="$router.push('/')">Zurück!</strong>
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
          <p>🤷🏻‍♂️</p>
          <strong>404</strong>
          <br />Seite nicht gefunden.
        </v-card-text>
      </v-card>
    </v-flex>
    <br />
    <v-flex d-flex xs12 sm6 md12>
      <span class="headline font-weight-thin">
        <strong>Das ist ein Fehler!</strong><br />Die angeforderte URL wurde auf diesem Server nicht gefunden
      </span>
    </v-flex>
  </v-container>
</template>
