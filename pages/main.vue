<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong></h3>
      <v-btn disabled icon color="blue accent-2" align-end
        ><v-icon dark>fas fa-cloud</v-icon>
      </v-btn>
      <span class="subheading font-weight-thin">
        bwHC Abfrage-Portal, Statistiken, Validierung und Management.
        <strong @click="$router.push('/help')">Hilfe?</strong>
      </span>
      <v-divider class="my-3"></v-divider>
    </v-flex>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6>
        <v-card flat>
          <v-card-title primary class="headline font-weight-thin"
            >bwHC Übersicht</v-card-title
          >
          <v-card-text class="subheading font-weight-thin">
            Herzlich Willkommen, <strong>{{ me.givenName }}</strong
            >,<br />
            Sie haben die folgende(n) Rolle(n):
            <strong>{{ me.roles.join(", ") }}</strong>
          </v-card-text>
          <v-card-text class="subheading grey--text font-weight-light">
            Bitte überprüfen Sie Ihre Rollen unten und werfen Sie einen Blick
            auf die entsprechenden Zugriffsrechte in der Tabelle rechts.
            <i class="fas fa-user-tag"></i> 
            <br /><br />
            eFalls Sie denken, dass Ihre Rollen nicht vollständig sind,
            nehmen Sie bitte Kontakt mit Ihrem lokalen bwHealthCloud
            Administrator auf. <br />
            <br />
            Falls Sie Fragen oder Anregungen in Bezug auf die Bedienung des
            bwHealthCloud Portals haben, zögern Sie bitte nicht, uns zu
            kontaktieren. Sie können eine E-Mail an
            <a href="mailto:aydin-can.polatkan@uni-tuebingen.de">uns</a>
            senden. <br /><br />
            <i class="fas fa-exclamation-triangle"></i> Falls Sie einen Fehler
            entdecken,<br />füllen Sie bitte das
            <a href="https://forms.gle/w8Z3CnB3zLN6iNMb7" target="_blank"
              >Bug-Report-Formular</a
            >
            aus. <br /><br />
            <i class="far fa-comments"></i> Wir können bwHealthCloud nicht ohne
            Ihr wertvolles Feedback verbessern. Bitte helfen Sie uns, indem Sie
            das folgende
            <a href="https://forms.gle/zb7SPH5WEmSurh376" target="_blank"
              >UI / UX Feedback-Formular</a
            >
            ausfüllen. <br /><br />
            Danke im Voraus.<br /><br />
            - Ihr bwHealthCloud Entwicklungsteam.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Rollen
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-card-text class="subheading font-weight-light">
                    <table>
                      <tr>
                        <td>Adminstrator/in</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-user-shield</v-icon
                              >
                            </v-btn>
                            <span>Admin-Panel</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Dokumentar/in</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-server</v-icon
                              >
                            </v-btn>
                            <span>Datenvalidierung</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>ZPM-Koordinator/in (Lokal)</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-check-double</v-icon
                              >
                            </v-btn>
                            <span>Lokale Qualitätskontrolle Statistik</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-search</v-icon
                              >
                            </v-btn>
                            <span>Abfrage-Portal</span>
                          </v-tooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>ZPM-Koordinator/in (Global)</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-check-double</v-icon
                              >
                            </v-btn>
                            <span>Lokale Qualitätskontrolle Statistik</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-globe-europe</v-icon
                              >
                            </v-btn>
                            <span>Globale Qualitätskontrolle Statistik</span>
                          </v-tooltip>
                        </td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-search</v-icon
                              >
                            </v-btn>
                            <span>Abfrage-Portal</span>
                          </v-tooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>MTB-Koordinator/in</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-check-double</v-icon
                              >
                            </v-btn>
                            <span>Lokale Qualitätskontrolle Statistik</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>MTB-Mitarbeiter/in</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-search</v-icon
                              >
                            </v-btn>
                            <span>Abfrage-Portal</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Forscher/in</td>
                        <td></td>
                        <td>
                          <v-tooltip top>
                            <v-btn disabled icon slot="activator">
                              <v-icon style="font-size: 1.4rem"
                                >fas fa-search</v-icon
                              >
                            </v-btn>
                            <span>Abfrage-Portal</span>
                          </v-tooltip>
                        </td>
                        <td></td>
                      </tr>
                    </table>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex d-flex>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Screencasts
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-card-text class="subheading grey--text font-weight-light">
                    <i class="fas fa-desktop"></i> Nächste Version wird
                    Screencasts Links enthalten.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex d-flex>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Versionshinweise
                  </v-card-title>
                  <v-card-text class="subheading grey--text font-weight-light">
                  Frontend {{version}}<br>
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
    version: process.env.version
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

      localStorage.removeItem("diagnosis");
      localStorage.removeItem("tumorMorphology");
      localStorage.removeItem("mutatedGenes");
      localStorage.removeItem("selectedDrugs");
      localStorage.removeItem("responses");
      localStorage.removeItem("queryId");

      return {
        me: whoami.data,
      };
    } catch (err) {
      if (err.response.status === 401) {
        this.$router.push(`/`);
      } else if (err.response.status === 403) {
        this.$router.push(`/403`);
      } else {
        return redirect("/" + err.response.status);
      }
    }
  },
};
</script>
