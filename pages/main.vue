<template>
  <v-container fluid grid-list-md>
    <userPanel />
    <v-flex>
      <h3 class="display-3">
        <v-btn disabled icon color="blue accent-2" align-end
          ><v-icon style="font-size: 2.5rem" dark>fas fa-cloud</v-icon> </v-btn
        ><strong>bwHealthCloud</strong>
      </h3>
      <v-divider class="my-3"></v-divider>
    </v-flex>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md5>
        <v-card flat>
          <v-card-title primary class="headline font-weight-thin"
            >bwHC Übersicht</v-card-title
          >
          <v-card-text class="subheading font-weight-thin">
            Herzlich Willkommen, <strong>{{ me.givenName }}</strong
            >,<br />
            Sie haben die folgende(n) Rolle(n):
            <strong>{{ me.roles.join(", ") }}</strong>
          </v-card-text>
          <v-card-text class="subheading grey--text font-weight-light">
            <i class="fas fa-user-tag"></i> Bitte überprüfen Sie Ihre Rollen
            unten und werfen Sie einen Blick auf die entsprechenden
            Zugriffsrechte rechts.

            <br /><br />
            <i class="fas fa-user-shield"></i> Falls Sie denken, dass Ihre
            Rollen nicht vollständig sind, nehmen Sie bitte Kontakt mit Ihrem
            lokalen bwHealthCloud Administrator auf.
            <br />
            <br />
            <i class="fas fa-envelope"></i> Falls Sie Fragen oder Anregungen in
            Bezug auf die Bedienung des bwHealthCloud Portals haben, zögern Sie
            bitte nicht, uns zu kontaktieren. Sie können eine E-Mail an
            <a href="mailto:aydin-can.polatkan@uni-tuebingen.de">uns</a>
            senden. <br /><br />
            <i class="fas fa-bug"></i> Falls Sie einen Fehler entdecken,<br />füllen
            Sie bitte das
            <a href="https://forms.gle/w8Z3CnB3zLN6iNMb7" target="_blank"
              >Bug-Report-Formular</a
            >
            aus. <br /><br />
            <i class="far fa-comments"></i> Wir können bwHealthCloud nicht ohne
            Ihr wertvolles Feedback verbessern. Bitte helfen Sie uns, indem Sie
            das folgende
            <a href="https://forms.gle/zb7SPH5WEmSurh376" target="_blank"
              >UI / UX Feedback-Formular</a
            >
            ausfüllen. <br /><br />
            Danke im Voraus.<br /><br />
            - Ihr bwHealthCloud Entwicklungsteam.
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md7>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card flat>
                  <v-card-title class="headline font-weight-light">
                    Funktionen & Rollen
                    <v-icon></v-icon>
                  </v-card-title>
                  <v-expansion-panel popout>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <v-card-text class="subheading font-weight-light">
                          <table>
                            <tr>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-check-double</v-icon
                                    >
                                  </v-btn>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-globe-europe</v-icon
                                    >
                                  </v-btn>
                                  <span
                                    >Lokale Qualitätskontrolle Statistik</span
                                  >
                                </v-tooltip>
                              </td>
                              <td>
                                <v-tooltip top>
                                  <span
                                    >Globale Qualitätskontrolle Statistik</span
                                  >
                                </v-tooltip>
                              </td>
                              <td></td>
                            </tr>
                            <div class="subheading font-weight-light">
                              Qualitätskontroll-Dashboard
                            </div>
                          </table>
                        </v-card-text>
                      </template>
                      <v-card>
                        <v-card-text class="font-weight-light">
                          Beschreibung:
                          <br />Ein umfassendes Dashboard, das sowohl lokale als
                          auch globale Metriken zum Status und den Ergebnissen
                          von Fällen (Patienten) im MTB bietet.<br />
                          <br />Unterfunktionen: <br /><b
                            >Status der Sequenzdaten:</b
                          >
                          Zeigt die Anzahl der Patienten im MTB mit verfügbaren
                          Sequenzdaten an. <br /><b>MTB-Beschluss:</b> Gibt an,
                          wie viele der sequenzierten Patienten an MTB
                          überwiesen wurden. <br /><b>FollowUp:</b> Zeigt an,
                          wie viele Patienten eine follow-up erhalten haben.
                          <br /><b>Sterbedaten:</b> Zeigt die Anzahl der
                          verstorbenen Patienten an.</v-card-text
                        >
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <v-card-text class="subheading font-weight-light">
                          <table>
                            <tr>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-server</v-icon
                                    >
                                  </v-btn>
                                  <span>Datenvalidierung</span>
                                </v-tooltip>
                              </td>
                            </tr>
                            <div class="subheading font-weight-light">
                              Datenvalidierungstool
                            </div>
                          </table>
                        </v-card-text>
                      </template>
                      <v-card>
                        <v-card-text class="font-weight-light">
                          Beschreibung:
                          <br />Unterstützt die Aufrechterhaltung der Qualität
                          und Integrität von Daten, die von lokalen MTB-Systemen
                          nach bwHC importiert werden.<br />
                          <br />Unterfunktionen: <br /><b
                            >Identifizierung von Warnungen und Fehlern:</b
                          >
                          Hebt Abweichungen in den importierten Daten hervor und
                          kategorisiert sie. <br /><b
                            >Vorschläge zur Datenverbesserung:</b
                          >
                          Bietet konkrete Rückmeldungen zur Verbesserung der
                          Datenqualität an der Quelle. <br /><b
                            >Metriken zur Datenintegrität:</b
                          >
                          Zeigt Statistiken über die allgemeine Zuverlässigkeit
                          der importierten Daten an.</v-card-text
                        >
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <v-card-text class="subheading font-weight-light">
                          <table>
                            <tr>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-search</v-icon
                                    >
                                  </v-btn>
                                  <span>Abfrage-Portal</span>
                                </v-tooltip>
                              </td>
                            </tr>
                            <div class="subheading font-weight-light">
                              Abfrageportal
                            </div>
                          </table>
                        </v-card-text>
                      </template>
                      <v-card>
                        <v-card-text class="font-weight-light">
                          Beschreibung:
                          <br />Ermöglicht es Benutzern, detaillierte Suchen
                          nach Fällen anhand verschiedener Parameter
                          durchzuführen und die aggregierten Ergebnisse
                          anzusehen.<br />
                          <br />Unterfunktionen: <br /><b>Abfrageparameter:</b>
                          Suche nach Fällen mit Hilfe von Alterationen (CNV,
                          SNV, Fusions), Diagnosen mit ICD-10 und
                          ICD-O-3-M-Codes, Medikamenten (ATC-Katalog) und
                          Response. <br /><b>Lokale und föderierte Suche:</b>
                          Suche in lokalen Datenbanken oder über föderierte
                          Systeme. <br /><b
                            >Abfragen speichern und wiederverwenden:</b
                          >
                          Benutzer können ihre Suchparameter für die spätere
                          erneute Verwendung speichern.<br />
                          <b>Ergebnisübersichtstabellen:</b> Zeigt aggregierte
                          Ergebnisse wie # von Patienten, # von
                          Molekulardiagnosen, # von Therapieempfehlungen und #
                          von Systemtherapien an. Bietet außerdem Filter und
                          Aufschlüsselungen nach generischen Parametern wie
                          Geschlecht, Alter und Vitalstatus.<br />
                          <b>Detaillierte Fallansicht:</b> Vertiefen Sie sich in
                          Einzelfalldetails, um ein umfassendes Verständnis des
                          Status und der Geschichte jedes Patienten zu
                          erhalten.</v-card-text
                        >
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <v-card-text class="subheading font-weight-light">
                          <table>
                            <tr>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-folder</v-icon
                                    >
                                  </v-btn>
                                  <span>Patientendirektzugriff</span>
                                </v-tooltip>
                              </td>
                            </tr>
                            <div class="subheading font-weight-light">
                              Direkter Zugriff auf die Patientenakte
                            </div>
                          </table>
                        </v-card-text>
                      </template>
                      <v-card>
                        <v-card-text class="font-weight-light">
                          Beschreibung:
                          <br />Ermöglicht den Benutzern einen schnellen Zugriff
                          auf eine detaillierte Patientenakte anhand bekannter
                          Standort- und interner ID-Informationen.<br />
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <v-card-text class="subheading font-weight-light">
                          <table>
                            <tr>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-user-shield</v-icon
                                    >
                                  </v-btn>
                                  <span>Admin-Kontrollpanel</span>
                                </v-tooltip>
                              </td>
                            </tr>
                            <div class="subheading font-weight-light">
                              Admin-Kontrollpanel
                            </div>
                          </table>
                        </v-card-text>
                      </template>
                      <v-card>
                        <v-card-text class="font-weight-light">
                          Beschreibung:
                          <br />Ein zentralisiertes Dashboard zum Verwalten von
                          Verbindungen, Benutzerdaten und Rollen.
                          <br />
                          <br />Unterfunktionen: <br /><b>Verbindungsstatus:</b>
                          Ansicht des Verbindungsstatus verschiedener Standorte.
                          <br /><b>Benutzerverwaltung:</b> Ermöglicht das
                          Erstellen, Modifizieren, Zuweisen von Rollen und
                          Löschen von Benutzern. <br /><b>Rollenverwaltung:</b>
                          Weist Benutzern spezifische Rollen zu und ordnet sie
                          basierend auf ihren Verantwortlichkeiten und
                          Zugriffsanforderungen neu zu.</v-card-text
                        >
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <template v-slot:header>
                        <v-card-text class="subheading font-weight-light">
                          <table>
                            <tr>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-user-tag</v-icon
                                    >
                                  </v-btn>
                                  <span>Rollen</span>
                                </v-tooltip>
                              </td>
                            </tr>
                            <div class="subheading font-weight-light">
                              Rollen
                            </div>
                          </table>
                        </v-card-text>
                      </template>
                      <v-card>
                        <v-card-text class="subheading font-weight-light">
                          <table>
                            <tr>
                              <td>Adminstrator/in</td>
                              <td></td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-user-shield</v-icon
                                    >
                                  </v-btn>
                                  <span>Admin-Panel</span>
                                </v-tooltip>
                              </td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Dokumentar/in</td>
                              <td></td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-server</v-icon
                                    >
                                  </v-btn>
                                  <span>Datenvalidierung</span>
                                </v-tooltip>
                              </td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>ZPM-Koordinator/in (Lokal)</td>
                              <td></td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-check-double</v-icon
                                    >
                                  </v-btn>
                                  <span
                                    >Lokale Qualitätskontrolle Statistik</span
                                  >
                                </v-tooltip>
                              </td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-search</v-icon
                                    >
                                  </v-btn>
                                  <span>Abfrage-Portal</span>
                                </v-tooltip>
                              </td>
                            </tr>
                            <tr>
                              <td>ZPM-Koordinator/in (Global)</td>
                              <td></td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-check-double</v-icon
                                    >
                                  </v-btn>
                                  <span
                                    >Lokale Qualitätskontrolle Statistik</span
                                  >
                                </v-tooltip>
                              </td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-globe-europe</v-icon
                                    >
                                  </v-btn>
                                  <span
                                    >Globale Qualitätskontrolle Statistik</span
                                  >
                                </v-tooltip>
                              </td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-search</v-icon
                                    >
                                  </v-btn>
                                  <span>Abfrage-Portal</span>
                                </v-tooltip>
                              </td>
                            </tr>
                            <tr>
                              <td>MTB-Koordinator/in</td>
                              <td></td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-check-double</v-icon
                                    >
                                  </v-btn>
                                  <span
                                    >Lokale Qualitätskontrolle Statistik</span
                                  >
                                </v-tooltip>
                              </td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>MTB-Mitarbeiter/in</td>
                              <td></td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-search</v-icon
                                    >
                                  </v-btn>
                                  <span>Abfrage-Portal</span>
                                </v-tooltip>
                              </td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Forscher/in</td>
                              <td></td>
                              <td>
                                <v-tooltip top>
                                  <v-btn disabled icon slot="activator">
                                    <v-icon style="font-size: 1.4rem"
                                      >fas fa-search</v-icon
                                    >
                                  </v-btn>
                                  <span>Abfrage-Portal</span>
                                </v-tooltip>
                              </td>
                              <td></td>
                            </tr>
                          </table>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
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
import axios from "axios";
import userPanel from "~/components/userPanel";

export default {
  data: () => ({
    me: "",
    version: process.env.version,
  }),

  components: {
    userPanel,
  },

  async asyncData({ params, redirect, error }) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.token}`;

    try {
      let whoami = await axios.get(
        process.env.baseUrl + process.env.port + process.env.me
      );

      localStorage.setItem("displayAdvancedSearch", false);

      localStorage.removeItem("diagnosis");
      localStorage.removeItem("tumorMorphology");
      localStorage.removeItem("mutatedGenes");
      localStorage.removeItem("selectedDrugs");
      localStorage.removeItem("responses");
      localStorage.removeItem("queryId");

      return {
        me: whoami.data,
      };
    } catch (err) {
      const status = err.response && err.response.status;
      if (status === 401) {
        return redirect(`/`);
      } else if (status === 403) {
        return redirect(`/403`);
      } else if (!status) {
        return redirect(`/undefined`);
      } else {
        return redirect("/" + status);
      }
    }
  },
};
</script>
