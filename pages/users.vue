<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> user management</h3>
      <span class="subheading subheading font-weight-thin">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/main')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Admin panel to add, edit and remove users.
        <strong @click="$router.push('help')">Help?</strong>
      </span>
    </v-flex>
    <v-divider class="my-3"></v-divider>

    <v-layout>
      <v-flex d-flex xs12 sm6 md6>
        <v-card
          flat
          v-ripple="{ center: true }"
          @click="editOwnDetails()"
          color="indigo darken-2"
          dark
          left
          max-width="450"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline font-weight-thin">
                {{ me.givenName }} {{ me.familyName }}
              </div>
              Username: <span class="grey--text">{{ me.username }}</span
              ><br />
              Role(s):
              <span class="grey--text">{{ me.roles.join(", ") }}</span>
            </div>
            <div>
              <small class="blue-grey--text">click to edit</small>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="my-3"></v-divider>

    <v-span v-if="isAdmin == 'Admin'">
      <v-card-title class="headline font-weight-light">User List</v-card-title>

      <v-btn
        color="indigo darken-1"
        @click="addNewUserDialog = true"
        small
        dark
        class="mb-2 font-weight-bold"
        v-on="on"
        >Add User</v-btn
      >
      <br /><br />

      <v-data-table :headers="headerUsers" :items="itemsUsers" hide-actions>
        <template slot="items" slot-scope="props">
          <td @click="routeToPatient(props.item.id)">
            {{ props.item.id }}
          </td>
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
    </v-span>

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
                  :counter="20"
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
            >Cancel</v-btn
          >
          <v-btn
            dark
            color="indigo darken-1"
            type="editUserDetails"
            @click="updateOwnDetails"
            :disabled="invalid"
            width="140"
            >Save</v-btn
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
            color="indigo darken-1"
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
            color="indigo darken-1"
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

    addNewUserDialog: false,
    editOwnDetailsDialog: false,
    editUserDetailsDialog: false,
    editUserRolesDialog: false,
    deleteUserDialog: false,
    password: "",
    valid: true,
    value: true,
    isAdmin: false,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Min. 8 characters, incl. one capital letter, one number & one special character."
        );
      },
    },

    roles: [
      "Admin",
      "Documentarist",
      "LocalZPMCoordinator",
      "GlobalZPMCoordinator",
      "MTBCoordinator",
      "Researcher",
    ],

    headerUsers: [
      { text: "User ID", value: "id" },
      { text: "Username", value: "username" },
      { text: "Roles", value: "role" },
      { text: "Surname", value: "family" },
      { text: "Name", value: "given" },
      { text: "Status", value: "status" },
      {
        text: "Details",
        align: "right",
        sortable: false,
        value: "details",
      },
      {
        text: "Roles",
        align: "right",
        sortable: false,
        value: "roles",
      },
      {
        text: "Delete",
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
          password: this.passwordOwn,
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

        let Response = await axios.post(
          process.env.baseUrl + process.env.port + process.env.users,
          request
        );

        this.addNewUser = false;
        window.location.reload(true);
      } catch (err) {
        if (err.response.status === 401) {
          return redirect("/");
        }
      }
    },

    async updateUserDetails({ params, redirect, error }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      try {
        let request = {
          id: this.id,
          username: this.usernameEdit,
          password: this.passwordEdit,
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

      let checkAdmin = whoami.data.roles.filter((item) => item == "Admin");
      
      let users = await axios.get(
        process.env.baseUrl + process.env.port + process.env.users
      );
      
      return {
        itemsUsers: users.data.entries,
        registeredUsers: users.data.total,
        me: whoami.data,
        isAdmin: checkAdmin.toString(),
      };
    } catch (err) {
      if (err.response.status === 401) {
        return redirect("/");
      }
    }
  },
};
</script>