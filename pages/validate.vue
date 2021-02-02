<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> data validation</h3>

      <span class="subheading font-weight-light">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Patients with incoherent data are listed below.
        <strong @click="$router.push('help')">Help?</strong>
      </span>
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
            <p>
              <v-icon color="orange accent-1" dark>fas fa-street-view</v-icon>
            </p>
            <strong>{{ countPatients }}</strong>
            <br />Patients
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Patient List</v-card-title>
    <v-data-table
      :headers="headerConditions"
      :items="itemsPatients"
      :search="search"
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
          {{ props.item.numberOfIssues }}
        </td>
        <td class="text-xs-right">
          <v-icon small @click="functionalityNotAvailable">fas fa-trash</v-icon>
        </td>
      </template>
    </v-data-table>
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
        text: "Patient ID",
        align: "left",
        sortable: true,
        value: "id",
      },
      {
        text: "Gender",
        align: "left",
        sortable: true,
        value: "gender",
      },
      {
        text: "Birth Date",
        align: "left",
        sortable: true,
        value: "birthDate",
      },
      {
        text: "Number of Issues",
        align: "left",
        sortable: true,
        value: "numberOfIssues",
      },
      {
        text: "Actions",
        align: "right",
        sortable: false,
        value: "actions",
      },
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
      alert("⚠️ Functionality not available! 🚧");
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