<template>
  <v-container fluid grid-list-md>
    <h3 class="display-4 font-weight-bold">
      <strong>bwHealthCloud</strong>
    </h3>
    <span class="headline">
      <v-icon style="font-size: 3rem" color="cyan accent-3"
        >fas fa-cloud
      </v-icon>
      <strong
        >Secure Data Integration Platform for Personalized Medicine</strong
      >
      <br />
    </span>
    <v-divider class="my-3"></v-divider>

 
    <v-layout row wrap>
      
      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                bwHC Request Form
                <br />
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading font-weight-light">
                TBA.
              </v-card-text>
            </v-card>
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

    check() {
      alert("testing");
    },

    submit() {
      //alert("submit clicked");
      let request = {
        username: this.username,
        password: this.password
      };
      //alert(JSON.stringify(request));
      this.login(request);
      this.login(request).then(() => {
        this.$router.push(`/quality/`);
      });
    },
  },
};
</script>