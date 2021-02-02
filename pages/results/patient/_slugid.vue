<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <h3 class="display-3"><strong>bwHealthCloud</strong> patient</h3>
    <span class="subheading font-weight-light">
      <v-btn dark icon color="blue accent-2" align-end @click="goBack">
        <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
      >Query results are displayed below some informative text can be displayed
      here.
      <strong @click="$router.push('../help')">Help?</strong>
    </span>

    <v-divider class="my-3"></v-divider>
    <div id="patientCard"></div>
    <v-flex xs12>
      <v-card
        flat
        :color="genderCheck(patient.gender)"
        dark
        left
        max-width="450"
      >
        <br />
        <v-card-actions>
          <v-layout align-center>
            <v-list-tile class="grow">
              <v-tooltip top>
                <span>Male</span>
              </v-tooltip>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1"
                  >fas fa-calendar-day</v-icon
                >
                <span>Date of Birth</span>
              </v-tooltip>
              <span class="heading mr-2">{{ birthDate }}</span>
              <span class="mr-2">·</span>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1"
                  >fas fa-location-arrow</v-icon
                >
                <span>Managing ZPM</span>
                <span>Age</span>
              </v-tooltip>
              <span class="subheading mr-2">{{ managingZPM }}</span>
              <span class="mr-2">·</span>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1">fas fa-shield-alt</v-icon>
                <span>Insurance</span>
              </v-tooltip>
              <span class="subheading mr-2">{{ insurance }}</span>
            </v-list-tile>
          </v-layout>
        </v-card-actions>
        <v-card-title>Patient ID: {{ patientId }} </v-card-title>
      </v-card>
    </v-flex>
    <br />
    <v-flex>
      <v-btn flat fab dark medium color="red accent-3" @click="snackbar = true">
        <!-- @click="notifyCase" -->
        <v-icon>fas fa-bell</v-icon>
      </v-btn>

      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        ⚠️ Simple demonstration 🚧 The treating doctor or facility notified.
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-flex>

    <!-- DIAGNOSES -->
    <div id="diagnoses"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Diagnoses</v-card-title>
    <v-data-table
      :headers="headerDiagnoses"
      :items="diagnoses"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.recordedOn }}</td>
          <td>{{ props.item.icd10.display }}</td>
          <td>{{ props.item.icdO3T }}</td>
          <td>
            {{ props.item.whoGrade.code }} - {{ props.item.whoGrade.system }}
          </td>
          <td>{{ props.item.histologyReports }}</td>
          <td>{{ props.item.statusHistory }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- FAMILY MEMBER DIAGNOSES -->
    <div id="familyMemberDiagnoses"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Family Member Diagnoses</v-card-title
    >
    <v-data-table
      :headers="headerFamilyMemberDiagnoses"
      :items="familyMemberDiagnoses"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>
            {{ props.item.relationship.code }} -
            {{ props.item.relationship.system }}
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- PREVIOUS GUIDELINE THERAPY -->
    <div id="previousGuidelineTherapy"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Previous Guideline Therapies</v-card-title
    >
    <v-data-table
      :headers="headerPreviousGuidelineTherapies"
      :items="previousGuidelineTherapies"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.therapyLine }}</td>
          <td>{{ props.item.medication }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- LAST GUIDELINE THERAPY -->
    <div id="lastGuidelineTherapy"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Last Guideline Therapy</v-card-title
    >
    <v-data-table
      :headers="headerLastGuidelineTherapy"
      :items="lastGuidelineTherapy"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.therapyLine }}</td>
          <!-- <td>{{ props.item.period.start }}</td> -->
          <td>{{ props.item.medication }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- ECOG STATUS -->
    <div id="ecogStatus"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">ECOG Status</v-card-title>
    <v-data-table
      :headers="headerEcogStatus"
      :items="ecogStatus"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.effectiveDate }}</td>
          <td>{{ props.item.value.code }} - {{ props.item.value.system }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- SPECIMENS -->
    <div id="specimens"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Specimens</v-card-title>
    <v-data-table
      :headers="headerSpecimens"
      :items="specimens"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.icd10.code }} - {{ props.item.icd10.display }}</td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.collection.date }}</td>
          <td>{{ props.item.collection.localization }}</td>
          <td>{{ props.item.collection.method }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- HISTOLOGY REPORTS -->
    <div id="specimens"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Histology Reports</v-card-title
    >
    <v-data-table
      :headers="headerHistologyReports"
      :items="histologyReports"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.specimen }}</td>
          <td>{{ props.item.issuedOn }}</td>
          <!-- <td>{{ props.item.icdO3M.code }} - {{ props.item.icdO3M.display }}</td> -->
          <td>{{ props.item.note }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- NGS REPORTS -->
    <div id="ngsReports"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">NGS Reports</v-card-title>
    <v-data-table
      :headers="headerNgsReports"
      :items="ngsReports"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.specimen }}</td>
          <td>{{ props.item.issueDate }}</td>
          <td>{{ props.item.sequencingType }}</td>
          <td>{{ props.item.metadata }}</td>
          <td>{{ props.item.tumorCellContent }}</td>
          <td>{{ props.item.brcaness }}</td>
          <td>{{ props.item.msi }}</td>
          <td>{{ props.item.tmb }}</td>
          <td>{{ props.item.simpleVariants }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- RECOMMENDATIONS -->
    <div id="recommendations"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Recommendations</v-card-title
    >

    <v-data-table
      :headers="headerRecommendations"
      :items="recommendations"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.issuedOn }}</td>
          <td>{{ props.item.medication }}</td>
          <td>{{ props.item.priority }}</td>
          <td>{{ props.item.levelOfEvidence }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- CARE PLANS -->
    <div id="carePlans"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Care Plans</v-card-title>

    <v-data-table
      :headers="headerCarePlans"
      :items="carePlans"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.issuedOn }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.recommendations }}</td>
          <td>{{ props.item.geneticCounsellingRequest }}</td>
          <td>{{ props.item.rebiopsyRequests }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- GENETIC COUNSELLING REQUESTS -->
    <div id="geneticCounsellingRequests"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Genetic Counselling Requests</v-card-title
    >

    <v-data-table
      :headers="headerGeneticCounsellingRequests"
      :items="geneticCounsellingRequests"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.issuedOn }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- REBIOPSY REQUESTS -->
    <div id="rebiopsyRequests"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Rebiopsy Requests</v-card-title
    >

    <v-data-table
      :headers="headerRebiopsyRequests"
      :items="rebiopsyRequests"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.specimen }}</td>
          <td>{{ props.item.issuedOn }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- CLAIMS -->
    <div id="claims"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Claims</v-card-title>

    <v-data-table
      :headers="headerClaims"
      :items="claims"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.issuedOn }}</td>
          <td>{{ props.item.therapy }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- CLAIM RESPONSES -->
    <div id="claimResponses"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Claim Responses</v-card-title
    >

    <v-data-table
      :headers="headerClaimResponses"
      :items="claimResponses"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.claim }}</td>
          <td>{{ props.item.issuedOn }}</td>
          <td>{{ props.item.status }}</td>
          <td>{{ props.item.reason }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- MOLECULAR THERAPIES -->
    <div id="molecularTherapies"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Molecular Therapies</v-card-title
    >

    <v-data-table
      :headers="headerMolecularTherapies"
      :items="molecularTherapies"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.recordedOn }}</td>
          <td>{{ props.item.basedOn }}</td>
          <td>{{ props.item.period }}</td>
          <td>{{ props.item.medication }}</td>
          <td>{{ props.item.dosage }}</td>
          <td>{{ props.item.note }}</td>
          <td>{{ props.item.status }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- RESPONSES -->
    <div id="responses"></div>
    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Responses</v-card-title>
    <v-data-table
      :headers="headerResponses"
      :items="responses"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.therapy }}</td>
          <td>{{ props.item.effectiveDate }}</td>
          <td>{{ props.item.value.code }} - {{ props.item.value.system }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-btn
      small
      icon
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <v-divider class="my-3"></v-divider>
    <!--
    <v-btn
      class="ma-2 font-weight-bold"
      tile
      small
      color="red accent-3"
      dark
      @click="logout()"
      >Logout</v-btn
    >
    -->
  </v-container>
</template>

<script>
import axios from "axios";

import userPanel from "~/components/userPanel";

let serverBaseURL =
  process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query`;

export default {
  data() {
    return {
      search: "",
      snackbar: false,
      y: "top",
      headerDiagnoses: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Recorded On",
          align: "left",
          sortable: true,
          value: "recordedOn",
        },
        {
          text: "ICD-10",
          align: "left",
          sortable: true,
          value: "icd10",
        },
        {
          text: "ICD-O-3 Topology",
          align: "left",
          sortable: true,
          value: "icdO3T",
        },
        {
          text: "Who Grade",
          align: "left",
          sortable: true,
          value: "whoGrade",
        },
        {
          text: "Histology Reports",
          align: "left",
          sortable: true,
          value: "histologyReports",
        },
        {
          text: "Status History",
          align: "left",
          sortable: true,
          value: "statusHistory",
        },
      ],

      headerFamilyMemberDiagnoses: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Relationship",
          align: "left",
          sortable: true,
          value: "relationship",
        },
      ],

      headerPreviousGuidelineTherapies: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Therapy Line",
          align: "left",
          sortable: true,
          value: "therapyLine",
        },
        {
          text: "Medication",
          align: "left",
          sortable: true,
          value: "medication",
        },
      ],

      headerLastGuidelineTherapy: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Therapy Line",
          align: "left",
          sortable: true,
          value: "therapyLine",
        },
        {
          text: "Period",
          align: "left",
          sortable: true,
          value: "period",
        },
        {
          text: "Medication",
          align: "left",
          sortable: true,
          value: "medication",
        },
      ],

      headerEcogStatus: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Effective Date",
          align: "left",
          sortable: true,
          value: "effectiveDate",
        },
        {
          text: "Value",
          align: "left",
          sortable: true,
          value: "value",
        },
      ],

      headerSpecimens: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "ICD-10",
          align: "left",
          sortable: true,
          value: "icd10",
        },
        {
          text: "Type",
          align: "left",
          sortable: true,
          value: "type",
        },
        {
          text: "Collection Date",
          align: "left",
          sortable: true,
          value: "collection",
        },
        {
          text: "Specimen Localization",
          align: "left",
          sortable: true,
          value: "collection",
        },
        {
          text: "Collection Method",
          align: "left",
          sortable: true,
          value: "collection",
        },
      ],

      headerHistologyReports: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Specimen",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        {
          text: "Issued On",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "ICD-O-3 Morphology",
          align: "left",
          sortable: true,
          value: "icdO3M",
        },
        {
          text: "Note",
          align: "left",
          sortable: true,
          value: "note",
        },
      ],

      headerNgsReports: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Specimen",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        {
          text: "Issue Date",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Sequencing Type",
          align: "left",
          sortable: true,
          value: "sequencingType",
        },
        {
          text: "Metadata",
          align: "left",
          sortable: true,
          value: "metadata",
        },
        {
          text: "Tumor Cell Content",
          align: "left",
          sortable: true,
          value: "tumorCellContent",
        },
        {
          text: "Brcaness",
          align: "left",
          sortable: true,
          value: "brcaness",
        },
        {
          text: "MSI",
          align: "left",
          sortable: true,
          value: "msi",
        },
        {
          text: "TMB",
          align: "left",
          sortable: true,
          value: "tmb",
        },
        {
          text: "Simple Variants",
          align: "left",
          sortable: true,
          value: "simpleVariants",
        },
      ],

      headerRecommendations: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Issued On",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Medication",
          align: "left",
          sortable: true,
          value: "medication",
        },
        {
          text: "Priority",
          align: "left",
          sortable: true,
          value: "priority",
        },
        {
          text: "Level Of Evidence",
          align: "left",
          sortable: true,
          value: "levelOfEvidence",
        },
      ],

      headerCarePlans: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Issued On",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Description",
          align: "left",
          sortable: true,
          value: "description",
        },
        {
          text: "Recommendations",
          align: "left",
          sortable: true,
          value: "recommendations",
        },
        {
          text: "Genetic Counselling Request",
          align: "left",
          sortable: true,
          value: "geneticCounsellingRequest",
        },
        {
          text: "Rebiopsy Request",
          align: "left",
          sortable: true,
          value: "rebiopsyRequests",
        },
      ],

      headerGeneticCounsellingRequests: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Issued On",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
      ],

      headerRebiopsyRequests: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Specimen",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        {
          text: "Issued On",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
      ],

      headerClaims: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Issued On",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Therapy",
          align: "left",
          sortable: true,
          value: "therapy",
        },
      ],

      headerClaimResponses: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Patient",
          align: "left",
          sortable: true,
          value: "patient",
        },
        {
          text: "Issued On",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Status",
          align: "left",
          sortable: true,
          value: "status",
        },
        {
          text: "Reason",
          align: "left",
          sortable: true,
          value: "reason",
        },
      ],

      headerMolecularTherapies: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Recorded On",
          align: "left",
          sortable: true,
          value: "recordedOn",
        },
        {
          text: "Based On",
          align: "left",
          sortable: true,
          value: "basedOn",
        },
        {
          text: "Period",
          align: "left",
          sortable: true,
          value: "period",
        },
        {
          text: "Medication",
          align: "left",
          sortable: true,
          value: "medication",
        },
        {
          text: "Dosage",
          align: "left",
          sortable: true,
          value: "dosage",
        },
        {
          text: "Note",
          align: "left",
          sortable: true,
          value: "note",
        },
        {
          text: "Status",
          align: "left",
          sortable: true,
          value: "status",
        },
      ],

      headerResponses: [
        {
          text: "ID",
          align: "left",
          sortable: true,
          value: "id",
        },
        {
          text: "Therapy",
          align: "left",
          sortable: true,
          value: "therapy",
        },
        {
          text: "Effective Date",
          align: "left",
          sortable: true,
          value: "effectiveDate",
        },
        {
          text: "Value (Code - System)",
          align: "left",
          sortable: true,
          value: "value",
        },
      ],
    };
  },

  components: {
    userPanel,
  },

  methods: {
    goBack() {
      return window.history.back();
    },
    showMutations(genomicReportId) {
      //alert(genomicReportId);
    },

    avatarCheck(gender) {
      if (gender == "male") return "blue";
      else if (gender == "female") return "pink";
      else return "gray";
    },

    genderCheck(gender) {
      if (gender == "male") return "blue";
      else if (gender == "female") return "pink";
      else return "gray";
    },
  },

  async asyncData({ params, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    const [slug, id] = params.slugid.split("&");

    let mtbFile = await axios.get(`${serverBaseURL}/${slug}/MTBFile/${id}`);

    // DIAGNOSES
    let rawDiagnoses = Array();
    if (mtbFile.data.diagnoses) {
      for (var i = 0; i < mtbFile.data.diagnoses.length; i++) {
        let item = {
          id: mtbFile.data.diagnoses[i].id,
          patient: mtbFile.data.diagnoses[i].patient,
          recordedOn: mtbFile.data.diagnoses[i].recordedOn,
          icd10: mtbFile.data.diagnoses[i].icd10,
          whoGrade: mtbFile.data.diagnoses[i].whoGrade,
          histologyReports: mtbFile.data.diagnoses[i].histologyReports,
          statusHistory: mtbFile.data.diagnoses[i].statusHistory,
        };
        rawDiagnoses.push(item);
      }
    }

    // FAMILY MEMBER DIAGNOSES
    let rawFamilyMemberDiagnoses = Array();
    if (mtbFile.data.familyMemberDiagnoses) {
      for (var i = 0; i < mtbFile.data.familyMemberDiagnoses.length; i++) {
        let item = {
          id: mtbFile.data.familyMemberDiagnoses[i].id,
          patient: mtbFile.data.familyMemberDiagnoses[i].patient,
          relationship: mtbFile.data.familyMemberDiagnoses[i].relationship,
        };
        rawFamilyMemberDiagnoses.push(item);
      }
    }

    // PREVIOUS GUIDELINE THERAPIES
    let rawPreviousGuidelineTherapies = Array();
    if (mtbFile.data.previousGuidelineTherapies) {
      for (var i = 0; i < mtbFile.data.previousGuidelineTherapies.length; i++) {
        let item = {
          id: mtbFile.data.previousGuidelineTherapies[i].id,
          patient: mtbFile.data.previousGuidelineTherapies[i].patient,
          therapyLine: mtbFile.data.previousGuidelineTherapies[i].therapyLine,
          medication: mtbFile.data.previousGuidelineTherapies[i].medication,
        };
        rawPreviousGuidelineTherapies.push(item);
      }
    }

    // LAST GUIDELINE THERAPIES
    let rawLastGuidelineTherapy = Array();

    let item = {
      id: mtbFile.data.lastGuidelineTherapy.id,
      patient: mtbFile.data.lastGuidelineTherapy.patient,
      therapyLine: mtbFile.data.lastGuidelineTherapy.therapyLine,
      period: mtbFile.data.lastGuidelineTherapy.period,
      medication: mtbFile.data.lastGuidelineTherapy.medication,
    };
    rawLastGuidelineTherapy.push(item);

    // ECOG STATU
    let rawEcogStatus = Array();
    if (mtbFile.data.ecogStatus) {
      for (var i = 0; i < mtbFile.data.ecogStatus.length; i++) {
        let item = {
          id: mtbFile.data.ecogStatus[i].id,
          patient: mtbFile.data.ecogStatus[i].patient,
          effectiveDate: mtbFile.data.ecogStatus[i].effectiveDate,
          value: mtbFile.data.ecogStatus[i].value,
        };
        rawEcogStatus.push(item);
      }
    }

    // SPECIMENS
    let rawSpecimens = Array();
    if (mtbFile.data.specimens) {
      for (var i = 0; i < mtbFile.data.specimens.length; i++) {
        let item = {
          id: mtbFile.data.specimens[i].id,
          patient: mtbFile.data.specimens[i].patient,
          icd10: mtbFile.data.specimens[i].icd10,
          type: mtbFile.data.specimens[i].type,
          collection: mtbFile.data.specimens[i].collection,
        };
        rawSpecimens.push(item);
      }
    }

    // HISTOLOGY REPORTS
    let rawHistologyReports = Array();
    if (mtbFile.data.histologyReports) {
      for (var i = 0; i < mtbFile.data.histologyReports.length; i++) {
        let item = {
          id: mtbFile.data.histologyReports[i].id,
          patient: mtbFile.data.histologyReports[i].patient,
          specimen: mtbFile.data.histologyReports[i].specimen,
          issuedOn: mtbFile.data.histologyReports[i].issuedOn,
          icdO3M: mtbFile.data.histologyReports[i].icdO3M,
          note: mtbFile.data.histologyReports[i].note,
        };
        rawHistologyReports.push(item);
      }
    }

    // NGS REPORTS
    let rawNgsReports = Array();
    if (mtbFile.data.ngsReports) {
      for (var i = 0; i < mtbFile.data.ngsReports.length; i++) {
        let item = {
          id: mtbFile.data.ngsReports[i].id,
          patient: mtbFile.data.ngsReports[i].patient,
          specimen: mtbFile.data.ngsReports[i].specimen,
          issueDate: mtbFile.data.ngsReports[i].issueDate,
          sequencingType: mtbFile.data.ngsReports[i].sequencingType,
          metadata: mtbFile.data.ngsReports[i].metadata,
          tumorCellContent: mtbFile.data.ngsReports[i].tumorCellContent,
          brcaness: mtbFile.data.ngsReports[i].brcaness,
          msi: mtbFile.data.ngsReports[i].msi,
          tmb: mtbFile.data.ngsReports[i].tmb,
          simpleVariants: mtbFile.data.ngsReports[i].simpleVariants,
        };
        rawNgsReports.push(item);
      }
    }

    // RECOMMENDATIONS
    let rawRecommendations = Array();
    if (mtbFile.data.recommendations) {
      for (var i = 0; i < mtbFile.data.recommendations.length; i++) {
        let item = {
          id: mtbFile.data.recommendations[i].id,
          patient: mtbFile.data.recommendations[i].patient,
          issuedOn: mtbFile.data.recommendations[i].issuedOn,
          medication: mtbFile.data.recommendations[i].medication,
          priority: mtbFile.data.recommendations[i].priority,
          levelOfEvidence: mtbFile.data.recommendations[i].levelOfEvidence,
        };
        rawRecommendations.push(item);
      }
    }

    // CARE PLANS
    let rawCarePlans = Array();
    if (mtbFile.data.carePlans) {
      for (var i = 0; i < mtbFile.data.carePlans.length; i++) {
        let item = {
          id: mtbFile.data.carePlans[i].id,
          patient: mtbFile.data.carePlans[i].patient,
          issuedOn: mtbFile.data.carePlans[i].issuedOn,
          description: mtbFile.data.carePlans[i].description,
          recommendations: mtbFile.data.carePlans[i].recommendations,
          geneticCounsellingRequest:
            mtbFile.data.carePlans[i].geneticCounsellingRequest,
          rebiopsyRequests: mtbFile.data.carePlans[i].rebiopsyRequests,
        };
        rawCarePlans.push(item);
      }
    }

    // GENETIC COUNSELLING REQUESTS
    let rawGeneticCounsellingRequests = Array();
    if (mtbFile.data.geneticCounsellingRequests) {
      for (var i = 0; i < mtbFile.data.geneticCounsellingRequests.length; i++) {
        let item = {
          id: mtbFile.data.geneticCounsellingRequests[i].id,
          patient: mtbFile.data.geneticCounsellingRequests[i].patient,
          issuedOn: mtbFile.data.geneticCounsellingRequests[i].issuedOn,
        };
        rawGeneticCounsellingRequests.push(item);
      }
    }

    // REBIOPSY REQUESTS
    let rawRebiopsyRequests = Array();
    if (mtbFile.data.rebiopsyRequests) {
      for (var i = 0; i < mtbFile.data.rebiopsyRequests.length; i++) {
        let item = {
          id: mtbFile.data.rebiopsyRequests[i].id,
          patient: mtbFile.data.rebiopsyRequests[i].patient,
          specimen: mtbFile.data.rebiopsyRequests[i].specimen,
          issuedOn: mtbFile.data.rebiopsyRequests[i].issuedOn,
        };
        rawRebiopsyRequests.push(item);
      }
    }

    // MOLECULAR THERAPIES
    let rawMolecularTherapies = Array();
    if (mtbFile.data.molecularTherapies) {
      for (var i = 0; i < mtbFile.data.molecularTherapies.length; i++) {
        let item = {
          id: mtbFile.data.molecularTherapies[i].history[i].id,
          patient: mtbFile.data.molecularTherapies[i].history[i].patient,
          recordedOn: mtbFile.data.molecularTherapies[i].history[i].recordedOn,
          basedOn: mtbFile.data.molecularTherapies[i].history[i].basedOn,
          period: mtbFile.data.molecularTherapies[i].history[i].period,
          medication: mtbFile.data.molecularTherapies[i].history[i].medication,
          dosage: mtbFile.data.molecularTherapies[i].history[i].dosage,
          note: mtbFile.data.molecularTherapies[i].history[i].note,
          status: mtbFile.data.molecularTherapies[i].history[i].status,
        };
        rawMolecularTherapies.push(item);
      }
    }

    // RESPONSES
    let rawResponses = Array();
    if (mtbFile.data.responses) {
      for (var i = 0; i < mtbFile.data.responses.length; i++) {
        let item = {
          id: mtbFile.data.responses[i].id,
          patient: mtbFile.data.responses[i].patient,
          therapy: mtbFile.data.responses[i].therapy,
          effectiveDate: mtbFile.data.responses[i].effectiveDate,
          value: mtbFile.data.responses[i].value,
        };
        rawResponses.push(item);
      }
    }

    return {
      baseURL: `${serverBaseURL}/${params.id}/files`,

      patientId: mtbFile.data.patient.id,
      gender: mtbFile.data.patient.gender,
      birthDate: mtbFile.data.patient.birthDate,
      managingZPM: mtbFile.data.patient.managingZPM,
      insurance: mtbFile.data.patient.insurance,

      patient: mtbFile.data.patient,
      consent: mtbFile.data.consent,
      diagnoses: rawDiagnoses,
      familyMemberDiagnoses: rawFamilyMemberDiagnoses,
      previousGuidelineTherapies: rawPreviousGuidelineTherapies,
      lastGuidelineTherapy: rawLastGuidelineTherapy,
      ecogStatus: rawEcogStatus,
      specimens: rawSpecimens,
      histologyReports: rawHistologyReports,
      ngsReports: rawNgsReports,
      recommendations: rawRecommendations,
      carePlans: rawCarePlans,
      geneticCounsellingRequests: rawGeneticCounsellingRequests,
      rebiopsyRequests: rawRebiopsyRequests,
      molecularTherapies: rawMolecularTherapies,
      responses: rawResponses,
    };
  },
};
</script>


