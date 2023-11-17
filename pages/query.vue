<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <userPanel />
      <v-flex>
        <h3 class="display-3"><strong>bwHealthCloud</strong> Abfrage-Portal</h3>

        <span class="subheading subheading font-weight-thin">
          <v-btn
            dark
            icon
            color="blue accent-2"
            align-end
            @click="$router.push('/main')"
          >
            <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
          >Ohne Such-Kriterien, wird die Anfrage alles zurückliefern. <strong>Wie funktioniert die Auswahl von Parametern</strong>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon color="grey accent-2" dark v-on="on"
                ><v-icon dark>fas fa-question</v-icon></v-btn
              > 
            </template> 
            <v-card>
              <v-toolbar dark color="grey accent-2">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title
                  >Hilfe! Wie funktioniert die Auswahl von Parametern, um eine
                  Abfrage durchzuführen?</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-flex d-flex xs12 sm6 md12>
                <v-card flat>
                  <v-card-title primary class="headline font-weight-thin"
                    >Abfrageparameter</v-card-title
                  >
                  <v-card-text class="subheading font-weight-thin">
                    Alterationen <v-icon color="purple" dark>fas fa-dna</v-icon>
                  </v-card-text>
                  <v-card-text class="subheading grey--text font-weight-light">
                    Alternationen ermöglicht es den Benutzern, nach Gen-Symbolen
                    zu suchen. Wenn Sie in den Feldern zu tippen beginnen,
                    werden die Kataloge die Liste minimieren, um Ihnen mögliche
                    Auswahlmöglichkeiten anzuzeigen.

                    <br />
                    Die Abfrage mit SNV oder CNV erfordert die Erstellung eines
                    Bündels. Klicken Sie also auf die Option SNV oder CNV,
                    wählen Sie dann ein Gen aus, fügen Sie optional weitere
                    Optionen hinzu und klicken Sie dann auf 'Hinzufügen', um die
                    Parameter zu bündeln.
                    <br />
                  </v-card-text>
                  </v-card>
              </v-flex>

              <template>
                <v-stepper v-model="e6" vertical>
                  <v-stepper-step :complete="e6 > 1" step="1">
                    Wählen Sie ein beliebiges Gen aus.
                    <small>Wählen Sie 'beliebig' aus den Optionsfeldern</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card flat class="mb-5" height="130px"
                      ><img width="400px" src="alterationen_beliebig01.png"
                    /></v-card>
                    <v-btn dark round depressed color="purple" @click="e6 = 2"
                      >Weiter</v-btn
                    >
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 2" step="2"
                    >Geben Sie den Gennamen ein.</v-stepper-step
                  >

                  <v-stepper-content step="2">
                    <v-card flat class="mb-5" height="210px"
                      ><img width="400px" src="alterationen_beliebig02.png"
                    /></v-card>
                    <v-btn dark round depressed color="purple" @click="e6 = 3"
                      >Weiter</v-btn
                    >
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 3" step="3"
                    >Es ist möglich, den Chip jederzeit zu
                    löschen.</v-stepper-step
                  >

                  <v-stepper-content step="3">
                    <v-card flat class="mb-5" height="135px"
                      ><img width="400px" src="alterationen_beliebig03.png"
                    /></v-card>
                    <v-btn dark round depressed color="purple" @click="e6 = 4"
                      >Weiter</v-btn
                    >
                  </v-stepper-content>

                  <v-stepper-step step="4"
                    >Es ist auch möglich, mehrere Gene
                    hinzuzufügen.</v-stepper-step
                  >
                  <v-stepper-content step="4">
                    <v-card flat class="mb-5" height="165px"
                      ><img width="400px" src="alterationen_beliebig04.png"
                    /></v-card>
                    <v-btn dark round depressed color="purple" @click="e6 = 1"
                      >Neustart</v-btn
                    >
                  </v-stepper-content>
                </v-stepper>
              </template>

              <!--
              <v-card-text class="subheading font-weight-thin">
                    Diagnose
                    <v-icon color="indigo" dark>fas fa-diagnoses</v-icon>
                  </v-card-text>
                  <v-card-text class="subheading grey--text font-weight-light">
                    Text for ICD-10
                    <br />
                    ...
                    <br />
                  </v-card-text>
                  <v-card-text class="subheading font-weight-thin">
                    Wirkstoffe
                    <v-icon color="blue">fas fa-pills</v-icon>
                  </v-card-text>
                  <v-card-text class="subheading grey--text font-weight-light">
                    Text for selections
                    <br />
                    Text for medicine
                    <br />
                  </v-card-text>
                  <v-card-text class="subheading font-weight-thin">
                    Response
                    <v-icon color="cyan">fas fa-vials</v-icon>
                  </v-card-text>
                  <v-card-text class="subheading grey--text font-weight-light">
                    Text for response
                    <br />
                  </v-card-text>
                </v-card>
              </v-flex>
              <img width="400px" src="alterationen_beliebig.jpg" />
              <img width="291px" src="alterationen_snv.jpg" />
              -->
              
            </v-card>
          </v-dialog>
        </span>
        <v-divider class="my-3"></v-divider>
      </v-flex>

      <queryPanel
        v-bind:genesCat="genesCat"
        :genesCatSimplified="genesCatSimplified"
        :diagnosisCat="diagnosisCat"
        :tumorMorphologyCat="tumorMorphologyCat"
        :cnvTypCat="cnvTypCat"
        :drugsCat="drugsCat"
        :responsesCat="responsesCat"
        :baseChangeCat="baseChangeCat"
        :aminoAcidChangesCat="aminoAcidChangesCat"
        :variantEffectsCat="variantEffectsCat"
        :diagnosis="diagnosis"
        :getSavedQueries="getSavedQueries"
        clipped-right
      />
      <v-divider class="my-3"></v-divider>

      <v-col v-for="(issue, i) in issues" :key="i">
        <div class="caption">{{ issue.details }}</div>
      </v-col>

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
          ><i class="fa fa-times-circle"></i
        ></v-btn>
      </v-snackbar>
    </v-container>
  </v-responsive>
