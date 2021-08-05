<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <h3 class="display-3"><strong>bwHealthCloud</strong> Ergebnisse</h3>

    <span class="subheading font-weight-light">
      <v-btn dark icon color="blue accent-2" align-end @click="goBack">
        <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
      >Abfrageergebnisse werden unten angezeigt.
      <strong @click="$router.push('../help')">Hilfe?</strong>
    </span>
    <v-divider class="my-3"></v-divider>

    <v-flex d-flex>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-icon color="blue accent-3">fas fa-search</v-icon>
          </template>

          <template v-slot:header>
            <span>
              <v-hover>
                <v-card flat>
                  <v-card-text class="subheading font-weight-thin">
                    <span v-if="getQueryParametersMutations.length > 0">
                      <strong>Mutationen:</strong>
                      {{ getQueryParametersMutations.join(", ") }}
                      <br />
                    </span>
                    <span v-if="getQueryParametersDiagnosis.length > 0">
                      <strong>Diagnose:</strong>
                      {{ getQueryParametersDiagnosis.join(", ") }}
                      <br />
                    </span>
                    <span v-if="getQueryParametersDrugs.length > 0">
                      <strong>Wirkstoffe:</strong>
                      {{ getQueryParametersDrugs.join(", ") }}
                      <br />
                    </span>
                    <span v-if="getQueryParametersResponses.length > 0">
                      <strong>Responses:</strong>
                      {{ getQueryParametersResponses.join(", ") }}
                      <br />
                    </span>

                    <strong>Abfragetyp:</strong>
                    {{ getQueryParametersFederated }}
                  </v-card-text>
                </v-card>
              </v-hover>
            </span>
          </template>

          <queryPanel
            v-bind:genesCat="genesCat"
            :diagnosisCat="diagnosisCat"
            :drugsCat="drugsCat"
            :responsesCat="responsesCat"
            :baseChangeCat="baseChangeCat"
            :aminoAcidChangesCat="aminoAcidChangesCat"
            :variantEffectsCat="variantEffectsCat"
            :diagnosis="diagnosis"
            :getQueryParametersMutations="getQueryParametersMutations"
            :getQueryParametersDiagnosis="getQueryParametersDiagnosis"
            :getQueryParametersDrugs="getQueryParametersDrugs"
            :getQueryParametersResponses="getQueryParametersResponses"
            :getQueryParametersFederated="getQueryParametersFederated"
            :queryId="queryId"
            clipped-right
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>

    <v-divider class="my-3"></v-divider>

    <v-layout wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="purple lighten-2"
          dark
          max-width="400"
          v-ripple="{ center: true }"
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="purple" dark>fas fa-street-view</v-icon></p>
            <strong>{{ displayResults.patientTotal }}</strong>
            <br />Patienten
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="hide" d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="indigo lighten-2"
          dark
          max-width="400"
          v-ripple="{ center: true }"
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="indigo">fas fa-stethoscope</v-icon></p>
            <strong>{{ itemsGenomicReportsCount }}</strong>
            <br />NGS Übersichten
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="hide" d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="blue lighten-2"
          dark
          max-width="400"
          v-ripple="{ center: true }"
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="blue">fas fa-comment-medical</v-icon></p>
            <strong>{{ itemsRecommendationsCount }}</strong>
            <br />Therapie-Empfehlungen
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="hide" d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="cyan lighten-2"
          dark
          max-width="400"
          v-ripple="{ center: true }"
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="cyan" dark>fas fa-file-medical</v-icon></p>
            <strong>{{ itemsTherapiesCount }}</strong>
            <br />Molekulare Therapien
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout wrap fluid>
      <v-flex d-flex xs12 sm6 md3>
        <v-card
          flat
          color="grey lighten-2"
          light
          width="250"
          v-ripple="{ center: true }"
        >
          <v-card-text class="title font-weight-thin">
            <strong
              >{{ displayResults.completionStats[0].frequency.count }} ({{
                displayResults.completionStats[0].frequency.percent.toFixed(1)
              }}%)</strong
            >
            <br />{{ displayResults.completionStats[0].level }}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card
          flat
          color="grey lighten-2"
          light
          width="250"
          v-ripple="{ center: true }"
        >
          <v-card-text class="title font-weight-thin">
            <strong
              >{{ displayResults.completionStats[1].frequency.count }} ({{
                displayResults.completionStats[1].frequency.percent.toFixed(1)
              }}%)</strong
            >
            <br />{{ displayResults.completionStats[1].level }}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card
          flat
          color="grey lighten-2"
          light
          width="250"
          v-ripple="{ center: true }"
        >
          <v-card-text class="title font-weight-thin">
            <strong
              >{{ displayResults.completionStats[2].frequency.count }} ({{
                displayResults.completionStats[2].frequency.percent.toFixed(1)
              }}%)</strong
            >
            <br />{{ displayResults.completionStats[2].level }}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card
          flat
          color="grey lighten-2"
          light
          width="250"
          v-ripple="{ center: true }"
        >
          <v-card-text class="title font-weight-thin">
            <strong
              >{{ displayResults.completionStats[3].frequency.count }} ({{
                displayResults.completionStats[3].frequency.percent.toFixed(1)
              }}%)</strong
            >
            <br />{{ displayResults.completionStats[3].level }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-divider v-if="hide" class="my-3"></v-divider>

    <v-tabs v-if="hide" color="blue-grey lighten-5" fixed-tabs icons-and-text>
      <v-tab class="subheading font-weight-regular" :key="cases"
        >Patienten</v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="genomics"
        >NGS Übersichten</v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="recommendations"
        >Therapie-Empfehlungen</v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="therapies"
        >Molekulare Therapien</v-tab
      >

      <!-- CASES -->
      <v-tab-item>
        <v-card flat light>
          <v-data-table
            :headers="headerFiles"
            :items="itemsFiles"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props" no-data>
              <tr @click="routeToPatient(queryId + '&' + props.item.id)">
                <!-- <td>{{ props.item.firstReferral }}</td> -->
                <td>{{ props.item.managingZPM }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.age }}</td>
                <td>{{ props.item.vitalStatus }}</td>
                <!--
                  <td>
                    <div
                      v-if="
                        props.item.survival.PFS === null &&
                        props.item.survival.OS === null
                      "
                    >
                      -
                    </div>
                    <div v-else-if="props.item.survival.PFS === null">
                      PFS: {{ props.item.survival.OS.value }}
                      {{ props.item.survival.OS.unit }}
                    </div>
                    <div v-else-if="props.item.survival.OS === null">
                      OS: {{ props.item.survival.PFS.value }}
                      {{ props.item.survival.PFS.unit }}
                    </div>
                    <div v-else>
                      PFS: {{ props.item.survival.OS.value }}
                      {{ props.item.survival.OS.unit }} / OS:
                      {{ props.item.survival.PFS.value }}
                      {{ props.item.survival.PFS.unit }}
                    </div>
                  </td>
                  -->
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- NGS SUMMARIES -->
      <v-tab-item>
        <v-card flat light>
          <v-data-table
            :headers="headerGenomicReports"
            :items="itemsGenomicReports"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr @click="routeToPatient(queryId + '&' + props.item.patient)">
                <!--
                  <td>
                  {{ props.item.diagnosis.code }} -
                  {{ props.item.diagnosis.display }}
                </td>
                -->
                <td>{{ props.item.specimen }}</td>
                <td>{{ props.item.tumorEntity }}</td>
                <!--
                <td>
                  {{ props.item.sampleAgeAtSequencing.value }}
                  {{ props.item.sampleAgeAtSequencing.unit }}
                </td>
                -->
                <td>{{ props.item.specimenType }}</td>
                <td>{{ props.item.sequencingType }}</td>
                <td>{{ props.item.tumorCellContent }}</td>
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- RECOMMENDATIONS -->
      <v-tab-item>
        <v-card flat light>
          <v-data-table
            :headers="headerRecommendations"
            :items="itemsRecommendations"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr @click="routeToPatient(queryId + '&' + props.item.patient)">
                <td>{{ props.item.icd10 }}</td>
                <!--
                <td>{{ props.item.drugs.join(", ") }}</td>
                -->
                <td>{{ props.item.medication }}</td>
                <td>{{ props.item.priority }}</td>
                <td>{{ props.item.levelOfEvidence }}</td>
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- THERAPIES -->
      <v-tab-item>
        <v-card flat light>
          <v-data-table
            fluid
            :headers="headerTherapies"
            :items="itemsTherapies"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr @click="routeToPatient(queryId + '&' + props.item.patient)">
                <td>{{ props.item.status }}</td>
                <td>{{ props.item.recordedOn }}</td>
                <td>{{ props.item.recommendation }}</td>
                <td>{{ props.item.period }}</td>
                <td>{{ props.item.notDoneReason }}</td>
                <td>{{ props.item.medication }}</td>
                <td>{{ props.item.reasonStopped }}</td>
                <td>{{ props.item.dosage }}</td>
                <td>{{ props.item.note }}</td>
                <td>{{ props.item.response }}</td>
                <td>{{ props.item.progressionDate }}</td>
                <!--
                <td>
                  <div v-if="props.item.progression === null">-</div>
                  <div v-else>
                    {{ props.item.progression.value }}
                    {{ props.item.progression.unit }}
                  </div>
                </td>
                -->
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-divider class="my-3"></v-divider>

    <filterPanel
      v-bind:gender="gender"
      :vitalStatus="vitalStatus"
      :ageRange="ageRange"
      clipped-right
    />
  </v-container>
