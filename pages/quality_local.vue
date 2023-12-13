<template>
  <v-responsive>
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
          > Qualitätskontrolle Statistik - Lokal
        </h3>
        <v-divider class="my-3"></v-divider>
      </v-flex>

      <v-layout wrap>
        <v-flex d-flex xs12 sm6 md3>
          <v-card
            class="mx-auto"
            flat
            color="red darken-4"
            dark
            max-width="400"
          >
            <v-card-text class="headline font-weight-thin">
              <v-icon color="red accent-1" dark>fas fa-street-view</v-icon
              ><br />
              <strong>{{ localReport.data.patientTotal }}</strong> Gesamtzahl
              Patienten in {{ localReport.data.zpm }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>

      <v-icon color="red accent-4">fas fa-location-arrow</v-icon>

      <v-card-title class="title font-weight-light"></v-card-title>

      <v-layout wrap fluid>
        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-4"
            light
            width="250"
          >
            <v-card-text class="title font-weight-thin">
              <p><v-icon style="font-size: 1.4rem">fas fa-file-alt</v-icon></p>
              <strong
                >{{ localCompletionStats[0].patient.count }} ({{
                  localCompletionStats[0].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ localCompletionStats[0].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-4"
            light
            width="250"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.6rem"
                  >fas fa-clipboard-check</v-icon
                >
              </p>
              <strong
                >{{ localCompletionStats[1].patient.count }} ({{
                  localCompletionStats[1].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ localCompletionStats[1].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-4"
            light
            width="250"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.6rem">fas fa-id-badge</v-icon>
              </p>
              <strong
                >{{ localCompletionStats[2].patient.count }} ({{
                  localCompletionStats[2].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ localCompletionStats[2].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-4"
            light
            width="250"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem"
                  >fas fa-exclamation-triangle</v-icon
                >
              </p>
              <strong
                >{{ localCompletionStats[3].patient.count }} ({{
                  localCompletionStats[3].patient.percent.toFixed(1)
                }}%)</strong
              >
              <br />{{ localCompletionStats[3].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-flex d-flex>
        <v-switch
          v-if="displayCompletionStats"
          v-model="displayCompletionStats"
          :label="`Mittlere Dauern ausblenden`"
        ></v-switch>
        <v-switch
          v-else
          v-model="displayCompletionStats"
          :label="`Mittlere Dauern einblenden`"
        ></v-switch>
      </v-flex>

      <v-card-title
        v-if="displayCompletionStats"
        class="title font-weight-light"
        >Mittlere Dauern</v-card-title
      >

      <v-layout v-if="displayCompletionStats" wrap fluid>
        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-4"
            light
            width="250"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon>
              </p>
              <strong
                >{{ localAverageDurations[0].patient.value }}
                {{ localAverageDurations[0].patient.unit }}</strong
              >
              <br />{{ localAverageDurations[0].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-4"
            light
            width="250"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                ><v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon>
              </p>
              <strong
                >{{ localAverageDurations[1].patient.value }}
                {{ localAverageDurations[1].patient.unit }}</strong
              >
              <br />{{ localAverageDurations[1].id }}
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md3>
          <v-card
            flat
            color="grey lighten-4"
            light
            width="250"
          >
            <v-card-text class="title font-weight-thin">
              <p>
                <v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                ><v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon
                ><v-icon style="font-size: 1.4rem">fas fa-chevron-right</v-icon>
              </p>
              <strong
                >{{ localAverageDurations[2].patient.value }}
                {{ localAverageDurations[2].patient.unit }}</strong
              >
              <br />{{ localAverageDurations[2].id }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-divider class="my-3"></v-divider>
    </v-container>
    <template></template>
  </v-responsive>
</template>

<script>
import axios from "axios";
import { dirname } from "path";

import userPanel from "~/components/userPanel";

let seen = true;

export default {
  loading: "~/components/loading.vue",

  data: () => ({}),

  components: {
    userPanel,
  },

  computed: {
    form() {
      return {
        //diagnosis: this.diagnosis,
      };
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let localReport = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.reporting +
          "/LocalQCReport"
      );

      // LOCAL COMPLETION STATUS
      let rawLocalCompletionStats = Array();
      if (localReport.data.completionStats) {
        for (var i = 0; i < localReport.data.completionStats.length; i++) {
          let item = {
            id: localReport.data.completionStats[i].level,
            patient: localReport.data.completionStats[i].frequency,
          };
          rawLocalCompletionStats.push(item);
        }
      }

      // LOCAL AVERAGE DURATIONS
      let rawLocalAverageDurations = Array();
      if (localReport.data.averageDurations) {
        for (var i = 0; i < localReport.data.averageDurations.length; i++) {
          let item = {
            id: localReport.data.averageDurations[i].timeSpan,
            patient: localReport.data.averageDurations[i].duration,
          };
          rawLocalAverageDurations.push(item);
        }
      }

      return {
        localReport,
        localCompletionStats: rawLocalCompletionStats,
        localAverageDurations: rawLocalAverageDurations,
        displayCompletionStats: false,
      };
    } catch (err) {
      if (err.response.status === 401) {
        return redirect("/");
      } else if (err.response.status === 403) {
        return redirect("/403");
      } else {
        return redirect("/" + err.response.status);
      }
    }
  },
};
</script>