</template>

<script>
import axios from "axios";
import { dirname } from "path";

import userPanel from "~/components/userPanel";
import queryPanel from "~/components/queryPanel";

let seen = true;

export default {
  loading: "~/components/loading.vue",

  data: () => ({
    errorMessages: "",
    formHasErrors: false,
    nameLimit: 60,
    isLoading: false,
    search: null,
    snackbarParameters: false,
    dialog: false,
    e6: 0,
    y: "top",
  }),

  components: {
    userPanel,
    queryPanel,
  },

  computed: {
    form() {
      return {
        diagnosis: this.diagnosis,
        responses: this.responses,
        queryType: false,
      };
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
          "/ICD-10-GM"
      );

      let tumorMorphologyCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          `/bwhc/catalogs/api/Coding?system=icd-o-3-m`
      );

      let genesCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + "/HGNC"
      );

      let cnvTypCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          `/bwhc/catalogs/api/ValueSet?name=cnv-typ`
      );

      let drugsCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + "?system=atc"
      );

      let responsesCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.valueSet +
          "/RECIST"
      );

      let getSavedQueries = await axios.get(
        process.env.baseUrl + process.env.port + process.env.preparedQueries
      );

      let diagnosisCat = Array();
      let tumorMorphologyCat = Array();
      let genesCat = Array();
      let genesCatSimplified = Array();
      let cnvTypCat = Array();
      let drugsCat = Array();
      let responsesCat = Array();

      for (var i = 0; i < diagnosisCatRaw.data.entries.length; i++) {
        diagnosisCat.push(
          diagnosisCatRaw.data.entries[i].code +
            " - " +
            diagnosisCatRaw.data.entries[i].display
        );
      }

      for (var i = 0; i < tumorMorphologyCatRaw.data.entries.length; i++) {
        tumorMorphologyCat.push(
          tumorMorphologyCatRaw.data.entries[i].code +
            " - " +
            tumorMorphologyCatRaw.data.entries[i].display
        );
      }

      for (var i = 0; i < genesCatRaw.data.entries.length; i++) {
        genesCat.push(
          genesCatRaw.data.entries[i].symbol +
            " - " +
            genesCatRaw.data.entries[i].name +
            " · " +
            genesCatRaw.data.entries[i].hgncId
        );
      }

      for (var i = 0; i < genesCatRaw.data.entries.length; i++) {
        genesCatSimplified.push(
          genesCatRaw.data.entries[i].symbol +
            " · " +
            genesCatRaw.data.entries[i].hgncId
        );
      }

      for (var i = 0; i < cnvTypCatRaw.data.concepts.length; i++) {
        cnvTypCat.push(
          cnvTypCatRaw.data.concepts[i].code
          //  + " - " +
          //  cnvTypCatRaw.data.concepts[i].display
        );
      }

      for (var i = 0; i < drugsCatRaw.data.entries.length; i++) {
        drugsCat.push(
          drugsCatRaw.data.entries[i].name +
            " · " +
            drugsCatRaw.data.entries[i].code +
            " · " +
            drugsCatRaw.data.entries[i].version
        );
      }

      for (var i = 0; i < responsesCatRaw.data.concepts.length; i++) {
        responsesCat.push(
          responsesCatRaw.data.concepts[i].code +
            " - " +
            responsesCatRaw.data.concepts[i].display
        );
      }

      return {
        diagnosisCat,
        tumorMorphologyCat,
        genesCat,
        genesCatSimplified,
        cnvTypCat,
        drugsCat,
        responsesCat,
        getSavedQueries,
      };
    } catch (err) {
      if (err.status === 401) {
        return redirect("/");
      } else if (err.status === 403) {
        return redirect("/403");
      } else if (err.status === 400) {
        return redirect("/400");
      } else if (err.status === 500) {
        return redirect("/500");
      } else if (err.status === 404) {
        return redirect("/404");
      } else {
        return redirect("/undefined");
      }
    }
  },

  mounted() {
    this.resetParameters();
  },

  methods: {
    /*
    async submitQuery() {
      try {
        let diagnosis = Array();
        for (var i = 0; i < this.diagnosis.length; i++) {
          diagnosis.push(this.diagnosis[i].slice(0, 5));
        }

        let request = {
          //mode: this.localQuery,
          mode: "Local",
          parameters: {
            diagnosis: diagnosis,
            //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
            //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
            //drugs:[{usage:"recommended",drug:"something"}],
            //responses: this.responses
          },
        };

        let Response = await axios.post(
          process.env.baseUrl + process.env.port + process.env.query,
          request
        );

        this.$router.push(`/results/${Response.data.id}`);
      } catch (err) {
        if (err.status === 401) {
          return redirect("/");
        } else if (err.status === 403) {
          return redirect("/403");
        } else {
          return redirect("/" + err.response.status);
        }
      }
    }, */

    goBack() {
      return window.history.back();
    },

    removeDrug(item) {
      const index = this.drugs.indexOf(item);
      if (index >= 0) this.drugs.splice(index, 1);
    },

    removeMutation(item) {
      const index = this.mutations.indexOf(item);
      if (index >= 0) this.mutations.splice(index, 1);
    },

    addMutation(item) {
      this.queryMutationChips = [this.gene, this.mutationType];
    },

    /*
    async printQuery() {
      var diagnosis = Array();
      for (var i = 0; i < this.diagnosis.length; i++) {
        diagnosis.push(this.diagnosis[i].slice(0, 5));
      }

      let request = {
        mode: this.localQuery,
        parameters: {
          diagnosis: diagnosis,
          mutatedGenes,
          medicationsWithUsage: [{ usage: "recommended", drug: "something" }],
          responses: this.responses,
        },
      };

      let Response = await axios.post(
        process.env.baseUrl + process.env.port + process.env.query,
        request
      );
    },
    */

    addDrug() {
      var obj = {
        drug: this.drugs[this.drugs.length - 1],
        usage: this.selectedDrugUsage,
      }; alert(obj);
      this.drugQuery.push(obj);
    },

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
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
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.diagnosisCatRaw.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(process.env.baseUrl + process.env.port + process.env.coding)
        .then((res) => res.json())
        .then((res) => {
          this.diagnosisCatRaw = res.genesCat;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
