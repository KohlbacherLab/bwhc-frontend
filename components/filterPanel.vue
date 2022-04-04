<template>
  <v-navigation-drawer v-model="rightDrawer" :right="right" fixed app>
    <v-list>
      <v-list-tile>
        <h4 class="headline font-weight-regular">Filterkriterien</h4>
      </v-list-tile>

      <v-divider></v-divider>

      <!-- Gender -->
      <v-subheader class="subheading font-weight-regular"
        >Geschlecht</v-subheader
      >
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="gender"
              label="Männlich"
              color="indigo"
              value="male"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="gender"
              label="Weiblich"
              color="pink"
              value="female"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="gender"
              label="Andere"
              color="gray"
              value="other"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="gender"
              label="Unbekannt"
              color="gray"
              value="unknown"
              hide-details
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>

      <!-- Age -->
      <v-subheader class="subheading font-weight-regular">Alter</v-subheader>

      <v-card-text>
        <v-range-slider
          v-model="age"
          thumb-color="indigo"
          thumb-size="24"
          thumb-label="always"
        ></v-range-slider>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Gender -->
      <v-subheader class="subheading font-weight-regular"
        >Vital-Status</v-subheader
      >
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="vitalStatus"
              label="Lebend"
              color="green"
              value="Alive"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="vitalStatus"
              label="Verstorben"
              color="red"
              value="Deceased"
              hide-details
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>

      <v-flex d-flex xs11>
        <v-tooltip bottom>
          <v-btn
            class="subheading font-weight-thin"
            block
            left
            dark
            slot="activator"
            color="red darken-1"
            @click="filterQuery"
            >Filtern</v-btn
          >
          <span
            >Klicken Sie hier, um die Ergebnisse der bwHC-Abfrage zu
            filtern</span
          >
        </v-tooltip>
      </v-flex>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";

let serverBaseURL = process.env.baseUrl + process.env.port + process.env.query;

export default {
  props: ["gender", "vitalStatus", "ageRange"],

  data() {
    return {
      right: true,
      rightDrawer: true,
      age: [this.ageRange[0], this.ageRange[1]],
    };
  },

  methods: {
    async filterQuery() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let queryId = this.$route.params.id;

        let filter = {
          id: `${queryId}`,
          filter: {
            genders: this.gender,
            ageRange: { l: this.age[0], r: this.age[1] },
            vitalStatus: this.vitalStatus,
          },
        };

        let Response = await axios.put(
          `${serverBaseURL}/${queryId}/filter`,
          filter
        );

        this.$router.push(`${Response.data.id}`);
        window.location.reload(true);
      } catch (err) {
        if (err.response.status === 401) {
          this.$router.push(`/`);
        } else if (err.response.status === 403) {
          return redirect("/403");
        } else {
          return redirect("/" + err.response.status);
        }
      }
    },
  },
};
</script>
