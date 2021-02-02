<template>
  <div>
    <span v-if="iconMenu">
      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/quality_local')">
          <v-icon style="font-size: 2rem">fas fa-check-double</v-icon>
        </v-btn>
        <span>Local Quality Control Stats</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/quality_bwhc')">
          <v-icon style="font-size: 2rem">fas fa-globe-europe</v-icon>
        </v-btn>
        <span>bwHC Wide Quality Control Stats</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/validate')">
          <v-icon style="font-size: 2rem">fas fa-server</v-icon>
        </v-btn>
        <span>Data Validation</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/query')">
          <v-icon style="font-size: 2rem">fas fa-search</v-icon>
        </v-btn>
        <span>Query Portal</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/me')">
          <v-icon style="font-size: 2rem">fas fa-user</v-icon>
        </v-btn>
        <span>User Details</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon slot="activator" @click="$router.push('/admin')">
          <v-icon style="font-size: 2rem">fas fa-user-shield</v-icon>
        </v-btn>
        <span>User Management</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn icon @click="logout" slot="activator">
          <v-icon style="font-size: 2rem">fas fa-sign-out-alt</v-icon>
        </v-btn>
        <span>Logout</span>
      </v-tooltip>
    </span>

    <span v-else>
      <v-btn small depressed light @click="$router.push('/quality_local')">
        Local QC<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-check-double</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/quality_bwhc')">
        bwHC QC<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-globe-europe</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/validate')">
        Data Validation<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-server</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/query')">
        Query Portal<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-search</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/me')">
        User Details<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-user</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="$router.push('/admin')">
        User Management<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-user-shield</v-icon
        >
      </v-btn>

      <v-btn small depressed light @click="logout">
        Logout<v-icon color="grey" style="font-size: 1rem" right
          >fas fa-sign-out-alt</v-icon
        >
      </v-btn>
    </span>

    <span v-if="iconMenu">
      <v-switch v-model="iconMenu" label="show text"> </v-switch
    ></span>
    <span v-else>
      <v-switch v-model="iconMenu" :label="`show icons`"> </v-switch
    ></span>

    <v-divider class="my-3"></v-divider>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

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

  computed: {
    ...mapGetters({
      admin: "auth/admin",
      documentarist: "auth/documentarist",
      global: "auth/global",
      local: "auth/local",
      mtb: "auth/mtb",
      researcher: "auth/researcher",
    }),
  },

  methods: {
    async logout({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      await axios.post(
        process.env.baseUrl + process.env.port + process.env.logout
      );
      let toast = this.$toasted.success("Logout Successful!", {
        theme: "bubble",
        icon: "check_circle",
        position: "top-center",
        duration: 3000,
      });

      this.$router.push(`/`);
    },
  },

  async fetch({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;
  },
};
</script>

