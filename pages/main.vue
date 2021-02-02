<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong></h3>
      <v-btn dark icon color="blue accent-2" align-end
        ><v-icon dark>fas fa-certificate</v-icon>
      </v-btn>
      <span class="subheading font-weight-thin">
        bwHC query portal, stats, validation and management.
        <strong @click="$router.push('help')">Help?</strong>
      </span>
      <v-divider class="my-3"></v-divider>
    </v-flex>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6>
        <v-card flat>
          <v-card-title primary class="headline font-weight-thin"
            >bwHC Overview</v-card-title
          >
          <v-card-text class="subheading font-weight-thin">
            Welcome <strong>{{ me.givenName }}</strong
            >,
          </v-card-text>
          <v-card-text class="subheading grey--text font-weight-light">
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
              <v-card-text class="subheading grey--text font-weight-light">
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
              <v-card-text class="subheading grey--text font-weight-light">
                add details...
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    User Roles
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-card-text class="subheading font-weight-light">
                    <table>
                      <tr>
                        <td>Admin</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/admin')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user-shield</v-icon
                              >
                            </v-btn>
                            <span>User Management</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/me')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user</v-icon
                              >
                            </v-btn>
                            <span>User Details</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Documentarist</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/validate')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-server</v-icon
                              >
                            </v-btn>
                            <span>Data Validation</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/me')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user</v-icon
                              >
                            </v-btn>
                            <span>User Details</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Local ZPM Coordinator</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/quality_local')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-check-double</v-icon
                              >
                            </v-btn>
                            <span>Local Quality Control Stats</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/query')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-search</v-icon
                              >
                            </v-btn>
                            <span>Query Portal</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/me')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user</v-icon
                              >
                            </v-btn>
                            <span>User Details</span>
                          </v-tooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>bwHC-wide ZPM Coordinator</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/quality_local')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-check-double</v-icon
                              >
                            </v-btn>
                            <span>Local Quality Control Stats</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-btn
                            icon
                            slot="activator"
                            @click="$router.push('/quality_bwhc')"
                          >
                            <v-icon style="font-size: 1.4rem"
                              >fas fa-globe-europe</v-icon
                            >
                          </v-btn>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/query')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-search</v-icon
                              >
                            </v-btn>
                            <span>Query Portal</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/me')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user</v-icon
                              >
                            </v-btn>
                            <span>User Details</span>
                          </v-tooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>MTB Coordinator</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/quality_local')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-check-double</v-icon
                              >
                            </v-btn>
                            <span>Local Quality Control Stats</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/me')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user</v-icon
                              >
                            </v-btn>
                            <span>User Details</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Researcher</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/query')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-search</v-icon
                              >
                            </v-btn>
                            <span>Query Portal</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn
                              icon
                              slot="activator"
                              @click="$router.push('/me')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user</v-icon
                              >
                            </v-btn>
                            <span>User Details</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                    </table>
                  </v-card-text>
                  <v-card-text class="subheading grey--text font-weight-thin">
                    You have the following role(s):

                    <strong>{{ me.roles.join(", ") }}</strong>
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
    me: "",
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
        me: whoami.data,
      };
    } catch (err) {
      if (err.status === 401) {
        this.$router.push(`/`);
      } else if (err.response.status === 403) {
        this.$router.push(`/`);
      } else if (me.length === 0) {
        this.$router.push(`/admin`);
      }
    }
  },
};
</script>