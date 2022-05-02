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

    <v-layout>
      <v-layout row wrap>
        <v-flex>
          <v-card flat class="text-xs-center ma-2">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <v-icon style="font-size: 2.5rem">fas fa-user</v-icon>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">
                {{ me.givenName }} {{ me.familyName }}
              </div>
              <span class="grey--text">·<br />Nutzername:</span>
              <div class="subheading">{{ me.username }}</div>
            </v-card-text>
            <span class="grey--text">Rolle(n):</span>
            <v-chip
              outline
              disabled
              color="grey darken-1"
              v-for="role in roles"
              :key="role"
            >
              {{ role }}
            </v-chip>

            <v-card-actions class="text-xs-center ma-5">
              <v-btn
                dark
                flat
                color="blue accent-2"
                icon
                large
                @click="editOwnDetails()"
              >
                <v-icon>fas fa-user-edit</v-icon></v-btn
              >
              <v-spacer></v-spacer>
              <v-btn flat color="grey" icon @click="show = !show">
                <v-icon>{{
                  show ? "keyboard_arrow_down" : "keyboard_arrow_up"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text class="grey--text" v-show="show">
                Zum Bearbeiten bitte auf das Symbol oben links klicken, dann
                'Speichern'.<br />
                Das Passwort muss mind. 8 Zeichen haben, davon mind. ein
                Großbuchstabe, eine Ziffer und ein Sonderzeichen
                <br />
                *** Weitere Beschreibungstext kann hier hinzugefügt werden. ***
              </v-card-text>
            </v-slide-y-transition>
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
                  :counter="20"
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
                  :counter="10"
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
                  :counter="20"
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
                  :counter="10"
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
    deleteUserDialog: false,
    password: "",
    valid: true,
    value: true,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Das Passwort muss mind. 8 Zeichen haben, davon mind. ein Großbuchstabe, eine Ziffer und ein Sonderzeichen"
        );
      },
    },
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
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let whoami = await axios.get(
        process.env.baseUrl + process.env.port + process.env.me
      );

      return {
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
