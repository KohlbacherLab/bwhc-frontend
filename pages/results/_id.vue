<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <h3 class="display-3"><strong>bwHealthCloud</strong> Ergebnisse</h3>

    <span class="subheading font-weight-light">
      <v-btn dark icon color="blue accent-2" align-end @click="goBack">
        <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
      >Abfrageergebnisse werden unten angezeigt.
      <strong @click="$router.push('../help')">Hilfe?</strong>
    </span>

    <v-divider class="my-3"></v-divider>

    <v-layout wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="purple lighten-2"
          dark
          max-width="400"
        >
          <v-card-text class="headline font-weight-thin">
            <v-icon color="purple" dark>fas fa-street-view</v-icon>
            <strong>{{ displayResults.patientCount }}</strong> Patienten
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="hide" d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="indigo lighten-2"
          dark
          max-width="400"
        >
          <v-card-text class="headline font-weight-thin">
            <v-icon color="indigo">fas fa-stethoscope</v-icon>
            <strong>{{ displayResults.ngsReportCount }}</strong> Molekulare
            Diagnostik
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="hide" d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="blue lighten-2"
          dark
          max-width="400"
        >
          <v-card-text class="headline font-weight-thin">
            <v-icon color="blue">fas fa-comment-medical</v-icon>
            <strong>{{ displayResults.therapyRecommendationCount }}</strong>
            Therapie-Empfehlungen
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex v-if="hide" d-flex xs12 sm6 md3>
        <v-card
          class="mx-auto"
          flat
          color="cyan lighten-2"
          dark
          max-width="400"
        >
          <v-card-text class="headline font-weight-thin">
            <v-icon color="cyan" dark>fas fa-file-medical</v-icon>
            <strong>{{ displayResults.therapyCount }}</strong> Systemische
            Therapien
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <div id="ergebnisse"></div>

    <v-layout wrap fluid>
      <v-flex d-flex xs12 sm6 md3>
        <v-card flat color="grey lighten-4" light width="250">
          <v-card-text class="font-weight-thin">
            <strong
              >{{ displayResults.completionStats[0].frequency.count }} ({{
                displayResults.completionStats[0].frequency.percent.toFixed(1)
              }}%)</strong
            >
            {{ displayResults.completionStats[0].level }}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card flat color="grey lighten-4" light width="250">
          <v-card-text class="font-weight-thin">
            <strong
              >{{ displayResults.completionStats[1].frequency.count }} ({{
                displayResults.completionStats[1].frequency.percent.toFixed(1)
              }}%)</strong
            >
            {{ displayResults.completionStats[1].level }}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card flat color="grey lighten-4" light width="250">
          <v-card-text class="font-weight-thin">
            <strong
              >{{ displayResults.completionStats[2].frequency.count }} ({{
                displayResults.completionStats[2].frequency.percent.toFixed(1)
              }}%)</strong
            >
            {{ displayResults.completionStats[2].level }}
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md3>
        <v-card flat color="grey lighten-4" light width="250">
          <v-card-text class="font-weight-thin">
            <strong
              >{{ displayResults.completionStats[3].frequency.count }} ({{
                displayResults.completionStats[3].frequency.percent.toFixed(1)
              }}%)</strong
            >
            {{ displayResults.completionStats[3].level }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <div v-if="issues" class="caption"><b>Achtung! </b>{{ issues }}</div>

    <v-divider v-if="hide" class="my-3"></v-divider>
    <!--
    <v-flex d-flex>
      <v-card flat>
        <v-card-text class="subheading font-weight-thin">
          <span v-if="getQueryParametersMutations.length > 0">
            <strong>Mutationen:</strong>
            {{ getQueryParametersMutations.join(", ") }}
            <br />
          </span>
          <span v-if="getQueryParametersDiagnosis.length > 0">
            <strong>Diagnose:</strong>
            {{ getQueryParametersDiagnosis.join(", ") }}
            <br />
          </span>
          <span v-if="getQueryParametersTumorMorphology.length > 0">
            <strong>Tumor Morphologie:</strong>
            {{ getQueryParametersTumorMorphology.join(", ") }}
            <br />
          </span>
          <span v-if="getQueryParametersDrugs.length > 0">
            <strong>Wirkstoffe:</strong>
            {{ getQueryParametersDrugs.join(", ") }}
            <br />
          </span>
          <span v-if="getQueryParametersResponses.length > 0">
            <strong>Responses:</strong>
            {{ getQueryParametersResponses.join(", ") }}
            <br />
          </span>

          <strong>Abfragetyp:</strong>
          {{ getQueryParametersFederated.display }}
        </v-card-text>
      </v-card>
    </v-flex>
    -->

    <v-dialog v-model="saveQueryDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Benennen Sie Ihre Abfrage.</strong></v-card-title
        >
        <v-container grid-list-md>
          <form @submit.prevent="saveThisQuery">
            <v-layout wrap>
              <v-flex d-flex xs12 sm12>
                <v-text-field
                  v-model="queryName"
                  :error-messages="errors"
                  label="Abfrage Name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </form>
        </v-container>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            type="addNewUser"
            :disabled="invalid"
            flat
            @click="saveQueryDialog = false"
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="addNewUser"
            @click="saveQuery"
            :disabled="invalid"
            width="140"
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-expansion-panel popout>
      <v-expansion-panel-content>
        <template v-slot:actions>
          <!--
          <v-btn fab flat small color="blue" @click="saveQueryDialog = true">
            <v-icon color="blue" style="font-size: 2rem">fas fa-save</v-icon>
          </v-btn>
        -->

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                flat
                small
                color="blue"
                @click="saveQueryDialog = true"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="blue" style="font-size: 2rem"
                  >fas fa-save</v-icon
                >
              </v-btn>
            </template>
            <span
              >Klicken Sie hier, um die aktuellen Suchparameter für spätere
              Verwendung zu speichern.</span
            >
          </v-tooltip>

          <v-btn small color="red" dark> Suche ändern ?</v-btn>
        </template>

        <template v-slot:header>
          <span>
            <v-hover>
              <v-card flat>
                <v-layout row>
                  <v-flex xs2 order-lg1>
                    <v-card class="font-weight-thin" flat>
                      <v-card-text pb-5 small class="font-weight-thin">
                        <queryTimer @timerExpired="refreshData" />

                        <strong>Abfragetyp:</strong>
                        {{ getQueryParametersFederated.display }}
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex order-lg2>
                    <v-card flat>
                      <v-card-text small class="font-weight-thin">
                        <span v-if="getQueryParametersMutations.length > 0">
                          <strong>Mutationen:</strong>
                          <li
                            v-for="(
                              getQueryParametersMutation, indexMutations
                            ) in getQueryParametersMutations"
                            :key="indexMutations"
                            :class="[
                              indexMutations % 2 === 0
                                ? 'purple lighten-5'
                                : 'white',
                            ]"
                          >
                            {{ getQueryParametersMutation }}
                          </li>
                        </span>
                        <span
                          v-if="getQueryParametersSimpleVariants.length > 0"
                        >
                          <strong>SNVs</strong>
                          <li
                            v-for="(
                              getQueryParametersSimpleVariant, indexSNV
                            ) in getQueryParametersSimpleVariants"
                            :key="indexSNV"
                            :class="[
                              indexSNV % 2 === 0 ? 'grey lighten-4' : 'white',
                            ]"
                          >
                            {{ getQueryParametersSimpleVariant.gene.display }} ·
                            {{ getQueryParametersSimpleVariant.gene.code }}
                            <span
                              v-if="getQueryParametersSimpleVariant.dnaChange"
                            >
                              -
                              {{
                                getQueryParametersSimpleVariant.dnaChange
                              }}</span
                            >
                            <span
                              v-if="
                                getQueryParametersSimpleVariant.aminoAcidChange
                              "
                            >
                              -
                              {{
                                getQueryParametersSimpleVariant.aminoAcidChange
                              }}</span
                            >
                          </li>
                        </span>
                        <span
                          v-if="getQueryParametersCopyNumberVariants.length > 0"
                        >
                          <strong>CNVs</strong>
                          <li
                            v-for="(
                              getQueryParametersCopyNumberVariant, indexCNV
                            ) in getQueryParametersCopyNumberVariants"
                            :key="indexCNV"
                            :class="[
                              indexCNV % 2 === 0 ? 'grey lighten-4' : 'white',
                            ]"
                          >
                            <span
                              v-for="(
                                getQueryParametersCopyNumberVariantGene,
                                index2CNV
                              ) in getQueryParametersCopyNumberVariants[
                                indexCNV
                              ].genes"
                              :key="index2CNV"
                            >
                              {{
                                getQueryParametersCopyNumberVariantGene.display
                              }}
                              ·
                              {{ getQueryParametersCopyNumberVariantGene.code }}
                            </span>

                            <span
                              v-if="getQueryParametersCopyNumberVariant.type"
                            >
                              ,
                              {{
                                getQueryParametersCopyNumberVariant.type
                              }}</span
                            >
                            <span
                              v-if="
                                getQueryParametersCopyNumberVariant.copyNumber
                                  .min
                              "
                            >
                              -
                              {{
                                getQueryParametersCopyNumberVariant.copyNumber
                                  .min
                              }}</span
                            >
                            <span
                              v-if="
                                getQueryParametersCopyNumberVariant.copyNumber
                                  .max
                              "
                            >
                              -
                              {{
                                getQueryParametersCopyNumberVariant.copyNumber
                                  .max
                              }}</span
                            >
                          </li>
                        </span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex order-lg3>
                    <v-card flat>
                      <v-card-text small class="font-weight-thin">
                        <span v-if="getQueryParametersDiagnosis.length > 0">
                          <strong>Diagnose:</strong>
                          <li
                            v-for="(
                              getQueryParametersDiagnosis, indexDiagnosis
                            ) in getQueryParametersDiagnosis"
                            :key="indexDiagnosis"
                            :class="[
                              indexDiagnosis % 2 === 0
                                ? 'indigo lighten-5'
                                : 'white',
                            ]"
                          >
                            {{ getQueryParametersDiagnosis }}
                          </li>
                        </span>
                        <span
                          v-if="getQueryParametersTumorMorphology.length > 0"
                        >
                          <strong>Tumor Morphologie:</strong>

                          <li
                            v-for="(
                              getQueryParametersTumorMorphology,
                              indexTumorMorphology
                            ) in getQueryParametersTumorMorphology"
                            :key="indexTumorMorphology"
                            :class="[
                              indexTumorMorphology % 2 === 0
                                ? 'indigo lighten-5'
                                : 'white',
                            ]"
                          >
                            {{ getQueryParametersTumorMorphology }}
                          </li>
                        </span>
                        <span v-if="getQueryParametersDrugsDisplay.length > 0">
                          <strong>Wirkstoffe:</strong>
                          <li
                            v-for="(
                              getQueryParametersDrugsDisplay, indexDrugs
                            ) in getQueryParametersDrugsDisplay"
                            :key="indexDrugs"
                            :class="[
                              indexDrugs % 2 === 0 ? 'blue lighten-5' : 'white',
                            ]"
                          >
                            {{ getQueryParametersDrugsDisplay }}
                          </li>
                        </span>
                        <span v-if="getQueryParametersResponses.length > 0">
                          <strong>Responses:</strong>
                          <li
                            v-for="(
                              getQueryParametersResponse, indexResponse
                            ) in getQueryParametersResponses"
                            :key="indexResponse"
                            :class="[
                              indexResponse % 2 === 0
                                ? 'cyan lighten-5'
                                : 'white',
                            ]"
                          >
                            {{ getQueryParametersResponse }}
                          </li>
                        </span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>

                <!--

                <v-card-text small class="font-weight-thin">
                  <span v-if="getQueryParametersMutations.length > 0">
                    <strong>Mutationen:</strong>
                    {{ getQueryParametersMutations.join(", ") }}
                    <li
                      v-for="(
                        getQueryParametersMutation, index
                      ) in getQueryParametersMutations"
                      :key="index"
                    >
                       {{ getQueryParametersMutation }}
                    </li>
                    <br />
                  </span>
                  <span v-if="getQueryParametersSimpleVariants.length > 0">
                    <strong>Simple Variants:</strong>
                    <li
                      v-for="(
                        getQueryParametersSimpleVariant, index
                      ) in getQueryParametersSimpleVariants"
                      :key="index"
                    >
                       {{ getQueryParametersSimpleVariant.display }} · {{ getQueryParametersSimpleVariant.code }} 
                       <span v-if="getQueryParametersSimpleVariant.dnaChange"> - {{ getQueryParametersSimpleVariant.dnaChange }}</span> 
                       <span v-if="getQueryParametersSimpleVariant.aminoAcidChange "> - {{ getQueryParametersSimpleVariant.aminoAcidChange }}</span>
                    </li>
                    <br />
                  </span>
                  <span v-if="getQueryParametersCopyNumberVariants.length > 0">
                    <strong>Copy Number Variants:</strong>
                    {{ getQueryParametersCopyNumberVariants.join(", ") }}
                    <br />
                  </span>

                  <span v-if="getQueryParametersDnaFusions.length > 0">
                    <strong>DNA Fusionen:</strong>
                    {{ getQueryParametersDnaFusions.join(", ") }}
                    <br />
                  </span>

                  <span v-if="getQueryParametersRnaFusions.length > 0">
                    <strong>RNA Fusionen:</strong>
                    {{ getQueryParametersRnaFusions.join(", ") }}
                    <br />
                  </span>

                  <span v-if="getQueryParametersDiagnosis.length > 0">
                    <strong>Diagnose:</strong>
                    {{ getQueryParametersDiagnosis.join(", ") }}
                    <br />
                  </span>
                  <span v-if="getQueryParametersTumorMorphology.length > 0">
                    <strong>Tumor Morphologie:</strong>
                    {{ getQueryParametersTumorMorphology.join(", ") }}
                    <br />
                  </span>
                  <span v-if="getQueryParametersDrugsDisplay.length > 0">
                    <strong>Wirkstoffe:</strong>
                    {{ getQueryParametersDrugsDisplay.join(", ") }}
                    <br />
                  </span>
                  <span v-if="getQueryParametersResponses.length > 0">
                    <strong>Responses:</strong>
                    {{ getQueryParametersResponses.join(", ") }}
                    <br />
                  </span>
                  <strong>Abfragetyp:</strong>
                  {{ getQueryParametersFederated.display }}
                </v-card-text>
                              -->
              </v-card>
            </v-hover>
          </span>
        </template>
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
          :getSavedQueries="getSavedQueries"
          :getQueryParametersMutations="getQueryParametersMutations"
          :getQueryParametersSimpleVariants="getQueryParametersSimpleVariants"
          :getQueryParametersCopyNumberVariants="
            getQueryParametersCopyNumberVariants
          "
          :getQueryParametersDnaFusions="getQueryParametersDnaFusions"
          :getQueryParametersRnaFusions="getQueryParametersRnaFusions"
          :getQueryParametersDiagnosis="getQueryParametersDiagnosis"
          :getQueryParametersTumorMorphology="getQueryParametersTumorMorphology"
          :getQueryParametersDrugs="getQueryParametersDrugs"
          :getQueryParametersDrugsUsage="getQueryParametersDrugsUsage"
          :getQueryParametersResponses="getQueryParametersResponses"
          :getQueryParametersFederated="getQueryParametersFederated"
          :queryId="queryId"
          clipped-right
        />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-tabs v-if="hide" color="blue-grey lighten-5" fixed-tabs icons-and-text>
      <v-tab class="subheading font-weight-regular" :key="cases"
        >Patienten <v-icon color="purple" dark>fas fa-street-view</v-icon>
      </v-tab>
      <v-tab class="subheading font-weight-regular" :key="genomics"
        >Molekulare Diagnostik
        <v-icon color="indigo">fas fa-stethoscope</v-icon></v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="recommendations"
        >Therapie-Empfehlungen
        <v-icon color="blue">fas fa-comment-medical</v-icon></v-tab
      >
      <v-tab class="subheading font-weight-regular" :key="therapies"
        >Systemische Therapien
        <v-icon color="cyan" dark>fas fa-file-medical</v-icon></v-tab
      >

      <v-tab class="subheading font-weight-regular" :key="variants"
        >Varianten <v-icon color="red" dark>fas fa-dna</v-icon></v-tab
      >

      <!-- CASES -->

      <v-tab-item>
        <v-layout flex-child wrap>
          <!--
          <v-flex xs12 md1 d-flex> </v-flex>
          -->
          <v-flex xs12 md12>
            <v-layout
              v-if="itemsFiles.length > 0"
              row
              justify-start
              class="my-3"
            >
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsFiles, 'groupIndex')"
                  slot="activator"
                >
                  <v-icon small left>sort</v-icon>
                  <span class="caption text-none">Index</span>
                </v-btn>
                <span>Sortieren nach Index</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsFiles, 'managingZPM')"
                  slot="activator"
                >
                  <span class="caption text-none">ZPM</span>
                </v-btn>
                <span>Sortieren nach ZPM</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsFiles, 'age')"
                  slot="activator"
                >
                  <span class="caption text-none">Alter</span>
                </v-btn>
                <span>Sortieren nach Alter</span>
              </v-tooltip>
            </v-layout>

            <v-card
              flat
              hover
              v-for="itemsFile in limitItemsFiles"
              :key="itemsFile.id"
            >
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Index</div>
                  <div>{{ itemsFile.groupIndex }}</div>
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">ZPM</div>
                  {{ itemsFile.managingZPM }}
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Geschlecht</div>
                  <div>{{ itemsFile.gender }}</div>
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Alter</div>
                  <div>{{ itemsFile.age }}</div>
                </v-flex>

                <v-flex xs6 sm4 md5>
                  <div class="caption grey--text">Diagnose</div>
                  <div>{{ itemsFile.diagnosis }}<br /></div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Vital-Status</div>
                  <div>{{ itemsFile.vitalStatus }}</div>
                </v-flex>
                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="routeToPatient(queryId + '&' + itemsFile.id)"
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>

              <v-divider class="my-3"></v-divider>
            </v-card>

            <span v-if="itemsFiles.length == 0">
              <br />
              <v-alert :value="true" type="warning">
                <span class="subheading font-weight-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >
            <span v-if="itemsFiles.length > 0">
              <v-btn
                small
                icon
                @click="$vuetify.goTo('#ergebnisse', options)"
                flat
                color="grey"
              >
                <v-icon style="font-size: 1.2rem"
                  >fas fa-arrow-alt-circle-up</v-icon
                >
              </v-btn>
              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsFiles -= 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-minus-circle</v-icon>
              </v-btn>

              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsFiles += 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-plus-circle</v-icon>
              </v-btn>
              <v-btn
                small
                flat
                color="blue"
                @click="limitNumberItemsFiles = itemsFiles.length"
                dark
              >
                Alle anzeigen
              </v-btn>
            </span>
            <!--
        <v-card flat light>
          <v-data-table
            :headers="headerFiles"
            :items="itemsFiles"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props" no-data>
              <tr @click="routeToPatient(queryId + '&' + props.item.id)">
                <td>{{ props.item.groupIndex }}</td>
                <td>{{ props.item.managingZPM }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.age }}</td>
                <td>{{ props.item.diagnosis }}</td>
                <td>{{ props.item.vitalStatus }}</td>
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
        -->
          </v-flex>
        </v-layout>
      </v-tab-item>

      <!-- NGS SUMMARIES -->

      <v-tab-item>
        <v-layout flex-child wrap>
          <v-flex xs12 md2 class="my-3">
            <v-tooltip top>
              <v-btn small flat color="grey" slot="activator">
                <v-icon small left>filter_list</v-icon>
                <span class="caption text-none">Filter</span>
              </v-btn>
              <span>Molekulare Diagnostik Filtern</span>
            </v-tooltip>
            <br /><br />

            <v-layout row wrap>
              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ specimenTypeFilter.name }}</h3>
                  </div>
                </v-card-title>
                <v-flex
                  class="mx-4"
                  v-for="specimenTypeFilter in specimenTypeFilter.items"
                  :key="specimenTypeFilter.id"
                >
                  <v-checkbox
                    v-model="specimenTypeFilter.selected"
                    :label="specimenTypeFilter.value.display"
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>
              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ specimenLocalizationFilter.name }}</h3>
                  </div>
                </v-card-title>
                <v-flex
                  class="mx-4"
                  v-for="specimenLocalizationFilter in specimenLocalizationFilter.items"
                  :key="specimenLocalizationFilter.id"
                >
                  <v-checkbox
                    v-model="specimenLocalizationFilter.selected"
                    :label="specimenLocalizationFilter.value.display"
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>

              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>Tumor Mutational Burden (mut/MBase)</h3>
                  </div>
                </v-card-title>

                <v-text-field
                  v-model="tumorMutationalBurdenFilter.min"
                  class="mt-0"
                  hide-details
                  single-line
                  type="number"
                ></v-text-field>

                <v-text-field
                  v-model="tumorMutationalBurdenFilter.max"
                  class="mt-0"
                  hide-details
                  single-line
                  type="number"
                ></v-text-field>
              </v-card>

              <v-tooltip bottom>
                <v-btn
                  class="subheading font-weight-thin my-4"
                  left
                  dark
                  slot="activator"
                  color="blue accent-3"
                  @click="filterQuery"
                  >Filtern</v-btn
                >
                <span
                  >Klicken Sie hier, um die Molekulare Diagnostik Tabelle zu
                  filtern</span
                >
              </v-tooltip>
            </v-layout>
          </v-flex>
          <v-flex xs12 md10>
            <v-layout
              v-if="itemsGenomicReports.length > 0"
              row
              justify-start
              class="my-3"
            >
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsGenomicReports, 'groupIndex')"
                  slot="activator"
                >
                  <v-icon small left>sort</v-icon>
                  <span class="caption text-none">Index</span>
                </v-btn>
                <span>Sortieren nach Index</span>
              </v-tooltip>

              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsGenomicReports, 'specimenLocalization')"
                  slot="activator"
                >
                  <span class="caption text-none">Proben-Lokalization</span>
                </v-btn>
                <span>Sortieren nach Proben-Lokalization</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn small flat color="indigo" slot="activator">
                  <span class="text-none"
                    ><b>{{ itemsGenomicReports.length }} Treffer</b></span
                  >
                </v-btn>
                <span
                  >Die Tabelle unten enthält
                  {{ itemsGenomicReports.length }} übereinstimmende
                  Ergebnisse</span
                >
              </v-tooltip>
            </v-layout>

            <v-card
              flat
              hover
              v-for="itemsGenomicReport in limitItemsGenomicReports"
              :key="itemsGenomicReport.id"
            >
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Index</div>
                  <div>{{ itemsGenomicReport.groupIndex }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Proben-Lokalisation</div>
                  {{ itemsGenomicReport.specimenLocalization }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Tumorentität</div>
                  <div>
                    {{ itemsGenomicReport.tumorEntity }}
                  </div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Probenart</div>
                  <div>{{ itemsGenomicReport.specimenType }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Sequenzierungs-Art</div>
                  <div>{{ itemsGenomicReport.sequencingType }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Tumor-Zellgehalt</div>
                  <div>{{ itemsGenomicReport.tumorCellContent }}</div>
                </v-flex>

                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="
                          routeToPatient(
                            queryId + '&' + itemsGenomicReport.patient
                          )
                        "
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>

              <v-divider class="my-3"></v-divider>
            </v-card>

            <span v-if="itemsGenomicReports.length == 0">
              <br />
              <v-alert :value="true" type="warning">
                <span class="subheading font-weight-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >
            <span v-if="itemsGenomicReports.length > 0">
              <v-btn
                small
                icon
                @click="$vuetify.goTo('#ergebnisse', options)"
                flat
                color="grey"
              >
                <v-icon style="font-size: 1.2rem"
                  >fas fa-arrow-alt-circle-up</v-icon
                >
              </v-btn>
              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsGenomicReports -= 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-minus-circle</v-icon>
              </v-btn>

              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsGenomicReports += 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-plus-circle</v-icon>
              </v-btn>
              <v-btn
                small
                flat
                color="blue"
                @click="
                  limitNumberItemsGenomicReports = itemsGenomicReports.length
                "
                dark
              >
                Alle anzeigen
              </v-btn>
            </span>

            <!--
        <v-card flat light>
          <v-data-table
            :headers="headerGenomicReports"
            :items="itemsGenomicReports"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr @click="routeToPatient(queryId + '&' + props.item.patient)">
                <td>{{ props.item.groupIndex }}</td>
                <td>{{ props.item.specimenLocalization }}</td>
                <td>{{ props.item.tumorEntity }}</td>
                <td>{{ props.item.specimenType }}</td>
                <td>{{ props.item.sequencingType }}</td>
                <td>{{ props.item.tumorCellContent }}</td>
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
        -->
          </v-flex>
        </v-layout>
      </v-tab-item>

      <!-- RECOMMENDATIONS -->

      <v-tab-item>
        <v-layout flex-child wrap>
          <v-flex xs12 md2 class="my-3">
            <v-tooltip top>
              <v-btn small flat color="grey" slot="activator">
                <v-icon small left>filter_list</v-icon>
                <span class="caption text-none">Filter</span>
              </v-btn>
              <span>Therapie-Empfehlungen Filtern</span>
            </v-tooltip>
            <br /><br />

            <v-layout row wrap>
              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ priorityFilter.name }}</h3>
                  </div>
                </v-card-title>
                <v-flex
                  class="mx-4"
                  v-for="priorityFilter in priorityFilter.items"
                  :key="priorityFilter.id"
                >
                  <v-checkbox
                    v-model="priorityFilter.selected"
                    :label="priorityFilter.value"
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>

              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ levelOfEvidenceFilter.name }}</h3>
                  </div>
                </v-card-title>

                <v-flex
                  class="mx-4"
                  v-for="levelOfEvidenceFilter in levelOfEvidenceFilter.items"
                  :key="levelOfEvidenceFilter.id"
                >
                  <v-checkbox
                    v-model="levelOfEvidenceFilter.selected"
                    :label="levelOfEvidenceFilter.value"
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>

              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ therapyRecommendationMedicationFilter.name }}</h3>
                  </div>
                </v-card-title>

                <v-btn
                  depressed
                  small
                  outline
                  @click="
                    unselectAllCheckboxes(
                      therapyRecommendationMedicationFilter.items
                    )
                  "
                  >Alles abwählen</v-btn
                >
                <v-btn
                  depressed
                  small
                  outline
                  @click="
                    selectAllCheckboxes(
                      therapyRecommendationMedicationFilter.items
                    )
                  "
                  >Alles auswählen</v-btn
                >

                <v-flex
                  class="mx-4"
                  v-for="therapyRecommendationMedicationFilter in therapyRecommendationMedicationFilter.items"
                  :key="therapyRecommendationMedicationFilter.id"
                >
                  <v-checkbox
                    v-model="therapyRecommendationMedicationFilter.selected"
                    :label="
                      therapyRecommendationMedicationFilter.value.display +
                      ' ' +
                      therapyRecommendationMedicationFilter.value.version
                    "
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>

              <v-tooltip bottom>
                <v-btn
                  class="subheading font-weight-thin my-4"
                  left
                  dark
                  slot="activator"
                  color="blue accent-3"
                  @click="filterQuery"
                  >Filtern</v-btn
                >
                <span
                  >Klicken Sie hier, um die Therapie Empfehlungen Tabelle zu
                  filtern</span
                >
              </v-tooltip>
            </v-layout>
          </v-flex>
          <v-flex xs12 md10>
            <v-layout
              v-if="itemsRecommendations.length > 0"
              row
              justify-start
              class="my-3"
            >
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsRecommendations, 'groupIndex')"
                  slot="activator"
                >
                  <v-icon small left>sort</v-icon>
                  <span class="caption text-none">Index</span>
                </v-btn>
                <span>Sortieren nach Index</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsRecommendations, 'icd10')"
                  slot="activator"
                >
                  <span class="caption text-none">Diagnose</span>
                </v-btn>
                <span>Sortieren nach Diagnose</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsRecommendations, 'priority')"
                  slot="activator"
                >
                  <span class="caption text-none">Priorität</span>
                </v-btn>
                <span>Sortieren nach Priorität</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn small flat color="blue" slot="activator">
                  <span class="text-none"
                    ><b>{{ itemsRecommendations.length }} Treffer</b></span
                  >
                </v-btn>
                <span
                  >Die Tabelle unten enthält
                  {{ itemsRecommendations.length }} übereinstimmende
                  Ergebnisse</span
                >
              </v-tooltip>
            </v-layout>

            <v-card
              flat
              hover
              v-for="itemsRecommendation in limitItemsRecommendations"
              :key="itemsRecommendation.id"
            >
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Index</div>
                  <div>{{ itemsRecommendation.groupIndex }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Diagnose</div>
                  {{ itemsRecommendation.icd10 }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Medikation</div>
                  <div>{{ itemsRecommendation.medication }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Medikation Klassen</div>
                  <div>{{ itemsRecommendation.medicationClasses }}</div>
                </v-flex>

                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Priorität</div>
                  <div>{{ itemsRecommendation.priority }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Level of Evidence</div>
                  <div>
                    <strong>{{ itemsRecommendation.levelOfEvidence }}</strong>
                  </div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">ECOG Status</div>
                  <div>{{ itemsRecommendation.ecogStatus }}</div>
                </v-flex>

                <v-flex xs6 sm4 md10>
                  <div class="caption grey--text">
                    Stützende Molekulare Alterationen
                  </div>
                  <div>
                    {{ itemsRecommendation.supportingVariants.join(", ") }}
                  </div>
                </v-flex>
                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="
                          routeToPatient(
                            queryId + '&' + itemsRecommendation.patient
                          )
                        "
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>

              <v-divider class="my-3"></v-divider>
            </v-card>

            <span v-if="itemsRecommendations.length == 0">
              <br />
              <v-alert :value="true" type="warning">
                <span class="subheading font-weight-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >
            <span v-if="itemsRecommendations.length > 0">
              <v-btn
                small
                icon
                @click="$vuetify.goTo('#ergebnisse', options)"
                flat
                color="grey"
              >
                <v-icon style="font-size: 1.2rem"
                  >fas fa-arrow-alt-circle-up</v-icon
                >
              </v-btn>
              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsRecommendations -= 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-minus-circle</v-icon>
              </v-btn>

              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsRecommendations += 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-plus-circle</v-icon>
              </v-btn>
              <v-btn
                small
                flat
                color="blue"
                @click="
                  limitNumberItemsRecommendations = itemsRecommendations.length
                "
                dark
              >
                Alle anzeigen
              </v-btn>
            </span>
            <!--
        <v-card flat light>
          <v-data-table
            :headers="headerRecommendations"
            :items="itemsRecommendations"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr @click="routeToPatient(queryId + '&' + props.item.patient)">
                <td>{{ props.item.groupIndex }}</td>
                <td>{{ props.item.icd10 }}</td>
                <td>{{ props.item.medication }}</td>
                <td>{{ props.item.medicationClasses }}</td>
                <td>{{ props.item.priority }}</td>
                <td>{{ props.item.levelOfEvidence }}</td>
                <td>{{ props.item.ecogStatus }}</td>
                <td>{{ props.item.supportingVariants.join(", ") }}</td>
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
        -->
          </v-flex>
        </v-layout>
      </v-tab-item>

      <!-- THERAPIES -->
      <v-tab-item>
        <v-layout flex-child wrap>
          <v-flex xs12 md2 class="my-3">
            <v-tooltip top>
              <v-btn small flat color="grey" slot="activator">
                <v-icon small left>filter_list</v-icon>
                <span class="caption text-none">Filter</span>
              </v-btn>
              <span>Systemische Therapien Filtern</span>
            </v-tooltip>
            <br /><br />

            <v-layout row wrap>
              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ molecularTherapyStatusFilter.name }}</h3>
                  </div>
                </v-card-title>

                <v-flex
                  class="mx-4"
                  v-for="molecularTherapyStatusFilter in molecularTherapyStatusFilter.items"
                  :key="molecularTherapyStatusFilter.id"
                >
                  <v-checkbox
                    v-model="molecularTherapyStatusFilter.selected"
                    :label="molecularTherapyStatusFilter.value.display"
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>

              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ molecularTherapyMedicationFilter.name }}</h3>
                  </div>
                </v-card-title>

                <v-btn
                  depressed
                  small
                  outline
                  @click="
                    unselectAllCheckboxes(
                      molecularTherapyMedicationFilter.items
                    )
                  "
                  >Alles abwählen</v-btn
                >
                <v-btn
                  depressed
                  small
                  outline
                  @click="
                    selectAllCheckboxes(molecularTherapyMedicationFilter.items)
                  "
                  >Alles auswählen</v-btn
                >

                <v-flex
                  class="mx-4"
                  v-for="molecularTherapyMedicationFilter in molecularTherapyMedicationFilter.items"
                  :key="molecularTherapyMedicationFilter.id"
                >
                  <v-checkbox
                    v-model="molecularTherapyMedicationFilter.selected"
                    :label="
                      molecularTherapyMedicationFilter.value.display +
                      ' ' +
                      molecularTherapyMedicationFilter.value.version
                    "
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>

              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>{{ molecularTherapyResponseFilter.name }}</h3>
                  </div>
                </v-card-title>
                <v-flex
                  class="mx-4"
                  v-for="molecularTherapyResponseFilter in molecularTherapyResponseFilter.items"
                  :key="molecularTherapyResponseFilter.id"
                >
                  <v-checkbox
                    v-model="molecularTherapyResponseFilter.selected"
                    :label="molecularTherapyResponseFilter.value.display"
                    hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </v-card>

              <v-card flat color="transparent">
                <v-card-title>
                  <div>
                    <h3>Erfassungsdatum</h3>
                  </div>
                </v-card-title>

                <v-menu
                  ref="menuMin"
                  v-model="menuMin"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="molecularTherapyRecordingDateFilter.min"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="molecularTherapyRecordingDateFilter.min"
                      label="Min"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="molecularTherapyRecordingDateFilter.min"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menuMin = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      flat
                      color="primary"
                      @click="
                        $refs.menuMin.save(
                          molecularTherapyRecordingDateFilter.min
                        )
                      "
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>

                <v-spacer></v-spacer>

                <v-menu
                  ref="menuMax"
                  v-model="menuMax"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="molecularTherapyRecordingDateFilter.max"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="molecularTherapyRecordingDateFilter.max"
                      label="Max"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="molecularTherapyRecordingDateFilter.max"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menuMax = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      flat
                      color="primary"
                      @click="
                        $refs.menuMax.save(
                          molecularTherapyRecordingDateFilter.max
                        )
                      "
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-card>
              <v-tooltip bottom>
                <v-btn
                  class="subheading font-weight-thin my-4"
                  left
                  dark
                  slot="activator"
                  color="blue accent-3"
                  @click="filterQuery"
                  >Filtern</v-btn
                >
                <span
                  >Klicken Sie hier, um die Systemische Therapien Tabelle zu
                  filtern</span
                >
              </v-tooltip>
            </v-layout>
          </v-flex>
          <v-flex xs12 md10>
            <v-layout
              v-if="itemsTherapies.length > 0"
              row
              justify-start
              class="my-3"
            >
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsTherapies, 'groupIndex')"
                  slot="activator"
                >
                  <v-icon small left>sort</v-icon>
                  <span class="caption text-none">Index</span>
                </v-btn>
                <span>Sortieren nach Index</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsTherapies, 'status')"
                  slot="activator"
                >
                  <span class="caption text-none">Status</span>
                </v-btn>
                <span>Sortieren nach Status</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsTherapies, 'recordedOn')"
                  slot="activator"
                >
                  <span class="caption text-none">Erfassungsdatum</span>
                </v-btn>
                <span>Sortieren nach Erfassungsdatum</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsTherapies, 'recommendationPriority')"
                  slot="activator"
                >
                  <span class="caption text-none">Empfehlungens Priorität</span>
                </v-btn>
                <span>Sortieren nach Empfehlungens Priorität</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  small
                  flat
                  color="grey"
                  @click="sortBy(itemsTherapies, 'medication')"
                  slot="activator"
                >
                  <span class="caption text-none">Medikation</span>
                </v-btn>
                <span>Sortieren nach Medikation</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn small flat color="cyan" slot="activator">
                  <span class="text-none"
                    ><b>{{ itemsTherapies.length }} Treffer</b></span
                  >
                </v-btn>
                <span
                  >Die Tabelle unten enthält
                  {{ itemsTherapies.length }} übereinstimmende Ergebnisse</span
                >
              </v-tooltip>
            </v-layout>

            <v-card
              flat
              hover
              v-for="itemsTherapie in limitItemsTherapies"
              :key="itemsTherapie.id"
            >
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Index</div>
                  <div>{{ itemsTherapie.groupIndex }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Status</div>
                  <v-chip
                    small
                    :class="`${itemsTherapie.status} white--text my-2 caption`"
                    >{{ itemsTherapie.status }}</v-chip
                  >
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Erfassungsdatum</div>
                  <div>{{ itemsTherapie.recordedOn }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Empfehlungens Priorität</div>
                  <div>{{ itemsTherapie.recommendationPriority }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Medikation</div>
                  <div>{{ itemsTherapie.medication }}</div>
                </v-flex>
                <v-flex xs6 sm4 md3>
                  <div class="caption grey--text">Wirkstoff Klasssen</div>
                  <div>{{ itemsTherapie.medicationClasses }}</div>
                </v-flex>
                <v-flex xs6 sm4 md7>
                  <div class="caption grey--text">
                    Stützende Molekulare Alterationen
                  </div>
                  <div>{{ itemsTherapie.supportingVariants.join(", ") }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Dosisdichte</div>
                  <div>{{ itemsTherapie.dosage }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Zeitraum</div>
                  <div>{{ itemsTherapie.period }}</div>
                </v-flex>
                <v-flex xs6 sm4 md3>
                  <div class="caption grey--text">Response</div>
                  <div>{{ itemsTherapie.response }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Abbruchsgrund</div>
                  <div>{{ itemsTherapie.reasonStopped }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Bemerkungen</div>
                  <div>{{ itemsTherapie.note }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Progressionsdatum</div>
                  <div>{{ itemsTherapie.progressionDate }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Nicht-Umsetzungs-Grund</div>
                  <div>{{ itemsTherapie.notDoneReason }}</div>
                </v-flex>
                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="
                          routeToPatient(queryId + '&' + itemsTherapie.patient)
                        "
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>

              <v-divider class="my-3"></v-divider>
            </v-card>

            <span v-if="itemsTherapies.length == 0">
              <br />
              <v-alert :value="true" type="warning">
                <span class="subheading font-weight-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >
            <span v-if="itemsTherapies.length > 0">
              <v-btn
                small
                icon
                @click="$vuetify.goTo('#ergebnisse', options)"
                flat
                color="grey"
              >
                <v-icon style="font-size: 1.2rem"
                  >fas fa-arrow-alt-circle-up</v-icon
                >
              </v-btn>
              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsTherapies -= 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-minus-circle</v-icon>
              </v-btn>
              <v-btn
                small
                icon
                flat
                color="blue"
                @click="limitNumberItemsTherapies += 5"
                dark
              >
                <v-icon style="font-size: 1.2rem">fas fa-plus-circle</v-icon>
              </v-btn>
              <v-btn
                small
                flat
                color="blue"
                @click="limitNumberItemsTherapies = itemsTherapies.length"
                dark
              >
                Alle anzeigen
              </v-btn>
            </span>
            <!--
        <v-card flat light>
          <v-data-table
            fluid
            :headers="headerTherapies"
            :items="itemsTherapies"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
            :group-by="patient"
            show-group-by
          >
            <template slot="items" slot-scope="props">
              <tr @click="routeToPatient(queryId + '&' + props.item.patient)">
                <td>{{ props.item.groupIndex }}</td>
                <td>{{ props.item.status }}</td>
                <td>{{ props.item.recordedOn }}</td>
                <td>{{ props.item.recommendationPriority }}</td>
                <td>{{ props.item.medication }}</td>
                <td>{{ props.item.medicationClasses }}</td>
                <td>{{ props.item.supportingVariants.join(", ") }}</td>
                <td>{{ props.item.dosage }}</td>
                <td>{{ props.item.period }}</td>
                <td>{{ props.item.response }}</td>
                <td>{{ props.item.reasonStopped }}</td>
                <td>{{ props.item.note }}</td>
                <td>{{ props.item.progressionDate }}</td>
                <td>{{ props.item.notDoneReason }}</td>
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
        -->
          </v-flex>
        </v-layout>
      </v-tab-item>

      <!-- VARIANTS -->

      <v-tab-item>
        <v-layout flex-child wrap>
          <v-flex xs12 md12>
            <v-card flat>
              <v-card-title primary-title>
                <div>
                  <div class="subheadline">
                    Varianten nur für 'Alterationen' angezeigt
                  </div>
                  <span class="grey--text"
                    >Die Varianten-Tabelle wird Daten anzeigen, wenn Sie den
                    Parameter 'Alterationen' auswählen (sofern Daten vorhanden
                    sind).<br />Wenn Sie jedoch andere Suchkriterien gewählt
                    haben, beachten Sie bitte, dass die Varianten-Tabelle leer
                    bleibt.</span
                  >
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <!--
          <v-flex xs12 md1 d-flex> </v-flex>
          -->
          <v-flex xs12 md12>
            <v-card-title class="font-weight-normal"
              >Einfache Varianten</v-card-title
            >

            <v-card
              flat
              color="#e8e8e8"
              v-for="simpleVariant in itemsVariantsOfInterest.simpleVariants"
              :key="simpleVariant.id"
            >
              <v-divider></v-divider>
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Chr</div>
                  <div>{{ simpleVariant.chromosome }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Gen</div>
                  {{ simpleVariant.gene }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Start/Ende</div>
                  <div>{{ simpleVariant.startEnd }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Ref Allel</div>
                  {{ simpleVariant.refAllele }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Alt Allel</div>
                  <div>{{ simpleVariant.altAllele }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">DNA Change</div>
                  <div>{{ simpleVariant.dnaChange }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Amino Acid Change</div>
                  <div>{{ simpleVariant.aminoAcidChange }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Read Depth</div>
                  {{ simpleVariant.readDepth }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Allel-Frequenz</div>
                  <div>{{ simpleVariant.allelicFrequency }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">COSMIC ID</div>
                  <div>{{ simpleVariant.cosmicId }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">dbSNP ID</div>
                  <div>{{ simpleVariant.dbSNPId }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Interpretation</div>
                  <div>{{ simpleVariant.interpretation }}</div>
                </v-flex>
                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="
                          routeToPatient(queryId + '&' + simpleVariant.patient)
                        "
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>
            </v-card>

            <span v-if="itemsVariantsOfInterest.simpleVariants.length == 0">
              <v-alert :value="true" type="warning">
                <span class="subheading font-wei ght-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >

            <v-card-title class="font-weight-normal"
              >Copy Number Varianten</v-card-title
            >
            <v-card
              flat
              color="#f0f0f0"
              v-for="copyNumberVariant in itemsVariantsOfInterest.copyNumberVariants"
              :key="copyNumberVariant.id"
            >
              <v-divider></v-divider>
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Chr</div>
                  <div>{{ copyNumberVariant.chromosome }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Reported Affected Genes</div>
                  {{ copyNumberVariant.reportedAffectedGenes }}
                </v-flex>
                <v-flex xs6 sm4 md4>
                  <div class="caption grey--text">Anfangsbereich</div>
                  <div>{{ copyNumberVariant.startRange }}</div>
                </v-flex>
                <v-flex xs6 sm4 md4>
                  <div class="caption grey--text">Endbereich</div>
                  {{ copyNumberVariant.endRange }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Kopienzahl</div>
                  <div>{{ copyNumberVariant.totalCopyNumber }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Rel. Kopienzahl</div>
                  <div>{{ copyNumberVariant.relativeCopyNumber }}</div>
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">CNA</div>
                  <div>{{ copyNumberVariant.cnA }}</div>
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">CNB</div>
                  {{ copyNumberVariant.cnB }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Reported Focality</div>
                  <div>{{ copyNumberVariant.reportedFocality }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Art</div>
                  <div>{{ copyNumberVariant.type }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Copy Number Neutral LoH</div>
                  <div>{{ copyNumberVariant.copyNumberNeutralLoH }}</div>
                </v-flex>
                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="
                          routeToPatient(
                            queryId + '&' + copyNumberVariant.patient
                          )
                        "
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>
            </v-card>

            <span v-if="itemsVariantsOfInterest.copyNumberVariants.length == 0">
              <v-alert :value="true" type="warning">
                <span class="subheading font-wei ght-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >

            <v-card-title class="font-weight-normal">DNA-Fusions</v-card-title>
            <v-card
              flat
              color="#e8e8e8"
              v-for="dnaFusion in itemsVariantsOfInterest.dnaFusions"
              :key="dnaFusion.id"
            >
              <v-divider></v-divider>
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md10>
                  <div class="caption grey--text">Chr</div>
                  <div>{{ dnaFusion.representation }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Reported Affected Genes</div>
                  {{ dnaFusion.reportedNumReads }}
                </v-flex>
                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="
                          routeToPatient(queryId + '&' + dnaFusion.patient)
                        "
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>
            </v-card>

            <span v-if="itemsVariantsOfInterest.dnaFusions.length == 0">
              <v-alert :value="true" type="warning">
                <span class="subheading font-wei ght-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >

            <v-card-title class="font-weight-normal">RNA-Fusions</v-card-title>
            <v-card
              flat
              color="#f0f0f0"
              v-for="rnaFusion in itemsVariantsOfInterest.rnaFusions"
              :key="rnaFusion.id"
            >
              <v-divider></v-divider>
              <v-layout row wrap :class="`pa-3`">
                <v-flex xs6 sm4 md12>
                  <div class="caption grey--text">Formatierte Darstellung</div>
                  <div>{{ rnaFusion.representation }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">5' Pos.</div>
                  {{ rnaFusion.position5pr }}
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">5' Strand</div>
                  <div>{{ rnaFusion.strand5pr }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">3' Pos.</div>
                  {{ rnaFusion.position3pr }}
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">3' Strand</div>
                  <div>{{ rnaFusion.strand3pr }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Effekt</div>
                  {{ rnaFusion.effect }}
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">COSMIC ID</div>
                  <div>{{ rnaFusion.cosmicId }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">Anzahl Reads</div>
                  {{ rnaFusion.reportedNumReads }}
                </v-flex>
                <v-flex xs2 sm4 md1>
                  <div>
                    <v-tooltip top>
                      <v-btn
                        icon
                        @click="
                          routeToPatient(queryId + '&' + rnaFusion.patient)
                        "
                        slot="activator"
                      >
                        <v-icon color="blue">folder</v-icon>
                      </v-btn>
                      <span>öffne die Datei</span>
                    </v-tooltip>
                  </div>
                </v-flex>
              </v-layout>
            </v-card>

            <span v-if="itemsVariantsOfInterest.rnaFusions.length == 0">
              <v-alert :value="true" type="warning">
                <span class="subheading font-wei ght-light"
                  >Keine ergebnisse gefunden.</span
                >
              </v-alert></span
            >

            <span v-if="itemsVariantsOfInterest.length > 0">
              <v-btn
                small
                icon
                @click="$vuetify.goTo('#ergebnisse', options)"
                flat
                color="grey"
              >
                <v-icon style="font-size: 1.2rem"
                  >fas fa-arrow-alt-circle-up</v-icon
                >
              </v-btn>
            </span>
            <!--
        <v-card flat light>
          <v-data-table
            :headers="headerFiles"
            :items="itemsFiles"
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props" no-data>
              <tr @click="routeToPatient(queryId + '&' + props.item.id)">
                <td>{{ props.item.groupIndex }}</td>
                <td>{{ props.item.managingZPM }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.age }}</td>
                <td>{{ props.item.diagnosis }}</td>
                <td>{{ props.item.vitalStatus }}</td>
              </tr>
            </template>
            <v-alert :value="true" color="error" icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert
            >
          </v-data-table>
        </v-card>
        -->
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>

    <v-divider class="my-3"></v-divider>

    <filterPanel
      v-bind:gender="gender"
      :vitalStatus="vitalStatus"
      :ageRange="ageRange"
      clipped-right
    />
    <v-col>
      <div class="caption">{{ issues }}</div>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";
import { stringify } from "querystring";
import { Line } from "vue-chartjs";
import BarChart from "~/components/BarChart";
import userPanel from "~/components/userPanel";
import filterPanel from "~/components/filterPanel";
import queryPanel from "~/components/queryPanel";
import queryTimer from "~/components/queryTimer";

import util from "~/assets/js/util";

let baseURL = process.env.baseUrl + process.env.port;
let serverBaseURL = process.env.baseUrl + process.env.port + process.env.query;

export default {
  loading: "~/components/loading.vue",

  name: "ProfilePage",

  menuMin: false,
  menuMax: false,

  components: {
    userPanel,
    filterPanel,
    queryPanel,
    BarChart,
    queryTimer,
  },

  data() {
    return {
      saveQueryDialog: false,
      diagnosis: Array(),

      limitNumberItemsFiles: 20,
      limitNumberItemsTherapies: 20,
      limitNumberItemsRecommendations: 20,
      limitNumberItemsGenomicReports: 20,

      drugUsageCat: ["Recommended", "Used"],
      localQuery: false,
      gender: [],
      ageRange: [],
      vitalStatus: [],

      headerFiles: [
        { text: "Index", align: "left", value: "groupIndex" },
        { text: "ZPM", align: "left", value: "managingZPM" },
        { text: "Geschlecht", align: "left", sortable: true, value: "gender" },
        { text: "Alter", align: "left", sortable: true, value: "age" },
        {
          text: "Diagnosis",
          align: "left",
          sortable: true,
          value: "diagnosis",
        },
        { text: "Vital-Status", align: "left", value: "vitalStatus" },
      ],

      headerTherapies: [
        { text: "Index", align: "left", value: "patient" },
        { text: "Status", align: "left", value: "status" },
        { text: "Erfassungsdatum", align: "left", value: "recordedOn" },
        {
          text: "Empfehlungs Priorität",
          align: "left",
          sortable: true,
          value: "recommendationPriority",
        },
        {
          text: "Medikation",
          align: "left",
          value: "medication",
        },
        {
          text: "Wirkstoff-Klassen",
          align: "left",
          value: "medicationClasses",
        },
        {
          text: "Stützende Molekulare Alterationen",
          align: "left",
          value: "supportingVariants",
        },
        {
          text: "Dosisdichte",
          align: "left",
          value: "dosage",
        },
        { text: "Zeitraum", align: "left", sortable: true, value: "period" },
        { text: "Response", align: "left", value: "response" },
        {
          text: "Abbruchsgrund",
          align: "left",
          value: "reasonStopped",
        },
        { text: "Bemerkungen", align: "left", value: "note" },
        { text: "Progressionsdatum", align: "left", value: "progressionDate" },
        {
          text: "Nicht-Umsetzungs-Grund",
          align: "left",
          value: "notDoneReason",
        },
      ],

      headerRecommendations: [
        { text: "Index", align: "left", value: "groupIndex" },
        {
          text: "Diagnose",
          align: "left",
          sortable: true,
          value: "icd10",
        },
        { text: "Medikation", align: "left", value: "medication" },
        {
          text: "Wirkstoff-Klassen",
          align: "left",
          value: "medicationClasses",
        },
        {
          text: "Priorität",
          align: "left",
          value: "priority",
        },
        { text: "Level of Evidence", align: "left", value: "levelOfEvidence" },
        { text: "ECOG Status", align: "left", value: "ecogStatus" },
        {
          text: "Stützende Molekulare Alterationen",
          align: "left",
          value: "supportingVariants",
        },
      ],

      headerGenomicReports: [
        { text: "Index", align: "left", value: "patient Index" },
        {
          text: "Proben-Lokalisation",
          align: "left",
          value: "specimenLocalization",
        },
        { text: "Tumorentität", align: "left", value: "tumorEntity" },
        { text: "Probenart", align: "left", value: "specimenType" },
        {
          text: "Sequenzierungs-Art",
          align: "left",
          value: "sequencingType",
        },
        {
          text: "Tumor-Zellgehalt",
          align: "left",
          value: "tumorCellContent",
        },
      ],
    };
  },

  computed: {
    dataExists() {
      return this.itemsFiles.length > 0;
    },

    limitItemsFiles() {
      if (this.limitNumberItemsFiles <= 0) this.limitNumberItemsFiles = 5;
      return this.itemsFiles.slice(0, this.limitNumberItemsFiles);
    },

    limitItemsGenomicReports() {
      if (this.limitNumberItemsGenomicReports <= 0)
        this.limitNumberItemsGenomicReports = 5;
      return this.itemsGenomicReports.slice(
        0,
        this.limitNumberItemsGenomicReports
      );
    },

    limitItemsTherapies() {
      if (this.limitNumberItemsTherapies <= 0)
        this.limitNumberItemsTherapies = 5;
      return this.itemsTherapies.slice(0, this.limitNumberItemsTherapies);
    },

    limitItemsRecommendations() {
      if (this.limitNumberItemsRecommendations <= 0)
        this.limitNumberItemsRecommendations = 5;
      return this.itemsRecommendations.slice(
        0,
        this.limitNumberItemsRecommendations
      );
    },
  },

  methods: {
    unselectAllCheckboxes(selectedItems) {
      for (const item of selectedItems) {
        item.selected = false;
      }
    },

    selectAllCheckboxes(selectedItems) {
      for (const item of selectedItems) {
        item.selected = true;
      }
    },

    async refreshData() {
      await this.setMenu();
    },
    async saveQuery({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        if (this.queryName == undefined)
          this.queryName =
            "abfrage_" +
            new Date()
              .toISOString()
              .replace(/\D/g, "")
              .slice(0, 14)
              .replace(/(\d{8})(\d{6})/, "$1_$2");

        let request = {
          name: this.queryName,
          parameters: this.queryParameters,
        };

        let response = await axios.post(
          process.env.baseUrl + process.env.port + process.env.preparedQueries,
          request
        );

        this.saveQueryDialog = false;
        window.location.reload();
      } catch (err) {
        alert(err);
      }
    },

    routeToPatient(queryAndPatientId) {
      this.$router.push("patient/" + queryAndPatientId);
    },
    goBack() {
      return window.history.back();
    },
    picker(value) {
      return value === "male" ? "blue" : "red";
    },
    sortBy(dataset, prop) {
      dataset.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    async filterQuery() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let queryId = this.$route.params.id;

        let filter = {
          id: `${queryId}`,
          molecularTherapyFilter: {
            medication: this.molecularTherapyMedicationFilter,
            recordingDate: this.molecularTherapyRecordingDateFilter,
            response: this.molecularTherapyResponseFilter,
            status: this.molecularTherapyStatusFilter,
          },
          ngsSummaryFilter: {
            specimenLocalization: this.specimenLocalizationFilter,
            specimenType: this.specimenTypeFilter,
            tumorMutationalBurden: this.tumorMutationalBurdenFilter,
          },
          therapyRecommendationFilter: {
            levelOfEvidence: this.levelOfEvidenceFilter,
            medication: this.therapyRecommendationMedicationFilter,
            priority: this.priorityFilter,
          },
        };

        let Response = await axios.put(
          `${serverBaseURL}/${queryId}/filters`,
          filter
        );

        this.$router.push(`${Response.data.id}`);
        window.location.reload(true);
      } catch (err) {
        if (err.response.status === 401) {
          this.$router.push(`/`);
        } else if (err.response.status === 403) {
          return redirect("/403");
        } else if (err.response.status === 404) {
          return redirect("/404");
        } else {
          return redirect("/undefined");
        }
      }
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
          `/ICD-10-GM`
      );

      let genesCatRaw = await axios.get(
        process.env.baseUrl + process.env.port + process.env.coding + `/HGNC`
      );

      let drugsCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.coding +
          `?system=atc`
      );

      let tumorMorphologyCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          `/bwhc/catalogs/api/Coding?system=icd-o-3-m`
      );

      let responsesCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          process.env.valueSet +
          `/RECIST`
      );

      let cnvTypCatRaw = await axios.get(
        process.env.baseUrl +
          process.env.port +
          `/bwhc/catalogs/api/ValueSet?name=cnv-typ`
      );

      let queryparams = await axios.get(`${serverBaseURL}/${params.id}`);

      localStorage.setItem(
        "queryExpiresIn",
        JSON.stringify(queryparams.data.expiresIn)
      );

      let filters = queryparams.data.filters;

      let getSavedQueries = await axios.get(
        process.env.baseUrl + process.env.port + process.env.preparedQueries
      );

      localStorage.setItem("queryId", queryparams.data.id);

      let resultSummary;
      let results;

      if (queryparams.data._links["result-summary"]) {
        resultSummary = queryparams.data._links["result-summary"].href;
        results = await axios.get(`${baseURL}` + resultSummary);
      }

      let patients;
      let files;
      let filesEntries;

      if (queryparams.data._links["patients"]) {
        patients = queryparams.data._links["patients"].href;
        files = await axios.get(`${baseURL}` + patients);
        filesEntries = files.data.entries;
      }

      let hide = false;

      let ngsSummaries;
      let genomicReports;
      let genomicReportsEntries;
      let genomicReportsCount;

      if (queryparams.data._links["ngs-summaries"]) {
        ngsSummaries = queryparams.data._links["ngs-summaries"].href;
        genomicReports = await axios.get(`${baseURL}` + ngsSummaries);
        genomicReportsEntries = genomicReports.data.entries;
        genomicReportsCount = genomicReportsEntries.length;
        hide = true;
      }

      let therapyRecommendations;
      let recommendations;
      let recommendationsEntries;
      let recommendationsCount;

      if (queryparams.data._links["therapy-recommendations"]) {
        therapyRecommendations =
          queryparams.data._links["therapy-recommendations"].href;
        recommendations = await axios.get(
          `${baseURL}` + therapyRecommendations
        );
        recommendationsEntries = recommendations.data.entries;
        recommendationsCount = recommendationsEntries.length;
      }

      let molecularTherapies;
      let therapies;
      let therapiesEntries;
      let therapiesCount;

      if (queryparams.data._links["molecular-therapies"]) {
        molecularTherapies =
          queryparams.data._links["molecular-therapies"].href;
        therapies = await axios.get(`${baseURL}` + molecularTherapies);
        therapiesEntries = therapies.data.entries;
        therapiesCount = therapiesEntries.length;
      }
      /*
      let molecularTherapies;
      let therapies;
      let therapiesEntries;
      let therapiesCount;

      if (queryparams.data._links["molecular-therapies"]) {
        molecularTherapies =
          queryparams.data._links["molecular-therapies"].href;
        therapies = await axios.get(`${baseURL}` + molecularTherapies);
        therapiesEntries = therapies.data.entries;
        therapiesCount = therapiesEntries.length;
      }*/

      let variantsOverview;
      let variantsOfInterest;

      if (queryparams.data._links["variants-of-interest"]) {
        variantsOverview = queryparams.data._links["variants-of-interest"].href;
        variantsOfInterest = await axios.get(`${baseURL}` + variantsOverview);
      }

      let diagnosisCat = Array();
      let genesCat = Array();
      let genesCatSimplified = Array();
      let cnvTypCat = Array();
      let drugsCat = Array();
      let responsesCat = Array();
      let tumorMorphologyCat = Array();

      if (diagnosisCatRaw.data.entries) {
        for (var i = 0; i < diagnosisCatRaw.data.entries.length; i++) {
          diagnosisCat.push(
            diagnosisCatRaw.data.entries[i].code +
              " - " +
              diagnosisCatRaw.data.entries[i].display
          );
        }
      }

      if (tumorMorphologyCatRaw.data.entries) {
        for (var i = 0; i < tumorMorphologyCatRaw.data.entries.length; i++) {
          tumorMorphologyCat.push(
            tumorMorphologyCatRaw.data.entries[i].code +
              " - " +
              tumorMorphologyCatRaw.data.entries[i].display
          );
        }
      }

      if (genesCatRaw.data.entries) {
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
      }

      if (cnvTypCatRaw.data.concepts) {
        for (var i = 0; i < cnvTypCatRaw.data.concepts.length; i++) {
          cnvTypCat.push(
            cnvTypCatRaw.data.concepts[i].code
            //+ " - " +
            //  cnvTypCatRaw.data.concepts[i].display
          );
        }
      }

      if (drugsCatRaw.data.entries) {
        for (var i = 0; i < drugsCatRaw.data.entries.length; i++) {
          drugsCat.push(
            drugsCatRaw.data.entries[i].name +
              " · " +
              drugsCatRaw.data.entries[i].code +
              " · " +
              drugsCatRaw.data.entries[i].version
          );
        }
      }

      if (responsesCatRaw.data.concepts) {
        for (var i = 0; i < responsesCatRaw.data.concepts.length; i++) {
          responsesCat.push(
            responsesCatRaw.data.concepts[i].code +
              " - " +
              responsesCatRaw.data.concepts[i].display
          );
        }
      }

      let ageRangeRaw = Array();

      ageRangeRaw[0] = filters.patientFilter.ageRange.min;
      ageRangeRaw[1] = filters.patientFilter.ageRange.max;

      let getQueryParametersMutations = Array();

      if (queryparams.data.parameters.mutatedGenes) {
        for (
          var i = 0;
          i < queryparams.data.parameters.mutatedGenes.length;
          i++
        ) {
          for (var j = 0; j < genesCat.length; j++) {
            if (
              genesCat[j].includes(
                queryparams.data.parameters.mutatedGenes[i].display +
                  " · " +
                  queryparams.data.parameters.mutatedGenes[i].code
              )
            )
              getQueryParametersMutations.push(genesCat[j]);
          }
        }
      }

      let getQueryParametersSimpleVariants = Array();

      if (queryparams.data.parameters.simpleVariants) {
        for (
          var i = 0;
          i < queryparams.data.parameters.simpleVariants.length;
          i++
        ) {
          for (var j = 0; j < genesCat.length; j++) {
            if (
              genesCat[j].includes(
                queryparams.data.parameters.simpleVariants[i].gene.display +
                  " · " +
                  queryparams.data.parameters.simpleVariants[i].gene.code
              )
            )
              getQueryParametersSimpleVariants.push({
                dnaChange:
                  queryparams.data.parameters.simpleVariants[i].dnaChange,
                aminoAcidChange:
                  queryparams.data.parameters.simpleVariants[i].aminoAcidChange,
                gene: {
                  display:
                    queryparams.data.parameters.simpleVariants[i].gene.display,
                  name: queryparams.data.parameters.simpleVariants[i].gene.name,
                  code: queryparams.data.parameters.simpleVariants[i].gene.code,
                },
              });
          }
        }
      }

      let getQueryParametersCopyNumberVariants = Array();

      if (queryparams.data.parameters.copyNumberVariants) {
        for (
          var i = 0;
          i < queryparams.data.parameters.copyNumberVariants.length;
          i++
        ) {
          let getGenes = [];
          for (
            var j = 0;
            j < queryparams.data.parameters.copyNumberVariants[i].genes.length;
            j++
          ) {
            /*
            if (
              genesCat[j].includes(
                queryparams.data.parameters.copyNumberVariants[i].genes[k]
                  .display +
                  " · " +
                  queryparams.data.parameters.copyNumberVariants[i].genes[k]
                    .code
              )
            )
            */
            // getQueryParametersCopyNumberVariants.push(genesCat[j]);
            getGenes.push(
              queryparams.data.parameters.copyNumberVariants[i].genes[j]
            );
          }

          getQueryParametersCopyNumberVariants.push({
            genes: getGenes,
            type: queryparams.data.parameters.copyNumberVariants[i].type,
            copyNumber:
              queryparams.data.parameters.copyNumberVariants[i].copyNumber,
          });
        }
      }

      let getQueryParametersDnaFusions = Array();

      /*

      for (var i = 0; i < queryparams.data.parameters.dnaFusions.length; i++) {
        for (var j = 0; j < genesCat.length; j++) {
          for (
            var k = 0;
            k < queryparams.data.parameters.dnaFusions[i].genes.length;
            k++
          ) {
            if (
              genesCat[j].includes(
                queryparams.data.parameters.dnaFusions[i].genes[k].display +
                  " · " +
                  queryparams.data.parameters.dnaFusions[i].genes[k].code
              )
            )
              getQueryParametersDnaFusions.push(genesCat[j]);
          }
        }
      }
      */

      let getQueryParametersRnaFusions = Array();

      /*

      for (var i = 0; i < queryparams.data.parameters.rnaFusions.length; i++) {
        for (var j = 0; j < genesCat.length; j++) {
          for (
            var k = 0;
            k < queryparams.data.parameters.rnaFusions[i].genes.length;
            k++
          ) {
            if (
              genesCat[j].includes(
                queryparams.data.parameters.rnaFusions[i].genes[k].display +
                  " · " +
                  queryparams.data.parameters.rnaFusions[i].genes[k].code
              )
            )
              getQueryParametersRnaFusions.push(genesCat[j]);
          }
        }
      }
      */

      let getQueryParametersDiagnosis = Array();

      if (queryparams.data.parameters.diagnoses) {
        for (var i = 0; i < queryparams.data.parameters.diagnoses.length; i++) {
          getQueryParametersDiagnosis.push(
            queryparams.data.parameters.diagnoses[i].code +
              " - " +
              queryparams.data.parameters.diagnoses[i].display
          );
        }
      }

      let getQueryParametersTumorMorphology = Array();
      if (queryparams.data.parameters.tumorMorphology) {
        for (
          var i = 0;
          i < queryparams.data.parameters.tumorMorphology.length;
          i++
        ) {
          getQueryParametersTumorMorphology.push(
            queryparams.data.parameters.tumorMorphology[i].code +
              " - " +
              queryparams.data.parameters.tumorMorphology[i].display
          );
        }
      }

      let getQueryParametersDrugs = Array();
      let getQueryParametersDrugsUsage = Array();
      let getQueryParametersDrugsDisplay = Array();

      if (queryparams.data.parameters.medicationsWithUsage) {
        for (
          var i = 0;
          i < queryparams.data.parameters.medicationsWithUsage.length;
          i++
        ) {
          if (
            queryparams.data.parameters.medicationsWithUsage[i].usage.length ===
            2
          ) {
            getQueryParametersDrugs.push(
              queryparams.data.parameters.medicationsWithUsage[i].medication
                .display +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .code +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .version
            );

            getQueryParametersDrugsUsage.push("beide");

            getQueryParametersDrugsDisplay.push(
              queryparams.data.parameters.medicationsWithUsage[i].medication
                .display +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .code +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .version +
                " (" +
                JSON.stringify(
                  queryparams.data.parameters.medicationsWithUsage[i].usage[0]
                    .display
                ) +
                "+" +
                JSON.stringify(
                  queryparams.data.parameters.medicationsWithUsage[i].usage[1]
                    .display
                ) +
                ")"
            );
          } else if (
            queryparams.data.parameters.medicationsWithUsage[i].usage.length ===
            1
          ) {
            getQueryParametersDrugs.push(
              queryparams.data.parameters.medicationsWithUsage[i].medication
                .display +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .code +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .version
            );

            getQueryParametersDrugsUsage.push("used");

            getQueryParametersDrugsDisplay.push(
              queryparams.data.parameters.medicationsWithUsage[i].medication
                .display +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .code +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .version +
                " (" +
                JSON.stringify(
                  queryparams.data.parameters.medicationsWithUsage[i].usage[0]
                    .display
                ) +
                ")"
            );
          } else if (
            queryparams.data.parameters.medicationsWithUsage[i].usage.length ===
            0
          ) {
            getQueryParametersDrugs.push(
              queryparams.data.parameters.medicationsWithUsage[i].medication
                .display +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .code +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .version
            );

            getQueryParametersDrugsUsage.push("egal");

            getQueryParametersDrugsDisplay.push(
              queryparams.data.parameters.medicationsWithUsage[i].medication
                .display +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .code +
                " · " +
                queryparams.data.parameters.medicationsWithUsage[i].medication
                  .version
            );
          }
        }
      }

      let getQueryParametersResponses = Array();
      if (queryparams.data.parameters.responses) {
        for (var i = 0; i < queryparams.data.parameters.responses.length; i++) {
          getQueryParametersResponses.push(
            queryparams.data.parameters.responses[i].code +
              " - " +
              queryparams.data.parameters.responses[i].display
          );
        }
      }

      if (filesEntries) {
        if (
          filesEntries != undefined ||
          recommendationsEntries != undefined ||
          genomicReportsEntries != undefined ||
          indexTherapiesEntries != undefined
        ) {
          let x;
          let y;
          let z;
          let w;

          for (var i = 0; i < filesEntries.length; i++) {
            x = filesEntries[i].id;

            for (var j = 0; j < recommendationsEntries.length; j++) {
              y = recommendationsEntries[j].patient;
              if (x === y) recommendationsEntries[j].groupIndex = i + 1;
            }

            for (var k = 0; k < genomicReportsEntries.length; k++) {
              z = genomicReportsEntries[k].patient;
              if (x === z) genomicReportsEntries[k].groupIndex = i + 1;
            }

            for (var l = 0; l < therapiesEntries.length; l++) {
              w = therapiesEntries[l].patient;
              if (x === w) therapiesEntries[l].groupIndex = i + 1;
            }

            filesEntries[i].groupIndex = i + 1;
          }
        }
      }

      let getQueryParametersFederated = queryparams.data.mode;

      let connectionIssues = "";
      if (localStorage.getItem("issues")) {
        connectionIssues = localStorage.getItem("issues");
      }

      return {
        baseURL: `${serverBaseURL}/${params.id}/files`,
        queryId: `${params.id}`,

        hide: hide,

        displayResults: results.data,

        itemsFiles: filesEntries,
        itemsTherapies: therapiesEntries,
        itemsRecommendations: recommendationsEntries,
        itemsGenomicReports: genomicReportsEntries,

        itemsTherapiesCount: therapiesCount,
        itemsRecommendationsCount: recommendationsCount,
        itemsGenomicReportsCount: genomicReportsCount,

        itemsVariantsOfInterest: variantsOfInterest.data,

        // Patient Filters
        gender: filters.patientFilter.gender,
        vitalStatus: filters.patientFilter.vitalStatus,
        ageRange: ageRangeRaw,

        // NGS Summary Filters
        specimenTypeFilter: filters.ngsSummaryFilter.specimenType,
        specimenLocalizationFilter:
          filters.ngsSummaryFilter.specimenLocalization,
        tumorMutationalBurdenFilter:
          filters.ngsSummaryFilter.tumorMutationalBurden,

        // Therapy Recommendation Filters
        priorityFilter: filters.therapyRecommendationFilter.priority,
        levelOfEvidenceFilter:
          filters.therapyRecommendationFilter.levelOfEvidence,
        therapyRecommendationMedicationFilter:
          filters.therapyRecommendationFilter.medication,

        //Molecular Therapy Filters
        molecularTherapyMedicationFilter:
          filters.molecularTherapyFilter.medication,
        molecularTherapyRecordingDateFilter:
          filters.molecularTherapyFilter.recordingDate,
        molecularTherapyResponseFilter: filters.molecularTherapyFilter.response,
        molecularTherapyStatusFilter: filters.molecularTherapyFilter.status,

        diagnosisCat,
        genesCat,
        genesCatSimplified,
        cnvTypCat,
        drugsCat,
        responsesCat,
        tumorMorphologyCat,

        queryParameters: queryparams.data.parameters,
        getSavedQueries,
        getQueryParametersMutations,
        getQueryParametersSimpleVariants,
        getQueryParametersCopyNumberVariants,
        getQueryParametersDnaFusions,
        getQueryParametersRnaFusions,
        getQueryParametersDiagnosis,
        getQueryParametersTumorMorphology,
        getQueryParametersDrugs,
        getQueryParametersDrugsUsage,
        getQueryParametersDrugsDisplay,
        getQueryParametersResponses,
        getQueryParametersFederated,

        issues: connectionIssues,
      };
    } catch (err) {
      if (err.status === 401) {
        return redirect("/");
      } else if (err.status === 403) {
        return redirect("/403");
      } else if (err.status === 404) {
        return redirect("/404");
      } else if (err.status === 500) {
        return redirect("/500");
      } else {
        return redirect("/undefined");
      }
    }
  },
};
</script>

<style>
.status.Abgebrochen {
  border-left: 4px solid #d73027;
}
.status.Abgeschlossen {
  border-left: 4px solid #4575b4;
}
.status.Laufend {
  border-left: 4px solid #9ecae1;
}
.status {
  border-left: 4px solid #cccccc;
}

.index.i0 {
  border-left: 4px solid #585858;
}
.index.i1 {
  border-left: 4px solid #cfcfcf;
}
.index {
  border-left: 4px solid #585858;
}

.v-chip.Abgebrochen {
  background: #d73027;
}
.v-chip.Abgeschlossen {
  background: #4575b4;
}
.v-chip.Laufend {
  background: #9ecae1;
}
.v-chip {
  background: #fee090;
}
</style>
