<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong></h3>
      <v-btn dark icon color="blue accent-2" align-end
        ><v-icon dark>fas fa-certificate</v-icon>
      </v-btn>
      <span class="subheading font-weight-light">
        bwHC query portal, stats, validation and management.
        <strong @click="$router.push('help')">Help?</strong>
      </span>
      <v-divider class="my-3"></v-divider>
    </v-flex>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6>
        <v-card flat>
          <v-card-title primary class="headline font-weight-light"
            >bwHC Overview</v-card-title
          >
          <v-card-text class="subheading font-weight-light">
            Welcome 'username'<br />
            add details...
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                Quality Check
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading font-weight-light">
                add details...
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                Data Validation
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading font-weight-light">
                add details...
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Query Portal
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-card-text class="subheading font-weight-light">
                    add details...
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import userPanel from "~/components/userPanel";

export default {
  data: () => ({
    //loginDialog: false,
  }),

  components: {
    userPanel,
  },
  /*
  methods: {
    ...mapActions({
      login: "auth/login",
      logout: "auth/logout",
    }),
  },
  */

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let whoami = await axios.get(
        process.env.baseUrl + process.env.port + process.env.me
      );

      return {
        me: users.data.whoami,
      };
    } catch (err) {
      if (err.status === 401) {
        this.$router.push(`/`);
      }
    }
  },
};
</script>