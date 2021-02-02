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
          @click="$router.push('/validate')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Check the issues table the errors/warnings and/or infos.
        <strong @click="$router.push('help')">Help?</strong>
      </span>
    </v-flex>

    <v-divider class="my-3"></v-divider>
    <v-layout>
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
          >Consent: {{ patient.consentStatus }} <br />
          First Referral Date: {{ patient.firstReferralDate }} <br />
          Patient ID: {{ patient.id }}
        </v-card-title>
      </v-card>
    </v-layout>

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

    <!-- DIAGNOSES VIEW -->
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
          <td>{{ props.item.icd10 }}</td>
          <td>{{ props.item.icdO3T }}</td>
          <td>
            {{ props.item.whoGrade }}
          </td>
          <td>{{ props.item.statusHistory }}</td>
          <td>{{ props.item.guidelineTreatmentStatus }}</td>
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

    <!-- FAMILY MEMBER DIAGNOSES VIEW -->
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
            {{ props.item.relationship }}
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

    <!-- GUIDELINE THERAPY VIEW -->
    <div id="guidelineTherapies"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Guideline Therapies</v-card-title
    >
    <v-data-table
      :headers="headerGuidelineTherapies"
      :items="guidelineTherapies"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.diagnosis }}</td>
          <td>{{ props.item.therapyLine }}</td>
          <td>{{ props.item.period }}</td>
          <td>{{ props.item.medication }}</td>
          <td>{{ props.item.reasonStopped }}</td>
          <td>{{ props.item.response }}</td>
          <td>{{ props.item.progressionDate }}</td>
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

    <!-- ECOG STATUS VIEW -->
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
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.value }}</td>
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

    <!-- SPECIMENS VIEW -->
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
          <td>{{ props.item.icd10 }}</td>
          <td>{{ props.item.type }}</td>
          <td>{{ props.item.collectionDate }}</td>
          <td>{{ props.item.localization }}</td>
          <td>{{ props.item.collectionMethod }}</td>
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

    <!-- MOLECULAR PATHOLOGY FINDINGS VIEW -->
    <div id="molecularPathologyFindings"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Molecular Pathology Findings</v-card-title
    >
    <v-data-table
      :headers="headerMolecularPathologyFindings"
      :items="molecularPathologyFindings"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.specimen }}</td>
          <td>{{ props.item.performingInstitute }}</td>
          <td>{{ props.item.issuedOn }}</td>
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

    <!-- HISTOLOGY REPORTS VIEW -->
    <div id="histologyReports"></div>

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
          <td>{{ props.item.tumorMorphology }}</td>
          <td>{{ props.item.tumorCellContent }}</td>
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

    <!-- NGS REPORTS VIEW -->
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
          <td>{{ props.item.microSatelliteInstabilities }}</td>
          <td>{{ props.item.tumorMutationalBurden }}</td>
          <td>{{ props.item.simpleVariants }}</td>
          <td>{{ props.item.copyNumberVariants }}</td>
          <td>{{ props.item.dnaFusions }}</td>
          <td>{{ props.item.rnaFusions }}</td>
          <td>{{ props.item.rnaSeqs }}</td>
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

    <!-- CARE PLANS VIEW -->
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
          <td>{{ props.item.icd10 }}</td>
          <td>{{ props.item.issuedOn }}</td>
          <td>{{ props.item.protocol }}</td>
          <td>{{ props.item.geneticCounsellingRecommendation }}</td>
          <td>{{ props.item.inclusionInStudyRecommendation }}</td>
          <td>{{ props.item.targetAvailable }}</td>
          <td class="text-xs-center">
            <v-icon color="blue" small @click="extendCarePlans = true"
              >fas fa-info-circle</v-icon
            >
          </td>
          <!--
          <td>{{ props.item.therapyRecommendations }}</td> -->
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

    <v-dialog v-model="extendCarePlans">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Therapy Recommendations</strong></v-card-title
        >

        <v-data-table
         :headers="headerTherapyRecommendations"
          :items="carePlans"
          hide-default-header
          hide-default-footer
        >
          <template slot="items" slot-scope="props" >
            <tr v-for="(item,i) in props.item.therapyRecommendations.length"
    :key="i">
              <td>{{ props.item.therapyRecommendations[i].id }}</td>
              <td>{{ props.item.therapyRecommendations[i].patient }}</td>
              <td>{{ props.item.therapyRecommendations[i].icd10 }}</td>
              <td>{{ props.item.therapyRecommendations[i].medication }}</td>
              <td>{{ props.item.therapyRecommendations[i].priority }}</td>
              <td>{{ props.item.therapyRecommendations[i].levelOfEvidence }}</td>
              <td>{{ props.item.therapyRecommendations[i].supportingVariants }}</td>
            </tr>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            type="extendCarePlans"
            :disabled="invalid"
            flat
            @click="extendCarePlans = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- CLAIM STATUS VIEW -->
    <div id="claimResponses"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Claim Responses</v-card-title
    >

    <v-data-table
      :headers="headerClaimStatus"
      :items="claimStatus"
      hide-default-header
      hide-default-footer
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.therapy }}</td>
          <td>{{ props.item.issueDate }}</td>
          <td>{{ props.item.responseDate }}</td>
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

    <!-- MOLECULAR THERAPIES VIEW -->
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
          <td>{{ props.item.diagnosis }}</td>
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

