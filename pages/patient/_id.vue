<template>
  <v-responsive>
    <userPanel />
    <v-container fluid grid-list-md>
      <v-flex>
        <h3 class="display-3">
          <strong>bwHealthCloud</strong> data validation
        </h3>
      </v-flex>

      <span class="subheading font-weight-light">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/validate')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >details TBA.
        <strong @click="$router.push('help')">Help?</strong>
      </span>
      <v-divider class="my-3"></v-divider>
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
              <span class="heading mr-2">{{ patient.birthDate }}</span>
              <span class="mr-2">·</span>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1"
                  >fas fa-location-arrow</v-icon
                >
                <span>Managing ZPM</span>
                <span>Age</span>
              </v-tooltip>
              <span class="subheading mr-2">{{ patient.managingZPM }}</span>
              <span class="mr-2">·</span>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1">fas fa-shield-alt</v-icon>
                <span>Insurance</span>
              </v-tooltip>
              <span class="subheading mr-2">{{ patient.insurance }}</span>
            </v-list-tile>
          </v-layout>
        </v-card-actions>
        <v-card-title
          >Consent: {{ consent.status }} <br />
          Patient ID: {{ patient.id }}
        </v-card-title>
      </v-card>

      <!-- ISSUES -->
      <div id="issues"></div>
      <v-divider class="my-3"></v-divider>
      <v-card-title class="headline font-weight-light">Issues</v-card-title>
      <v-data-table
        :headers="headerIssues"
        :items="issues"
        :sort-by="['severity']"
        hide-default-header
        hide-default-footer
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <v-chip :color="`${props.item.severity}`" dark
                >{{ props.item.severity }}
              </v-chip>
            </td>
            <td>{{ props.item.message }}</td>
            <td>{{ props.item.location.entryType }}</td>

            <td @click="$vuetify.goTo('#carePlans', options)">
              {{ props.item.location.id }}
            </td>

            <td>{{ props.item.location.attribute }}</td>
          </tr>
        </template>
      </v-data-table>

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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
        flat
        color="grey"
      >
        <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
      </v-btn>

      <!-- ECOG STATUS -->
      <div id="ecogStatus"></div>

      <v-divider class="my-3"></v-divider>
      <v-card-title class="headline font-weight-light"
        >ECOG Status</v-card-title
      >
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
        @click="$vuetify.goTo('#issues', options)"
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
            <td>
              {{ props.item.icd10.code }} - {{ props.item.icd10.display }}
            </td>
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
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
        @click="$vuetify.goTo('#issues', options)"
        flat
        color="grey"
      >
        <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
      </v-btn>
      <v-divider class="my-3"></v-divider>

      <v-btn
        class="ma-2 font-weight-bold"
        tile
        x-large
        color="red accent-3"
        dark
        @click="feedbackDialog = true"
        >Feedback</v-btn
      >
    </v-container>
  </v-responsive>
</template>

<script>
import axios from "axios";

import userPanel from "~/components/userPanel";

