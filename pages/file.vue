<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-1">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        > Patientendirektzugriff
      </h3>

      <v-divider class="my-3"></v-divider>
    </v-flex>

    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs5>
          <v-select
            v-model="standorte"
            :items="items"
            filled
            label="Standort"
          ></v-select>
        </v-flex>

        <v-flex xs5>
          <v-text-field v-model="patientId" label="Patienten ID"></v-text-field>
        </v-flex>
        <v-flex d-flex xs2>
          <v-btn dark color="blue accent-2" @click="routeToPatient()"
            >Senden</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>

    <v-divider class="my-3"></v-divider>
  </v-container>
</template>

<script>
import axios from "axios";

import userPanel from "~/components/userPanel";

export default {
  data: () => ({
    items: ["Tübingen", "Ulm", "Heidelberg", "Freiburg"],

  }),
  computed: {},

  components: {
    userPanel,
  },

  watch: {},

  methods: {
    goBack() {
      return window.history.back();
    },

    routeToPatient(id) {
      this.$router.push("access/" + this.patientId +
          "&" +
          this.standorte);
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
    } catch (err) {
      if (err.status === 401) {
        return redirect("/");
      } else if (err.status === 403) {
        return redirect("/403");
      } else if (err.status === 400) {
        return redirect("/400");
      } else if (err.status === 500) {
        return redirect("/500");
      } else if (err.status === 404) {
        return redirect("/404");
      } else {
        return redirect("/undefined");
      }
    }
  },
};
</script>
