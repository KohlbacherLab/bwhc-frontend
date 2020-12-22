<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <h3 class="display-3"><strong>bwHealthCloud</strong> results</h3>

    <span class="subheading font-weight-light">
      <v-btn dark icon color="blue accent-2" align-end @click="goBack">
        <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
      >Query results are displayed below some informative text can be displayed
      here.
      <strong @click="$router.push('../help')">Help?</strong>
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
                      <strong>Mutations:</strong>
                      {{ getQueryParametersMutations.join(", ") }}
                      <br />
                    </span>
                    <span v-if="getQueryParametersDiagnosis.length > 0">
                      <strong>Diagnosis</strong>
                      {{ getQueryParametersDiagnosis.join(", ") }}
                      <br />
                    </span>
                    <span v-if="getQueryParametersDrugs.length > 0">
                      <strong>Drugs</strong>
                      {{ getQueryParametersDrugs.join(", ") }}
                      <br />
                    </span>
                    <span v-if="getQueryParametersResponses.length > 0">
                      <strong>Responses</strong>
                      {{ getQueryParametersResponses.join(", ") }}
                      <br />
                    </span>

                    <strong>Query Type:</strong>
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
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="purple" dark>fas fa-street-view</v-icon></p>
            <strong>{{ itemsFiles.length }}</strong>
            <br />Patients
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="indigo lighten-2"
          dark
          max-width="400"
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="indigo" dark>fas fa-file-medical</v-icon></p>
            <strong>{{ itemsTherapies.length }}</strong>
            <br />Molecular Therapies
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="blue lighten-2"
          dark
          max-width="400"
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="blue">fas fa-comment-medical</v-icon></p>
            <strong>{{ itemsRecommendations.length }}</strong>
            <br />Therapy Recommendations
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="cyan lighten-2"
          dark
          max-width="400"
        >
          <v-card-text class="headline font-weight-thin">
            <p><v-icon color="cyan">fas fa-stethoscope</v-icon></p>
            <strong>{{ itemsGenomicReports.length }}</strong>
            <br />NGS Summaries
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-divider class="my-3"></v-divider>

    <v-tabs color="transparent" fixed-tabs icons-and-text>
      <v-tab class="subheading font-weight-regular" :key="cases"
        >Patients</v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="therapies"
        >Molecular Therapies</v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="recommendations"
        >Therapy Recommendations</v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="genomics"
        >NGS Summaries</v-tab
      >

      <!-- Cases -->
      <v-tab-item>
        <v-card flat light>
          <v-data-table :headers="headerFiles" :items="itemsFiles">
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

      <!-- Therapies -->
      <v-tab-item>
        <v-card flat light>
          <v-data-table
            fluid
            :headers="headerTherapies"
            :items="itemsTherapies"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.status }}</td>
              <td>{{ props.item.recordedOn }}</td>
              <td>{{ props.item.basedOn }}</td>
              <td>{{ props.item.notDoneReason.code }}</td>
              <td>{{ props.item.note }}</td>
              <!--
                <td>
                  <div v-if="props.item.progression === null">-</div>
                  <div v-else>
                    {{ props.item.progression.value }}
                    {{ props.item.progression.unit }}
                  </div>
                </td>
                -->
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- THERAPY RECOMMENDATIONS -->
      <v-tab-item>
        <v-card flat light>
          <v-data-table
            :headers="headerRecommendations"
            :items="itemsRecommendations"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.diagnosis }}</td>
              <td>{{ props.item.issuedOn }}</td>
              <!--
                <td>{{ props.item.drugs.join(", ") }}</td>
                -->
              <td>{{ props.item.medication }}</td>
              <td>{{ props.item.priority }}</td>
              <td>{{ props.item.levelOfEvidence }}</td>
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
          >
            <template slot="items" slot-scope="props">
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
import sparklineChart from "~/components/sparklineChart";
import queryPanel from "~/components/queryPanel";

import util from "~/assets/js/util";

let serverBaseURL =
  process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query`;

export default {
  name: "ProfilePage",

  components: {
    userPanel,
    filterPanel,
    sparklineChart,
    queryPanel,
  },

  data() {
    return {
      diagnosis: Array(),

      drugUsageCat: ["Recommended", "Used"],

      baseChangeCat: [
        "c.76A>C",
        "c.-14G>C",
        "c.88+1G>T",
        "c.89-2A>C",
        "c.*46T>A",
      ],

      aminoAcidChangesCat: [
        "p.Trp26Cys",
        "p.Phe2_Met46",
        "p.Met1_Lys45",
        "p.Trp26Ter",
        "p.Trp26_Leu833del",
      ],

      variantEffectsCat: [
        "Activating",
        "Inactivating",
        "FunctionChanged",
        "ProbActivating",
        "ProbInactivating",
        "ProbFunctionChange",
        "Ambiguous",
        "Benign",
        "NotAvailable",
      ],

      localQuery: false,
      gender: [],
      ageRange: [],
      vitalStatus: [],

      headerFiles: [
        { text: "Managing ZPM", align: "left", value: "managingZPM" },
        { text: "Gender", align: "left", sortable: true, value: "gender" },
        { text: "Age", align: "left", sortable: true, value: "age" },
        { text: "Vital Status", align: "left", value: "vitalStatus" },
      ],

      headerTherapies: [
        { text: "Status", align: "left", value: "status" },
        { text: "Recorded On", align: "left", value: "recordedOn" },
        { text: "Based On", align: "left", sortable: true, value: "basedOn" },
        {
          text: "Not Done Reason",
          align: "left",
          value: "notDoneReason",
        },
        { text: "Note", align: "left", value: "note" },
      ],

      headerRecommendations: [
        {
          text: "Diagnosis",
          align: "left",
          sortable: true,
          value: "diagnosis",
        },
        { text: "Issued On", align: "left", value: "issuedOn" },
        { text: "Medication", align: "left", value: "medication" },
        {
          text: "Priority",
          align: "left",
          value: "priority",
        },
        { text: "Level of Evidence", align: "left", value: "levelOfEvidence" },
      ],

      headerGenomicReports: [
        {
          text: "Specimen",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        { text: "Tumor Entity", align: "left", value: "tumorEntity" },
        { text: "Specimen Type", align: "left", value: "specimenType" },
        {
          text: "Sequencing Type",
          align: "left",
          value: "sequencingType",
        },
        {
          text: "Tumor Cell Content",
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

      let files = await axios.get(`${serverBaseURL}/${params.id}/Patient`);

      //let filter = await axios.get(`${serverBaseURL}/${params.id}/filter`);

      let filter = queryparams.data.filter;

      let therapies = await axios.get(
        `${serverBaseURL}/${params.id}/MolecularTherapy`
      );

      let recommendations = await axios.get(
        `${serverBaseURL}/${params.id}/TherapyRecommendation`
      );

      let genomicReports = await axios.get(
        `${serverBaseURL}/${params.id}/NGSSummary`
      );

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
        itemsFiles: files.data.entries,
        itemsTherapies: therapies.data.entries,
        itemsRecommendations: recommendations.data.entries,
        itemsGenomicReports: genomicReports.data.entries,
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
      if (err.response.status === 401) {
        this.$router.push(`/`);
      }
    }
  },
};
</script>