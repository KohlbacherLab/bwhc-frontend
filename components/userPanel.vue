<template>
  <div>
    <v-card absolute flat>
      <v-list>
        <v-list-tile avatar>
          <v-tooltip top>
            <v-btn
              icon
              color="grey darken-2"
              flat
              slot="activator"
              @click="$router.push('/me')"
            >
              <v-icon style="font-size: 2rem">fas fa-user</v-icon>
            </v-btn>
            <span>Nutzerdetails</span>
          </v-tooltip>

          <v-list-tile-content>
            <v-list-tile-title>{{ showName }}</v-list-tile-title>
            <v-list-tile-sub-title
              ><strong>{{ showUsername }}</strong> _ {{ version }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          

          <v-card absolute flat class="session-timer-card">
            <v-list>
              <sessionTimer @timerExpired="refreshData" />
            </v-list>
          </v-card>

          <span v-if="iconMenu">
            <v-tooltip top>
              <v-btn
                v-if="localIcon"
                icon
                color="grey darken-2"
                flat
                slot="activator"
                @click="$router.push('/quality_local')"
              >
                <v-icon style="font-size: 2rem">fas fa-check-double</v-icon>
              </v-btn>
              <span>Lokale Qualitätskontrolle Statistik</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                v-if="globalIcon"
                icon
                color="grey darken-2"
                flat
                slot="activator"
                @click="$router.push('/quality_bwhc')"
              >
                <v-icon style="font-size: 2rem">fas fa-globe-europe</v-icon>
              </v-btn>
              <span>Globale Qualitätskontrolle Statistik</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                v-if="validateIcon"
                icon
                color="grey darken-2"
                flat
                slot="activator"
                @click="$router.push('/validate')"
              >
                <v-icon style="font-size: 2rem">fas fa-server</v-icon>
              </v-btn>
              <span>Datenvalidierung</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                v-if="queryIcon"
                icon
                color="grey darken-2"
                flat
                slot="activator"
                @click="$router.push('/query')"
              >
                <v-icon style="font-size: 2rem">fas fa-search</v-icon>
              </v-btn>
              <span>Abfrage Portal</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                v-if="fileIcon"
                icon
                color="grey darken-2"
                flat
                slot="activator"
                @click="$router.push('/file')"
              >
                <v-icon style="font-size: 2rem">fas fa-folder</v-icon>
              </v-btn>
              <span>Patientendirektzugriff</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                v-if="adminIcon"
                icon
                color="grey darken-2"
                flat
                slot="activator"
                @click="$router.push('/admin')"
              >
                <v-icon style="font-size: 2rem">fas fa-user-shield</v-icon>
              </v-btn>
              <span>Admin-Panel</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                icon
                color="blue-grey lighten-4"
                flat
                @click="logout"
                slot="activator"
              >
                <v-icon style="font-size: 2rem">fas fa-sign-out-alt</v-icon>
              </v-btn>
              <span>Ausloggen</span>
            </v-tooltip>
          </span>

          <span v-else>
            <v-btn
              v-if="localIcon"
              small
              depressed
              light
              @click="$router.push('/quality_local')"
            >
              Lokale QKS<v-icon color="grey" style="font-size: 1rem" right
                >fas fa-check-double</v-icon
              >
            </v-btn>

            <v-btn
              v-if="globalIcon"
              small
              depressed
              light
              @click="$router.push('/quality_bwhc')"
            >
              Globale QKS<v-icon color="grey" style="font-size: 1rem" right
                >fas fa-globe-europe</v-icon
              >
            </v-btn>

            <v-btn
              v-if="validateIcon"
              small
              depressed
              light
              @click="$router.push('/validate')"
            >
              Datenvalidierung<v-icon color="grey" style="font-size: 1rem" right
                >fas fa-server</v-icon
              >
            </v-btn>

            <v-btn
              v-if="queryIcon"
              small
              depressed
              light
              @click="$router.push('/query')"
            >
              Abfrage Portal<v-icon color="grey" style="font-size: 1rem" right
                >fas fa-search</v-icon
              >
            </v-btn>

            <v-btn
              v-if="fileIcon"
              small
              depressed
              light
              @click="$router.push('/file')"
            >
              Patientendirektzugriff<v-icon
                color="grey"
                style="font-size: 1rem"
                right
                >fas fa-folder</v-icon
              >
            </v-btn>

            <v-btn
              v-if="adminIcon"
              small
              depressed
              light
              @click="$router.push('/admin')"
            >
              Admin-Panel<v-icon color="grey" style="font-size: 1rem" right
                >fas fa-user-shield</v-icon
              >
            </v-btn>

            <v-btn small depressed light @click="logout">
              Ausloggen<v-icon color="grey" style="font-size: 1rem" right
                >fas fa-sign-out-alt</v-icon
              >
            </v-btn>
          </span>
        </v-list-tile>
      </v-list>
    </v-card>

    <!--
    <span v-if="iconMenu">
      <v-switch v-model="iconMenu" label="Text anzeigen"> </v-switch
    ></span>
    <span v-else>
      <v-switch v-model="iconMenu" label="Symbole anzeigen"> </v-switch
    ></span>
-->
    <v-divider class="my-3"></v-divider>
  </div>
</template>

<script>
import axios from "axios";
import sessionTimer from "~/components/sessionTimer";

export default {
  data: () => ({
    version: process.env.version,
    iconMenu: true,
    snackbar: false,
    localIcon: false,
    globalIcon: false,
    validateIcon: false,
    queryIcon: false,
    fileIcon: false,
    adminIcon: false,
    y: "top",
    x: null,
    mode: "multi-line",
    timeout: 2000,
    text: "Succesfully Logging Out",
    givenName: "",
    showName: "",
    showUsername: "",
  }),

  components: {
    sessionTimer,
  },

  mounted() {
    this.setMenu();
  },

  methods: {
    async refreshData() {
      await this.setMenu();
    },

    async setMenu() {
      let whoami = await axios.get(
        process.env.baseUrl + process.env.port + process.env.me
      );

      this.showName = whoami.data.givenName + " " + whoami.data.familyName;
      this.showUsername = whoami.data.username;

      const giveAccess = await axios.get(
        process.env.baseUrl + process.env.port + `/bwhc`
      );

      const reportingAccess = await axios.get(
        process.env.baseUrl + process.env.port + `/bwhc/mtb/api/reporting/`
      );

      if (reportingAccess.data._links["local-qc-report"]) this.localIcon = true;
      if (reportingAccess.data._links["global-qc-report"])
        this.globalIcon = true;
      if (giveAccess.data._links["data-quality-api"]) this.validateIcon = true;
      if (giveAccess.data._links.peerStatusReport) this.adminIcon = true;
      if (giveAccess.data._links["query-api"]) this.queryIcon = true;
      if (giveAccess.data._links["query-api"]) this.fileIcon = true;
    },

    async logout({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        await axios.post(
          process.env.baseUrl + process.env.port + process.env.logout
        );
        localStorage.clear();
        let toast = this.$toasted.success("Abmeldung erfolgreich!", {
          theme: "bubble",
          icon: "check_circle",
          position: "top-center",
          duration: 3000,
        });
        this.$router.push(`/`);
      } catch (err) {
        if (err.status === 401) {
          return this.$router.push("/");
        } else if (err.status === 403) {
          return this.$router.push("/403");
        } else {
          return this.$router.push("/");
        }
      }
    },
  },
};
</script>
