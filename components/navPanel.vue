<template>
  <v-layout row justify>
    <!-- 
    <v-layout row justify-end>
        <v-btn icon large dark color="yellow darken-3" @click="$router.push('help')">
          <v-icon>directions_run</v-icon>
        </v-btn>
        <v-btn icon large dark color="orange accent-4" @click="$router.push('cohort')">
          <v-icon>person_pin</v-icon>
        </v-btn>
        
        <v-tooltip bottom>
        <v-btn icon large dark slot="activator" color="blue accent-3" @click="$router.push('patient')">
          <v-icon>person</v-icon>
        </v-btn>
        <span>click here to register a MTB patient</span>
        </v-tooltip>
    -->
    <v-tooltip bottom>
      <v-btn
        class="ma-2 font-weight-bold"
        tile
        small
        slot="activator"
        color="light-blue darken-3"
        dark
        @click="$router.push('/quality')"
        >Quality Check</v-btn
      >
      <span>click here to check bwHC quality control stats</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn
        class="ma-2 font-weight-bold"
        tile
        small
        slot="activator"
        color="cyan darken-3"
        dark
        @click="$router.push('/validate')"
        >Data Validation</v-btn
      >
      <span>click here to check bwHC data validation</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn
        class="ma-2 font-weight-bold"
        tile
        small
        slot="activator"
        color="indigo darken-1"
        dark
        @click="$router.push('/users')"
        >Admin
      </v-btn>
      <span>click here to use bwHC admin view</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn
        class="ma-2 font-weight-bold"
        tile
        small
        slot="activator"
        color="teal darken-3"
        dark
        @click="$router.push('/query')"
        >Query Portal
      </v-btn>
      <span>click here to submit your bwHC query</span>
    </v-tooltip>

    <v-btn
      class="ma-2 font-weight-bold"
      tile
      small
      color="red accent-3"
      dark
      @click="logout()"
      >Logout</v-btn
    >
  </v-layout>
</template>