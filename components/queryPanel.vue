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
              v-model="mutatedGenes"
              :items="genesCat"
              :loading="isLoading"
              item-text="name"
              item-value="id"
              label="Gen-Name oder HGNC Symbol"
              ref="mutatedGenes"
              chips
              cache-items
              deletable-chips
              dense
              hide-no-data
              multiple
              @input="addMutatedGenes(mutatedGenes[mutatedGenes.length - 1])"
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
              :loading="isLoading"
              label="Diagnose-Text oder ICD-10 Code"
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

            <v-autocomplete
              v-model="tumorMorphology"
              :items="tumorMorphologyCat"
              :loading="isLoading"
              label="Tumor Morphology oder ICD-O-3-M Code"
              ref="tumorMorphology"
              chips
              deletable-chips
              dense
              multiple
              placeholder
              @input="
                addTumorMorphology(tumorMorphology[tumorMorphology.length - 1])
              "
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  :selected="data.selected"
                  close
                  @input="removeTumorMorphology(data.item)"
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

            <v-autocomplete
              v-model="drugs"
              :items="drugsCat"
              :itemscope="used"
              :loading="isLoading"
              label="Wirkstoff-Name oder ATC Code"
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
                  {{ selectedDrugsDisplay[data.index].usage }}
                </v-chip>
              </template>
            </v-autocomplete>

            <v-radio-group v-model="drugUsage" row>
              <v-radio label="Verabreicht" value="used"></v-radio>
              <v-radio label="Empfohlen" value="recommended"></v-radio>
              <v-radio label="Beide" value="beide"></v-radio>
              <v-radio label="Egal" value="egal"></v-radio>
            </v-radio-group>
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
              label="Response oder RECIST Code"
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

      <!--
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
        
      </v-flex>
      -->
      <v-flex d-flex xs12 sm6 md6>
        <v-btn
          v-if="this.localButton"
          class="subheading font-weight-regular"
          dark
          block
          :loading="isLoading"
          slot="activator"
          color="blue accent-2"
          @click="submitQuery('local')"
          >Lokal Anfrage senden</v-btn
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

      <v-flex d-flex xs12 sm6 md6>
        <v-btn
          v-if="this.federatedButton"
          class="subheading font-weight-regular"
          dark
          block
          slot="activator"
          color="blue accent-4"
          @click="submitQuery('federated')"
          >Föderiert Anfrage senden</v-btn
        >
      </v-flex>

      <!--
      <v-btn
        flat
        small
        dark
        medium
        color="red accent-3"
        @click="resetParameters()"
      >
        Reset
      </v-btn>
