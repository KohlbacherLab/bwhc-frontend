<template>
  <v-container fluid grid-list-md>
    <h3 class="display-3">
      <strong
        ><v-icon style="font-size: 5rem" color="cyan accent-3"
          >fas fa-cloud
        </v-icon>
        bwHealthCloud</strong
      >
    </h3>
    <span class="headline"
      >Secure Data Integration Platform for Personalized Medicine</span
    >
    <v-tab>
      <v-tooltip left>
        <v-dialog v-model="loginDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              <strong>Login</strong></v-card-title
            >
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    label="Username*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" flat @click="loginDialog = false"
                >Cancel</v-btn
              >
              <v-btn color="cyan accent-3" @click="submit" width="140"
                >Submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <span>Login</span>
      </v-tooltip>
    </v-tab>
    <v-divider class="my-3"></v-divider>

    <v-btn
      class="ma-2 font-weight-bold"
      tile
      x-large
      color="cyan accent-3"
      light
      @click="loginDialog = true"
      >Login</v-btn

    <v-divider class="my-3"></v-divider>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6>
        <v-card flat>
          <v-card-title primary class="headline font-weight-light"
            >Primary Goal</v-card-title
          >
          <v-card-text class="subheading font-weight-light">
            <p>
              The primary goal of this project is the establishment of a secure
              infrastructure to manage and integrate encrypted clinical data to
              generate a data lake for applied analysis in the field of
              personalized medicine. <br /><br />The first step will be the data
              collection from oncology patients from all four university
              hospitals in Baden-Württemberg (Ulm, Freiburg, Heidelberg und
              Tübingen) in a secure cloud structure.
            </p>
          </v-card-text>
          <v-card-title class="headline font-weight-light">
            Project Lead
            <br />
            <v-icon></v-icon>
          </v-card-title>
          <v-card-text class="subheading font-weight-light">
            <p>
              Prof. Dr. Oliver Kohlbacher<br />
              Professor for Applied Bioinformatics / Center for Bioinformatics ·
              University Tübingen
            </p>
            Sand 14, Raum: C317<br />
            72076 Tübingen<br />
            +49 (0)7071 29-70457<br />
            oliver.kohlbacher(at)uni-tuebingen.de<br />
            twitter.com/okohlbacher<br />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card flat>
              <v-card-title class="headline font-weight-light">
                bwHC Portal
                <br />
                <v-icon></v-icon>
              </v-card-title>
              <v-card-text class="subheading font-weight-light">
                The next expansion level will include an user-friendly front-end
                that allows patients themselves and the treating doctors to
                access the data under strict regulations. For research purpose
                the data can be analyzed as single data-sets or aggregated data
                to identify new patho-physiological mechanisms and to discover
                new targets for treatment. In particular the consortium of the
                four university hospitals with a strong background in this
                research area ensures not only an extensive database but also
                well curated data-sets of high quality that are suitable for big
                data analysis and artificial intelligence and systems medicine
                approaches. Especially the setup within the clinical IT
                environment ensures protection concerning ethical and security
                issues. This is one of the major challenges and the reason why
                commercial cloud services are not a solution.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Cooperation Partners
                    <br />
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-card-text class="subheading font-weight-light">
                    <p>
                      University hospitals Tübingen · Heidelberg · Ulm ·
                      Freiburg
                    </p>
                    funded by the funding program „Digitalisierung in der
                    Medizin und Pflege“ by Ministerium für Soziales und
                    Integration Baden-Württemberg
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import navPanel from "~/components/navPanel";
import { mapActions } from "vuex";

export default {
  data: () => ({
    loginDialog: false,
  }),

  components: {
    navPanel,
  },

  methods: {
    ...mapActions({
      login: "auth/login",
      logout: "auth/logout",
      hasToken: "auth/hasToken",
    }),

    submit() {
      if (this.username !== "" && this.password !== "") {
        let request = {
          username: this.username,
          password: this.password,
        };
        this.login(request)
          .then(() => {
            if (this.$route.query) {
              this.$router.push(this.$route.query);
              let toast = this.$toasted.success("Login Successful!", {
                theme: "bubble",
                icon: "check_circle",
                position: "top-center",
                duration: 3000,
              });
            }
            this.$router.push(`/main/`);
          })
          .catch((e) => {
            let toast = this.$toasted.show(
              "Error! Invalid username or password. ",
              {
                theme: "bubble",
                icon: "error",
                position: "top-center",
                duration: 3000,
              }
            );
      if (!store.state.authUser) {
        return redirect('/main')
      }
            this.$router.push(`/`);
          });
      }
    },
  },
};
</script>