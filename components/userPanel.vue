<template>
  <div>
    <span v-if="iconMenu">
      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/quality_local')">
          <v-icon style="font-size: 2rem">fas fa-check-double</v-icon>
        </v-btn>
        <span>Lokale Qualitätskontrolle Statistik</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/quality_bwhc')">
          <v-icon style="font-size: 2rem">fas fa-globe-europe</v-icon>
        </v-btn>
        <span>Globale Qualitätskontrolle Statistik</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/validate')">
          <v-icon style="font-size: 2rem">fas fa-server</v-icon>
        </v-btn>
        <span>Datenvalidierung</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/query')">
          <v-icon style="font-size: 2rem">fas fa-search</v-icon>
        </v-btn>
        <span>Abfrage Portal</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/me')">
          <v-icon style="font-size: 2rem">fas fa-user</v-icon>
        </v-btn>
        <span>Nutzerdetails</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/admin')">
          <v-icon style="font-size: 2rem">fas fa-user-shield</v-icon>
        </v-btn>
        <span>Admin-Panel</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon @click="logout" slot="activator">
          <v-icon style="font-size: 2rem">fas fa-sign-out-alt</v-icon>
        </v-btn>
        <span>Ausloggen</span>
      </v-tooltip>
    </span>

    <span v-else>
      <v-btn small depressed light @click="$router.push('/quality_local')">
        Lokale QKS<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-check-double</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/quality_bwhc')">
        Globale QKS<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-globe-europe</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/validate')">
        Datenvalidierung<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-server</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/query')">
        Abfrage Portal<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-search</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/me')">
        Nutzerdetails<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-user</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/admin')">
        Admin-Panel<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-user-shield</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="logout">
        Ausloggen<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-sign-out-alt</v-icon
        >
      </v-btn>
    </span>

    <span v-if="iconMenu">
      <v-switch v-model="iconMenu" label="Text anzeigen"> </v-switch
    ></span>
    <span v-else>
      <v-switch v-model="iconMenu" label="Symbole anzeigen"> </v-switch
    ></span>

    <v-divider class="my-3"></v-divider>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      iconMenu: true,
      snackbar: false,
      y: "top",
      x: null,
      mode: "multi-line",
      timeout: 2000,
      text: "Succesfully Logging Out",
    };
  },

  methods: {
    async logout({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      await axios.post(
        process.env.baseUrl + process.env.port + process.env.logout
      );
      let toast = this.$toasted.success("Abmeldung erfolgreich!", {
        theme: "bubble",
        icon: "check_circle",
        position: "top-center",
        duration: 3000,
      });

      this.$router.push(`/`);
    },
  },
};
</script>

