<template>
  <v-container fluid grid-list-md>
    <v-flex>
      <h3 class="display-3"><strong>bwHealthCloud</strong> nicht gefunden</h3>
      <span class="subheading subheading font-weight-thin">
        <v-btn
          dark
          icon
          color="blue accent-2"
          align-end
          @click="$router.push('/')"
        >
          <v-icon dark>fas fa-arrow-left</v-icon> </v-btn
        >Sie scheinen sich veerirrt zu haben.
        <strong @click="$router.push('/')">Zurück!</strong>
      </span>
    </v-flex>
    <v-divider class="my-3"></v-divider>

    <v-flex d-flex xs12 sm6 md3>
      <v-card
        class="mx-auto"
        flat
        color="grey lighten-3"
        light
        max-width="400"
        v-ripple="{ center: true }"
      >
        <v-card-text class="headline font-weight-thin">
          <p>🤷🏻‍♂️</p>
          <strong>{{ this.$route.path.slice(1) }}</strong> 

          <div v-if="this.$route.path.slice(1) == 400">
            Ungültige Anforderung.
          </div>
                 
          <div v-else-if="this.$route.path.slice(1) == 402">
            Bezahlung erforderlich.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 403">
            Verboten.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 404">
            Nicht gefunden.
          </div>
                 
          <div v-else-if="this.$route.path.slice(1) == 500">
            Interner Serverfehler.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 501">
            Nicht implementiert.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 502">
            Bad Gateway.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 503">
            Dienst nicht verfügbar.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 504">
            Gateway-Timeout.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 505">
            HTTP-Version wird nicht unterstützt.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 506">
            Variante verhandelt auch.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 507">
            Unzureichender Speicher.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 509">
            Bandbreitenlimit überschritten.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 510">
            Nicht verlängert.
          </div>

          <div v-else>
            Nicht gefunden.
          </div>

        </v-card-text>
      </v-card>
    </v-flex>
    <br />
    <v-flex d-flex xs12 sm6 md12>
      <span class="headline font-weight-thin">
        <strong>Das ist ein Fehler!</strong><br />
        
         <div v-if="this.$route.path.slice(1) == 400">
            Der Server kann aufgrund eines Fehlers auf der Clientseite keine Antwort zurückgeben.
          </div>
                 
          <div v-else-if="this.$route.path.slice(1) == 402">
            Sie haben Ihr tägliches Anforderungslimit erreicht.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 403">
            Der Zugriff auf diese Ressource ist verboten.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 404">
            Die angeforderte Ressource wurde nicht gefunden.
          </div>
                 
          <div v-else-if="this.$route.path.slice(1) == 500">
            Auf dem Server ist ein Fehler aufgetreten und die Anfrage konnte nicht abgeschlossen werden.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 501">
            Die Anfragemethode wird vom Server nicht unterstützt und kann nicht verarbeitet werden.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 502">
            Der Server hat eine ungültige Antwort von einem anderen erhalten, z. B. wenn ein Proxy-Server verwendet wird oder die Abfrage/Anfrage zu lange gedauert hat und vom Server abgebrochen oder beendet und die Verbindung zur Datenbank unterbrochen wurde.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 503">
            Der Server ist derzeit nicht verfügbar, um diese Anfrage zu bearbeiten.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 504">
            Der Server, der als Gateway fungiert, hat eine Zeitüberschreitung beim Warten auf die Antwort eines anderen Servers festgestellt.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 505">
            Der Server unterstützt die Hauptversion von HTTP, die in der Anforderungsnachricht verwendet wurde, nicht oder verweigert die Unterstützung.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 506">
            Der Server hat einen internen Konfigurationsfehler: Die ausgewählte Variantenressource ist so konfiguriert, dass sie selbst an einer transparenten Inhaltsverhandlung teilnimmt und ist daher kein geeigneter Endpunkt im Verhandlungsprozess.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 507">
            Die Methode konnte für die Ressource nicht ausgeführt werden, da der Server die zum erfolgreichen Abschließen der Anforderung erforderliche Darstellung nicht speichern kann.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 508">
            Der Server hat bei der Verarbeitung der Anfrage eine Endlosschleife erkannt.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 509">
            Das vom Systemadministrator auferlegte Bandbreitenlimit wurde erreicht.
          </div>

          <div v-else-if="this.$route.path.slice(1) == 510">
            Weitere Erweiterungen der Anfrage sind erforderlich, damit der Server sie erfüllen kann.
          </div>

          <div v-else>
            Die angeforderte Ressource wurde nicht gefunden.
          </div>

      </span>
    </v-flex>
  </v-container>
</template>

<script>

export default {
 
};

</script>
