<template>
  <v-container fluid grid-list-md>
   <h3 class="display-3">
      <strong
        ><v-icon style="font-size: 5rem" color="cyan accent-3"
          >fas fa-cloud
        </v-icon>
        bwHealthCloud</strong
      >
    </h3>
    <span class="headline"
      >Secure Data Integration Platform for Personalized Medicine</span
    >
    <v-divider class="my-3"></v-divider>
    <navPanel />
    <v-divider class="my-3"></v-divider>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6>
        <v-card flat>
          <v-card-title primary class="headline font-weight-light"
            >bwHC Overview</v-card-title
          >
          <v-card-text class="subheading font-weight-light">
            <p>
              Welcome 'username'<br /><br />
              Explain bwHC overview & details here!
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                Quality Check
                <br />
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading font-weight-light">
                TBA. Quality Check Details
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                Data Validation
                <br />
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading font-weight-light">
                TBA. Data Validation Details
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Query Portal
                    <br />
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-card-text class="subheading font-weight-light">
                    TBA. Query Portal Details
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <v-btn
      class="ma-2 font-weight-bold"
      tile
      x-large
      color="red accent-3"
      dark
      @click="feedbackDialog = true"
      >Feedback</v-btn
    >
  </v-container>
</template>

<script>
import navPanel from "~/components/navPanel";
import { mapActions } from "vuex";

export default {
  data: () => ({
    loginDialog: false,
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
  }),

  components: {
    navPanel
  },

  methods: {
    ...mapActions({
      login: "auth/login",
    }),
  },
};
</script>