</template>

<script>
import axios from "axios";
import { stringify } from "querystring";
import { Line } from "vue-chartjs";

import userPanel from "~/components/userPanel";
import filterPanel from "~/components/filterPanel";
import queryPanel from "~/components/queryPanel";

import util from "~/assets/js/util";

let baseURL = process.env.baseUrl + process.env.port;
let serverBaseURL = process.env.baseUrl + process.env.port + process.env.query;

export default {
  name: "ProfilePage",

  components: {
    userPanel,
    filterPanel,
    queryPanel,
  },

  data() {
    return {
      diagnosis: Array(),

      drugUsageCat: ["Recommended", "Used"],
      localQuery: false,
      gender: [],
      ageRange: [],
      vitalStatus: [],

      headerFiles: [
        { text: "ZPM", align: "left", value: "managingZPM" },
        { text: "Geschlecht", align: "left", sortable: true, value: "gender" },
        { text: "Alter", align: "left", sortable: true, value: "age" },
        { text: "Vital-Status", align: "left", value: "vitalStatus" },
      ],

      headerTherapies: [
        { text: "Status", align: "left", value: "status" },
        { text: "Erfassungsdatum", align: "left", value: "recordedOn" },
        {
          text: "Empfehlung",
          align: "left",
          sortable: true,
          value: "recommendation",
        },
        { text: "Zeitraum", align: "left", sortable: true, value: "period" },
        {
          text: "Nicht-Umsetzungs-Grund",
          align: "left",
          value: "notDoneReason",
        },
        {
          text: "Medikation",
          align: "left",
          value: "medication",
        },
        {
          text: "Abbruchsgrund",
          align: "left",
          value: "reasonStopped",
        },
        {
          text: "Dosisdichte",
          align: "left",
          value: "dosage",
        },
        { text: "Bemerkungen", align: "left", value: "note" },
        { text: "Response", align: "left", value: "response" },
        { text: "Progressionsdatum", align: "left", value: "progressionDate" },
      ],

      headerRecommendations: [
        {
          text: "Diagnose",
          align: "left",
          sortable: true,
          value: "icd10",
        },
        { text: "Medikation", align: "left", value: "medication" },
        {
          text: "Priorität",
          align: "left",
          value: "priority",
        },
        { text: "Level of Evidence", align: "left", value: "levelOfEvidence" },
      ],

      headerGenomicReports: [
        {
          text: "Probe",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        { text: "Tumorentität", align: "left", value: "tumorEntity" },
        { text: "Probenart", align: "left", value: "specimenType" },
        {
          text: "Sequenzierungs-Art",
          align: "left",
          value: "sequencingType",
        },
        {
          text: "Tumor-Zellgehalt",
          align: "left",
          value: "tumorCellContent",
        },
      ],
    };
  },

  computed: {
    dataExists() {
      return this.itemsFiles.length > 0;
    },
  },

  methods: {
    routeToPatient(queryAndPatientId) {
      this.$router.push("patient/" + queryAndPatientId);
    },
    goBack() {
      return window.history.back();
    },
    picker(value) {
      return value === "male" ? "blue" : "red";
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let diagnosisCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.coding +
          `/ICD-10-GM`
      );

      let genesCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + `/HGNC`
      );

      let drugsCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + `/ATC`
      );

      let responsesCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.valueSet +
          `/RECIST`
      );

      let queryparams = await axios.get(`${serverBaseURL}/${params.id}`);
      //let filter = await axios.get(`${serverBaseURL}/${params.id}/filter`);
      let filter = queryparams.data.filter;

      let resultSummary;
      let results;
      //let links = queryparams.data._links;
      if (queryparams.data._links["result-summary"]) {
        resultSummary = queryparams.data._links["result-summary"].href;
        results = await axios.get(`${baseURL}` + resultSummary);
      }

      let patients;
      let files;
      let filesEntries;
      if (queryparams.data._links["patients"]) {
        patients = queryparams.data._links["patients"].href;
        files = await axios.get(`${baseURL}` + patients);
        filesEntries = files.data.entries;
      }

      let hide = false;

      let ngsSummaries;
      let genomicReports;
      let genomicReportsEntries;
      let genomicReportsCount;
      if (queryparams.data._links["ngs-summaries"]) {
        ngsSummaries = queryparams.data._links["ngs-summaries"].href;
        //alert("ngs summaries exist " + `${baseURL}` + ngsSummaries);
        genomicReports = await axios.get(`${baseURL}` + ngsSummaries);
        genomicReportsEntries = genomicReports.data.entries;
        genomicReportsCount = genomicReportsEntries.length;
        hide = true;
      }

      let therapyRecommendations;
      let recommendations;
      let recommendationsEntries;
      let recommendationsCount;
      if (queryparams.data._links["therapy-recommendations"]) {
        therapyRecommendations =
          queryparams.data._links["therapy-recommendations"].href;
        recommendations = await axios.get(
          `${baseURL}` + therapyRecommendations
        );
        recommendationsEntries = recommendations.data.entries;
        recommendationsCount = recommendationsEntries.length;
      }

      let molecularTherapies;
      let therapies;
      let therapiesEntries;
      let therapiesCount;
      if (queryparams.data._links["molecular-therapies"]) {
        molecularTherapies =
          queryparams.data._links["molecular-therapies"].href;
        therapies = await axios.get(`${baseURL}` + molecularTherapies);
        therapiesEntries = therapies.data.entries;
        therapiesCount = therapiesEntries.length;
      }

      /*      
      alert("DIAGNOSES CAT " + JSON.stringify(diagnosisCatRaw));
      alert("GENES CAT " + JSON.stringify(genesCatRaw));
      alert("DRUGS CAT " + JSON.stringify(drugsCatRaw));
      alert("RESPONSES CAT " + JSON.stringify(responsesCatRaw));
      alert("QUERY PARAMS " + JSON.stringify(queryparams.data));
      alert("PARAMETERS " + JSON.stringify(queryparams.data.parameters));
      alert("FILTER " + JSON.stringify(filter));
      alert("CASES " + JSON.stringify(files));
      alert("THERAPIES " + JSON.stringify(therapies));
      alert("RECOMMENDATIONS " + JSON.stringify(recommendations));
      alert("GENOMIC REPORTS " + JSON.stringify(genomicReports));
      */

      let diagnosisCat = Array();
      let genesCat = Array();
      let drugsCat = Array();
      let responsesCat = Array();

      for (var i = 0; i < diagnosisCatRaw.data.entries.length; i++) {
        diagnosisCat.push(
          diagnosisCatRaw.data.entries[i].code +
            " - " +
            diagnosisCatRaw.data.entries[i].display
        );
      }

      for (var i = 0; i < genesCatRaw.data.entries.length; i++) {
        genesCat.push(
          genesCatRaw.data.entries[i].symbol +
            " - " +
            genesCatRaw.data.entries[i].name
        );
      }

      for (var i = 0; i < drugsCatRaw.data.entries.length; i++) {
        drugsCat.push(
          drugsCatRaw.data.entries[i].code +
            " - " +
            drugsCatRaw.data.entries[i].name
        );
      }
      for (var i = 0; i < responsesCatRaw.data.concepts.length; i++) {
        responsesCat.push(
          responsesCatRaw.data.concepts[i].code +
            " - " +
            responsesCatRaw.data.concepts[i].display
        );
      }

      let ageRangeRaw = Array();
      ageRangeRaw[0] = filter.ageRange.l;
      ageRangeRaw[1] = filter.ageRange.r;

      let getQueryParametersDrugs = Array();
      for (
        var i = 0;
        i < queryparams.data.parameters.medicationsWithUsage.length;
        i++
      ) {
        getQueryParametersDrugs.push(
          queryparams.data.parameters.medicationsWithUsage[i].code +
            " " +
            queryparams.data.parameters.medicationsWithUsage[i].usage
        );
      }

      let getQueryParametersMutations =
        queryparams.data.parameters.mutatedGenes;
      let getQueryParametersDiagnosis = queryparams.data.parameters.diagnoses;
      let getQueryParametersResponses = queryparams.data.parameters.responses;
      let getQueryParametersFederated = queryparams.data.mode;

      return {
        baseURL: `${serverBaseURL}/${params.id}/files`,
        queryId: `${params.id}`,

        hide: hide,

        displayResults: results.data,

        itemsFiles: filesEntries,
        itemsTherapies: therapiesEntries,
        itemsRecommendations: recommendationsEntries,
        itemsGenomicReports: genomicReportsEntries,

        itemsTherapiesCount: therapiesCount,
        itemsRecommendationsCount: recommendationsCount,
        itemsGenomicReportsCount: genomicReportsCount,

        gender: filter.genders,
        vitalStatus: filter.vitalStatus,
        ageRange: ageRangeRaw,

        diagnosisCat,
        genesCat,
        drugsCat,
        responsesCat,
        getQueryParametersMutations,
        getQueryParametersDiagnosis,
        getQueryParametersDrugs,
        getQueryParametersResponses,
        getQueryParametersFederated,
      };
      
    } catch (err) {
      if (err.status === 401) {
        this.$router.push(`/`);
      } else if (err.status === 403) {
        return redirect("/403");
      } else {
        return redirect("/" + err.status);
      }
      
    }
  },
};
</script>