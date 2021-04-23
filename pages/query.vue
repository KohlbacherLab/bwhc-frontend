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
          >Ohne Such-Kriterien, wird die Anfrage alles zurückliefern. 
          <strong @click="$router.push('help')">Hilfe?</strong>
        </span>
        <v-divider class="my-3"></v-divider>
      </v-flex>

      <queryPanel
        v-bind:genesCat="genesCat"
        :diagnosisCat="diagnosisCat"
        :drugsCat="drugsCat"
        :responsesCat="responsesCat"
        :baseChangeCat="baseChangeCat"
        :aminoAcidChangesCat="aminoAcidChangesCat"
        :variantEffectsCat="variantEffectsCat"
        :diagnosis="diagnosis"
        clipped-right
      />
      <v-divider class="my-3"></v-divider>
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
  data: () => ({
    password: "",
    mutationOptions: "radioAll",
    drugUsage: "radioUsed",
    drugUsageCat: ["Recommended", "Used"],
    errorMessages: "",
    diagnosis: Array(),
    genes: Array(),
    drugs: null,
    responses: null,
    localQuery: false,
    formHasErrors: false,
    nameLimit: 60,
    isLoading: false,
    search: null,
    federatedQueryDialog: false,
  }),

  components: {
    userPanel,
    queryPanel,
  },

  computed: {
    form() {
      return {
        diagnosis: this.diagnosis,
        //genes: this.genes,
        //drugs: this.drugs,
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
      console.log(JSON.stringify(diagnosisCatRaw));

      let genesCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + "/HGNC"
      );

      let drugsCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + "/ATC"
      );

      let responsesCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.valueSet +
          "/RECIST"
      );

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

      return {
        diagnosisCat,
        genesCat,
        drugsCat,
        responsesCat,
      };
    } catch (err) {
      if (err.status === 401) {
        return redirect("/");
      } else if (err.response.status === 403) {
        return redirect("/403");
      }
    }
  },

  methods: {
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
        } else if (err.response.status === 403) {
          return redirect("/403");
        }
      }
    },

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

      console.log(JSON.stringify(Response.data));
    },

    addDrug() {
      var obj = {
        drug: this.drugs[this.drugs.length - 1],
        usage: this.selectedDrugUsage,
      };
      this.drugQuery.push(obj);
    },

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.genesCat.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(process.env.baseUrl + process.env.port + process.env.coding)
        .then((res) => res.json())
        .then((res) => {
          this.genesCat = res.genes;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>