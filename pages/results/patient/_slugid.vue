<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <h3 class="display-3"><strong>bwHealthCloud</strong> Patient</h3>
    <span class="subheading font-weight-light">
      <v-btn dark icon color="blue accent-2" align-end @click="goBack">
        <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
      >Patienten Akte.
      <strong @click="$router.push('../../help')">Hilfe?</strong>
    </span>

    <v-divider class="my-3"></v-divider>
    <div id="patientCard"></div>

    <v-card flat dark>
      <v-layout row wrap :class="`pa-3`">
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 1rem" slot="activator" class="mr-1"
              >fas fa-venus-mars</v-icon
            >
            Geschlecht
          </div>
          <div>{{ patient.gender }}</div>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 0.9rem" slot="activator" class="mr-1"
              >fas fa-calendar-week</v-icon
            >
            Geburtsdatum
          </div>
          <div>{{ patient.birthDate }}</div>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 0.9rem" slot="activator" class="mr-1"
              >fa-solid fa-skull</v-icon
            >
            Todesdatum
          </div>
          <div>{{ patient.dateOfDeath }}</div>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 0.9rem" slot="activator" class="mr-1"
              >fas fa-location-arrow</v-icon
            >
            ZPM
          </div>
          <div>{{ patient.managingZPM }}</div>
        </v-flex>

        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 0.9rem" slot="activator" class="mr-1"
              >fas fa-shield-alt</v-icon
            >
            Versicherung
          </div>
          <div>{{ patient.insurance }}</div>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 0.9rem" slot="activator" class="mr-1"
              >fas fa-file-signature</v-icon
            >
            Einwilligung
          </div>
          <div>{{ patient.consentStatus }}</div>
          <br />
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 0.9rem" slot="activator" class="mr-1"
              >fas fa-asterisk</v-icon
            >
            Datum der Erstüberweisung
          </div>
          <div>{{ patient.firstReferralDate }}</div>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">
            <v-icon style="font-size: 0.9rem" slot="activator" class="mr-1"
              >fas fa-id-badge</v-icon
            >
            Patienten ID
          </div>
          <div>{{ patient.id }}</div>
        </v-flex>
      </v-layout>
    </v-card>
    <!--
      <v-card flat dark left max-width="450">
        <br />
        <v-card-actions>
          <v-layout align-center>
            <v-list-tile class="grow">
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1">fas fa-venus-mars</v-icon>
                <span>Geschlecht</span>
              </v-tooltip>
              <span class="heading mr-2">{{ patient.gender }}</span>
              <span class="mr-2">·</span>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1"
                  >fas fa-calendar-day</v-icon
                >
                <span>Geburtsdatum</span>
              </v-tooltip>
              <span class="heading mr-2">{{ patient.birthDate }}</span>
              <span class="mr-2">·</span>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1"
                  >fas fa-location-arrow</v-icon
                >
                <span>ZPM</span>
              </v-tooltip>
              <span class="subheading mr-2">{{ patient.managingZPM }}</span>
              <span class="mr-2">·</span>
              <v-tooltip top>
                <v-icon slot="activator" class="mr-1">fas fa-shield-alt</v-icon>
                <span>Versicherung</span>
              </v-tooltip>
              <span class="subheading mr-2">{{ patient.insurance }}</span>
            </v-list-tile>
          </v-layout>
        </v-card-actions>
        <v-card-title
          >Einwilligung: {{ patient.consentStatus }} <br />
          Datum der Erstüberweisung {{ patient.firstReferralDate }} <br />
          Patienten ID: {{ patient.id }}
        </v-card-title>
      </v-card>
        -->

    <br />

    <!-- DIAGNOSES VIEW -->
    <div id="diagnoses"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Diagnosen</v-card-title>
    <v-data-table
      :headers="headerDiagnoses"
      :items="diagnoses"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
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
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- FAMILY MEMBER DIAGNOSES VIEW -->
    <div id="familyMemberDiagnoses"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Tumor-Erkrankungen bei Verwandten</v-card-title
    >
    <v-data-table
      :headers="headerFamilyMemberDiagnoses"
      :items="familyMemberDiagnoses"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            {{ props.item.relationship }}
          </td>
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

    <!-- GUIDELINE THERAPY VIEW -->
    <div id="guidelineTherapies"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Leitlinien-Therapien</v-card-title
    >
    <v-data-table
      :headers="headerGuidelineTherapies"
      :items="guidelineTherapies"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.diagnosis }}</td>
          <td>{{ props.item.therapyLine }}</td>
          <td>{{ props.item.period }}</td>
          <td>{{ props.item.medication }}</td>
          <td>{{ props.item.medicationClasses }}</td>
          <td>{{ props.item.reasonStopped }}</td>
          <td>{{ props.item.response }}</td>
          <td>{{ props.item.progressionDate }}</td>
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

    <!-- ECOG STATUS VIEW -->
    <div id="ecogStatus"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">ECOG Status</v-card-title>
    <v-data-table
      :headers="headerEcogStatus"
      :items="ecogStatus"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
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
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- SPECIMENS VIEW -->
    <div id="specimens"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">Proben</v-card-title>
    <v-data-table
      :headers="headerSpecimens"
      :items="specimens"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
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
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- MOLECULAR PATHOLOGY FINDINGS VIEW -->
    <div id="molecularPathologyFindings"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Molekular-Pathologie Befunde</v-card-title
    >
    <v-data-table
      :headers="headerMolecularPathologyFindings"
      :items="molecularPathologyFindings"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
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
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- HISTOLOGY REPORTS VIEW -->
    <div id="histologyReports"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Histologie Berichte</v-card-title
    >
    <v-data-table
      :headers="headerHistologyReports"
      :items="histologyReports"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <!--
          <td>{{ props.item.id }}</td>
          -->
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
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- NGS REPORTS VIEW -->
    <div id="ngsReports"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Somatische NGS-Berichte</v-card-title
    >

    <v-card flat v-for="ngsReport in ngsReports" :key="ngsReport.id">
      <v-layout row wrap :class="`pa-3`">
        <v-flex xs6 sm4 md12>
          <div class="caption grey--text">Probe</div>
          <div>{{ ngsReport.specimen }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Erstellungsdatum</div>
          {{ ngsReport.issueDate }}
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Sequenzierungs-Art</div>
          <div>{{ ngsReport.sequencingType }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Tumor-Zellgehalt</div>
          <div>{{ ngsReport.tumorCellContent }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Brcaness</div>
          {{ ngsReport.brcaness }}
        </v-flex>
        <v-flex xs6 sm2 md2>
          <div class="caption grey--text">Micro-Satellite Instabilitäten</div>
          <div>{{ ngsReport.microSatelliteInstabilities }}</div>
        </v-flex>

        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Mutationslast</div>
          <div>{{ ngsReport.tumorMutationalBurden }}</div>
        </v-flex>

        <v-flex xs2 sm4 md12> </v-flex>
      </v-layout>

      <v-card-title class="font-weight-normal">Metadaten</v-card-title>
      <v-card
        flat
        color="#f0f0f0"
        v-for="metadata in ngsReport.metadata"
        :key="metadata.id"
      >
        <v-layout row wrap :class="`pa-3`">
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Kit-Typ</div>
            <div>{{ metadata.kitType }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Kit Hersteller</div>
            {{ metadata.kitManufacturer }}
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Sequenziergerät</div>
            <div>{{ metadata.sequencer }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Ref. Genom</div>
            {{ metadata.referenceGenome }}
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Pipeline</div>
            <div>{{ metadata.pipeline }}</div>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card-title class="font-weight-normal">Einfache Varianten</v-card-title>
      <v-card
        flat
        color="#e8e8e8"
        v-for="simpleVariant in ngsReport.simpleVariants"
        :key="simpleVariant.id"
      >
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
        </v-layout>
      </v-card>

      <v-card-title class="font-weight-normal"
        >Copy Number Varianten</v-card-title
      >
      <v-card
        flat
        color="#f0f0f0"
        v-for="copyNumberVariant in ngsReport.copyNumberVariants"
        :key="copyNumberVariant.id"
      >
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
        </v-layout>
      </v-card>

      <v-card-title class="font-weight-normal">DNA-Fusions</v-card-title>
      <v-card
        flat
        color="#e8e8e8"
        v-for="dnaFusion in ngsReport.dnaFusions"
        :key="dnaFusion.id"
      >
        <v-layout row wrap :class="`pa-3`">
          <v-flex xs6 sm4 md10>
            <div class="caption grey--text">Chr</div>
            <div>{{ dnaFusion.representation }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Reported Affected Genes</div>
            {{ dnaFusion.reportedNumReads }}
          </v-flex>
        </v-layout>
      </v-card>

      <v-card-title class="font-weight-normal">RNA-Fusions</v-card-title>
      <v-card
        flat
        color="#f0f0f0"
        v-for="rnaFusion in ngsReport.rnaFusions"
        :key="rnaFusion.id"
      >
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
        </v-layout>
      </v-card>

      <v-card-title class="font-weight-normal">RNA Seqs</v-card-title>
      <v-card
        flat
        color="#e8e8e8"
        v-for="rnaSeq in ngsReport.rnaSeqs"
        :key="rnaSeq.id"
      >
        <v-layout row wrap :class="`pa-3`">
          <v-flex xs6 sm4 md4>
            <div class="caption grey--text">Entrez ID</div>
            <div>{{ rnaSeq.entrezId }}</div>
          </v-flex>
          <v-flex xs6 sm4 md4>
            <div class="caption grey--text">Ensembl ID</div>
            {{ rnaSeq.ensemblId }}
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Gen</div>
            <div>{{ rnaSeq.gene }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Transcript ID</div>
            {{ rnaSeq.transcriptId }}
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Fragmente / kBaseMillion</div>
            <div>{{ rnaSeq.fragmentsPerKilobaseMillion }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">von NGS</div>
            {{ rnaSeq.fromNGS }}
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Tissue Corrected Expression</div>
            <div>{{ rnaSeq.tissueCorrectedExpression }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Raw Counts</div>
            {{ rnaSeq.rawCounts }}
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Library Size</div>
            {{ rnaSeq.librarySize }}
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Cohort Ranking</div>
            {{ rnaSeq.cohortRanking }}
          </v-flex>
        </v-layout>
      </v-card>
    </v-card>

    <!--
    <v-data-table
      :headers="headerNgsReports"
      :items="ngsReports"
      :expand="expand"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">

          // <td>{{ props.item.id }}</td>
        
          <td>{{ props.item.specimen }}</td>
          <td>{{ props.item.issueDate }}</td>
          <td>{{ props.item.sequencingType }}</td>
          <td>{{ props.item.tumorCellContent }}</td>
          <td>{{ props.item.brcaness }}</td>
          <td>{{ props.item.microSatelliteInstabilities }}</td>
          <td>{{ props.item.tumorMutationalBurden }}</td>
          <td class="text-xs-right">
            <v-icon color="blue" small>fas fa-info-circle</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card color="grey lighten-3" flat light left>
          <v-card-title>Metadaten </v-card-title>
        </v-card>

        <v-card flat>
          <v-data-table
            :headers="headerMetadata"
            :items="props.item.metadata"
            hide-default-header
            hide-default-footer
            hide-actions
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.kitType }}
                </td>
                <td>
                  {{ props.item.kitManufacturer }}
                </td>
                <td>
                  {{ props.item.sequencer }}
                </td>
                <td>
                  {{ props.item.referenceGenome }}
                </td>
                <td>
                  {{ props.item.pipeline }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

        <v-card color="grey lighten-3" flat light left>
          <v-card-title>Einfache Varianten </v-card-title>
        </v-card>
        <v-card flat>
          <v-data-table
            :headers="headerSimpleVariants"
            :items="props.item.simpleVariants"
            hide-default-header
            hide-default-footer
            hide-actions
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.chromosome }}
                </td>
                <td>
                  {{ props.item.gene }}
                </td>
                <td>
                  {{ props.item.startEnd }}
                </td>
                <td>
                  {{ props.item.refAllele }}
                </td>
                <td>
                  {{ props.item.altAllele }}
                </td>
                <td>
                  {{ props.item.dnaChange }}
                </td>
                <td>
                  {{ props.item.aminoAcidChange }}
                </td>
                <td>
                  {{ props.item.readDepth }}
                </td>
                <td>
                  {{ props.item.allelicFrequency }}
                </td>
                <td>
                  {{ props.item.cosmicId }}
                </td>
                <td>
                  {{ props.item.dbSNPId }}
                </td>
                <td>
                  {{ props.item.interpretation }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

        <v-card color="grey lighten-3" flat light left>
          <v-card-title>Copy Number Varianten </v-card-title>
        </v-card>
        <v-card flat>
          <v-data-table
            :headers="headerCNVs"
            :items="props.item.copyNumberVariants"
            hide-default-header
            hide-default-footer
            hide-actions
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.chromosome }}
                </td>
                <td>
                  {{ props.item.reportedAffectedGenes }}
                </td>
                <td>
                  {{ props.item.startRange }}
                </td>
                <td>
                  {{ props.item.endRange }}
                </td>
                <td>
                  {{ props.item.totalCopyNumber }}
                </td>
                <td>
                  {{ props.item.relativeCopyNumber }}
                </td>
                <td>
                  {{ props.item.cnA }}
                </td>
                <td>
                  {{ props.item.cnB }}
                </td>
                <td>
                  {{ props.item.reportedFocality }}
                </td>
                <td>
                  {{ props.item.type }}
                </td>
                <td>
                  {{ props.item.copyNumberNeutralLoH }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

        <v-card color="grey lighten-3" flat light left>
          <v-card-title>DNA-Fusions </v-card-title>
        </v-card>
        <v-card flat>
          <v-data-table
            :headers="headerDNAFusions"
            :items="props.item.dnaFusions"
            hide-default-header
            hide-default-footer
            hide-actions
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.representation }}
                </td>
                <td>
                  {{ props.item.reportedNumReads }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

        <v-card color="grey lighten-3" flat light left>
          <v-card-title>RNA-Fusions </v-card-title>
        </v-card>
        <v-card flat>
          <v-data-table
            :headers="headerRNAFusions"
            :items="props.item.rnaFusions"
            hide-default-header
            hide-default-footer
            hide-actions
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.representation }}
                </td>
                <td>
                  {{ props.item.position5pr }}
                </td>
                <td>
                  {{ props.item.strand5pr }}
                </td>
                <td>
                  {{ props.item.position3pr }}
                </td>
                <td>
                  {{ props.item.strand3pr }}
                </td>
                <td>
                  {{ props.item.effect }}
                </td>
                <td>
                  {{ props.item.cosmicId }}
                </td>
                <td>
                  {{ props.item.reportedNumReads }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

        <v-card color="grey lighten-3" flat light left>
          <v-card-title>RNA Seqs </v-card-title>
        </v-card>
        <v-card flat>
          <v-data-table
            :headers="headerRNASeqs"
            :items="props.item.rnaSeqs"
            hide-default-header
            hide-default-footer
            hide-actions
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  {{ props.item.entrezId }}
                </td>
                <td>
                  {{ props.item.ensemblId }}
                </td>
                <td>
                  {{ props.item.gene }}
                </td>
                <td>
                  {{ props.item.transcriptId }}
                </td>
                <td>
                  {{ props.item.fragmentsPerKilobaseMillion }}
                </td>
                <td>
                  {{ props.item.fromNGS }}
                </td>
                <td>
                  {{ props.item.tissueCorrectedExpression }}
                </td>
                <td>
                  {{ props.item.rawCounts }}
                </td>
                <td>
                  {{ props.item.librarySize }}
                </td>
                <td>
                  {{ props.item.cohortRanking }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
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

    -->

    <!-- CARE PLANS VIEW -->
    <div id="carePlans"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >MTB-Beschluss</v-card-title
    >

    <v-card flat v-for="carePlan in carePlans" :key="carePlan.id">
      <v-layout row wrap :class="`pa-3`">
        <v-flex xs6 sm4 md6>
          <div class="caption grey--text">ICD-10</div>
          <div>{{ carePlan.icd10 }}</div>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">Erstellungsdatum</div>
          {{ carePlan.issuedOn }}
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">Target verfügbar</div>
          <div>{{ carePlan.targetAvailable }}</div>
        </v-flex>
        <v-flex xs6 sm4 md6>
          <div class="caption grey--text">
            <v-icon color="blue" small>fas fa-info-circle</v-icon> Protokoll
          </div>
          <div>{{ carePlan.protocol }}</div>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">Human-genetische Beratung</div>
          {{ carePlan.geneticCounsellingRecommendation }}
        </v-flex>
        <v-flex xs6 sm4 md3>
          <div class="caption grey--text">Einschluss in Studie</div>
          <div>{{ carePlan.inclusionInStudyRecommendation }}</div>
        </v-flex>

        <v-flex xs2 sm4 md12> </v-flex>
      </v-layout>

      <v-card
        flat
        color="#f0f0f0"
        v-for="therapyRecommendation in carePlan.therapyRecommendations"
        :key="therapyRecommendation.id"
      >
        <v-layout row wrap :class="`pa-3`">
          <v-flex class="center" xs6 sm4 md12
            ><i class="fa fa-angle-down"></i
          ></v-flex>
          <v-flex xs6 sm4 md4>
            <div class="caption grey--text">ICD-10</div>
            <div>{{ therapyRecommendation.icd10 }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Erstellungsdatum</div>
            {{ therapyRecommendation.medication }}
          </v-flex>
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Target verfügbar</div>
            <div>{{ therapyRecommendation.medicationClasses }}</div>
          </v-flex>
          <v-flex xs6 sm4 md1>
            <div class="caption grey--text">Protokoll</div>
            <div>{{ therapyRecommendation.priority }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Human-genetische Beratung</div>
            {{ therapyRecommendation.levelOfEvidence }}
          </v-flex>
          <v-flex xs6 sm4 md12>
            <div class="caption grey--text">Einschluss in Studie</div>
            <div>{{ therapyRecommendation.supportingVariants.join(", ") }}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-card>
    <!--
    <v-data-table
      :headers="headerCarePlans"
      :items="carePlans"
      :expand="expand"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.icd10 }}</td>
          <td>{{ props.item.issuedOn }}</td>
          <td>{{ props.item.targetAvailable }}</td>
          <td class="text-xs-right">
            <v-icon color="blue" small>fas fa-info-circle</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card color="grey lighten-3" flat light left>
          <v-card-title
            ><v-icon color="blue" class="mr-3">fas fa-info-circle</v-icon>
            <p>
              <strong> Protokoll:</strong> {{ props.item.protocol }} <br />
              <strong>Human-genetische Beratung:</strong>
              {{ props.item.geneticCounsellingRecommendation }} <br />
              <strong>Einschluss in Studie:</strong>
              {{ props.item.inclusionInStudyRecommendation }}
            </p>
          </v-card-title>
        </v-card>

        <v-card flat>
          <v-data-table
            :headers="headerTherapyRecommendations"
            :items="props.item.therapyRecommendations"
            hide-default-header
            hide-default-footer
            hide-actions
            no-data-text="Keine Daten verfügbar"
            rows-per-page-text="Zeilen pro Seite"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>{{ props.item.icd10 }}</td>
                <td>{{ props.item.medication }}</td>
                <td>{{ props.item.medicationClasses }}</td>
                <td>{{ props.item.priority }}</td>
                <td>{{ props.item.levelOfEvidence }}</td>
                <td>{{ props.item.supportingVariants }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
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
    -->

    <!-- CLAIM STATUS VIEW -->
    <div id="claimResponses"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Kostenübernahme-Anträge</v-card-title
    >

    <v-data-table
      :headers="headerClaimStatus"
      :items="claimStatus"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
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
      @click="$vuetify.goTo('#patientCard', options)"
      flat
      color="grey"
    >
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <!-- MOLECULAR THERAPIES VIEW -->
    <div id="molecularTherapies"></div>

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light"
      >Molekulare Therapien</v-card-title
    >

    <v-data-table
      :headers="headerMolecularTherapies"
      :items="molecularTherapies"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.diagnosis }}</td>
          <td>{{ props.item.status }}</td>
          <td>{{ props.item.recordedOn }}</td>
          <td>{{ props.item.recommendation }}</td>
          <td>{{ props.item.medication }}</td>
          <td>{{ props.item.medicationClasses }}</td>
          <td>{{ props.item.dosage }}</td>
          <td>{{ props.item.period }}</td>
          <td>{{ props.item.reasonStopped }}</td>
          <td>{{ props.item.note }}</td>
          <td>{{ props.item.response }}</td>
          <td>{{ props.item.progressionDate }}</td>
          <td>{{ props.item.notDoneReason }}</td>
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

    <v-divider class="my-3"></v-divider>
  </v-container>
</template>

<script>
import axios from "axios";

import userPanel from "~/components/userPanel";

let serverBaseURL =
  process.env.baseUrl + process.env.port + `/bwhc/mtb/api/query`;

export default {
  loading: "~/components/loading.vue",

  data() {
    return {
      search: "",
      snackbar: false,
      extendCarePlans: false,
      y: "top",

      headerDiagnoses: [
        {
          text: "Erstdiagnosedatum",
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
          text: "WHO ZNS Grad",
          align: "left",
          sortable: true,
          value: "whoGrade",
        },
        {
          text: "Tumorausbreitung",
          align: "left",
          sortable: true,
          value: "statusHistory",
        },
        {
          text: "Leitlinien-Behandlungsstatus",
          align: "left",
          sortable: true,
          value: "guidelineTreatmentStatus",
        },
      ],

      headerFamilyMemberDiagnoses: [
        {
          text: "Verwandtschaftsgrad",
          align: "left",
          sortable: true,
          value: "relationship",
        },
      ],

      headerGuidelineTherapies: [
        {
          text: "Diagnose",
          align: "left",
          sortable: true,
          value: "diagnosis",
        },
        {
          text: "Therapie-Linie",
          align: "left",
          sortable: true,
          value: "therapyLine",
        },
        {
          text: "Zeitraum",
          align: "left",
          sortable: true,
          value: "period",
        },
        {
          text: "Medikation",
          align: "left",
          sortable: true,
          value: "medication",
        },
        {
          text: "Wirkstoff-Klassen",
          align: "left",
          value: "medicationClasses",
        },
        {
          text: "Abbruchsgrund",
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
          text: "Progressionsdatum",
          align: "left",
          sortable: true,
          value: "progressionDate",
        },
      ],

      headerEcogStatus: [
        {
          text: "Datum",
          align: "left",
          sortable: true,
          value: "effectiveDate",
        },
        {
          text: "Wert",
          align: "left",
          sortable: true,
          value: "value",
        },
      ],

      headerSpecimens: [
        {
          text: "ICD-10",
          align: "left",
          sortable: true,
          value: "icd10",
        },
        {
          text: "Art",
          align: "left",
          sortable: true,
          value: "type",
        },
        {
          text: "Entnahmedatum",
          align: "left",
          sortable: true,
          value: "collectionDate",
        },
        {
          text: "Lokalisierung",
          align: "left",
          sortable: true,
          value: "localization",
        },
        {
          text: "Entnahmemethode",
          align: "left",
          sortable: true,
          value: "collectionMethod",
        },
      ],

      headerMolecularPathologyFindings: [
        {
          text: "Probe",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        {
          text: "Institut",
          align: "left",
          sortable: true,
          value: "performingInstitute",
        },
        {
          text: "Erstellungsdatum",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Bemerkungen",
          align: "left",
          sortable: true,
          value: "note",
        },
      ],

      headerHistologyReports: [
        {
          text: "Probe",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        {
          text: "Erstellungsdatum",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Tumor-Morphologie",
          align: "left",
          sortable: true,
          value: "tumorMorphology",
        },
        {
          text: "Tumor-Zellgehalt",
          align: "left",
          sortable: true,
          value: "tumorCellContent",
        },
        {
          text: "Bemerkungen",
          align: "left",
          sortable: true,
          value: "note",
        },
      ],

      headerNgsReports: [
        {
          text: "Probe",
          align: "left",
          sortable: true,
          value: "specimen",
        },
        {
          text: "Erstellungsdatum",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Sequenzierungs-Art",
          align: "left",
          sortable: true,
          value: "sequencingType",
        },
        {
          text: "Tumor-Zellgehalt",
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
          text: "Micro-Satellite Instabilitäten",
          align: "left",
          sortable: true,
          value: "microSatelliteInstabilities",
        },
        {
          text: "Mutationslast",
          align: "left",
          sortable: true,
          value: "tumorMutationalBurden",
        },
        {
          text: "NGS-Bericht Details...",
          align: "right",
          sortable: false,
          value: "",
        },
      ],

      headerMetadata: [
        {
          text: "Kit-Typ",
          align: "left",
          sortable: true,
          value: "kitType",
        },
        {
          text: "Kit Hersteller",
          align: "left",
          sortable: true,
          value: "kitManufacturer",
        },
        {
          text: "Sequenziergerät",
          align: "left",
          sortable: true,
          value: "sequencer",
        },
        {
          text: "Ref. Genom",
          align: "left",
          sortable: true,
          value: "referenceGenome",
        },
        {
          text: "Pipeline",
          align: "left",
          sortable: true,
          value: "pipeline",
        },
      ],

      headerSimpleVariants: [
        {
          text: "Chr",
          align: "left",
          sortable: true,
          value: "chromosome",
        },
        {
          text: "Gen",
          align: "left",
          sortable: true,
          value: "gene",
        },
        {
          text: "Start/Ende",
          align: "left",
          sortable: true,
          value: "startEnd",
        },
        {
          text: "Ref Allel",
          align: "left",
          sortable: true,
          value: "refAllele",
        },
        {
          text: "Alt Allel",
          align: "left",
          sortable: true,
          value: "altAllele",
        },
        {
          text: "DNA Change",
          align: "left",
          sortable: true,
          value: "dnaChange",
        },
        {
          text: "Amino Acid Change",
          align: "left",
          sortable: true,
          value: "aminoAcidChange",
        },
        {
          text: "Read Depth",
          align: "left",
          sortable: true,
          value: "readDepth",
        },
        {
          text: "Allel-Frequenz",
          align: "left",
          sortable: true,
          value: "readDepth",
        },
        {
          text: "COSMIC ID",
          align: "left",
          sortable: true,
          value: "cosmicId",
        },
        {
          text: "dbSNP ID",
          align: "left",
          sortable: true,
          value: "dbSNPId",
        },
        {
          text: "Interpretation",
          align: "left",
          sortable: true,
          value: "interpretation",
        },
      ],

      headerCNVs: [
        {
          text: "Chr",
          align: "left",
          sortable: true,
          value: "chromosome",
        },
        {
          text: "Reported Affected Genes",
          align: "left",
          sortable: true,
          value: "reportedAffectedGenes",
        },
        {
          text: "Anfangsbereich",
          align: "left",
          sortable: true,
          value: "startRange",
        },
        {
          text: "Endbereich",
          align: "left",
          sortable: true,
          value: "endRange",
        },
        {
          text: "Kopienzahl",
          align: "left",
          sortable: true,
          value: "totalCopyNumber",
        },
        {
          text: "Rel. Kopienzahl",
          align: "left",
          sortable: true,
          value: "relativeCopyNumber",
        },
        {
          text: "CNA",
          align: "left",
          sortable: true,
          value: "cnA",
        },
        {
          text: "CNB",
          align: "left",
          sortable: true,
          value: "cnB",
        },
        {
          text: "Reported Focality",
          align: "left",
          sortable: true,
          value: "reportedFocality",
        },
        {
          text: "Art",
          align: "left",
          sortable: true,
          value: "type",
        },
        {
          text: "Copy Number Neutral LoH",
          align: "left",
          sortable: true,
          value: "copyNumberNeutralLoH",
        },
      ],

      headerDNAFusions: [
        {
          text: "Formatierte Darstellung",
          align: "left",
          sortable: true,
          value: "representation",
        },
        {
          text: "Anzahl Reads",
          align: "left",
          sortable: true,
          value: "reportedNumReads",
        },
      ],

      headerRNAFusions: [
        {
          text: "Formatierte Darstellung",
          align: "left",
          sortable: true,
          value: "representation",
        },
        {
          text: "5' Pos.",
          align: "left",
          sortable: true,
          value: "position5pr",
        },
        {
          text: "5' Strand",
          align: "left",
          sortable: true,
          value: "strand5pr",
        },
        {
          text: "3' Pos.",
          align: "left",
          sortable: true,
          value: "position3pr",
        },
        {
          text: "3' Strand",
          align: "left",
          sortable: true,
          value: "strand3pr",
        },
        {
          text: "Effekt",
          align: "left",
          sortable: true,
          value: "effect",
        },
        {
          text: "COSMIC ID",
          align: "left",
          sortable: true,
          value: "cosmicId",
        },
        {
          text: "Anzahl Reads",
          align: "left",
          sortable: true,
          value: "reportedNumReads",
        },
      ],

      headerRNASeqs: [
        {
          text: "Entrez ID",
          align: "left",
          sortable: true,
          value: "entrezId",
        },
        {
          text: "Ensembl ID",
          align: "left",
          sortable: true,
          value: "ensemblId",
        },
        {
          text: "Gen",
          align: "left",
          sortable: true,
          value: "gene",
        },
        {
          text: "Transcript ID",
          align: "left",
          sortable: true,
          value: "transcriptId",
        },
        {
          text: "Fragmente / kBaseMillion",
          align: "left",
          sortable: true,
          value: "fragmentsPerKilobaseMillion",
        },
        {
          text: "von NGS",
          align: "left",
          sortable: true,
          value: "fromNGS",
        },
        {
          text: "Tissue Corrected Expression",
          align: "left",
          sortable: true,
          value: "tissueCorrectedExpression",
        },
        {
          text: "Raw Counts",
          align: "left",
          sortable: true,
          value: "rawCounts",
        },
        {
          text: "Library Size",
          align: "left",
          sortable: true,
          value: "librarySize",
        },
        {
          text: "Cohort Ranking",
          align: "left",
          sortable: true,
          value: "cohortRanking",
        },
      ],

      headerCarePlans: [
        {
          text: "ICD-10",
          align: "left",
          sortable: true,
          value: "icd10",
        },
        {
          text: "Erstellungsdatum",
          align: "left",
          sortable: true,
          value: "issuedOn",
        },
        {
          text: "Target verfügbar",
          align: "left",
          sortable: true,
          value: "targetAvailable",
        },
        {
          text: "Beschluss-Details...",
          align: "right",
          sortable: false,
          value: "",
        },
      ],

      headerTherapyRecommendations: [
        {
          text: "ICD-10",
          align: "left",
          sortable: true,
          value: "icd10",
        },
        {
          text: "Medikation",
          align: "left",
          sortable: true,
          value: "medication",
        },
        {
          text: "Wirkstoff-Klassen",
          align: "left",
          value: "medicationClasses",
        },
        {
          text: "Priorität",
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
          text: "Stützende Molekulare Alterationen",
          align: "left",
          sortable: true,
          value: "supportingVariants",
        },
      ],

      headerClaimStatus: [
        {
          text: "Therapie-Empfehlung",
          align: "left",
          sortable: true,
          value: "therapy",
        },
        {
          text: "Antragsdatum",
          align: "left",
          sortable: true,
          value: "issueDate",
        },
        {
          text: "Antwortdatum",
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
          text: "Ablehnungsgrund",
          align: "left",
          sortable: true,
          value: "reason",
        },
      ],

      headerMolecularTherapies: [
        {
          text: "Diagnose",
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
          text: "Erfassungsdatum",
          align: "left",
          sortable: true,
          value: "recordedOn",
        },
        {
          text: "Therapie-Empfehlung",
          align: "left",
          sortable: true,
          value: "recommendation",
        },
        {
          text: "Medikation",
          align: "left",
          sortable: true,
          value: "medication",
        },
        {
          text: "Wirkstoff-Klassen",
          align: "left",
          value: "medicationClasses",
        },
        {
          text: "Dosisdichte",
          align: "left",
          sortable: true,
          value: "dosage",
        },
        {
          text: "Zeitraum",
          align: "left",
          sortable: true,
          value: "period",
        },
        {
          text: "Abbruchsgrund",
          align: "left",
          sortable: true,
          value: "reasonStopped",
        },
        {
          text: "Bemerkungen",
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
          text: "Progressionsdatum",
          align: "left",
          sortable: true,
          value: "progressionDate",
        },
        {
          text: "Nicht-Umsetzungs-Grund",
          align: "left",
          sortable: true,
          value: "notDoneReason",
        },
      ],
    };
  },

  components: {
    userPanel,
  },

  methods: {
    goBack() {
      return window.history.back();
    },
    showMutations(genomicReportId) {},

    displayTherapyRecommendations() {
      this.extendCarePlans = false;
    },
  },

  async asyncData({ params, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    const [slug, id] = params.slugid.split("&");

    let mtbFile = await axios.get(`${serverBaseURL}/${slug}/mtbfiles/${id}`);

    let mtbFileView = await axios.get(
      `${serverBaseURL}/${slug}/mtbfileViews/${id}`
    );

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
      for (var i = 0; i < mtbFileView.data.familyMemberDiagnoses.length; i++) {
        let item = {
          id: mtbFileView.data.familyMemberDiagnoses[i].id,
          patient: mtbFileView.data.familyMemberDiagnoses[i].patient,
          relationship: mtbFileView.data.familyMemberDiagnoses[i].relationship,
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
          medicationClasses:
            mtbFileView.data.guidelineTherapies[i].medicationClasses,
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
            mtbFileView.data.molecularPathologyFindings[i].performingInstitute,
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
          tumorMorphology: mtbFileView.data.histologyReports[i].tumorMorphology,
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
          copyNumberVariants: mtbFileView.data.ngsReports[i].copyNumberVariants,
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
          recommendation: mtbFileView.data.molecularTherapies[i].recommendation,
          period: mtbFileView.data.molecularTherapies[i].period,
          notDoneReason: mtbFileView.data.molecularTherapies[i].notDoneReason,
          medication: mtbFileView.data.molecularTherapies[i].medication,
          medicationClasses:
            mtbFileView.data.molecularTherapies[i].medicationClasses,
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
      baseURL: `${serverBaseURL}/${params.id}/files`,

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
  },
};
</script>
