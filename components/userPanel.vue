<template>
  <div>
    <v-tooltip top>
      <v-btn icon slot="activator" @click="$router.push('/quality')">
        <v-icon>fas fa-check-double</v-icon>
      </v-btn>
      <span>Quality Control Stats</span>
    </v-tooltip>

    <v-tooltip top>
      <v-btn icon slot="activator" @click="$router.push('/validate')">
        <v-icon>fas fa-server</v-icon>
      </v-btn>
      <span>Data Validation</span>
    </v-tooltip>

    <v-tooltip top>
      <v-btn icon slot="activator" @click="$router.push('/query')">
        <v-icon>fas fa-search</v-icon>
      </v-btn>
      <span>Query Portal</span>
    </v-tooltip>

    <v-tooltip top>
      <v-btn icon slot="activator" @click="$router.push('/users')">
        <v-icon>fas fa-user-shield</v-icon>
      </v-btn>
      <span>User Management</span>
    </v-tooltip>

    <v-tooltip top>
      <v-btn icon @click="logout" slot="activator">
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
      <span>Logout</span>
    </v-tooltip>
    <v-divider class="my-3"></v-divider>
  </div>
</template>

<script>
import axios from "axios";
import { dirname } from "path";

export default {
  data() {
    return {
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
      
      this.$router.push(`/`);
    },
  },
};
</script>

