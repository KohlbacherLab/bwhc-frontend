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
            <br />Mutationen
            <v-icon color="purple" dark>fas fa-dna</v-icon>

            <!--
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
 -->

            <v-autocomplete
              v-model="genes"
              :items="genesCat"
              :loading="isLoading"
              item-text="name"
              item-value="id"
              label="Gen-Name oder HGNC Symbol..."
              chips
              deletable-chips
              dense
              hide-no-data
              multiple
              return-object
              @input="addMutatedGenes(genes[genes.length - 1])"
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  :selected="data.selected"
                  close
                  @input="removeMutatedGenes(data.item)"
                >
                  {{ data.item }}
                </v-chip>
              </template>
              <!--           
              <template v-slot:selection="{ item }">
                <v-chip>
                  <span v-text="item[1]"></span>
                </v-chip>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title v-text="item[1]"></v-list-item-title>
                </v-list-item-content>
              </template>
  -->
            </v-autocomplete>
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
            <br />Diagnose
            <v-icon color="indigo" dark>fas fa-diagnoses</v-icon>
            <v-autocomplete
              v-model="diagnosis"
              :items="diagnosisCat"
              label="ICD-10 Diagnose-Text oder Code..."
              ref="diagnosis"
              chips
              deletable-chips
              dense
              multiple
              placeholder
              @input="addDiagnosis(diagnosis[diagnosis.length - 1])"
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  :selected="data.selected"
                  close
                  @input="removeDiagnosis(data.item)"
                >
                  {{ data.item }}
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
          color="blue lighten-4"
          light
          max-width="1200"
        >
          <v-card-text class="headline font-weight-thin">
            <strong></strong>
            <br />Wirkstoffe
            <v-icon color="blue">fas fa-pills</v-icon>
            <v-radio-group v-model="drugUsage" row>
              <!--<v-radio label="All" value="all"></v-radio>-->
              <v-radio label="Verabreicht" value="used"></v-radio>
              <v-radio label="Empfohlen" value="recommended"></v-radio>
            </v-radio-group>
            <v-autocomplete
              v-model="drugs"
              :items="drugsCat"
              :itemscope="used"
              :loading="isLoading"
              label="Wirkstoff-Name oder ATC Code..."
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
                  {{ selectedDrugs[data.index].usage.code }}
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
              label="RECIST"
              ref="responses"
              chips
              deletable-chips
              dense
              multiple
              placeholder
              @input="addResponses(responses[responses.length - 1])"
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  :selected="data.selected"
                  close
                  @input="removeResponses(data.item)"
                >
                  {{ data.item }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <v-select
          prepend-icon="fas fa-map-marker-alt"
          v-model="select"
          :hint="`${select.desc}`"
          :items="items"
          item-text="mode"
          item-value="desc"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
        <!--
        <div v-if="localQuery === false">
          <v-switch
            class="subheading font-weight-light"
            prepend-icon="fas fa-map-marker-alt"
            color="blue"
            v-model="localQueryValue"
            :label="`local`"
            @change="federatedQueryDialog = true"
          ></v-switch>
        </div>
        <div v-else>
          <strong>
            <v-switch
              class="subheading font-weight-medium"
              color="yellow"
              prepend-icon="fas fa-compress-arrows-alt"
              v-model="localQueryValue"
              :label="`federated`"
            ></v-switch>
          </strong>
        </div>
        -->
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <v-btn
          class="subheading font-weight-regular"
          block
          dark
          large
          slot="activator"
          color="blue accent-3"
          @click="submitQuery"
          >Anfrage senden</v-btn
        >
        <!--
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
        -->
      </v-flex>

      <v-dialog v-model="federatedQueryDialog" width="500">
        <v-card>
          <v-card-title class="headline yellow lighten-1" darkprimary-title>
            <v-icon color="black" large left>fas fa-compress-arrows-alt</v-icon
            >bwHC Abfrage
          </v-card-title>
          <v-card-text
            >Wenn Sie eine "bwHC Federated Query" ausführen, akzeptieren Sie die
            Bedingungen und Bedingungen der "bwHC-Einverständniserklärung" und
            bestätigen Sie, dass Sie haben Lesen und akzeptieren Sie unsere
            Nutzungsbedingungen (insbesondere die Abschnitt über Einschränkungen
            beim Speichern und Verteilen von Abfragen Ergebnisse) und unsere
            Datenschutzrichtlinie (insbesondere den Abschnitt über die in der
            bwHC-Einwilligung enthaltenen Geschäftsbedingungen
            Zustimmung').</v-card-text
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
import { dirname } from "path";

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
    selectedDiagnosis: Array(),
    selectedMutatedGenes: Array(),
    selectedResponses: Array(),
    mutationOptions: "radioAll",
    localQuery: false,

    showSNV: false,
    showCNV: false,
    showSCNV: false,
    showSV: false,

    drugUsage: "used",
    diagnosis: Array(),

    select: {
      mode: "local",
      desc: "Der Abfragemodus ist auf lokal eingestellt",
    },
    items: [
      { mode: "local", desc: "Der Abfragemodus ist auf lokal eingestellt" },
      {
        mode: "federated",
        desc: "Der Abfragemodus ist auf bwHealthCloud-weit eingestellt",
      },
    ],

    federatedQueryDialog: false,
  }),

  methods: {
    async submitQuery() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let mutatedGenes = Array();
        if (this.genes) {
          for (var i = 0; i < this.genes.length; i++) {
            mutatedGenes.push(
              //this.genes[i].substr(0, this.genes[i].indexOf(" "))
              //this.genes[i][0]
              this.genes[i].split(" · ")[1]
            );
          }
        }

        let diagnosis = Array();
        if (this.diagnosis) {
          for (var i = 0; i < this.diagnosis.length; i++) {
            diagnosis.push(
              this.diagnosis[i].substr(0, this.diagnosis[i].indexOf(" "))
            );
          }
        }

        let responses = Array();
        if (this.responses) {
          for (var i = 0; i < this.responses.length; i++) {
            responses.push(
              this.responses[i].substr(0, this.responses[i].indexOf(" "))
            );
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
            mode: {
              code: this.select.mode,
            },
            // this.select.mode,
            parameters: {
              diagnoses: this.selectedDiagnosis,
              mutatedGenes: this.selectedMutatedGenes,
              medicationsWithUsage: this.selectedDrugs,
              //responses: [],
              //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
              //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
              //drugs:[{usage:"recommended",drug:"something"}],
              responses: this.selectedResponses,
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

          //alert(JSON.stringify(request));

          let Response = await axios.post(
            process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query/`,
            request
          );

          //alert("QUERY PANEL " + JSON.stringify(request));
          if (JSON.stringify(Response.data._issues) != undefined) {
            let connectionErrors = "";
            for (var i = 0; i < Response.data._issues.length; i++) {
              connectionErrors += Response.data._issues[i].details + " · ";
            }
            localStorage.setItem("issues", connectionErrors);
          } else localStorage.removeItem("issues");

          this.$router.push(`/results/${Response.data.id}`);
        } else {
          let request = {
            mode: {
              code: this.select.mode,
            },
            id: this.queryId,
            parameters: {
              diagnoses: this.selectedDiagnosis,
              mutatedGenes: this.selectedMutatedGenes,
              medicationsWithUsage: this.selectedDrugs,
              //responses: [],
              //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
              //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
              //drugs:[{usage:"recommended",drug:"something"}],
              responses: this.selectedResponses,
            },
          };

          //alert(JSON.stringify(request));

          let Response = await axios.post(
            process.env.baseUrl +
              process.env.port +
              `/bwhc/mtb/api/query/` +
              this.queryId,
            request
          );
          //alert(JSON.stringify(Response));
          this.$router.push(`/results/${Response.data.id}`);
          window.location.reload(true);
        }
      } catch (err) {
        if (err.status === 401) {
          this.$router.push("/");
        } else if (err.response.status === 403) {
          this.$router.push("/403");
        }
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

    addDiagnosis(diagnosis) {
      let code = diagnosis.split(" - ")[0];
      this.selectedDiagnosis.push({ code });
      //alert(JSON.stringify(this.selectedDiagnosis));
    },

    removeDiagnosis(item) {
      const index = this.diagnosis.indexOf(item);
      if (index >= 0) this.selectedDiagnosis.splice(index, 1);
      this.diagnosis.splice(index, 1);
    },

    resetDiagnosis() {
      this.selectedDiagnosis = [];
    },

    addMutatedGenes(mutatedGenes) {
      let code = mutatedGenes.split(" · ")[1];
      this.selectedMutatedGenes.push({ code });
      //alert(JSON.stringify(this.selectedDiagnosis));
    },

    removeMutatedGenes(item) {
      const index = this.mutatedGenes.indexOf(item);
      if (index >= 0) this.selectedMutatedGenes.splice(index, 1);
      this.mutatedGenes.splice(index, 1);
    },

    resetDiagnosis() {
      this.selectedMutatedGenes = [];
    },

    addDrugs(drug, usage) {
      //const index = this.drugs.indexOf(drug);
      //let code = drug.substr(0, drug.indexOf(" "));
      this.selectedDrugs.push({
        medication: { code: drug.split(" · ")[1] },
        usage: { code: usage },
      });
      //alert(JSON.stringify(this.selectedDrugs));
    },

    removeDrugs(item) {
      const index = this.drugs.indexOf(item);
      if (index >= 0) this.selectedDrugs.splice(index, 1);
      this.drugs.splice(index, 1);
    },

    resetDrugs() {
      this.selectedDrugs = [];
    },

    addResponses(responses) {
      let code = responses.split(" - ")[0];
      this.selectedResponses.push({ code });
    },

    removeResponses(item) {
      const index = this.responses.indexOf(item);
      if (index >= 0) this.selectedResponses.splice(index, 1);
      this.responses.splice(index, 1);
    },

    resetResponses() {
      this.selectedResponses = [];
    },

    setQueryParams(item) {
      this.mutations = this.getQueryParametersMutations;
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

      let Response = await axios.post(
        process.env.baseUrl+`:80/bwhc/mtb/query`,
        request
      );

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
