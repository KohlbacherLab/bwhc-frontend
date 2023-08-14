<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> Admin-Panel</h3>
      <span class="subheading subheading font-weight-thin">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Admin-Panel: Hinzufügen, Bearbeiten und Entfernen von Benutzern.
        <strong @click="$router.push('help')">Hilfe?</strong>
      </span>
    </v-flex>

    <v-divider class="my-3"></v-divider>

    <v-card-title class="headline font-weight-light"
      >bwHC-Knoten · Verbindungsstatus</v-card-title
    >
    <div class="peers">
      <v-layout row wrap>
        <v-flex v-for="peer in peers" :key="peer.site">
          <v-card flat class="text-xs-center ma-0">
            <v-responsive class="pt-4">
              <v-avatar size="70" class="grey lighten-2">
                <div v-if="peer.status == 'Online'">
                  <v-icon style="font-size: 2.5rem" color="green accent-4"
                    >fas fa-satellite-dish</v-icon
                  >
                </div>
                <div v-else>
                  <v-icon style="font-size: 2.5rem" color="red accent-4"
                    >fas fa-satellite-dish</v-icon
                  >
                </div>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ peer.site }}</div>
              <div color="grey" class="grey--text">{{ peer.status }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <v-divider class="my-3"></v-divider>

    <v-card-title class="headline font-weight-light"
      >Benutzerverwaltung</v-card-title
    >

    <v-card-text
      v-if="registeredUsers == 0"
      class="subheading grey--text font-weight-light"
    >
      <i class="fas fa-exclamation-triangle"></i> Bitte stellen Sie sicher,
      logout <i class="fas fa-sign-out-alt"></i> direkt nach den ersten Benutzer
      hinzufügen! Aktuelle registrierte Benutzeranzahl ist
      {{ registeredUsers }}.
      <i class="fas fa-exclamation-triangle"></i>
    </v-card-text>

    <v-btn color="blue accent-2" @click="addNewUserDialog = true" dark v-on="on"
      >Nutzer hinzufügen</v-btn
    >
    <br /><br />

    <v-data-table :headers="headerUsers" :items="itemsUsers" hide-actions>
      <template slot="items" slot-scope="props">
        <td>
          {{ props.item.id }}
        </td>
        <!--
        <td>
          <v-avatar size="30" class="grey lighten-2">
            <v-icon style="font-size: 1rem">fas fa-user</v-icon>
          </v-avatar>
        </td>
        -->
        <td>
          {{ props.item.username }}
        </td>
        <td>
          {{ props.item.roles.join(", ") }}
        </td>
        <td>
          {{ props.item.familyName }}
        </td>
        <td>
          {{ props.item.givenName }}
        </td>
        <td>
          {{ props.item.status }}
        </td>
        <td class="text-xs-right">
          <v-icon small class="mr-2" @click="editUserDetails(props.item)"
            >fas fa-user-edit</v-icon
          >
        </td>
        <td class="text-xs-right">
          <v-icon small class="mr-2" @click="editUserRoles(props.item)"
            >fas fa-user-lock</v-icon
          >
        </td>
        <td class="text-xs-right">
          <v-icon small class="mr-2" @click="deleteUser(props.item)"
            >fas fa-user-slash</v-icon
          >
        </td>
      </template>
    </v-data-table>

    <v-divider class="my-3"></v-divider>

    <v-flex d-flex>
                <v-card flat>
                  <v-card-text class="subheading grey--text font-weight-light">
                    Frontend {{version}}<br>
                  </v-card-text>
                </v-card>
              </v-flex>

    <v-dialog v-model="editOwnDetailsDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Edit Details</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="usernameOwn"
                  :error-messages="errors"
                  label="Username"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  autocomplete="current-password"
                  :value="passwordOwn"
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
          <strong>Neue/n Nutzer/in anlegen</strong></v-card-title
        >
        <v-container grid-list-md>
          <form @submit.prevent="addNewUser">
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="username"
                  :error-messages="errors"
                  label="Nutzername"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  autocomplete="current-password"
                  :value="password"
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
                  v-model="given"
                  :error-messages="errors"
                  label="Vorname"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="family"
                  :error-messages="errors"
                  label="Nachname"
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
                  item-text="display"
                  item-value="code"
                  chips
                  deletable-chips
                  multiple
                  label="Rolle"
                  data-vv-name="select"
                  required
                ></v-select>
              </v-flex>
              <v-card-text class="grey--text">
                Mindest. 8 Zeichen, inkl. ein Großbuchstabe, eine Zahl und ein
                Sonderzeichen.
              </v-card-text>
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
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="addNewUser"
            @click="addNewUser"
            :disabled="invalid"
            width="140"
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editUserRolesDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Nutzer/in Rolle Bearbeiten</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md12>
                <v-select
                  v-model="selectEdit"
                  :items="roles"
                  item-text="display"
                  item-value="code"
                  :error-messages="errors"
                  chips
                  deletable-chips
                  multiple
                  label="Rolle"
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
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="editUserRoles"
            @click="updateUserRoles"
            :disabled="invalid"
            width="140"
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editUserDetailsDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Nutzer/in Details Bearbeiten</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="usernameEdit"
                  :error-messages="errors"
                  label="Nutzername"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  autocomplete="current-password"
                  :value="passwordEdit"
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
                  v-model="givenEdit"
                  :error-messages="errors"
                  label="Vorname"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex d-flex xs12 sm6 md6>
                <v-text-field
                  v-model="familyEdit"
                  :error-messages="errors"
                  label="Nachname"
                  required
                ></v-text-field>
              </v-flex>
              <v-card-text class="grey--text">
                Mindest. 8 Zeichen, inkl. ein Großbuchstabe, eine Zahl und ein
                Sonderzeichen.
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
            @click="editUserDetailsDialog = false"
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="blue accent-2"
            type="editUserDetails"
            @click="updateUserDetails"
            :disabled="invalid"
            width="140"
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteUserDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          <strong>Nutzer/in Löschen</strong></v-card-title
        >
        <v-container grid-list-md>
          <form>
            <v-layout wrap>
              <v-flex d-flex xs12 sm6 md12>
                <v-card-text class="font-weight-medium">
                  <v-icon>fas fa-exclamation-triangle</v-icon>
                  Achtung!<br /><br />
                  <p class="font-weight-black">
                    Ein Klick auf „Löschen“ wird dieses Nutzer/in deaktivieren.
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
            type="editUserDetails"
            :disabled="invalid"
            flat
            @click="deleteUserDialog = false"
            >Abbrechen</v-btn
          >
          <v-btn
            dark
            color="red darken-1"
            type="editUserDetails"
            @click="wipeUser"
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
    addNewUserDialog: false,
    editOwnDetailsDialog: false,
    editUserDetailsDialog: false,
    editUserRolesDialog: false,
    deleteUserDialog: false,
    password: "",
    valid: true,
    value: true,
    version: process.env.version,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?._,@#\$%\^&\*?])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Mindest. 8 Zeichen, inkl. ein Großbuchstabe, eine Zahl und ein Sonderzeichen."
        );
      },
    },

    headerUsers: [
      { text: "Benutzeridentifikation", value: "id" },
      //{ text: "Avatar", value: "avatar" },
      { text: "Nutzername", value: "username" },
      { text: "Rollen", value: "role" },
      { text: "Nachname", value: "family" },
      { text: "Vorname", value: "given" },
      { text: "Status", value: "status" },
      {
        text: "Details",
        align: "right",
        sortable: false,
        value: "details",
      },
      {
        text: "Rollen",
        align: "right",
        sortable: false,
        value: "roles",
      },
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

      try {
        let request = {
          id: this.id,
          username: this.usernameOwn,
          password: this.password,
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
        if (response.status === 401) {
          return redirect("/");
        }
      }
    },

    async addNewUser({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let request = {
          username: this.username,
          password: this.password,
          givenName: this.given,
          familyName: this.family,
          roles: this.select,
        };

        let response = await axios.post(
          process.env.baseUrl + process.env.port + process.env.users,
          request
        );

        this.addNewUser = false;
        window.location.reload();
      } catch (err) {
        if (response.status === 404) {
          return redirect("/");
        }
      }
    },

    async updateUserDetails({ params, redirect, error }) {
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
          username: this.usernameEdit,
          password: pass,
          givenName: this.givenEdit,
          familyName: this.familyEdit,
        };

        let Response = await axios.put(
          process.env.baseUrl +
            process.env.port +
            process.env.users +
            "/" +
            this.id,
          request
        );

        this.editUserDetailsDialog = false;
        window.location.reload(true);
      } catch (err) {
        if (err.response.status === 401) {
          return redirect("/");
        }
      }
    },

    async updateUserRoles({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let request = {
          id: this.id,
          roles: this.selectEdit,
        };

        let Response = await axios.put(
          process.env.baseUrl +
            process.env.port +
            process.env.users +
            "/" +
            this.id +
            "/roles",
          request
        );

        this.editUserRolesDialog = false;
        window.location.reload(true);
      } catch (err) {
        if (err.response.status === 401) {
          return redirect("/");
        }
      }
    },

    async wipeUser({ params, redirect, error }) {
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
            process.env.users +
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

    editUserDetails(item) {
      this.id = item.id;
      this.usernameEdit = item.username;
      this.givenEdit = item.givenName;
      this.familyEdit = item.familyName;

      this.editUserDetailsDialog = true;
      this.addNewUser = false;

      setTimeout(() => {
        this.editUserDetailsDialog = false;
        this.addNewUser = true;

        this.id = "";
        this.usernameEdit = "";
        this.givenEdit = "";
        this.familyEdit = "";
      }, 15000);
    },

    editUserRoles(item) {
      this.id = item.id;
      this.selectEdit = item.roles;

      this.editUserRolesDialog = true;
      this.addNewUser = false;

      setTimeout(() => {
        this.editUserRolesDialog = false;
        this.addNewUser = true;

        this.id = "";
        this.selectEdit = "";
      }, 15000);
    },

    deleteUser(item) {
      this.id = item.id;

      this.deleteUserDialog = true;

      setTimeout(() => {
        this.deleteUserDialog = false;

        this.id = "";
      }, 15000);
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

      let users = await axios.get(
        process.env.baseUrl + process.env.port + process.env.users
      );
      

      let peerStatusReport = await axios.get(
        process.env.baseUrl + process.env.port + process.env.peerStatusReport
      );

      let roles = await axios.get(
          process.env.baseUrl + process.env.port + "/bwhc/catalogs/api/ValueSet?name=nutzer-rollen"
        );

      return {
        itemsUsers: users.data.entries,
        registeredUsers: users.data.total,
        me: whoami.data,
        peers: peerStatusReport.data.peerStatus,
        roles: roles.data.concepts,
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