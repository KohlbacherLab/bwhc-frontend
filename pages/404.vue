<template>
  <v-container fluid grid-list-md>
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> Zugriff verweigert</h3>
      <span class="subheading font-weight-thin"> 
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Es gibt nichts zu sehen hier. <i class="far fa-times-circle"></i>
        <strong @click="$router.push('/')">Zurück!</strong>
      </span>
    </v-flex>
    <v-divider class="my-3"></v-divider>

    <v-flex d-flex xs12 sm6 md3>
      <v-card
        class="mx-0"
        flat
        color="grey lighten-3"
        light
        max-width="500"
      >
        <v-card-text class="headline font-weight-thin">
          <p>🙅🏻‍♂️</p>
          <strong>404</strong>
          <br />Nicht gefunden / benutzer existiert nicht.
        </v-card-text>
      </v-card>
    </v-flex>
    <br />
    <v-flex d-flex xs12 sm6 md12>
      <span class="headline font-weight-thin"
        ><strong>Das ist ein Fehler!</strong><br />Es tut uns leid, aber Sie haben keinen Zugriff auf diese Seite oder Ressource.
      </span>
    </v-flex>
  </v-container>
</template>