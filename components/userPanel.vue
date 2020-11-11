<template>
  <v-tabs color="transparent" right>
    <v-tab>
      <v-tooltip top>
        <v-icon slot="activator" dark color="primary" @click="userSettings = true">fas fa-user-astronaut</v-icon>
        <v-dialog
          v-model="userSettings"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="blue darken-1">
              <v-btn icon dark @click="userSettings = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings - Max Mustermann</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click="userSettings = false">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
              <v-subheader>User Controls</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict query that can be exported</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Password</v-list-tile-title>
                  <v-list-tile-sub-title>Require password for query or use password to restrict query</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="newsletter"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Newsletter</v-list-tile-title>
                  <v-list-tile-sub-title>Notify me about updates about the bwHealthCloud.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="usage"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Usage Statistics</v-list-tile-title>
                  <v-list-tile-sub-title>I consent, bwHC consortium to use my usage statistics to improve the bwHC portal.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="autosave"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Auto-save queries</v-list-tile-title>
                  <v-list-tile-sub-title>Automatically export queries etc.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-dialog>
        <span>Max Mustermann</span>
      </v-tooltip>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  data: () => ({
    userSettings: false
  })
};
</script>
