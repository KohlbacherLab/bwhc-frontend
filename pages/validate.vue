<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-1"><v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        > Datenvalidierung</h3>

      <v-divider class="my-3"></v-divider>
    </v-flex>

    <v-layout wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="orange darken-3"
          dark
          max-width="400"
          v-ripple="{ center: true }"
        >
          <v-card-text class="headline font-weight-thin">
            <v-icon color="orange accent-1" dark>fas fa-street-view</v-icon>
            <br />
            <strong>{{ countPatients }}</strong> Patienten
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>

    <v-card flat>
      <v-card-title class="headline font-weight-light">
        Patientenliste
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Suchen"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headerConditions"
        :items="itemsPatients"
        :search="search"
        :rows-per-page-items="[25, 50, 75, 100, 125, 150, 175, 200]"
        no-data-text="Keine Daten verfügbar"
        rows-per-page-text="Zeilen pro Seite"
        no-results-text="keine passenden Ergebnisse gefunden"
      >
        <template slot="items" slot-scope="props">
          <td @click="routeToPatient(props.item.id)">{{ props.item.id }}</td>

          <td @click="routeToPatient(props.item.id)">
            {{ props.item.gender }}
          </td>
          <td @click="routeToPatient(props.item.id)">
            {{ props.item.birthDate }}
          </td>
          <td @click="routeToPatient(props.item.id)">
            {{ props.item.numberOfErrors }}
          </td>
          <td @click="routeToPatient(props.item.id)">
            {{ props.item.numberOfWarnings }}
          </td>
          <td @click="routeToPatient(props.item.id)">
            {{ props.item.numberOfInfos }}
          </td>
          <!--
          <td class="text-xs-right">
            <v-icon small @click="functionalityNotAvailable"
              >fas fa-highlighter</v-icon
            >
          </td>
          -->
        </template>
      </v-data-table>
    </v-card>

    <v-divider class="my-3"></v-divider>
  </v-container>
</template>

<script>
import axios from "axios";
import { dirname } from "path";

import userPanel from "~/components/userPanel";

let seen = true;

export default {
  data: () => ({
    month: false,
    password: "",
    dialogAddPatient: false,
    dateOfBirth: null,
    dateOfDeath: null,
    menuDateOfBirth: false,
    menuDateOfDeath: false,
    genderList: [],
    ecogStatusList: [
      "ECOG Grade 0",
      "ECOG Grade 1",
      "ECOG Grade 2",
      "ECOG Grade 3",
      "ECOG Grade 4",
    ],
    sourceTissueList: ["Primary Tumor", "Metastasis", "N/A"],
    mutationalLoadList: ["High", "Medium", "Low"],
    pathogenicGermlineList: ["true", "false"],
    variantsList: ["SNV", "CNV", "Variants"],
    priorityList: ["1", "2", "3", "4", "5"],
    rebiopsyRequestedList: ["true", "false"],
    rehistologyRequestedList: ["true", "false"],
    dosageList: ["Under 50%", "Over 50%"],
    responseList: [
      "Stable Disease",
      "Progressive Disease",
      "Partial Response",
      "Complete Response",
    ],
    headerConditions: [
      {
        text: "Patienten ID",
        align: "left",
        sortable: true,
        value: "id",
      },
      {
        text: "Geschlecht",
        align: "left",
        sortable: true,
        value: "gender",
      },
      {
        text: "Geburtstag",
        align: "left",
        sortable: true,
        value: "birthDate",
      },
      {
        text: "Anzahl Fehler",
        align: "left",
        sortable: true,
        value: "numberOfErrors",
      },
      {
        text: "Anzahl Warnungen",
        align: "left",
        sortable: true,
        value: "numberOfWarnings",
      },
      {
        text: "Anzahl Infos",
        align: "left",
        sortable: true,
        value: "numberOfInfos",
      },
      /*,
      {
        text: "Aktionen",
        align: "right",
        sortable: false,
        value: "actions",
      },*/
    ],

    patientValidated: false,

    pseudonym: "",
    gender: "",
    search: "",

    editedIndex: -1,

    editedItem: {
      gender: "",
      dateOfBirth: 0,
      dateOfDeath: 0,
    },

    pseudonymRules: [
      (v) => !!v || "Pseudonym is required",
      (v) => v.length >= 10 || "Pseudonym must not be less than 10 characters",
      (v) => v.length <= 35 || "Pseudonym must be more than 35 characters",
    ],
  }),

  computed: {
    functionEvents() {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents;
    },
  },

  components: {
    userPanel,
  },

  watch: {
    menuDateOfBirth(val) {
      val &&
        setTimeout(() => (this.$refs.pickerDateOfBirth.activePicker = "YEAR"));
    },
    menuDateOfDeath(val) {
      val &&
        setTimeout(() => (this.$refs.pickerDateOfDeath.activePicker = "YEAR"));
    },
  },

  methods: {
    methods: {
      dateFunctionEvents(date) {
        const [, , day] = date.split("-");
        if ([12, 17, 28].includes(parseInt(day, 10))) return true;
        if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
        return false;
      },
      monthFunctionEvents(date) {
        const month = parseInt(date.split("-")[1], 10);
        if ([1, 3, 7].includes(month)) return true;
        if ([2, 5, 12].includes(month))
          return ["error", "purple", "rgba(0, 128, 0, 0.5)"];
        return false;
      },
    },

    close() {
      this.dialog = false;
    },

    functionalityNotAvailable() {
      alert("⚠️ Funktionalität nicht verfügbar! 🚧");
    },

    goBack() {
      return window.history.back();
    },

    routeToPatient(id) {
      this.$router.push("patient/" + id);
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let patients = await axios.get(
        process.env.baseUrl + process.env.port + process.env.patient
      );

      //alert(JSON.stringify(patients));

      return {
        itemsPatients: patients.data.entries,
        countPatients: patients.data.total,
      };
    } catch (err) {
      if (err.response.status === 401) {
        return redirect("/");
      } else if (err.response.status === 403) {
        return redirect("/403");
      }
    }
  },
};
</script>