-->

      <v-snackbar
        v-model="snackbarParameters"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        Abfrageparameter zurückgesetzt
        <v-btn color="blue" flat @click="snackbarParameters = false"
          >Schließen</v-btn
        >
      </v-snackbar>

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
    "tumorMorphologyCat",
    "drugsCat",
    "responsesCat",
    "baseChangeCat",
    "aminoAcidChangesCat",
    "variantEffectsCat",
    "getQueryParametersMutations",
    "getQueryParametersDiagnosis",
    "getQueryParametersTumorMorphology",
    "getQueryParametersDrugs",
    "getQueryParametersDrugsUsage",
    "getQueryParametersResponses",
    "getQueryParametersFederated",
    "queryId",
  ],

  data: () => ({
    //mutationOptions: "radioAll",
    //showSNV: false,
    //showCNV: false,
    //showSCNV: false,
    //showSV: false,

    selectedMutatedGenes: Array(),
    selectedDiagnosis: Array(),
    selectedTumorMorphology: Array(),
    selectedDrugs: Array(),
    selectedDrugsDisplay: Array(),
    selectedResponses: Array(),

    //localQuery: false,

    localButton: false,
    federatedButton: false,

    drugUsage: "egal",

    federatedQueryDialog: false,

    snackbarParameters: false,
    y: "top",
  }),

  mounted() {
    this.checkQueryRights();
    this.setQueryParams();
  },

  methods: {
    async checkQueryRights() {
      const queryRights = await axios.get(
        process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query/`
      );

      let whichQuery = queryRights.data._actions;

      if (whichQuery["submit-local-query"].method.length > 0)
        this.localButton = true;
      if (whichQuery["submit-federated-query"].method.length > 0)
        this.federatedButton = true;
    },

    async submitQuery(queryMode) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        /*
        let mutatedGenes = Array();
        if (this.genes) {
          for (var i = 0; i < this.genes.length; i++) {
            mutatedGenes.push(
              //this.genes[i].substr(0, this.genes[i].indexOf(" "))
              //this.genes[i][0]
              this.genes[i].split(" · ")[1]
            );
          }
        }*/

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

        let tumorMorphology = Array();
        if (this.tumorMorphology) {
          for (var i = 0; i < this.tumorMorphology.length; i++) {
            tumorMorphology.push(
              this.tumorMorphology[i].substr(
                0,
                this.tumorMorphology[i].indexOf(" ")
              )
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

        this.queryId = localStorage.getItem("queryId");

        if (this.queryId == undefined) {
          let request = {
            mode: {
              code: queryMode,
            },
            parameters: {
              mutatedGenes: this.selectedMutatedGenes,
              diagnoses: this.selectedDiagnosis,
              tumorMorphology: this.selectedTumorMorphology,
              medicationsWithUsage: this.selectedDrugs,
              responses: this.selectedResponses,
              //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
              //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
              //drugs:[{usage:"recommended",drug:"something"}],
            },
          };

          let Response = await axios.post(
            process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query/`,
            request
          );

          localStorage.setItem(
            "mutatedGenes",
            JSON.stringify(this.mutatedGenes)
          );
          localStorage.setItem("diagnosis", JSON.stringify(this.diagnosis));
          localStorage.setItem(
            "tumorMorphology",
            JSON.stringify(this.tumorMorphology)
          );
          localStorage.setItem(
            "selectedDrugs",
            JSON.stringify(this.medicationsWithUsage)
          );
          localStorage.setItem("responses", JSON.stringify(this.responses));

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
              code: queryMode,
            },
            id: this.queryId,
            parameters: {
              mutatedGenes: this.selectedMutatedGenes,
              diagnoses: this.selectedDiagnosis,
              tumorMorphology: this.selectedTumorMorphology,
              medicationsWithUsage: this.selectedDrugs,
              responses: this.selectedResponses,
              //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
              //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
              //drugs:[{usage:"recommended",drug:"something"}],
            },
          };

          let Response = await axios.post(
            process.env.baseUrl +
              process.env.port +
              `/bwhc/mtb/api/query/` +
              this.queryId,
            request
          );

          localStorage.setItem(
            "mutatedGenes",
            JSON.stringify(this.mutatedGenes)
          );
          localStorage.setItem("diagnosis", JSON.stringify(this.diagnosis));
          localStorage.setItem(
            "tumorMorphology",
            JSON.stringify(this.tumorMorphology)
          );
          localStorage.setItem(
            "selectedDrugs",
            JSON.stringify(this.medicationsWithUsage)
          );
          localStorage.setItem("responses", JSON.stringify(this.responses));

          if (JSON.stringify(Response.data._issues) != undefined) {
            let connectionErrors = "";
            for (var i = 0; i < Response.data._issues.length; i++) {
              connectionErrors += Response.data._issues[i].details + " · ";
            }

            localStorage.setItem("issues", connectionErrors);
          } else localStorage.removeItem("issues");

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

    // MUTATED GENES

    addMutatedGenes(mutatedGenes) {
      let code = mutatedGenes.split(" · ")[1];
      this.selectedMutatedGenes.push({ code });
    },

    removeMutatedGenes(item) {
      const index = this.mutatedGenes.indexOf(item);
      if (index >= 0) this.selectedMutatedGenes.splice(index, 1);
      this.mutatedGenes.splice(index, 1);
    },

    resetMutatedGenes() {
      this.selectedMutatedGenes = [];
    },

    // DIAGNOSIS (ICD-10)

    addDiagnosis(diagnosis) {
      let code = diagnosis.split(" - ")[0];
      this.selectedDiagnosis.push({ code });
    },

    removeDiagnosis(item) {
      const index = this.diagnosis.indexOf(item);
      if (index >= 0) this.selectedDiagnosis.splice(index, 1);
      this.diagnosis.splice(index, 1);
    },

    resetDiagnosis() {
      this.selectedDiagnosis = [];
    },

    // TUMOR MORPHOLOGY (ICD-O-3)

    addTumorMorphology(tumorMorphology) {
      let code = tumorMorphology.split(" - ")[0];
      this.selectedTumorMorphology.push({ code });
    },

    removeTumorMorphology(item) {
      const index = this.tumorMorphology.indexOf(item);
      if (index >= 0) this.selectedTumorMorphology.splice(index, 1);
      this.tumorMorphology.splice(index, 1);
    },

    resetTumorMorphology() {
      this.selectedTumorMorphology = [];
    },

    // DRUGS

    addDrugs(drug, usage) {
      if (usage == "beide") {
        this.selectedDrugs.push({
          medication: { code: drug.split(" · ")[1] },
          usage: [{ code: "used" }, { code: "recommended" }],
        });
        this.selectedDrugsDisplay.push({
          medication: { code: drug.split(" · ")[1] },
          usage: "(v+e)",
        });
      } else if (usage == "egal") {
        this.selectedDrugs.push({
          medication: { code: drug.split(" · ")[1] },
          usage: [],
        });
        this.selectedDrugsDisplay.push({
          medication: { code: drug.split(" · ")[1] },
          usage: "",
        });
      } else {
        this.selectedDrugs.push({
          medication: { code: drug.split(" · ")[1] },
          usage: [{ code: usage }],
        });
        if (usage === "used") {
          this.selectedDrugsDisplay.push({
            medication: { code: drug.split(" · ")[1] },
            usage: "(v)",
          });
        } else {
          this.selectedDrugsDisplay.push({
            medication: { code: drug.split(" · ")[1] },
            usage: "(e)",
          });
        }
      }
    },

    addDrug() {
      //var drugToAdd = { drug: this.drugs, usage: this.selectedDrugUsage };
      var obj = {
        drug: this.drugs[this.drugs.length - 1],
        usage: this.selectedDrugUsage,
      };
      this.drugQuery.push(obj);
    },

    removeDrugs(item) {
      const index = this.drugs.indexOf(item);
      if (index >= 0) this.selectedDrugs.splice(index, 1);
      this.drugs.splice(index, 1);
    },

    resetDrugs() {
      this.selectedDrugs = [];
      this.selectedDrugsDisplay = [];
    },

    // RESPONSES

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

    // QUERY PARAMETERS

    setQueryParams() {
      this.mutatedGenes = this.getQueryParametersMutations;
      if (this.getQueryParametersMutations)
        for (var i = 0; i < this.getQueryParametersMutations.length; i++) {
          this.addMutatedGenes(this.getQueryParametersMutations[i]);
        }

      this.diagnosis = this.getQueryParametersDiagnosis;
      if (this.getQueryParametersDiagnosis)
        for (var i = 0; i < this.getQueryParametersDiagnosis.length; i++) {
          this.addDiagnosis(this.getQueryParametersDiagnosis[i]);
        }

      this.tumorMorphology = this.getQueryParametersTumorMorphology;
      if (this.getQueryParametersTumorMorphology)
        for (
          var i = 0;
          i < this.getQueryParametersTumorMorphology.length;
          i++
        ) {
          this.addTumorMorphology(this.getQueryParametersTumorMorphology[i]);
        }

      this.drugs = this.getQueryParametersDrugs;
      if (this.getQueryParametersDrugs)
        for (var i = 0; i < this.getQueryParametersDrugs.length; i++) {
          this.addDrugs(
            this.getQueryParametersDrugs[i],
            this.getQueryParametersDrugsUsage[i]
          );
        }

      this.responses = this.getQueryParametersResponses;
      if (this.getQueryParametersResponses)
        for (var i = 0; i < this.getQueryParametersResponses.length; i++) {
          this.addResponses(this.getQueryParametersResponses[i]);
        }
    },

    resetParameters() {
      this.snackbarParameters = true;
      localStorage.removeItem("diagnosis");
      localStorage.removeItem("tumorMorphology");
      localStorage.removeItem("mutatedGenes");
      localStorage.removeItem("selectedDrugs");
      localStorage.removeItem("responses");
      localStorage.removeItem("queryId");
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