export default {
  data: () => ({
    extendCarePlans: false,
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
        text: "ICD-O-3-T",
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
        text: "Status History",
        align: "left",
        sortable: true,
        value: "statusHistory",
      },
      {
        text: "Guideline Treatment Status",
        align: "left",
        sortable: true,
        value: "guidelineTreatmentStatus",
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

    headerGuidelineTherapies: [
      {
        text: "ID",
        align: "left",
        sortable: true,
        value: "id",
      },
      {
        text: "Diagnosis",
        align: "left",
        sortable: true,
        value: "diagnosis",
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
      {
        text: "Reason Stopped",
        align: "left",
        sortable: true,
        value: "reasonStopped",
      },
      {
        text: "Response",
        align: "left",
        sortable: true,
        value: "response",
      },
      {
        text: "Progression Date",
        align: "left",
        sortable: true,
        value: "progressionDate",
      },
    ],

    headerEcogStatus: [
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
        value: "collectionDate",
      },
      {
        text: "Localization",
        align: "left",
        sortable: true,
        value: "localization",
      },
      {
        text: "Collection Method",
        align: "left",
        sortable: true,
        value: "collectionMethod",
      },
    ],

    headerMolecularPathologyFindings: [
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
        text: "Performing Institute",
        align: "left",
        sortable: true,
        value: "performingInstitute",
      },
      {
        text: "Issued On",
        align: "left",
        sortable: true,
        value: "issuedOn",
      },
      {
        text: "Note",
        align: "left",
        sortable: true,
        value: "note",
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
        text: "Tumor Morphology",
        align: "left",
        sortable: true,
        value: "tumorMorphology",
      },
      {
        text: "Tumor Cell Content",
        align: "left",
        sortable: true,
        value: "tumorCellContent",
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
        text: "Micro Satellite Instabilities",
        align: "left",
        sortable: true,
        value: "microSatelliteInstabilities",
      },
      {
        text: "Tumor Mutational Burden",
        align: "left",
        sortable: true,
        value: "tumorMutationalBurden",
      },
      {
        text: "Simple Variants",
        align: "left",
        sortable: true,
        value: "simpleVariants",
      },
      {
        text: "Copy Number Variants",
        align: "left",
        sortable: true,
        value: "copyNumberVariants",
      },
      {
        text: "DNA Fusions",
        align: "left",
        sortable: true,
        value: "dnaFusions",
      },
      {
        text: "RNA Fusions",
        align: "left",
        sortable: true,
        value: "rnaFusions",
      },
      {
        text: "RNA Seqs",
        align: "left",
        sortable: true,
        value: "rnaSeqs",
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
        text: "ICD-10",
        align: "left",
        sortable: true,
        value: "icd10",
      },
      {
        text: "Issued On",
        align: "left",
        sortable: true,
        value: "issuedOn",
      },
      {
        text: "Protocol",
        align: "left",
        sortable: true,
        value: "protocol",
      },
      {
        text: "Genetic Counselling Recommendation",
        align: "left",
        sortable: true,
        value: "geneticCounsellingRecommendation",
      },
      {
        text: "Inclusion In Study Recommendation",
        align: "left",
        sortable: true,
        value: "inclusionInStudyRecommendation",
      },
      {
        text: "Target Available",
        align: "left",
        sortable: true,
        value: "targetAvailable",
      },
      {
        text: "Therapy Recommendations",
        align: "left",
        sortable: true,
        value: "therapyRecommendations",
      },
    ],

    headerTherapyRecommendations: [
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
        text: "ICD-10",
        align: "left",
        sortable: true,
        value: "icd10",
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
        text: "Level of Evidence",
        align: "left",
        sortable: true,
        value: "levelOfEvidence",
      },
      {
        text: "Supporting Variants",
        align: "left",
        sortable: true,
        value: "supportingVariants",
      },
    ],

    headerClaimStatus: [
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
        text: "Issue Date",
        align: "left",
        sortable: true,
        value: "issueDate",
      },
      {
        text: "Response Date",
        align: "left",
        sortable: true,
        value: "responseDate",
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
        text: "Diagnosis",
        align: "left",
        sortable: true,
        value: "diagnosis",
      },
      {
        text: "Status",
        align: "left",
        sortable: true,
        value: "status",
      },
      {
        text: "Recorded On",
        align: "left",
        sortable: true,
        value: "recordedOn",
      },
      {
        text: "Recommendation",
        align: "left",
        sortable: true,
        value: "recommendation",
      },
      {
        text: "Period",
        align: "left",
        sortable: true,
        value: "period",
      },
      {
        text: "Not Done Reason",
        align: "left",
        sortable: true,
        value: "notDoneReason",
      },
      {
        text: "Medication",
        align: "left",
        sortable: true,
        value: "medication",
      },
      {
        text: "Reason Stopped",
        align: "left",
        sortable: true,
        value: "reasonStopped",
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
        text: "Response",
        align: "left",
        sortable: true,
        value: "response",
      },
      {
        text: "Progression Date",
        align: "left",
        sortable: true,
        value: "progressionDate",
      },
    ],
  }),
  components: {
    userPanel,
  },

  methods: {
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
      else if (gender == "Männlich") return "blue";
      else if (gender == "female") return "pink";
      else if (gender == "Weiblich") return "pink";
      else return "gray";
    },

    options() {
      return {
        duration: 300,
        offset: 0,
      };
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let dataQualityReport = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.dataQualityReport +
          `/${params.id}`
      );

      //console.log(JSON.stringify(dataQualityReport));

      let mtbFile = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.mtbFile +
          `/${params.id}`
      );

      let mtbFileView = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.mtbFileView +
          `/${params.id}`
      );

      //alert(JSON.stringify(mtbFileView));

      // ISSUES

      let rawDataQualityReport = Array();
      if (dataQualityReport.data.issues) {
        for (var i = 0; i < dataQualityReport.data.issues.length; i++) {
          let item = {
            severity: dataQualityReport.data.issues[i].severity,
            message: dataQualityReport.data.issues[i].message,
            location: dataQualityReport.data.issues[i].location,
          };
          rawDataQualityReport.push(item);
        }
      }

      // DIAGNOSES VIEW

      let rawDiagnoses = Array();
      if (mtbFileView.data.diagnoses) {
        for (var i = 0; i < mtbFileView.data.diagnoses.length; i++) {
          let item = {
            id: mtbFileView.data.diagnoses[i].id,
            patient: mtbFileView.data.diagnoses[i].patient,
            recordedOn: mtbFileView.data.diagnoses[i].recordedOn,
            icd10: mtbFileView.data.diagnoses[i].icd10,
            icdO3T: mtbFileView.data.diagnoses[i].icdO3T,
            whoGrade: mtbFileView.data.diagnoses[i].whoGrade,
            statusHistory: mtbFileView.data.diagnoses[i].statusHistory,
            guidelineTreatmentStatus:
              mtbFileView.data.diagnoses[i].guidelineTreatmentStatus,
          };
          rawDiagnoses.push(item);
        }
      }

      // FAMILY MEMBER DIAGNOSES VIEW

      let rawFamilyMemberDiagnoses = Array();
      if (mtbFileView.data.familyMemberDiagnoses) {
        for (
          var i = 0;
          i < mtbFileView.data.familyMemberDiagnoses.length;
          i++
        ) {
          let item = {
            id: mtbFileView.data.familyMemberDiagnoses[i].id,
            patient: mtbFileView.data.familyMemberDiagnoses[i].patient,
            relationship:
              mtbFileView.data.familyMemberDiagnoses[i].relationship,
          };
          rawFamilyMemberDiagnoses.push(item);
        }
      }

      // GUIDELINE THERAPIES VIEW

      let rawGuidelineTherapies = Array();
      if (mtbFileView.data.guidelineTherapies) {
        for (var i = 0; i < mtbFileView.data.guidelineTherapies.length; i++) {
          let item = {
            id: mtbFileView.data.guidelineTherapies[i].id,
            diagnosis: mtbFileView.data.guidelineTherapies[i].diagnosis,
            therapyLine: mtbFileView.data.guidelineTherapies[i].therapyLine,
            period: mtbFileView.data.guidelineTherapies[i].period,
            medication: mtbFileView.data.guidelineTherapies[i].medication,
            reasonStopped: mtbFileView.data.guidelineTherapies[i].reasonStopped,
            response: mtbFileView.data.guidelineTherapies[i].response,
            progressionDate:
              mtbFileView.data.guidelineTherapies[i].progressionDate,
          };
          rawGuidelineTherapies.push(item);
        }
      }

      // ECOG STATUS VIEW

      let rawEcogStatus = Array();
      if (mtbFileView.data.ecogStatus) {
        for (var i = 0; i < mtbFileView.data.ecogStatus.values.length; i++) {
          let item = {
            date: mtbFileView.data.ecogStatus.values[i].date,
            value: mtbFileView.data.ecogStatus.values[i].value,
          };
          rawEcogStatus.push(item);
        }
      }

      // SPECIMENS VIEW

      let rawSpecimens = Array();
      if (mtbFileView.data.specimens) {
        for (var i = 0; i < mtbFileView.data.specimens.length; i++) {
          let item = {
            id: mtbFileView.data.specimens[i].id,
            icd10: mtbFileView.data.specimens[i].icd10,
            type: mtbFileView.data.specimens[i].type,
            collectionDate: mtbFileView.data.specimens[i].collectionDate,
            localization: mtbFileView.data.specimens[i].localization,
            collectionMethod: mtbFileView.data.specimens[i].collectionMethod,
          };
          rawSpecimens.push(item);
        }
      }

      // MOLECULAR PATHOLOGY FINDINGS VIEW

      let rawMolecularPathologyFindings = Array();
      if (mtbFileView.data.molecularPathologyFindings) {
        for (
          var i = 0;
          i < mtbFileView.data.molecularPathologyFindings.length;
          i++
        ) {
          let item = {
            id: mtbFileView.data.molecularPathologyFindings[i].id,
            specimen: mtbFileView.data.molecularPathologyFindings[i].specimen,
            performingInstitute:
              mtbFileView.data.molecularPathologyFindings[i]
                .performingInstitute,
            issuedOn: mtbFileView.data.molecularPathologyFindings[i].issuedOn,
            note: mtbFileView.data.molecularPathologyFindings[i].note,
          };
          rawMolecularPathologyFindings.push(item);
        }
      }

      // HISTOLOGY REPORTS VIEW

      let rawHistologyReports = Array();
      if (mtbFileView.data.histologyReports) {
        for (var i = 0; i < mtbFileView.data.histologyReports.length; i++) {
          let item = {
            id: mtbFileView.data.histologyReports[i].id,
            specimen: mtbFileView.data.histologyReports[i].specimen,
            issuedOn: mtbFileView.data.histologyReports[i].issuedOn,
            tumorMorphology:
              mtbFileView.data.histologyReports[i].tumorMorphology,
            tumorCellContent:
              mtbFileView.data.histologyReports[i].tumorCellContent,
            note: mtbFileView.data.histologyReports[i].note,
          };
          rawHistologyReports.push(item);
        }
      }

      // NGS REPORTS VIEW
      let rawNgsReports = Array();
      if (mtbFileView.data.ngsReports) {
        for (var i = 0; i < mtbFileView.data.ngsReports.length; i++) {
          let item = {
            id: mtbFileView.data.ngsReports[i].id,
            specimen: mtbFileView.data.ngsReports[i].specimen,
            issueDate: mtbFileView.data.ngsReports[i].issueDate,
            sequencingType: mtbFileView.data.ngsReports[i].sequencingType,
            metadata: mtbFileView.data.ngsReports[i].metadata,
            tumorCellContent: mtbFileView.data.ngsReports[i].tumorCellContent,
            brcaness: mtbFileView.data.ngsReports[i].brcaness,
            microSatelliteInstabilities:
              mtbFileView.data.ngsReports[i].microSatelliteInstabilities,
            tumorMutationalBurden:
              mtbFileView.data.ngsReports[i].tumorMutationalBurden,
            simpleVariants: mtbFileView.data.ngsReports[i].simpleVariants,
            copyNumberVariants:
              mtbFileView.data.ngsReports[i].copyNumberVariants,
            dnaFusions: mtbFileView.data.ngsReports[i].dnaFusions,
            rnaFusions: mtbFileView.data.ngsReports[i].rnaFusions,
            rnaSeqs: mtbFileView.data.ngsReports[i].rnaSeqs,
          };
          rawNgsReports.push(item);
        }
      }

      // CARE PLANS VIEW
      let rawCarePlans = Array();
      if (mtbFileView.data.carePlans) {
        for (var i = 0; i < mtbFileView.data.carePlans.length; i++) {
          let item = {
            id: mtbFileView.data.carePlans[i].id,
            icd10: mtbFileView.data.carePlans[i].icd10,
            issuedOn: mtbFileView.data.carePlans[i].issuedOn,
            protocol: mtbFileView.data.carePlans[i].protocol,
            geneticCounsellingRecommendation:
              mtbFileView.data.carePlans[i].geneticCounsellingRecommendation,
            inclusionInStudyRecommendation:
              mtbFileView.data.carePlans[i].inclusionInStudyRecommendation,
            targetAvailable: mtbFileView.data.carePlans[i].targetAvailable,
            therapyRecommendations:
              mtbFileView.data.carePlans[i].therapyRecommendations,
          };
          rawCarePlans.push(item);
        }
      }

      // CLAIM STATUS VIEW
      let rawClaimStatus = Array();
      if (mtbFileView.data.claimStatus) {
        for (var i = 0; i < mtbFileView.data.claimStatus.length; i++) {
          let item = {
            id: mtbFileView.data.claimStatus[i].id,
            therapy: mtbFileView.data.claimStatus[i].therapy,
            issueDate: mtbFileView.data.claimStatus[i].issueDate,
            responseDate: mtbFileView.data.claimStatus[i].responseDate,
            status: mtbFileView.data.claimStatus[i].status,
            reason: mtbFileView.data.claimStatus[i].reason,
          };
          rawClaimStatus.push(item);
        }
      }

      // MOLECULAR THERAPIES VIEW
      let rawMolecularTherapies = Array();
      if (mtbFileView.data.molecularTherapies) {
        for (var i = 0; i < mtbFileView.data.molecularTherapies.length; i++) {
          let item = {
            id: mtbFileView.data.molecularTherapies[i].id,
            diagnosis: mtbFileView.data.molecularTherapies[i].diagnosis,
            status: mtbFileView.data.molecularTherapies[i].status,
            recordedOn: mtbFileView.data.molecularTherapies[i].recordedOn,
            recommendation:
              mtbFileView.data.molecularTherapies[i].recommendation,
            period: mtbFileView.data.molecularTherapies[i].period,
            notDoneReason: mtbFileView.data.molecularTherapies[i].notDoneReason,
            medication: mtbFileView.data.molecularTherapies[i].medication,
            reasonStopped: mtbFileView.data.molecularTherapies[i].reasonStopped,
            dosage: mtbFileView.data.molecularTherapies[i].dosage,
            note: mtbFileView.data.molecularTherapies[i].note,
            response: mtbFileView.data.molecularTherapies[i].response,
            progressionDate:
              mtbFileView.data.molecularTherapies[i].progressionDate,
          };
          rawMolecularTherapies.push(item);
        }
      }

      return {
        issues: rawDataQualityReport,
        patient: mtbFileView.data.patient,
        diagnoses: rawDiagnoses,
        familyMemberDiagnoses: rawFamilyMemberDiagnoses,
        guidelineTherapies: rawGuidelineTherapies,
        ecogStatus: rawEcogStatus,
        specimens: rawSpecimens,
        molecularPathologyFindings: rawMolecularPathologyFindings,
        histologyReports: rawHistologyReports,
        ngsReports: rawNgsReports,
        carePlans: rawCarePlans,
        claimStatus: rawClaimStatus,
        molecularTherapies: rawMolecularTherapies,
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
