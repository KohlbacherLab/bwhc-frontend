<template>
  <v-container fluid grid-list-md>
    <v-layout wrap>
      <v-flex d-flex xs12 md6>
        <v-card
          class="mx-auto"
          flat
          color="purple lighten-4"
          light
          max-width="1200"
        >
          <v-card-text class="headline font-weight-thin">
            <br />Mutations
            <v-icon color="purple" dark>fas fa-dna</v-icon>

            <v-radio-group v-model="mutationOptions" row>
              <v-radio
                label="All"
                value="radioAll"
                @change="
                  (showSNV = false),
                    (showCNV = false),
                    (showSCNV = false),
                    (showSV = false)
                "
              ></v-radio>
              <v-radio
                label="SNV"
                value="radioSNV"
                @change="
                  (showSNV = true),
                    (showCNV = false),
                    (showSCNV = false),
                    (showSV = false)
                "
              ></v-radio>
              <v-radio
                label="CNV"
                value="radioCNV"
                @change="
                  (showSNV = false),
                    (showCNV = true),
                    (showSCNV = false),
                    (showSV = false)
                "
              ></v-radio>
              <v-radio
                label="SNV + CNV"
                value="radioSCNV"
                @change="
                  (showSNV = false),
                    (showCNV = false),
                    (showSCNV = true),
                    (showSV = false)
                "
              ></v-radio>
              <v-radio
                label="SV"
                value="radioSV"
                @change="
                  (showSNV = false),
                    (showCNV = false),
                    (showSCNV = false),
                    (showSV = true)
                "
              ></v-radio>
            </v-radio-group>

            <v-layout v-if="showSNV" justify-center row>
              <v-flex xs4>
                <v-autocomplete
                  v-model="baseChange"
                  :items="baseChangeCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Base Changes"
                  prepend-icon="vaccine"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="aminoAcidChange"
                  :items="aminoAcidChangesCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Amino Acid Changes"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="variantEffect"
                  :items="variantEffectsCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Variant Effects"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-layout v-if="showCNV" justify-center row>
              <v-flex xs4>
                <v-autocomplete
                  v-model="baseChange"
                  :items="baseChangeCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Type"
                  prepend-icon="vaccine"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="variantEffect"
                  :items="variantEffectsCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Variant Effect"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="aminoAcidChange"
                  :items="aminoAcidChangesCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Genotype"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-layout v-if="showSCNV" justify-center row>
              <v-flex xs5>
                <v-autocomplete
                  v-model="variantEffect"
                  :items="variantEffectsCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Variant Effect"
                  prepend-icon="vaccine"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-layout v-if="showSV" justify-center row>
              <v-flex xs4>
                <v-autocomplete
                  v-model="baseChange"
                  :items="baseChangeCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Type"
                  prepend-icon="vaccine"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="aminoAcidChange"
                  :items="aminoAcidChangesCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Variant Effect"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="variantEffect"
                  :items="variantEffectsCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Variant Effect"
                  chips
                  deletable-chips
                  dense
                  return-object
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <v-autocomplete
              v-model="genes"
              :items="genesCat"
              :loading="isLoading"
              item-text="name"
              item-value="id"
              label="enter Gene names here"
              chips
              deletable-chips
              dense
              hide-no-data
              multiple
              return-object
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <v-card
          class="mx-auto"
          flat
          color="indigo lighten-4"
          light
          max-width="1200"
        >
          <v-card-text class="headline font-weight-thin">
            <br />Diagnosis
            <v-icon color="indigo" dark>fas fa-diagnoses</v-icon>
            <v-autocomplete
              v-model="diagnosis"
              :items="diagnosisCat"
              label="enter ICD-10 code here"
              ref="diagnosis"
              chips
              clearable
              deletable-chips
              dense
              multiple
              placeholder
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <v-card
          class="mx-auto"
          flat
          color="blue lighten-4"
          light
          max-width="1200"
        >
          <v-card-text class="headline font-weight-thin">
            <strong></strong>
            <br />Drugs
            <v-icon color="blue">fas fa-pills</v-icon>
            <v-radio-group v-model="drugUsage" row>
              <v-radio label="All" value="all"></v-radio>
              <v-radio label="Used" value="used"></v-radio>
              <v-radio label="Recommended" value="recommended"></v-radio>
            </v-radio-group>
            <v-autocomplete
              v-model="drugs"
              :items="drugsCat"
              :itemscope="used"
              :loading="isLoading"
              label="enter Drug names here"
              ref="drugUsage"
              chips
              deletable-chips
              hide-selected
              dense
              multiple
              placeholder
              @input="addDrugs(drugs[drugs.length - 1], drugUsage)"
            >
              <!--
              <template slot="selection" slot-scope="data">
                <v-chip :selected="data.selected" close @input="removeDrug(data.item)">
                  <strong>{{ data.item }}</strong>&nbsp;
                  <span>{{ drugUsage }}</span>
                </v-chip>
              </template>
              -->

              <template slot="selection" slot-scope="data">
                <v-chip
                  :selected="data.selected"
                  close
                  @input="removeDrugs(data.item)"
                >
                  <strong>{{ data.item }}</strong>
                  &nbsp;
                  {{ selectedDrugs[data.index].usage }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <v-card
          class="mx-auto"
          flat
          color="cyan lighten-4"
          light
          max-width="1200"
        >
          <v-card-text class="headline font-weight-thin">
            <strong></strong>
            <br />Response
            <v-icon color="cyan">fas fa-vials</v-icon>
            <v-autocomplete
              v-model="responses"
              :items="responsesCat"
              :loading="isLoading"
              label="enter Response here"
              ref="responses"
              chips
              deletable-chips
              dense
              multiple
              placeholder
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <div v-if="localQuery === false">
          <v-switch
            class="subheading font-weight-light"
            prepend-icon="fas fa-map-marker-alt"
            color="blue"
            v-model="localQuery"
            :label="`Local`"
            @change="federatedQueryDialog = true"
          ></v-switch>
        </div>
        <div v-else>
          <strong>
            <v-switch
              class="subheading font-weight-medium"
              color="yellow"
              prepend-icon="fas fa-compress-arrows-alt"
              v-model="localQuery"
              :label="`bwHealthCloud`"
            ></v-switch>
          </strong>
        </div>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <v-tooltip top>
          <v-btn
            v-if="this.getQueryParametersDiagnosis"
            class="subheading font-weight-regular"
            block
            dark
            large
            slot="activator"
            color="red accent-3"
            @click="setQueryParams"
            >Reload Query Parameters</v-btn
          >
          <span>click 'red' to reload your previous bwHC query parameters</span>
          <v-btn
            class="subheading font-weight-regular"
            block
            dark
            large
            slot="activator"
            color="blue accent-3"
            @click="submitQuery"
            >Submit New Query</v-btn
          >
          <span>then 'blue' to submit your bwHC query</span>
        </v-tooltip>
      </v-flex>

      <v-dialog v-model="federatedQueryDialog" width="500">
        <v-card>
          <v-card-title class="headline yellow lighten-1" darkprimary-title>
            <v-icon color="black" large left>fas fa-compress-arrows-alt</v-icon
            >bwHC Federated Query
          </v-card-title>
          <v-card-text
            >By running a 'bwHC Federated Query', you accept the terms and
            conditions of 'bwHC Consent Agreement' and confirm that you have
            read and accepted our terms and conditions of use (in particular the
            section dealing with restrictions on saving, distributing query
            results) and our Privacy Policy (in particular the section dealing
            the terms and conditions contained in the 'bwHC Consent
            Agreement').</v-card-text
          >
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              right
              flat
              icon
              color="black lighten-1"
              @click="federatedQueryDialog = false"
            >
              <v-icon>fas fa-thumbs-up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: [
    "genesCat",
    "diagnosisCat",
    "drugsCat",
    "responsesCat",
    "baseChangeCat",
    "aminoAcidChangesCat",
    "variantEffectsCat",
    "diagnosis",
    "getQueryParametersMutations",
    "getQueryParametersDiagnosis",
    "getQueryParametersDrugs",
    "getQueryParametersResponses",
    "getQueryParametersFederated",
    "queryId",
  ],

  data: () => ({
    selectedDrugs: Array(),
    mutationOptions: "radioAll",
    localQuery: false,

    showSNV: false,
    showCNV: false,
    showSCNV: false,
    showSV: false,

    drugUsage: "all",
    diagnosis: Array(),

    federatedQueryDialog: false,
  }),

  methods: {
    async submitQuery() {
      let diagnosis = Array();
      if (this.diagnosis) {
        for (var i = 0; i < this.diagnosis.length; i++) {
          diagnosis.push(this.diagnosis[i].slice(0, 5));
        }
      }

      let queryParameters = Array();
      if (this.queryParameters) {
        for (var i = 0; i < this.queryParameters.length; i++) {
          queryParameters.push(this.queryParameters[i].slice(0, 5));
        }
      }

      if (this.queryId == undefined) {
        let request = {
          //mode: this.localQuery,
          mode: "local",
          parameters: {
            diagnoses: diagnosis,
            mutatedGenes: [],
            medicationsWithUsage: [],
            responses: [],
            //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
            //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
            //drugs:[{usage:"recommended",drug:"something"}],
            //responses: this.responses
          },

          /*
          user: "Myself",
          parameters: {
            diagnosis: diagnosis,
            //mutation: [{ genes: this.genes, variant: { type: "" } }],
            //drugs:[{drug: "afatinib"}],
            drugs: this.selectedDrugs,
            response: this.responses,
            federated: this.localQuery
          }
          */
        };

        let Response = await axios.post(
          process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query`,
          request
        );

        /*
        alert("QUERY PANEL " + JSON.stringify(request));
        alert("QUERY RESPONSE " + JSON.stringify(Response));
        */

        this.$router.push(`/results/${Response.data.id}`);
      } else {
        let request = {
          mode: this.localQuery,
          id: this.queryId,
          parameters: {
            diagnosis: diagnosis,
            mutatedGenes: [],
            medicationsWithUsage: [],
            responses: [],
            //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
            //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
            //drugs:[{usage:"recommended",drug:"something"}],
            //responses: this.responses
          },
        };

        alert(JSON.stringify(request));

        let Response = await axios.put(
          process.env.baseUrl +
            process.env.port +
            `/bwhc/mtb/api/query/` +
            this.queryId,
          request
        );
        this.$router.push(`/results/${Response.data.id}`);
        window.location.reload(true);
      }
    },

    goBack() {
      return window.history.back();
    },

    removeMutation(item) {
      const index = this.mutations.indexOf(item);
      if (index >= 0) this.mutations.splice(index, 1);
    },

    addMutation(item) {
      //const index = this.mutations.indexOf(item);
      (this.queryMutationChips = this.gene), this.mutationType;
    },

    addDrugs(drug, usage) {
      //const index = this.drugs.indexOf(drug);
      this.selectedDrugs.push({ drug, usage });
    },

    removeDrugs(item) {
      const index = this.drugs.indexOf(item);
      if (index >= 0) this.selectedDrugs.splice(index, 1);
      this.drugs.splice(index, 1);
    },

    resetDrugs() {
      this.selectedDrugs = [];
    },

    setQueryParams(item) {
      //this.mutations = this.getQueryParametersMutations;
      this.diagnosis = this.getQueryParametersDiagnosis;
      this.drugs = this.getQueryParametersDrugs;
      this.responses = this.getQueryParametersResponses;
      this.localQuery = this.getQueryParametersFederated;
    },

    /*
    async printQuery() {
      //alert(this.diagnosis);
      let diagnosis = Array();
      if (this.diagnosis) {
        for (var i = 0; i < this.diagnosis.length; i++) {
          diagnosis.push(this.diagnosis[i].slice(0, 5));
        }
      }
      //alert(diagnosis);

      let request = {
        user: "Myself",
        parameters: {
          diagnosis: diagnosis,
          mutation: [{ genes: this.genes, variant: { type: "" } }],
          drugs: [{ usage: "", drug: "" }],
          response: this.responses,
          federated: this.localQuery
        }
      };

      alert(JSON.stringify(request));

      console.log(JSON.stringify(request));

      let Response = await axios.post(
        process.env.baseUrl+`:80/bwhc/mtb/query`,
        request
      );

      alert(JSON.stringify(Response.data));
    },
    */

    addDrug() {
      //var drugToAdd = { drug: this.drugs, usage: this.selectedDrugUsage };
      var obj = {
        drug: this.drugs[this.drugs.length - 1],
        usage: this.selectedDrugUsage,
      };
      this.drugQuery.push(obj);
    },

    testJson() {
      //TODO:
    },

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
  },
};
</script>
