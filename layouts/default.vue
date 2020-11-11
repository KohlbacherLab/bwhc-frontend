 <template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list v-if="hasToken">
        <v-list-tile v-for="(item, i) in itemsLoggedIn" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
       <v-list v-else>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline" v-text="title" />
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

    <v-footer height="auto" color="primary lighten-1">
      <v-layout justify-center row wrap>
        <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
          &copy; 2020 —
          <strong>bwHealthCloud</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: "fas fa-cloud",
          title: "bwHC Project",
          to: "/"
        }
      ],
      itemsLoggedIn: [
        {
          icon: "fas fa-check-double",
          title: "Quality Control",
          to: "/quality"
        },
        {
          icon: "fas fa-server",
          title: "Data Validation",
          to: "/validate"
        },
        {
          icon: "fas fa-search",
          title: "Query Portal",
          to: "/query"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: true,
      title: 'bwHealthCloud',
      gender: [],
      age: [25, 65],
      vitalStatus: [],
      therapyDuration: [6, 60],
      evidenceLevel: [],
      icons: ["fab fa-twitter", "fab fa-linkedin"]
    };
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      token: "auth/secret",
      user: "auth/user",
      hasToken: "auth/hasToken"
    })
  },
  methods: {
    async filterQuery() {
      //alert(JSON.stringify(this.queryGenes));
      let request = {
        gender: this.gender,
        age: this.age,
        vitalStatus: this.vitalStatus,
        therapyDuration : this.therapyDuration,
      };

      alert(JSON.stringify(request));
      let Response = await axios.post(
        `http://localhost:6060/bwhc/mtb/query`,
        request
      );
      alert(JSON.stringify(Response.data));
    }
  }
};
</script>
