<template>
  <v-responsive>
    <v-container fluid grid-list-md>
      <userPanel />
      <v-flex>
        <h3 class="display-3"><strong>bwHealthCloud</strong> help</h3>

        <span class="subheading font-weight-light">
          <v-btn
            dark
            icon
            color="blue accent-2"
            align-end
            @click="$router.push('/main')"
          >
            <v-icon dark>fas fa-arrow-left</v-icon></v-btn
          >
          Help will be here soon. <i class="fas fa-cat"></i>
        </span>

        <v-divider class="my-3"></v-divider>

        <v-container style="max-width: 600px">
          <v-timeline dense clipped>
            <v-timeline-item
              fill-dot
              class="white--text mb-5"
              color="orange"
              icon="directions_run"
              large
            >
              <template v-slot:icon>
                <span>AC</span>
              </template>
              <v-text-field
                v-model="input"
                hide-details
                flat
                label="Leave a comment..."
                solo
                @keydown.enter="comment"
              >
                <template v-slot:append>
                  <v-btn class="mx-0" depressed @click="comment">Post</v-btn>
                </template>
              </v-text-field>
            </v-timeline-item>

            <v-slide-x-transition group>
              <v-timeline-item
                v-for="event in timeline"
                :key="event.id"
                class="mb-3"
                color="pink"
                small
              >
                <v-layout justify-space-between>
                  <v-flex xs7 v-text="event.text"></v-flex>
                  <v-flex xs5 text-xs-right v-text="event.time"></v-flex>
                </v-layout>
              </v-timeline-item>
            </v-slide-x-transition>

            <v-timeline-item class="mb-4" hide-dot>
              <span>TODAY</span>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="purple" small>
              <v-layout justify-space-between>
                <v-chip class="white--text ml-0" color="purple" label small
                  >DEV</v-chip
                >
                <v-flex xs7>bwHC Development is in progress.</v-flex>
                <v-flex xs5 text-xs-right>Dec 2020</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7>bwHC Meeting in Stuttgart.</v-flex>
                <v-flex xs5 text-xs-right>Feb 2020</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7>bwHC Patient Entry Portal v1 completed.</v-flex>
                <v-flex xs5 text-xs-right>Mar 2019</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7>bwHC Query Portal v2 completed.</v-flex>
                <v-flex xs5 text-xs-right>Sep 2018</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7>bwHC Query Portal v1 completed.</v-flex>
                <v-flex xs5 text-xs-right>May 2018</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7
                  >bwHC User Stories has been completed and shared with the
                  partners.</v-flex
                >
                <v-flex xs5 text-xs-right>Feb 2018</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7
                  >bwHC first consortium meeting took place in Tübingen.</v-flex
                >
                <v-flex xs5 text-xs-right>Dec 2018</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item class="mb-3" color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7
                  >bwHC Specification Document shared with partners.</v-flex
                >
                <v-flex xs5 text-xs-right>Oct 2018</v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="grey" small>
              <v-layout justify-space-between>
                <v-flex xs7>bwHC project started!</v-flex>
                <v-flex xs5 text-xs-right>Aug 2018</v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </v-flex>
      <v-divider class="my-3"></v-divider>
    </v-container>
  </v-responsive>
</template>

<script>
import userPanel from "~/components/userPanel";

export default {
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
  }),

  components: {
    userPanel,
  },

  computed: {
    timeline() {
      return this.events.slice().reverse();
    },
  },

  methods: {
    comment() {
      const time = new Date().toTimeString();
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(
          /:\d{2}\sGMT-\d{4}\s\((.*)\)/,
          (match, contents, offset) => {
            return ` ${contents
              .split(" ")
              .map((v) => v.charAt(0))
              .join("")}`;
          }
        ),
      });

      this.input = null;
    },
    goBack() {
      return window.history.back();
    },
  },
};
</script>