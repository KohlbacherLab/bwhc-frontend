<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <userPanel />
      <v-flex>
        <h3 class="display-3"><strong>bwHealthCloud</strong> query portal</h3>

        <!-- Temporary Password Protection
        <v-flex xs12 sm2>
          <v-text-field v-model="password" label="Password?" type="password" outline></v-text-field>
        </v-flex>
         -->

        <span class="subheading subheading font-weight-thin">
          <v-btn
            dark
            icon
            color="blue accent-2"
            align-end
            @click="$router.push('/')"
          >
            <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
          >Submitting a query is easy, check different query fields and select
          necessary parameters and click 'Submit New Query' button. If no
          selection is made from the catalogues, then query portal will return
          everything.
          <strong @click="$router.push('help')">Help?</strong>
        </span>
        <v-divider class="my-3"></v-divider>
      </v-flex>
      <!--
        v-if="password === 'bwhc'"
        -->

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
import { dirname } from "path";

import userPanel from "~/components/userPanel";
import navPanel from "~/components/navPanel";
import queryPanel from "~/components/queryPanel";

let serverBaseURL = process.env.baseUrl + process.env.port + `/bwhc/mtb`;
let seen = true;

export default {
  data: () => ({
    password: "",
    mutationOptions: "radioAll",
    drugUsage: "radioUsed",
    drugUsageCat: ["Recommended", "Used"],
    baseChangeCat: [
      "c.76A>C",
      "c.-14G>C",
      "c.88+1G>T",
      "c.89-2A>C",
      "c.*46T>A",
    ],
    aminoAcidChangesCat: [
      "p.Trp26Cys",
      "p.Phe2_Met46",
      "p.Met1_Lys45",
      "p.Trp26Ter",
      "p.Trp26_Leu833del",
    ],
    variantEffectsCat: [
      "Activating",
      "Inactivating",
      "FunctionChanged",
      "ProbActivating",
      "ProbInactivating",
      "ProbFunctionChange",
      "Ambiguous",
      "Benign",
      "NotAvailable",
    ],
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
    showSNV: false,
    showCNV: false,
    showSCNV: false,
    showSV: false,
    federatedQueryDialog: false,
  }),

  components: {
    userPanel,
    navPanel,
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
    /*
    items() {
      return this.genes.map(gene => {
        const name =
          gene.name.length > this.nameLimit
            ? gene.name.slice(0, this.nameLimit) + "..."
            : gene.name;

        return Object.assign({}, gene, { name });
      });
    }
    */
  },

  /* eski versiyon

  async asyncData({ params, error }) {
     
    let catalogs = await axios.get(process.env.baseUrl+`:80/bwhc/mtb/query/catalogs`);
    console.log(JSON.stringify(catalogs));

    let diagnosisCat = Array();

    for (var i = 0; i < catalogs.data.icd10.length; i++) {
      diagnosisCat.push(
        catalogs.data.icd10[i].code + " - " + catalogs.data.icd10[i].display
      );
    }

    return {
      diagnosisCat,
      genesCat: catalogs.data.genes,
      drugsCat: catalogs.data.drugs,
      responsesCat: catalogs.data.responses
    };
  },

  */

  async asyncData({ params, error }) {
    let diagnosisCatRaw = await axios.get(
      process.env.baseUrl + process.env.port + process.env.coding + "/ICD-10-GM"
    );
    console.log(JSON.stringify(diagnosisCatRaw));

    let genesCatRaw = await axios.get(
      process.env.baseUrl + process.env.port + process.env.coding + "/HGNC"
    );

    let drugsCatRaw = await axios.get(
      process.env.baseUrl + process.env.port + process.env.coding + "/ATC"
    );

    let responsesCatRaw = await axios.get(
      process.env.baseUrl + process.env.port + process.env.valueSet + "/RECIST"
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
  },

  methods: {
    async submitQuery() {
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

      alert("here is the " + request);

      let Response = await axios.post(
        process.env.baseUrl + process.env.port + process.env.query,
        request
      );

      this.$router.push(`/results/${Response.data.id}`);
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
          //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
          medicationsWithUsage: [{ usage: "recommended", drug: "something" }],
          //drugs:[{usage:"recommended",drug:"something"}],
          responses: this.responses,
        },
      };

      //alert("QUERY VIEW " +JSON.stringify(request));

      let Response = await axios.post(
        process.env.baseUrl + process.env.port + process.env.query,
        request
      );

      console.log(JSON.stringify(Response.data));
    },

    addDrug() {
      //var drugToAdd = { drug: this.drugs, usage: this.selectedDrugUsage };
      var obj = {
        drug: this.drugs[this.drugs.length - 1],
        usage: this.selectedDrugUsage,
      };
      this.drugQuery.push(obj);

      //alert(JSON.stringify(this.drugQuery));
    },

    testJson() {
      //alert("axios");
      //TODO:
    },

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },

    /*
    submit(event) {
      const request = {
        diagnosis: this.diagnosis,
        //genes: this.genes,
        //drugs: this.drugs,
        //responses: this.responses,
        local: this.localQuery
      };
      this.$router.push(`results/${this.diagnosis}`);
    },
    clear() {
      this.$refs.form.reset();
    }
    */
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