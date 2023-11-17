<template>
  <v-container fluid grid-list-md>
    <v-layout wrap>
      <v-flex xs12 sm12 md6>
        <v-card class="mx-auto" flat light max-width="1200">
          <v-flex d-flex>
            <v-card
              class="mx-auto"
              flat
              color="purple lighten-4"
              light
              max-width="1200"
            >
              <v-card-text class="headline font-weight-thin">
                <v-icon color="purple" dark>fas fa-dna</v-icon
                ><b> Alterationen</b>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn flat icon color="white" v-bind="attrs" v-on="on">
                      <v-icon>fas fa-info-circle</v-icon>
                    </v-btn>
                  </template>
                  <span
                    >Wählen Sie den Typ der Änderungen aus und fügen Sie
                    anschließend Gene, SNV und/oder CNV hinzu, bevor Sie die
                    Abfrage starten.<br />
                    Für weitere Unterstützung klicken Sie auf das
                    <v-icon dark style="font-size: 1rem"
                      >fas fa-question</v-icon
                    >
                    oben.</span
                  >
                </v-tooltip>

                <v-radio-group v-model="mutationOptions" row>
                  <v-radio
                    label="SNV"
                    value="radioSNV"
                    @change="
                      (showSNV = true),
                        (showCNV = false),
                        (showFusions = false),
                        (showAll = false)
                    "
                  >
                  </v-radio>
                  <v-radio
                    label="CNV"
                    value="radioCNV"
                    @change="
                      (showSNV = false),
                        (showCNV = true),
                        (showFusions = false),
                        (showAll = false)
                    "
                  >
                  </v-radio>
                  <v-radio
                    label="Fusionen"
                    value="radioFusions"
                    @change="
                      (showSNV = false),
                        (showCNV = false),
                        (showFusions = true),
                        (showAll = false)
                    "
                  >
                  </v-radio>
                  <v-radio
                    label="Beliebig"
                    value="radioBeliebig"
                    @change="
                      (showSNV = false),
                        (showCNV = false),
                        (showFusions = false),
                        (showAll = true)
                    "
                  >
                  </v-radio>
                </v-radio-group>

                <v-autocomplete
                  v-if="showAll"
                  v-model="mutatedGenes"
                  :items="genesCat"
                  :loading="isLoading"
                  item-text="name"
                  item-value="id"
                  label="Beliebig · Gen-Name oder HGNC Symbol"
                  ref="mutatedGenes"
                  chips
                  cache-items
                  deletable-chips
                  dense
                  hide-no-data
                  multiple
                  @input="
                    addMutatedGenes(mutatedGenes[mutatedGenes.length - 1])
                  "
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
                </v-autocomplete>

                <v-flex d-flex v-if="showSNV">
                  <v-card color="grey lighten-3" flat>
                    <v-card-text class="title font-weight-thin">
                      <div class="subheading">
                        Bitte wählen Sie das vom SNV betroffene Gen, und
                        optional cDNA change, protein change aus.
                      </div>
                      <br />

                      <v-autocomplete
                        v-model="mutatedGenesSNV"
                        :items="genesCatSimplified"
                        :loading="isLoading"
                        label="SNV · Gen-Name oder HGNC Symbol"
                        ref="mutatedGenesSNV"
                        chips
                        flat
                        cache-items
                        deletable-chips
                        dense
                        hide-selected
                        clearable
                        solo
                      >
                      </v-autocomplete>

                      <v-layout row wrap>
                        <v-flex xs12 sm6 md9>
                          <v-text-field
                            v-model="dnaChange"
                            clearable
                            flat
                            placeholder="cDNA Change"
                            solo-inverted
                            :rules="[rulesSNV.validateDnaChange]"
                          ></v-text-field>

                          <v-text-field
                            v-model="aminoAcidChange"
                            clearable
                            flat
                            placeholder="Protein Change"
                            solo-inverted
                            :rules="[rulesSNV.validateAminoAcidChange]"
                          ></v-text-field>

                          <div class="subheading">
                            Klicken Sie auf die
                            <strong>Hinzufügen</strong> Taste, um die Auswahl in
                            die Suche zu übernehmen.
                          </div>
                          <br />

                          <v-btn
                            large
                            color="grey darken-1"
                            @click="
                              addMutatedGenesSNV(
                                dnaChange,
                                aminoAcidChange,
                                mutatedGenesSNV
                              )
                            "
                            dark
                          >
                            Hinzufügen
                          </v-btn>
                        </v-flex>

                        <v-combobox
                          v-model="selectedMutatedGenesSNV"
                          :items="items"
                          label="Das ausgewählte SNV wird hier angezeigt"
                          clearable
                          flat
                          chips
                          cache-items
                          deletable-chips
                          dense
                          hide-no-data
                          multiple
                          hide-selected
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              :selected="data.selected"
                              flat
                              label
                              close
                              @input="removeSelectedMutatedGenesSNV(data.item)"
                            >
                              <strong>
                                {{ data.item.gene.display }}
                                {{ data.item.dnaChange }}
                                <i>{{ data.item.aminoAcidChange }}</i>
                              </strong>
                            </v-chip>
                          </template>
                        </v-combobox>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex d-flex v-if="showCNV">
                  <v-card color="grey lighten-3" flat>
                    <v-card-text class="title font-weight-thin">
                      <div class="subheading">
                        Bitte wählen Sie ein oder mehrere vom CNV betroffene
                        Gene, und optional CNV-Typ, Min- und Max-Kopienzahl.
                      </div>
                      <br />

                      <v-autocomplete
                        v-model="mutatedGenesCNV"
                        :items="genesCatSimplified"
                        :loading="isLoading"
                        label="CNV · Gen-Name oder HGNC Symbol"
                        ref="mutatedGenesCNV"
                        chips
                        flat
                        cache-items
                        deletable-chips
                        dense
                        hide-no-data
                        multiple
                        hide-selected
                        clearable
                        solo
                      >
                        <template slot="selection" slot-scope="data">
                          <v-chip
                            :selected="data.selected"
                            close
                            @input="removeMutatedGenesCNV(data.item)"
                          >
                            {{ data.item }}
                          </v-chip>
                        </template>
                      </v-autocomplete>

                      <v-layout row wrap>
                        <v-flex xs12 sm6 md9>
                          <v-select
                            flat
                            v-model="cnvType"
                            :items="cnvTypCat"
                            solo-inverted
                            label="CNV Typ"
                          ></v-select>

                          <v-text-field
                            flat
                            v-model="cnvMin"
                            clearable
                            solo-inverted
                            label="Min Copy Number"
                          ></v-text-field>

                          <v-text-field
                            flat
                            v-model="cnvMax"
                            clearable
                            solo-inverted
                            label="Max Copy Number"
                          ></v-text-field>

                          <div class="subheading">
                            Klicken Sie auf die
                            <strong>Hinzufügen</strong> Taste, um die Auswahl in
                            die Suche zu übernehmen.
                          </div>
                          <br />

                          <v-btn
                            large
                            color="grey darken-2"
                            @click="
                              addMutatedGenesCNV(
                                cnvType,
                                cnvMax,
                                cnvMin,
                                mutatedGenesCNV
                              )
                            "
                            dark
                          >
                            Hinzufügen
                          </v-btn>
                        </v-flex>

                        <v-combobox
                          v-model="selectedMutatedGenesCNV"
                          :items="items"
                          label="Das ausgewählte CNV wird hier angezeigt"
                          clearable
                          flat
                          chips
                          cache-items
                          deletable-chips
                          dense
                          hide-no-data
                          multiple
                          hide-selected
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              :selected="data.item"
                              label
                              close
                              flat
                              @input="
                                removeSelectedMutatedGenesCNV(data.item.genes)
                              "
                            >
                              <strong>
                                <span
                                  v-for="gene in data.item.genes"
                                  v-bind:key="gene.index"
                                >
                                  · {{ gene.display }}
                                </span>
                                {{ data.item.type }}
                                <i v-if="data.item.copyNumber.max">{{
                                  data.item.copyNumber.max
                                }}</i>
                                <i v-if="data.item.copyNumber.min">{{
                                  data.item.copyNumber.min
                                }}</i>
                              </strong>
                            </v-chip>
                          </template>
                        </v-combobox>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex d-flex v-if="showFusions">
                  <v-card color="grey lighten-3" flat>
                    <v-card-text class="title font-weight-thin">
                      <div class="subheading">
                        <b>Diese Funktion ist noch nicht vollständig!</b><br />
                        Bitte wählen Sie ein Fusionspartner-Gen und
                        (5',3')-Zuordnung, sowie den Fusionstyp (DNA, RNA).
                      </div>

                      <!-- 
                        <span class="grey--text">CNV</span>
                      -->
                      <v-radio-group v-model="fusionType" row>
                        <v-radio label="RNA" value="rnaFusions"></v-radio>
                        <v-radio label="DNA" value="dnaFusions"></v-radio>

                        <v-radio label="Beide" value="bothFusions"></v-radio>
                      </v-radio-group>
                      <v-autocomplete
                        v-model="fusions5"
                        :items="genesCatSimplified"
                        :loading="isLoading"
                        item-text="name"
                        item-value="id"
                        label="RNA & DNA Fusions · Gen-Name oder HGNC Symbol"
                        ref="fusions"
                        chips
                        flat
                        dense
                        solo
                        hide-no-data
                        hide-selected
                        clearable
                      >
                        <!--
                        <template slot="selection" slot-scope="data">
                          <v-chip
                            :selected="data.selected"
                            close
                            @input="removeFusions(data.item)"
                          >
                            {{ data.item }}
                          </v-chip>
                        </template>

                        -->

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

                      <v-autocomplete
                        v-model="fusions3"
                        :items="genesCatSimplified"
                        :loading="isLoading"
                        item-text="name"
                        item-value="id"
                        label="RNA & DNA Fusions · Gen-Name oder HGNC Symbol"
                        ref="fusions3"
                        chips
                        flat
                        dense
                        solo
                        hide-no-data
                        hide-selected
                        clearable
                      >
                      </v-autocomplete>

                      <v-radio-group v-model="primeType" row>
                        <v-radio label="5'" value="fivePrimeGene"></v-radio>
                        <v-radio label="3'" value="threePrimeGene"></v-radio>
                        <v-radio label="Beide" value="bothPrimes"></v-radio>
                      </v-radio-group>

                      <div class="subheading">
                        <b>Diese Funktion ist noch nicht vollständig!</b><br />
                        Klicken Sie auf die <strong>Hinzufügen</strong> Taste,
                        um die Auswahl in die Suche zu übernehmen.
                      </div>

                      <v-layout row wrap>
                        <v-flex xs12 sm6 md9>
                          <v-btn
                            large
                            color="grey darken-2"
                            @click="addFusions(fusions5, fusions3, fusionType)"
                            dark
                          >
                            Hinzufügen
                          </v-btn>
                        </v-flex>

                        <v-combobox
                          v-model="selectedDnaFusions"
                          :items="items"
                          clearable
                          label="Das ausgewählte DNA Fusion wird hier angezeigt"
                          chips
                          cache-items
                          deletable-chips
                          dense
                          hide-no-data
                          multiple
                          hide-selected
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              :selected="data.selected"
                              label
                              close
                              @input="removeSelectedDnaFusions(data.item)"
                            >
                              <strong
                                ><strong v-if="data.item.fivePrimeGene"
                                  >{{ data.item.fivePrimeGene.code }}
                                </strong>
                              </strong>
                              <i v-if="data.item.fivePrimeGene">
                                5' <br /><br />
                              </i>
                              <strong
                                ><strong v-if="data.item.threePrimeGene"
                                  >{{ data.item.threePrimeGene.code }}
                                </strong></strong
                              >
                              <i v-if="data.item.threePrimeGene">
                                3' <br /><br />
                              </i>
                            </v-chip>
                          </template>
                        </v-combobox>
                        <v-combobox
                          v-model="selectedRnaFusions"
                          :items="items"
                          clearable
                          label="Das ausgewählte RNA Fusion wird hier angezeigt"
                          ref="selectedRnaFusions"
                          chips
                          cache-items
                          deletable-chips
                          dense
                          hide-no-data
                          multiple
                          hide-selected
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              :selected="data.selected"
                              label
                              close
                              @input="removeSelectedRnaFusions(data.item)"
                            >
                              <strong
                                ><strong v-if="data.item.fivePrimeGene"
                                  >{{ data.item.fivePrimeGene.code }}
                                </strong>
                              </strong>
                              <i v-if="data.item.fivePrimeGene">
                                5' <br /><br />
                              </i>
                              <strong
                                ><strong v-if="data.item.threePrimeGene"
                                  >{{ data.item.threePrimeGene.code }}
                                </strong></strong
                              >
                              <i v-if="data.item.threePrimeGene">
                                3' <br /><br />
                              </i>
                            </v-chip>
                          </template>
                        </v-combobox>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-expansion-panel v-if="expansion" inset focusable>
                  <v-expansion-panel-content>
                    <template v-slot:header>
                      <div class="caption">SNVs</div>
                    </template>
                    <v-card color="pink lighten-4" flat>
                      <v-container flat fluid>
                        <v-layout row wrap>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              placeholder="cDNA Change"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-text-field
                              label=""
                              placeholder="Protein Change"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    <template v-slot:header>
                      <div class="caption">CNVs</div>
                    </template>
                    <v-card color="pink lighten-4" flat>
                      <v-container fluid>
                        <v-layout row wrap>
                          <v-flex xs12 sm6 md6>
                            <v-select :items="items" label="Typ"></v-select>
                          </v-flex>
                          <v-flex xs12 sm6 md3>
                            <v-text-field
                              placeholder="Copy# Max"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md3>
                            <v-text-field
                              placeholder="Copy# Min"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card-text>

              <v-card
                v-if="
                  (selectedMutatedGenesSNV.length > 0) |
                    (selectedMutatedGenesCNV.length > 0)
                "
                class="font-weight-thin"
                flat
              >
                <v-card-text small color="#BDBDBD" class="font-weight-thin">
                  <p class="caption grey-text">
                    Dieses Feld zeigt die aktuellen SNV-, CNV- und
                    Fusion-Parameter an, die vor der Übermittlung der Anfrage
                    hinzugefügt wurden.
                  </p>
                  <span v-if="selectedMutatedGenesSNV.length > 0">
                    <strong>Das ausgewählte SNV(s)</strong><br />
                    <span
                      v-for="(
                        selectedMutatedGenesSNV, indexSNV
                      ) in selectedMutatedGenesSNV"
                      :key="indexSNV"
                      :class="[indexSNV % 2 === 0 ? 'grey lighten-3' : 'white']"
                    >
                      {{ selectedMutatedGenesSNV.gene.display }} ·
                      {{ selectedMutatedGenesSNV.gene.code }}

                      <span v-if="selectedMutatedGenesSNV.dnaChange">
                        - {{ selectedMutatedGenesSNV.dnaChange }}</span
                      >
                      <span v-if="selectedMutatedGenesSNV.aminoAcidChange">
                        - {{ selectedMutatedGenesSNV.aminoAcidChange }}</span
                      >
                      <br
                    /></span>
                  </span>

                  <span v-if="selectedMutatedGenesCNV.length > 0">
                    <span> <strong>Das ausgewählte CNV(s)</strong></span>
                    <br />
                    <span
                      v-for="(
                        selectedMutatedGenesCNV, indexCNV
                      ) in selectedMutatedGenesCNV"
                      :key="indexCNV"
                      :class="[indexCNV % 2 === 0 ? 'grey lighten-3' : 'white']"
                    >
                      <span
                        plate
                        v-for="(
                          gene, geneIndexCNV
                        ) in selectedMutatedGenesCNV.genes"
                        :key="geneIndexCNV"
                      >
                        {{ gene.display }} ·
                        {{ gene.code }}
                      </span>
                      <span v-if="selectedMutatedGenesCNV.type">
                        , {{ selectedMutatedGenesCNV.type }}
                      </span>

                      <span v-if="selectedMutatedGenesCNV.copyNumber.min">
                        - {{ selectedMutatedGenesCNV.copyNumber.min }}
                      </span>

                      <span v-if="selectedMutatedGenesCNV.copyNumber.max">
                        - {{ selectedMutatedGenesCNV.copyNumber.max }}
                      </span>
                      <br />
                    </span>
                  </span>
                </v-card-text>
              </v-card>
            </v-card>
          </v-flex>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md6>
        <v-card class="mx-auto" flat color="" light max-width="1200">
          <v-flex d-flex>
            <v-card
              class="mx-auto"
              flat
              color="indigo lighten-4"
              light
              max-width="1200"
            >
              <v-card-text class="headline font-weight-thin">
                <v-icon color="indigo" dark>fas fa-diagnoses</v-icon
                ><b> Diagnose</b>
                <v-autocomplete
                  v-model="diagnosis"
                  :items="diagnosisCat"
                  :loading="isLoading"
                  label="Diagnose-Text oder ICD-10 Code"
                  ref="diagnosis"
                  chips
                  cache-items
                  deletable-chips
                  dense
                  hide-no-data
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
                  label="Tumor Morphologie oder ICD-O-3-M Code"
                  ref="tumorMorphology"
                  chips
                  deletable-chips
                  dense
                  multiple
                  hide-selected
                  placeholder
                  @input="
                    addTumorMorphology(
                      tumorMorphology[tumorMorphology.length - 1]
                    )
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

          <v-flex d-flex>
            <v-card
              class="mx-auto"
              flat
              color="blue lighten-4"
              light
              max-width="1200"
            >
              <v-card-text class="headline font-weight-thin">
                <v-icon color="blue">fas fa-pills</v-icon> <b>Wirkstoffe</b>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn flat icon color="white" v-bind="attrs" v-on="on">
                      <v-icon>fas fa-info-circle</v-icon>
                    </v-btn>
                  </template>
                  <span
                    >Beginnen Sie damit, die entsprechende Verwendungskategorie
                    aus den Optionsfeldern auszuwählen. <br />Anschließend geben
                    Sie den Wirkstoffnamen oder -code ein; automatische
                    Vorschläge erscheinen während der Eingabe. <br />Zuletzt
                    überprüfen Sie und wählen Sie die korrekte Katalogversion
                    (Jahr) aus.</span
                  >
                </v-tooltip>

                <v-radio-group v-model="drugUsage" row>
                  <v-radio label="Empfohlen" value="recommended"></v-radio>
                  <v-radio label="Verabreicht" value="used"></v-radio>
                  <v-radio label="Beide" value="beide"></v-radio>
                  <v-radio label="Egal" value="egal"></v-radio>
                </v-radio-group>

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
                  hint="Wählen Sie die Anwendung, dann geben Sie den Wirkstoff, Code und die Version ein."
                  persistent-hint
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
                      label
                      @input="removeDrugs(data.item)"
                    >
                      <strong>{{ data.item }}</strong>
                      &nbsp;
                      {{ selectedDrugsDisplay[data.index].usage }}
                    </v-chip>
                  </template>
                </v-autocomplete>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex>
            <v-card
              class="mx-auto"
              flat
              color="cyan lighten-4"
              light
              max-width="1200"
            >
              <v-card-text class="headline font-weight-thin">
                <v-icon color="cyan">fas fa-vials</v-icon> <b>Response</b>
                <v-autocomplete
                  v-model="responses"
                  :items="responsesCat"
                  :loading="isLoading"
                  label="Response oder RECIST Code"
                  ref="responses"
                  chips
                  deletable-chips
                  hide-selected
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
        </v-card>
      </v-flex>

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
      <v-flex xs12 sm3 md12>
        <v-divider class="my-3"></v-divider>
      </v-flex>
      <v-flex xs12 sm3 md1>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn flat icon color="grey accent-2" v-bind="attrs" v-on="on">
              <v-icon>fas fa-info-circle</v-icon>
            </v-btn>
          </template>
          <span
            >Wählen Sie den Abfragetyp im Voraus, bevor Sie die gespeicherte
            Abfrage auswählen.<br>Sie finden alle gespeicherten Abfragen unter
            <v-icon dark style="font-size: 1rem">fas fa-user</v-icon>
            "Nutzerdetails".</span
          >
        </v-tooltip>
      </v-flex>
      <v-flex d-flex xs12 sm3 md2>
        <v-radio-group v-model="savedQueryType" row>
          <v-radio
            v-if="this.localButton"
            label="Lokal"
            value="local"
          ></v-radio>
          <v-radio
            v-if="this.federatedButton"
            label="Föderiert"
            value="federated"
          ></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex d-flex xs12 sm3 md9>
        <v-card class="mx-auto" flat light max-width="1200">
          <v-card-text class="headline font-weight-thin">
            <v-autocomplete
              v-model="queryName"
              :items="getSavedQueries.data.entries"
              :loading="isLoading"
              item-text="name"
              item-value="parameters"
              label="Vorbereiteten Abfragen"
              placeholder="Wählen Sie eine vorgespeicherte Abfrage zur Ausführung aus."
              hint="Stellen Sie sicher, den Abfragetyp im Voraus auszuwählen."
              persistent-hint
              ref="queries"
              prepend-icon="fas fa-save"
              chips
              hide-selected
              dense
              @input="accessSavedQuery(savedQueryType, queryName)"
            >
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-flex>

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
    "genesCatSimplified",
    "diagnosisCat",
    "tumorMorphologyCat",
    "cnvTypCat",
    "drugsCat",
    "responsesCat",
    "baseChangeCat",
    "aminoAcidChangesCat",
    "variantEffectsCat",
    "getSavedQueries",
    "getQueryParametersMutations",
    "getQueryParametersSimpleVariants",
    "getQueryParametersCopyNumberVariants",
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
    showSNV: false,
    showCNV: false,
    showFusions: false,
    showAll: true,
    showSCNV: false,
    showSV: false,
    expansion: false,

    rulesSNV: {
      validateDnaChange: (value) => {
        const pattern = /[AGTC]>(?:(?![AG])[AGTC]|-)/;
        return pattern.test(value) || "DNA-Änderungsmuster beispiel T>C";
      },
      validateAminoAcidChange: (value) => {
        const pattern = /^[A-Z][a-z][a-z]\d+[A-Z][a-z][a-z]$/;
        return (
          pattern.test(value) ||
          "Bitte geben Sie nur Aminosäure-Abkürzungen mit drei Buchstaben ein."
        );
      },
    },
    rulesCNV: {
      validateNumbers: (value) => {
        const pattern = /^[0-9]+$/;
        return pattern.test(value) || "Dieses Feld akzeptiert nur Zahlen.";
      },
    },

    selectedMutatedGenes: Array(),
    selectedMutatedGenesSNV: Array(),
    selectedMutatedGenesCNV: Array(),
    selectedDnaFusions: Array(),
    selectedRnaFusions: Array(),
    selectedDiagnosis: Array(),
    selectedTumorMorphology: Array(),
    selectedDrugs: Array(),
    selectedDrugsDisplay: Array(),
    selectedResponses: Array(),

    //localQuery: false,

    localButton: false,
    federatedButton: false,

    mutationOptions: "radioBeliebig",
    drugUsage: "egal",
    fusionType: "bothFusions",
    primeType: "bothPrimes",

    savedQueryType: "local",

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
              simpleVariants: this.selectedMutatedGenesSNV,
              copyNumberVariants: this.selectedMutatedGenesCNV,
              dnaFusions: this.selectedDnaFusions,
              rnaFusions: this.selectedRnaFusions,
              diagnoses: this.selectedDiagnosis,
              tumorMorphology: this.selectedTumorMorphology,
              medicationsWithUsage: this.selectedDrugs,
              responses: this.selectedResponses,
              //expiresIn: expiresIn,
              //mutation:[{genes:this.genes,variant:{type:"SNV"}}],
              //medicationsWithUsage: [{usage:"recommended",drug:"something"}],
              //drugs:[{usage:"recommended",drug:"something"}],
            },
          };

          let Response = await axios.post(
            process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query/`,
            request
          );

          //alert(JSON.stringify(request));

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
              simpleVariants: this.selectedMutatedGenesSNV,
              copyNumberVariants: this.selectedMutatedGenesCNV,
              diagnoses: this.selectedDiagnosis,
              tumorMorphology: this.selectedTumorMorphology,
              medicationsWithUsage: this.selectedDrugs,
              responses: this.selectedResponses,
              //expiresIn: expiresIn,
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

    goBack() {
      return window.history.back();
    },

    // MUTATED GENES

    addMutatedGenes(mutatedGenes) {
      let code = mutatedGenes.split(" · ")[1];
      this.selectedMutatedGenes.push({ code });
    },

    addMutatedGenesSNV(dnaChange, aminoAcidChange, mutatedGenesSNV) {
      if (mutatedGenesSNV) {
        this.selectedMutatedGenesSNV.push({
          dnaChange: dnaChange,
          aminoAcidChange: aminoAcidChange,
          gene: {
            display: mutatedGenesSNV.split(" · ")[0],
            code: mutatedGenesSNV.split(" · ")[1],
          },
        });
        this.mutatedGenesSNV = [];
      } else {
        alert("Bitte fügen Sie zuerst die relevanten Parameter hinzu!");
      }
    },

    reAddMutatedGenesSNV(dnaChange, aminoAcidChange, gene) {
      if (gene) {
        this.selectedMutatedGenesSNV.push({
          dnaChange: dnaChange,
          aminoAcidChange: aminoAcidChange,
          gene: { display: gene.display, code: gene.code },
        });
      } else {
        alert(
          "Beim Anzeigen der SNV-Abfrageparameter ist ein Problem aufgetreten"
        );
      }
    },

    addMutatedGenesCNV(cnvType, cnvMax, cnvMin, mutatedGenesCNV) {
      if (mutatedGenesCNV) {
        let code = Array();
        for (var i = 0; i < mutatedGenesCNV.length; i++) {
          code.push({
            display: mutatedGenesCNV[i].split(" · ")[0],
            code: mutatedGenesCNV[i].split(" · ")[1],
          });
        }

        this.selectedMutatedGenesCNV.push({
          copyNumber: { max: parseInt(cnvMax), min: parseInt(cnvMin) },
          type: cnvType,
          genes: code,
        });
        this.mutatedGenesCNV = [];
      } else {
        alert("Bitte fügen Sie zuerst die relevanten Parameter hinzu!");
      }
    },

    reAddMutatedGenesCNV(cnvType, cnvMax, cnvMin, genesCNV) {
      if (genesCNV) {
        let code = Array();
        for (var i = 0; i < genesCNV.length; i++) {
          code.push({
            display: genesCNV[i].display,
            code: genesCNV[i].code,
          });
        }

        this.selectedMutatedGenesCNV.push({
          copyNumber: { max: parseInt(cnvMax), min: parseInt(cnvMin) },
          type: cnvType,
          genes: code,
        });
      } else {
        alert("Bitte fügen Sie zuerst die relevanten Parameter hinzu!");
      }
    },

    addFusions(fusions5, fusions3, fusionType) {
      if (fusions5 || fusions3) {
        if (fusionType == "dnaFusions") {
          if (fusions5) {
            this.selectedDnaFusions.push({
              fivePrimeGene: {
                code: fusions.split(" · ")[1],
              },
              threePrimeGene: {
                code: fusions.split(" · ")[1],
              },
            });
          }
        } else if (fusionType == "dnaFusions") {
        } else {
        }
      }
    },

    addFusions(fusions, fusionType, primeType) {
      if (fusions) {
        if (fusionType == "bothFusions" && primeType == "bothPrimes") {
          this.selectedDnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
          this.selectedRnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "bothFusions" && primeType == "fivePrimeGene") {
          this.selectedDnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
          this.selectedRnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "bothFusions" && primeType == "threePrimeGene") {
          this.selectedDnaFusions.push({
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
          this.selectedRnaFusions.push({
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "dnaFusions" && primeType == "bothPrimes") {
          this.selectedDnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
          this.selectedRnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "dnaFusions" && primeType == "fivePrimeGene") {
          this.selectedDnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "dnaFusions" && primeType == "threePrimeGene") {
          this.selectedDnaFusions.push({
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "rnaFusions" && primeType == "bothPrimes") {
          this.selectedRnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "rnaFusions" && primeType == "fivePrimeGene") {
          this.selectedRnaFusions.push({
            fivePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        if (fusionType == "rnaFusions" && primeType == "threePrimeGene") {
          this.selectedRnaFusions.push({
            threePrimeGene: {
              code: fusions.split(" · ")[1],
            },
          });
        }

        this.dnaFusions = this.selectedDnaFusions;
        this.rnaFusions = this.selectedRnaFusions;
      } else {
        alert("Bitte fügen Sie zuerst die relevanten Parameter hinzu!");
      }
    },

    removeMutatedGenes(item) {
      const index = this.mutatedGenes.indexOf(item);
      if (index >= 0) this.selectedMutatedGenes.splice(index, 1);
      this.mutatedGenes.splice(index, 1);
    },

    removeMutatedGenesSNV(item) {
      const index = this.mutatedGenesSNV.indexOf(item);
      if (index >= 0) this.selectedMutatedGenesSNV.splice(index, 1);
      this.mutatedGenesSNV.splice(index, 1);
    },

    removeSelectedMutatedGenesSNV(item) {
      const index = this.selectedMutatedGenesSNV.indexOf(item);
      if (index >= 0) this.selectedMutatedGenesSNV.splice(index, 1);
      this.selectedMutatedGenesSNV.splice(index, 1);
    },

    removeMutatedGenesCNV(item) {
      const index = this.mutatedGenesCNV.indexOf(item);
      if (index >= 0) this.mutatedGenesCNV.splice(index, 1);
      this.mutatedGenesCNV.splice(index, 1);
    },

    removeSelectedMutatedGenesCNV(item) {
      const index = this.selectedMutatedGenesCNV.indexOf(item);
      if (index >= 0) this.selectedMutatedGenesCNV.splice(index, 1);
      this.selectedMutatedGenesCNV.splice(index, 1);
    },

    removeFusions(item) {
      //TBA
    },

    removeSelectedDnaFusions(item) {
      const index = this.selectedDnaFusions.indexOf(item);
      if (index >= 0) this.selectedDnaFusions.splice(index, 1);
      this.selectedDnaFusions.splice(index, 1);
    },

    removeSelectedRnaFusions(item) {
      const index = this.selectedRnaFusions.indexOf(item);
      if (index >= 0) this.selectedRnaFusions.splice(index, 1);
      this.selectedRnaFusions.splice(index, 1);
    },

    resetMutatedGenes() {
      this.selectedMutatedGenes = [];
      this.selectedMutatedGenesSNV = [];
      this.selectedMutatedGenesCNV = [];
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
          medication: {
            code: drug.split(" · ")[1],
            version: drug.split(" · ")[2],
          },
          usage: [{ code: "used" }, { code: "recommended" }],
        });
        this.selectedDrugsDisplay.push({
          medication: {
            code: drug.split(" · ")[1],
            version: drug.split(" · ")[2],
          },
          usage: "(v+e)",
        });
      } else if (usage == "egal") {
        this.selectedDrugs.push({
          medication: {
            code: drug.split(" · ")[1],
            version: drug.split(" · ")[2],
          },
          usage: [],
        });
        this.selectedDrugsDisplay.push({
          medication: {
            code: drug.split(" · ")[1],
            version: drug.split(" · ")[2],
          },
          usage: "",
        });
      } else {
        this.selectedDrugs.push({
          medication: {
            code: drug.split(" · ")[1],
            version: drug.split(" · ")[2],
          },
          usage: [{ code: usage }],
        });
        if (usage === "used") {
          this.selectedDrugsDisplay.push({
            medication: {
              code: drug.split(" · ")[1],
              version: drug.split(" · ")[2],
            },
            usage: "(v)",
          });
        } else {
          this.selectedDrugsDisplay.push({
            medication: {
              code: drug.split(" · ")[1],
              version: code.split(" · ")[2],
            },
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

    async accessSavedQuery(queryType, savedQueryParameters) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let request = {
          mode: {
            code: queryType,
          },
          parameters: savedQueryParameters,
        };

        let Response = await axios.post(
          process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query/`,
          request
        );

        localStorage.setItem("mutatedGenes", JSON.stringify(this.mutatedGenes));
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

    // QUERY PARAMETERS

    setQueryParams() {
      this.mutatedGenes = this.getQueryParametersMutations;

      if (this.getQueryParametersMutations)
        for (var i = 0; i < this.getQueryParametersMutations.length; i++) {
          this.addMutatedGenes(this.getQueryParametersMutations[i]);
        }

      //this.mutatedGenesSNV = this.getQueryParametersSimpleVariants;

      if (this.getQueryParametersSimpleVariants)
        for (var i = 0; i < this.getQueryParametersSimpleVariants.length; i++) {
          this.reAddMutatedGenesSNV(
            this.getQueryParametersSimpleVariants[i].dnaChange,
            this.getQueryParametersSimpleVariants[i].aminoAcidChange,
            this.getQueryParametersSimpleVariants[i].gene
          );
        }

      //this.mutatedGenesCNV = this.getQueryParametersCopyNumberVariants;

      if (this.getQueryParametersCopyNumberVariants)
        for (
          var i = 0;
          i < this.getQueryParametersCopyNumberVariants.length;
          i++
        ) {
          this.reAddMutatedGenesCNV(
            this.getQueryParametersCopyNumberVariants[i].type,
            this.getQueryParametersCopyNumberVariants[i].copyNumber.min,
            this.getQueryParametersCopyNumberVariants[i].copyNumber.max,
            this.getQueryParametersCopyNumberVariants[i].genes
          );
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
      localStorage.removeItem("fusions");
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
