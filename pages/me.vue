<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-1"><v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        > Nutzerdetails</h3>
    </v-flex>
    <v-divider class="my-3"></v-divider>

    <div id="me"></div>

    <v-layout>
      <v-layout row wrap>
        <v-flex>
          <v-card dark flat>
            <v-layout row wrap :class="`pa-3`">
              <v-flex xs6 sm4 md2>
                <div class="caption grey--text">
                  <v-icon style="font-size: 1rem" slot="activator" class="mr-1"
                    >fas fa-user</v-icon
                  >
                  <br />Name
                </div>
                <div>{{ me.givenName }} {{ me.familyName }}</div>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="caption grey--text">
                  <v-icon
                    style="font-size: 0.9rem"
                    slot="activator"
                    class="mr-1"
                    >fas fa-calendar-week</v-icon
                  >
                  <br />Benutzername
                </div>
                <div>{{ me.username }}</div>
              </v-flex>

              <v-flex xs6 sm4 md6>
                <div class="caption grey--text">
                  <v-icon
                    style="font-size: 0.9rem"
                    slot="activator"
                    class="mr-1"
                    >fas fa-user-check</v-icon
                  >
                  <br />Rollen
                </div>
                <div>
                  <v-chip
                    flat
                    outline
                    small
                    disabled
                    color="grey darken-1"
                    v-for="role in roles"
                    :key="role"
                  >
                    {{ role }}
                  </v-chip>
                </div>
              </v-flex>
              <v-flex xs6 sm4 md1>
                <div @click="editOwnDetails()" class="caption">
                  <v-icon
                    color="blue"
                    style="font-size: 1.1rem"
                    slot="activator"
                    class="mr-1"
                    @click="editOwnDetails()"
                    >fas fa-user-edit</v-icon
                  ><br>
                  Bearbeiten
                </div>
              </v-flex>

              <v-flex xs6 sm4 md1>
                <div @click="editOwnPassword()" class="caption">
                  <v-icon
                    color="blue"
                    style="font-size: 1.1rem"
                    slot="activator"
                    class="mr-1"
                    @click="editOwnPassword()"
                    >fas fa-key</v-icon
                  ><br />
                  Passwort
                </div>
              </v-flex>
              <v-flex xs6 class="grey--text caption">Klicken Sie auf die blauen Symbole, um Ihre Benutzerdaten und Ihr Passwort zu bearbeiten.</v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>

      <!--
      <v-flex d-flex>
        <v-card light flat left max-width="450">
          <v-card-title primary-title>
            <div>
              <span class="grey--text"></span>
              <div class="headline font-weight-thin">
                {{ me.givenName }} {{ me.familyName }}
              </div>
              Nutzername: <span class="grey--text">{{ me.username }}</span
              ><br />
              Rolle(n):
             <v-chip outline disabled v-for="role in roles" :key="role">
               {{ role }}
             </v-chip>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn dark color="blue accent-2" @click="editOwnDetails()"
              >Edit</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="grey" icon @click="show = !show">
              <v-icon>{{
                show ? "keyboard_arrow_down" : "keyboard_arrow_up"
              }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text class="grey--text" v-show="show">
              Zum Bearbeiten bitte auf das Symbol oben links klicken, dann 'Speichern'.<br />***
              *** Weitere Beschreibungstext kann hier hinzugefügt werden.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
      -->
    </v-layout>
    <v-divider class="my-3"></v-divider>
    <!-- PREPARED QUERIES TABLE -->

    <v-flex d-flex xs12 sm6 md3>
      <v-card
        class="mx-auto"
        flat
        color="teal darken-3"
        dark
        max-width="400"
        v-ripple="{ center: true }"
      >
        <v-card-text class="headline font-weight-thin">
          <v-icon color="teal accent-1" dark>fas fa-save</v-icon>
          <br />
          <strong>{{ savedQueries.length }}</strong> Abfragen
        </v-card-text>
      </v-card>
    </v-flex>
    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">
      Meine vorbereiteten Abfragen<v-flex xs12 sm3 md1>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn flat icon color="grey accent-2" v-bind="attrs" v-on="on">
              <v-icon>fas fa-info-circle</v-icon>
            </v-btn>
          </template>
          <span
            >Hier können Sie Ihre zuvor vorbereiteten Abfragen sehen.<br />
            Wenn Sie einen Parameter als 'undefined' sehen, bedeutet dies, dass
            das entsprechende Feld während der Parametererfassung leer gelassen
            wurde.</span
          >
        </v-tooltip>
      </v-flex>
    </v-card-title>

    <v-data-table
      :headers="headerSavedQueries"
      :items="savedQueries"
      hide-default-header
      hide-default-footer
      no-data-text="Keine Daten verfügbar"
      rows-per-page-text="Zeilen pro Seite"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            {{ props.item.creationDateTime.replace("T", " ").slice(0, 19) }}
          </td>
          <td>{{ props.item.name }}</td>
          <td>
            {{
              props.item.parameters.diagnoses &&
              props.item.parameters.diagnoses.length > 0
                ? props.item.parameters.diagnoses
                    .map(
                      (diagnosis) => `${diagnosis.code} - ${diagnosis.display}`
                    )
                    .join(", ")
                : ""
            }}
            {{
              props.item.parameters.tumorMorphology &&
              props.item.parameters.tumorMorphology.length > 0
                ? props.item.parameters.tumorMorphology
                    .map(
                      (morphology) =>
                        `${morphology.code} - ${morphology.display}`
                    )
                    .join(", ")
                : ""
            }}
          </td>
          <td>
            {{
              props.item.parameters.mutatedGenes &&
              props.item.parameters.mutatedGenes.length > 0
                ? props.item.parameters.mutatedGenes
                    .map((gene) => `${gene.code} - ${gene.display}`)
                    .join(", ")
                : ""
            }}
            {{
              props.item.parameters.simpleVariants &&
              props.item.parameters.simpleVariants.length > 0
                ? props.item.parameters.simpleVariants
                    .map(
                      (simpleVariant) =>
                        `${
                          simpleVariant.gene
                            ? `${simpleVariant.gene.code} - ${simpleVariant.gene.display}`
                            : ""
                        }, ${simpleVariant.dnaChange}, ${
                          simpleVariant.aminoAcidChange
                        }`
                    )
                    .join(", ")
                : ""
            }}
            {{
              props.item.parameters.copyNumberVariants &&
              props.item.parameters.copyNumberVariants.length > 0
                ? props.item.parameters.copyNumberVariants
                    .map(
                      (copyNumberVariant) =>
                        `${
                          copyNumberVariant.genes
                            ? copyNumberVariant.genes
                                .map((gene) => `${gene.code} - ${gene.display}`)
                                .join(", ")
                            : ""
                        }, ${copyNumberVariant.type}, ${
                          copyNumberVariant.copyNumber
                            ? `${copyNumberVariant.copyNumber.min}-${copyNumberVariant.copyNumber.max}`
                            : ""
                        }`
                    )
                    .join(", ")
                : ""
            }}
            {{
              props.item.parameters.dnaFusions &&
              props.item.parameters.dnaFusions.length > 0
                ? props.item.parameters.dnaFusions.join(", ")
                : ""
            }}
            {{
              props.item.parameters.rnaFusions &&
              props.item.parameters.rnaFusions.length > 0
                ? props.item.parameters.rnaFusions.join(", ")
                : ""
            }}
          </td>
          <td>
            {{
              props.item.parameters.medicationsWithUsage &&
              props.item.parameters.medicationsWithUsage.length > 0
                ? props.item.parameters.medicationsWithUsage
                    .map(
                      (medication) =>
                        medication.medication.display +
                        " · " +
                        medication.medication.code +
                        " · " +
                        medication.medication.version
                    )
                    .join(", ")
                : ""
            }}
          </td>
          <td>
            {{
              props.item.parameters.responses &&
              props.item.parameters.responses.length > 0
                ? props.item.parameters.responses
                    .map((response) => `${response.code} - ${response.display}`)
                    .join(", ")
                : ""
            }}
          </td>
          <td class="text-xs-right">
            <v-icon small class="mr-2" @click="deleteQuery(props.item)"
              >fas fa-trash</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-btn small icon @click="$vuetify.goTo('#me', options)" flat color="grey">
      <v-icon style="font-size: 1.2rem">fas fa-arrow-alt-circle-up</v-icon>
    </v-btn>

    <v-divider class="my-3"></v-divider>

    <v-dialog v-model="editOwnDetailsDialog" width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Details bearbeiten</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm12 md12>
                <v-text-field
                  v-model="usernameOwn"
                  :error-messages="errors"
                  label="Nutzername"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex d-flex xs12 sm12 md12>
                <v-text-field
                  v-model="givenOwn"
                  :error-messages="errors"
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex d-flex xs12 sm12 md12>
                <v-text-field
                  v-model="familyOwn"
                  :error-messages="errors"
                  label="Nachname"
                  required
                ></v-text-field>
              </v-flex>

              <!-- <v-flex d-flex xs12 sm12 md12>
                <v-text-field
                  autocomplete="current-password"
                  :value="passwordEdit"
                  label="Password"
                  :append-icon="value ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :rules="[currentRules.password]"
                  @input="(_) => (password = _)"
                ></v-text-field>
              </v-flex>-->
            </v-layout>
          </form>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            type="editUserDetails"
            :disabled="invalid"
            flat
            @click="editOwnDetailsDialog = false"
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="editUserDetails"
            @click="updateOwnDetails"
            :disabled="invalid"
            width="140"
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editOwnPasswordDialog" width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Passwort bearbeiten</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md12>
                <v-text-field
                  autocomplete="current-password"
                  v-model="oldPasswordOwn"
                  :value="oldPasswordOwn"
                  label="Altes Passwort"
                  :append-icon="value ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :rules="[oldRules.password]"
                  @input="(_) => (password = _)"
                ></v-text-field>
              </v-flex>

              <v-flex d-flex xs12 sm6 md12>
                <v-text-field
                  autocomplete="current-password"
                  v-model="passwordOwn"
                  :value="passwordOwn"
                  label="Neues Passwort"
                  :append-icon="value ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :rules="[rules.password]"
                  @input="(_) => (password = _)"
                ></v-text-field>
              </v-flex>

              <v-flex d-flex xs12 sm6 md12>
                <v-text-field
                  autocomplete="current-password"
                  v-model="passwordOwnAgain"
                  :value="passwordOwnAgain"
                  label="Neues Passwort bestätigen"
                  :append-icon="value ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :rules="[rules.password]"
                  @input="(_) => (password = _)"
                ></v-text-field>
              </v-flex>

              <v-card-text class="grey--text">
                Das Passwort muss mind. 8 Zeichen haben, davon mind. ein
                Großbuchstabe, eine Ziffer und ein Sonderzeichen (!?._,@#$%^&*).
              </v-card-text>
            </v-layout>
          </form>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            type="editUserPassword"
            :disabled="invalid"
            flat
            @click="editOwnPasswordDialog = false"
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="editUserPassword"
            @click="updateOwnPassword"
            :disabled="invalid"
            width="140"
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbarNotMatched" :color="'red'" top :timeout="5000">
      Die neuen Passwörter stimmen nicht überein!
    </v-snackbar>

    <v-snackbar v-model="snackbarEmpty" :color="'red'" top :timeout="5000">
      Füllen Sie bitte alle Passwortfelder aus!
    </v-snackbar>

    <v-snackbar
      v-model="snackbarWrongPassword"
      :color="'red'"
      top
      :timeout="5000"
    >
      Ungültiges aktuelles oder neues Passwort! Bitte versuchen Sie es erneut.
    </v-snackbar>

    <v-dialog v-model="deleteQueryDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Abfrage Löschen</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md12>
                <v-card-text class="font-weight-medium">
                  <p class="font-weight-black">
                    Ein Klick auf „Löschen“ wird dieses Abfrage löschen.
                  </p>
                  <p>Sind Sie wirklich sicher?</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            type="deleteQueryDialog"
            :disabled="invalid"
            flat
            @click="deleteQueryDialog = false"
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="red darken-1"
            type="deleteQueryDialog"
            @click="wipeQuery"
            :disabled="invalid"
            width="140"
            >Löschen</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { dirname } from "path";

import userPanel from "~/components/userPanel";

let seen = true;

export default {
  //middleware: 'bwhc-admin',
  data: () => ({
    show: false,
    editOwnDetailsDialog: false,
    editOwnPasswordDialog: false,
    deleteQueryDialog: false,
    passwordsMatch: true,
    password: "",
    snackbarNotMatched: false,
    snackbarEmpty: false,
    snackbarWrongPassword: false,
    valid: true,
    value: true,
    currentRules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?.-_,@#\$%\^&\*?])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Das Passwort muss mind. 8 Zeichen haben, davon mind. ein Großbuchstabe, eine Ziffer und ein Sonderzeichen (!?._,@#$%^&*)"
        );
      },
    },
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?.-_,@#\$%\^&\*?])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Das neue Passwort muss mind. 8 Zeichen haben, davon mind. ein Großbuchstabe, eine Ziffer und ein Sonderzeichen (!?._,@#$%^&*)"
        );
      },
    },
    oldRules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?.-_,@#\$%\^&\*?])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Das alte Passwort muss mind. 8 Zeichen haben, davon mind. ein Großbuchstabe, eine Ziffer und ein Sonderzeichen (!?._,@#$%^&*)"
        );
      },
    },

    headerSavedQueries: [
      { text: "Zeitstempel", value: "id" },
      //{ text: "Avatar", value: "avatar" },
      { text: "Name", value: "name" },
      { text: "Diagnoses", sortable: false, value: "parameters" },
      { text: "Alterationen", sortable: false, value: "parameters" },
      { text: "Wirkstoffe", sortable: false, value: "parameters" },
      { text: "Response", sortable: false, value: "parameters" },

      {
        text: "Löschen",
        align: "right",
        sortable: false,
        value: "delete",
      },
    ],
  }),

  components: {
    userPanel,
  },

  methods: {
    handleError(error) {
      if (error && error.response) {
        const statusCode = error.response.status;
        if (statusCode === 400) {
          this.$router.push("/400");
        } else if (statusCode === 401) {
          this.$router.push("/401");
        } else if (statusCode === 403) {
          this.$router.push("/403");
        } else if (statusCode === 404) {
          this.$router.push("/404");
        } else if (statusCode === 422) {
          this.snackbarWrongPassword = true;
          return;
        } else if (statusCode === 500) {
          this.$router.push("/500");
        } else if (statusCode === 503) {
          this.$router.push("/503");
        } else {
          console.error("Ein Fehler ist aufgetreten: ", error);
          this.$router.push("/undefined");
        }
      } else if (error) {
        console.error("Ein Fehler ist aufgetreten:", error);
        alert(
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
        );
      } else {
        this.$router.push("/undefined");
      }
    },

    async updateOwnPassword({ params, redirect, error }) {
      if (
        this.oldPasswordOwn == undefined ||
        this.passwordOwn == undefined ||
        this.passwordOwnAgain == undefined ||
        this.oldPasswordOwn.trim() === "" ||
        this.passwordOwn.trim() === "" ||
        this.passwordOwnAgain.trim() === ""
      ) {
        this.snackbarEmpty = true;
        return;
      }

      if (this.passwordOwn === this.passwordOwnAgain) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;

        let oldPass = null;
        let newPass = null;
        let newPassAgain = null;

        if (this.oldPasswordOwn) {
          oldPass = this.oldPasswordOwn;
        }
        if (this.passwordOwn) {
          newPass = this.passwordOwn;
        }
        if (this.passwordOwnAgain) {
          newPassAgain = this.passwordOwnAgain;
        }

        try {
          let request = {
            id: this.id,
            username: this.usernameOwn,
            currentPassword: oldPass,
            newPassword1: newPass,
            newPassword2: newPassAgain,
          };

          let Response = await axios.put(
            process.env.baseUrl +
              process.env.port +
              process.env.users +
              "/" +
              this.id +
              "/change-password",
            request
          );

          this.editOwnPasswordDialog = false;
          window.location.reload(true);
        } catch (error) {
          this.handleError(error);
        }
      } else {
        this.snackbarNotMatched = true;
        return;
      }
    },

    async updateOwnDetails({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      let pass = null;
      if (this.password) {
        pass = this.password;
      }

      try {
        let request = {
          id: this.id,
          username: this.usernameOwn,
          password: pass,
          givenName: this.givenOwn,
          familyName: this.familyOwn,
        };

        let Response = await axios.put(
          process.env.baseUrl +
            process.env.port +
            process.env.users +
            "/" +
            this.id,
          request
        );

        this.editOwnDetailsDialog = false;
        window.location.reload(true);
      } catch (error) {
        this.handleError(error);
      }
    },

    editOwnDetails() {
      this.id = this.me.id;
      this.usernameOwn = this.me.username;
      this.givenOwn = this.me.givenName;
      this.familyOwn = this.me.familyName;

      this.editOwnDetailsDialog = true;

      setTimeout(() => {
        this.editOwnDetailsDialog = false;
        this.id = "";
        this.usernameOwn = "";
        this.givenOwn = "";
        this.familyOwn = "";
      }, 30000);
    },

    editOwnPassword() {
      this.id = this.me.id;
      this.editOwnPasswordDialog = true;

      setTimeout(() => {
        this.editOwnPasswordDialog = false;
        this.id = "";
        this.oldPasswordOwn = "";
        this.passwordOwn = "";
        this.passwordOwnAgain = "";
        this.editOwnPasswordDialog = false;
      }, 60000);
    },

    deleteQuery(item) {
      this.id = item.id;
      this.deleteQueryDialog = true;

      setTimeout(() => {
        this.deleteQueryDialog = false;

        this.id = "";
      }, 20000);
    },

    async wipeQuery({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let request = {
          id: this.id,
        };

        await axios.delete(
          process.env.baseUrl +
            process.env.port +
            process.env.preparedQueries +
            "/" +
            this.id
        );

        this.deleteUserDialog = false;
        window.location.reload(true);
      } catch (error) {
        this.handleError(error);
      }
    },
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let whoami = await axios.get(
        process.env.baseUrl + process.env.port + process.env.me
      );

      let getSavedQueries = await axios.get(
        process.env.baseUrl + process.env.port + process.env.preparedQueries
      );

      return {
        savedQueries: getSavedQueries.data.entries,
        me: whoami.data,
        roles: whoami.data.roles,
      };
    } catch (error) {
      this.handleError(error);
    }
  },
};
</script>