export default {
  data: () => ({
    headerIssues: [
      {
        text: "Severity",
        align: "left",
        sortable: true,
        value: "severity",
      },
      {
        text: "Message",
        align: "left",
        sortable: true,
        value: "message",
      },
      {
        text: "Location - Entry Type",
        align: "left",
        sortable: true,
        value: "location",
      },
      {
        text: "Location - ID",
        align: "left",
        sortable: true,
        value: "location",
      },
      {
        text: "Location - Attribute",
        align: "left",
        sortable: true,
        value: "location",
      },
    ],

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
  }),
  components: {
    userPanel,
  },

  methods: {
    functionalityNotAvailable() {
      alert("⚠️ Functionality not available! 🚧");
    },

    goBack() {
      alert("here");
      return window.history.back();
    },

    routeToPatient(id) {
      this.$router.push("patient/" + id);
    },

    stateColors(state) {
      return blue;
    },

    genderCheck(gender) {
      if (gender == "male") return "blue";
      else if (gender == "female") return "pink";
      else return "gray";
    },

    options() {
      return {
        duration: 300,
        offset: 0,
      };
    },
  },

  async asyncData({ params, error }) {
    let dataQualityReport = await axios.get(
      process.env.baseUrl +
        process.env.port +
        process.env.dataQualityReport +
        `/${params.id}`
    );

    console.log(JSON.stringify(dataQualityReport));

    let mtbFile = await axios.get(
      process.env.baseUrl +
        process.env.port +
        process.env.mtbFile +
        `/${params.id}`
    );

    // ISSUES
    let rawDataQualityReport = Array();
    for (var i = 0; i < dataQualityReport.data.issues.length; i++) {
      let item = {
        severity: dataQualityReport.data.issues[i].severity,
        message: dataQualityReport.data.issues[i].message,
        location: dataQualityReport.data.issues[i].location,
      };
      rawDataQualityReport.push(item);
    }

    // DIAGNOSES
    let rawDiagnoses = Array();
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

    // FAMILY MEMBER DIAGNOSES
    let rawFamilyMemberDiagnoses = Array();
    for (var i = 0; i < mtbFile.data.familyMemberDiagnoses.length; i++) {
      let item = {
        id: mtbFile.data.familyMemberDiagnoses[i].id,
        patient: mtbFile.data.familyMemberDiagnoses[i].patient,
        relationship: mtbFile.data.familyMemberDiagnoses[i].relationship,
      };
      rawFamilyMemberDiagnoses.push(item);
    }

    // PREVIOUS GUIDELINE THERAPIES
    let rawPreviousGuidelineTherapies = Array();
    for (var i = 0; i < mtbFile.data.previousGuidelineTherapies.length; i++) {
      let item = {
        id: mtbFile.data.previousGuidelineTherapies[i].id,
        patient: mtbFile.data.previousGuidelineTherapies[i].patient,
        therapyLine: mtbFile.data.previousGuidelineTherapies[i].therapyLine,
        medication: mtbFile.data.previousGuidelineTherapies[i].medication,
      };
      rawPreviousGuidelineTherapies.push(item);
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

    // ECOG STATUS
    let rawEcogStatus = Array();
    for (var i = 0; i < mtbFile.data.ecogStatus.length; i++) {
      let item = {
        id: mtbFile.data.ecogStatus[i].id,
        patient: mtbFile.data.ecogStatus[i].patient,
        effectiveDate: mtbFile.data.ecogStatus[i].effectiveDate,
        value: mtbFile.data.ecogStatus[i].value,
      };
      rawEcogStatus.push(item);
    }

    // SPECIMENS
    let rawSpecimens = Array();
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

    // HISTOLOGY REPORTS
    let rawHistologyReports = Array();
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

    // RECOMMENDATIONS
    let rawRecommendations = Array();
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

    // CARE PLANS
    let rawCarePlans = Array();
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

    // GENETIC COUNSELLING REQUESTS
    let rawGeneticCounsellingRequests = Array();
    for (var i = 0; i < mtbFile.data.geneticCounsellingRequests.length; i++) {
      let item = {
        id: mtbFile.data.geneticCounsellingRequests[i].id,
        patient: mtbFile.data.geneticCounsellingRequests[i].patient,
        issuedOn: mtbFile.data.geneticCounsellingRequests[i].issuedOn,
      };
      rawGeneticCounsellingRequests.push(item);
    }

    // REBIOPSY REQUESTS
    let rawRebiopsyRequests = Array();
    for (var i = 0; i < mtbFile.data.rebiopsyRequests.length; i++) {
      let item = {
        id: mtbFile.data.rebiopsyRequests[i].id,
        patient: mtbFile.data.rebiopsyRequests[i].patient,
        specimen: mtbFile.data.rebiopsyRequests[i].specimen,
        issuedOn: mtbFile.data.rebiopsyRequests[i].issuedOn,
      };
      rawRebiopsyRequests.push(item);
    }

    // CLAIMS
    /*
    let rawClaims = Array();
    for (var i = 0; i < mtbFile.data.claims.length; i++) {
      let item = {
        id: mtbFile.data.claims[i].id,
        patient: mtbFile.data.claims[i].patient,
        issuedOn: mtbFile.data.claims[i].issuedOn,
        therapy: mtbFile.data.claims[i].therapy
      };
      rawClaims.push(item);
    }
    */

    // CLAIM RESPONSES
    /*
    let rawClaimResponses = Array();
    for (var i = 0; i < mtbFile.data.claimResponses.length; i++) {
      let item = {
        id: mtbFile.data.claimResponses[i].id,
        claim: mtbFile.data.claimResponses[i].claim,
        patient: mtbFile.data.claimResponses[i].patient,
        issuedOn: mtbFile.data.claimResponses[i].issuedOn,
        status: mtbFile.data.claimResponses[i].status,
        reason: mtbFile.data.claimResponses[i].reason
      };
      rawClaimResponses.push(item);
    }
    */

    // MOLECULAR THERAPIES
    let rawMolecularTherapies = Array();
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

    // RESPONSES
    let rawResponses = Array();
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

    return {
      issues: rawDataQualityReport,
      patient: mtbFile.data.patient,
      consent: mtbFile.data.consent,
      diagnoses: rawDiagnoses,
      familyMemberDiagnoses: rawFamilyMemberDiagnoses,
      previousGuidelineTherapies: rawPreviousGuidelineTherapies,
      lastGuidelineTherapy: rawLastGuidelineTherapy,
      ecogStatus: rawEcogStatus,
      specimens: rawSpecimens,
      histologyReports: rawHistologyReports,
      recommendations: rawRecommendations,
      carePlans: rawCarePlans,
      geneticCounsellingRequests: rawGeneticCounsellingRequests,
      rebiopsyRequests: rawRebiopsyRequests,
      //claimResponses: rawClaimResponses,
      molecularTherapies: rawMolecularTherapies,
      responses: rawResponses,
    };
  },
};
</script>
