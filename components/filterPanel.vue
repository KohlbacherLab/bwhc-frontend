<template>
  <v-navigation-drawer v-model="rightDrawer" :right="right" fixed app>
    <v-list>
      <v-list-tile>
        <h4 class="headline font-weight-regular">Filterkriterien</h4>
      </v-list-tile>

      <v-divider></v-divider>

      <!-- Gender -->
      <v-subheader class="subheading font-weight-regular">{{
        gender.name
      }}</v-subheader>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-flex v-for="gender in gender.items" :key="gender.id">
              <v-checkbox
                v-model="gender.selected"
                :label="gender.value.display"
                hide-details
              >
              </v-checkbox>
            </v-flex>
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
      <v-subheader class="subheading font-weight-regular">{{
        vitalStatus.name
      }}</v-subheader>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex
            v-for="vitalStatus in vitalStatus.items"
            :key="vitalStatus.id"
          >
            <v-checkbox
              v-model="vitalStatus.selected"
              :label="vitalStatus.value.display"
              hide-details
            >
            </v-checkbox>
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
          patientFilter: {
            gender: this.gender,
            ageRange: { min: this.age[0], max: this.age[1] },
            vitalStatus: this.vitalStatus,
          }
        };

        let Response = await axios.put(
          `${serverBaseURL}/${queryId}/filters`,
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
