<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> Nutzerdetails</h3>
      <span class="subheading subheading font-weight-thin">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Benutzerdetails. Klicken Sie auf das unten stehende Feld Ihre
        Benutzerdaten und Passwort zu bearbeiten.
        <strong @click="$router.push('help')">Hilfe?</strong>
      </span>
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
                  Name
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
                  Benutzername
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
                  Rollen
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
              <v-flex xs6 sm4 md2>
                <div @click="editOwnDetails()" class="caption">
                  <v-icon
                    color="blue"
                    style="font-size: 1.1rem"
                    slot="activator"
                    class="mr-1"
                    @click="editOwnDetails()"
                    >fas fa-user-edit</v-icon
                  >
                  Bearbeiten
                  <v-slide-y-transition>
                    <v-card-text class="caption grey--text" v-show="show">
                      Zum Bearbeiten bitte auf das Symbol oben links klicken,
                      dann 'Speichern'.<br />
                      Das Passwort muss mind. 8 Zeichen haben, davon mind. ein
                      Großbuchstabe, eine Ziffer und ein Sonderzeichen
                    </v-card-text>
                  </v-slide-y-transition>
                </div>

                <div class="caption">
                  <v-btn flat color="grey" icon @click="show = !show">
                    <v-icon>{{
                      show ? "keyboard_arrow_up" : "keyboard_arrow_down"
                    }}</v-icon>
                  </v-btn>
                </div>
              </v-flex>
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
    <!-- SAVED QUERIES TABLE -->

    <v-divider class="my-3"></v-divider>
    <v-card-title class="headline font-weight-light">
      Meine gespeicherten Abfragen
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

          <td>{{ props.item.creationDateTime.replace("T", " ").slice(0, 19) }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.parameters.diagnoses && props.item.parameters.diagnoses.length > 0 ? props.item.parameters.diagnoses.map(diagnosis => `${diagnosis.code} - ${diagnosis.display}`).join(", ") : '' }}
          {{ props.item.parameters.tumorMorphology && props.item.parameters.tumorMorphology.length > 0 ? props.item.parameters.tumorMorphology.map(morphology => `${morphology.code} - ${morphology.display}`).join(", ") : '' }}</td>
          <td>{{ props.item.parameters.mutatedGenes && props.item.parameters.mutatedGenes.length > 0 ? props.item.parameters.mutatedGenes.map(gene => `${gene.code} - ${gene.display}`).join(", ") : '' }}
            {{ props.item.parameters.simpleVariants && props.item.parameters.simpleVariants.length > 0 ? props.item.parameters.simpleVariants.join(", ") : '' }}
            {{ props.item.parameters.copyNumberVariants && props.item.parameters.copyNumberVariants.length > 0 ? 'Available' : '' }}
            {{ props.item.parameters.dnaFusions && props.item.parameters.dnaFusions.length > 0 ? props.item.parameters.dnaFusions.join(", ") : '' }}
            {{ props.item.parameters.rnaFusions && props.item.parameters.rnaFusions.length > 0 ? props.item.parameters.rnaFusions.join(", ") : '' }}
          </td>
            <td>{{ props.item.parameters.medicationsWithUsage && props.item.parameters.medicationsWithUsage.length > 0 ? props.item.parameters.medicationsWithUsage.map(medication => medication.medication.display).join(", ") : '' }}</td>
            <td>{{ props.item.parameters.responses && props.item.parameters.responses.length > 0 ? props.item.parameters.responses.map(response => `${response.code} - ${response.display}`).join(", ") : '' }}</td>
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

    <v-dialog v-model="editOwnDetailsDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Details bearbeiten</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="usernameOwn"
                  :error-messages="errors"
                  label="Nutzername"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  autocomplete="current-password"
                  :value="passwordOwn"
                  label="Passwort"
                  :append-icon="value ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :rules="[rules.password]"
                  @input="(_) => (password = _)"
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="givenOwn"
                  :error-messages="errors"
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="familyOwn"
                  :error-messages="errors"
                  label="Nachname"
                  required
                ></v-text-field>
              </v-flex>
              <v-card-text class="grey--text">
                Das Passwort muss mind. 8 Zeichen haben, davon mind. ein
                Großbuchstabe, eine Ziffer und ein Sonderzeichen
              </v-card-text>
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

    <v-dialog v-model="addNewUserDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Add New User</strong></v-card-title
        >
        <v-container grid-list-md>
          <form @submit.prevent="addNewUser">
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="username"
                  :error-messages="errors"
                  label="Username"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  autocomplete="current-password"
                  :value="password"
                  label="Password"
                  :append-icon="value ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :rules="[rules.password]"
                  @input="(_) => (password = _)"
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="given"
                  :error-messages="errors"
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="family"
                  :error-messages="errors"
                  label="Surname"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md12>
                <v-select
                  v-model="select"
                  :items="roles"
                  :error-messages="errors"
                  chips
                  deletable-chips
                  multiple
                  label="Role"
                  data-vv-name="select"
                  required
                ></v-select>
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
            @click="addNewUserDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            dark
            color="indigo darken-1"
            type="addNewUser"
            @click="addNewUser"
            :disabled="invalid"
            width="140"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editUserDetailsDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Edit User Details</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="usernameEdit"
                  :counter="20"
                  :error-messages="errors"
                  label="Username"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  autocomplete="current-password"
                  :value="passwordEdit"
                  label="Password"
                  :append-icon="value ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  :rules="[rules.password]"
                  @input="(_) => (password = _)"
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="givenEdit"
                  :counter="10"
                  :error-messages="errors"
                  label="Name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="familyEdit"
                  :error-messages="errors"
                  label="Surname"
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
            type="editUserDetails"
            :disabled="invalid"
            flat
            @click="editUserDetailsDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="editUserDetails"
            @click="updateUserDetails"
            :disabled="invalid"
            width="140"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteUserDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Delete User</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md12>
                <v-card-text class="font-weight-medium">
                  <v-icon>fas fa-exclamation-triangle</v-icon>
                  Warning!<br /><br />
                  <p class="font-weight-black">
                    Clicking "Delete" will deactivate this account.
                  </p>
                  <p>Are you really sure?</p>
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
            type="editUserDetails"
            :disabled="invalid"
            flat
            @click="deleteUserDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            dark
            color="red darken-1"
            type="editUserDetails"
            @click="wipeUser"
            :disabled="invalid"
            width="140"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editUserRolesDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Edit User Roles</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md12>
                <v-select
                  v-model="selectEdit"
                  :items="roles"
                  :error-messages="errors"
                  chips
                  deletable-chips
                  multiple
                  label="Role"
                  data-vv-name="select"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            type="editUserRoles"
            :disabled="invalid"
            flat
            @click="editUserRolesDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="editUserRoles"
            @click="updateUserRoles"
            :disabled="invalid"
            width="140"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

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
    addNewUserDialog: false,
    editOwnDetailsDialog: false,
    editUserDetailsDialog: false,
    editUserRolesDialog: false,
    deleteQueryDialog: false,
    password: "",
    valid: true,
    value: true,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Das Passwort muss mind. 8 Zeichen haben, davon mind. ein Großbuchstabe, eine Ziffer und ein Sonderzeichen"
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
      } catch (err) {
        if (err.response.status === 401) {
          return redirect("/");
        }
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
      }, 15000);
    },

    deleteQuery(item) {
      this.id = item.id;
      this.deleteQueryDialog = true;

      setTimeout(() => {
        this.deleteQueryDialog = false;

        this.id = "";
      }, 15000);
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
      } catch (err) {
        if (err.response.status === 401) {
          return redirect("/");
        }
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
    } catch (err) {
      if (err.response.status === 401) {
        return redirect("/");
      } else if (err.response.status === 403) {
        return redirect("/403");
      } else {
        return redirect("/" + err.response.status);
      }
    }
  },
};
</script>
