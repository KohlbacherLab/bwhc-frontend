 <template>
  <v-app light>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer height="auto" color="primary lighten-1">
      <v-layout justify-center row wrap>
        <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
          &copy; {{ new Date().getFullYear() }} —
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
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: true,
      title: "bwHealthCloud",
    };
  },

  components: {
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      token: "auth/secret",
      user: "auth/user",
      hasToken: "auth/hasToken",
    }),
  },
};
</script>
