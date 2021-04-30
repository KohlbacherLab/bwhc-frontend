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
              <strong>Anmeldung</strong></v-card-title
            >
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    label="Nutzername*"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    @keydown.enter="submit"
                    v-model="password"
                    label="Passwort*"
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
                >Abbrechen</v-btn
              >
              <v-btn color="cyan accent-3" @click="submit" width="140"
                >Senden</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <span>Anmeldung</span>
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
      >Anmeldung</v-btn
    >

    <v-divider class="my-3"></v-divider>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6>
        <v-card flat>
          <v-card-title primary class="headline font-weight-light"
            >Ziel des Projektes:</v-card-title
          >
          <v-card-text class="subheading font-weight-light">
            <p>
              Primäres Ziel ist der Entwurf einer sicheren Datenintegrations- und -verwaltungsplattform, die in einer späteren Phase produktiv aufgebaut werden soll. Klinische Daten der Patienten werden landesweit verschlüsselt gespeichert. So soll ein großer Datenpool geschaffen werden, der aussagekräftigere Auswertungen erlaubt.
<br><br>
Im fertigen Zustand soll die Plattform Patienten, Ärzten und Wissenschaftlern Zugang zu den integrierten Daten geben. Ärzte und Wissenschaftler werden die Daten auswerten, um z.B. die Therapie zu verbessern oder um verschiedene Therapien zu vergleichen. Im Rahmen der Personalisierten Medizin sollen durch die Auswertung der Daten Verbesserungen der Behandlungen für den einzelnen Patienten gefunden werden und weitere Hinweise auf die Ursachen und den Verlauf der Erkrankung.
            </p>
          </v-card-text>
          <v-card-title class="headline font-weight-light">
            Kontakt
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
                Vorhandene medizinische Daten onkologischer Patienten der Universitätskliniken in Baden-Württemberg sollen in einer sicheren Cloud gespeichert werden. Die Daten können von den Patienten und den behandelnden Ärzten abgerufen werden. Im Rahmen der Personalisierten Medizin (PM) sollen die Daten insgesamt und für jeden Patienten einzeln ausgewertet werden.
              </v-card-text>
              <v-card-title class="headline font-weight-light">
                Medizinische Fachrichtung:
                <br />
                <v-icon></v-icon>
              </v-card-title>
<v-card-text class="subheading font-weight-light">
               Medizininformatik, Onkologische Bereiche der Universitätskliniken, Krebsregister
               </v-card-text>

            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Kooperationspartner
                    <br />
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-card-text class="subheading font-weight-light">
                    <p>
                      Universitätskliniken Tübingen, Heidelberg, Ulm, Freiburg
                    </p>
                    Finanzierung <br>Ministerium für Soziales und Integration Baden-Württemberg
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    loginDialog: false,
    username: "",
    password: "",
  }),

  methods: {
    ...mapActions({
      login: "auth/login",
      logout: "auth/logout",
      hasToken: "auth/hasToken",
      admin: "auth/admin",
      documentarist: "auth/documentarist",
      global: "auth/global",
      local: "auth/local",
      mtb: "auth/mtb",
      researcher: "auth/researcher",
    }),

    async submit2() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password,
          },
        });

        this.$axios.setToken(response.data.access_token);

        alert(response.data.access_token);

        alert(JSON.stringify(response));

        this.$router.push("/main/");
      } catch (e) {
        this.error = e.response.data.message;
      }
    },

    async submit() {
      if (this.username !== "" && this.password !== "") {
        let request = {
          username: this.username,
          password: this.password,
        };
        this.login(request)
          .then(() => {
            if (this.$route.query) {
              this.$router.push(this.$route.query);
              let toast = this.$toasted.success("Anmeldung erfolgreich!", {
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
              "Error! ungültiger Benutzername oder Passwort.",
              {
                theme: "bubble",
                icon: "error",
                position: "top-center",
                duration: 3000,
              }
            );
            if (!store.state.authUser) {
              return redirect("/main");
            }
            this.$router.push(`/`);
          });
      }
    },
  },
};
</script>