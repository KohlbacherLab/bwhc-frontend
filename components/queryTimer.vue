<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-icon style="font-size: 1.1em" color="primary" dark v-on="on"
          >far fa-clock</v-icon
        >
      </template>
      <span
        >Die Abfrageergebnisse werden in {{ formattedTime }} Minuten entfernt
        werden.</span
      >
    </v-tooltip>
    {{ formattedTime }}

    <v-snackbar
      v-model="snackbarQueryExpiresIn"
      :color="'red'"
      top
      :timeout="59000"
    >
      Die Abfrageergebnisse werden in weniger als 1 Minute entfernt!
      <!--
      <v-btn color="black" flat @click="snackbarQueryExpiresIn = false"
        ><i class="fa fa-times-circle"></i
      ></v-btn>
      -->
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: localStorage.getItem("queryExpiresIn"),
      intervalId: null,
      snackbarQueryExpiresIn: false,
    };
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        if (this.timeLeft > 0) {
          if (this.timeLeft === 60) {
            this.snackbarQueryExpiresIn = true;
          }
          this.timeLeft--;
        } else {
          clearInterval(this.intervalId);
          this.$router.push("/query");
        }
      }, 1000);
    },
    clearTimer() {
      clearInterval(this.intervalId);
    },
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },
};
</script>
<style>
.query-timer-card {
  padding: 10px;
}
</style>
