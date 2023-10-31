<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-icon style="font-size: 1.1em" color="primary" dark v-on="on">far fa-clock</v-icon>
      </template>
      <span>Die Sitzung wird in {{ formattedTime }} minuten enden.</span>
    </v-tooltip>
    {{ formattedTime }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: localStorage.getItem("sessionExpiresIn"),
      intervalId: null,
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
          this.timeLeft--;
        } 
        else {
          clearInterval(this.intervalId);
          this.$router.push("/");
          localStorage.clear();
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
.session-timer-card {
  padding: 10px;
}
</style>
