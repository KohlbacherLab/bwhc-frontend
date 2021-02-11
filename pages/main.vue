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
        <strong @click="$router.push('/help')">Help?</strong>
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
            before clicking on the links above, please check your roles below
            and take a look at the User Roles table on the right side.
            <i class="fas fa-user-tag"></i> If you think that your roles are not
            correct or missing then please get in contact with your local
            bwHealthCloud administrator. <br /><br />
            We are constantly working on improving the user experience, if you
            have any comments/questions regarding the usability of the
            bwHealthCloud portal, please do not hesitate to contact us. You can
            send an e-mail to
            <a href="mailto:aydin-can.polatkan@uni-tuebingen.de">Aydin</a>.
            <br /><br />
            <i class="fas fa-exclamation-triangle"></i> If you are experiencing
            an error, please fill the
            <a href="https://forms.gle/w8Z3CnB3zLN6iNMb7" target="_blank"
              >Bug Report Form</a
            >. <br /><br />
            <i class="far fa-comments"></i> We can't improve bwHealthCloud
            without your valuable feedback, please help us to evaluate the
            portal by filling the following
            <a href="https://forms.gle/zb7SPH5WEmSurh376" target="_blank"
              >UI/UX Feedback Form</a
            >. <br /><br />
            Thanks in advance.<br />
            - your bwHealthCloud development team.
          </v-card-text>
          <v-card-text class="subheading grey--text font-weight-thin">
            You have the following role(s):
            <strong>{{ me.roles.join(", ") }}</strong>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                Screencasts
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading grey--text font-weight-light">
                <i class="fas fa-desktop"></i> Next release will include
                screencast links here.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                Release Notes
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading grey--text font-weight-light">
                <i class="far fa-sticky-note"></i> Next release will include the
                release notes here.
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
                              @click="$router.push('/me')"
                            >
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user</v-icon
                              >
                            </v-btn>
                            <span>User Details</span>
                          </v-tooltip>
                        </td>
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
    me: "",
  }),

  components: {
    userPanel,
  },

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
      }
    }
  },
};
</script>