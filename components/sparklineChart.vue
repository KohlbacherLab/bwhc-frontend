
<template>
    <v-container fluid>
      <canvas id="myChart"></canvas>
      
      <v-sparkline
        :value="value"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        auto-draw
      ></v-sparkline>
      
      <v-divider></v-divider>
    <!--
      <v-layout wrap>
        <v-flex
          xs12
          md6
        >
          <v-layout fill-height align-center>
            <v-item-group v-model="gradient" mandatory>
              <v-layout>
                <v-item v-for="(gradient, i) in gradients" :key="i" :value="gradient">
                  <v-card
                    slot-scope="{ active, toggle }"
                    :style="{
                      background: gradient.length > 1
                        ? `linear-gradient(0deg, ${gradient})`
                        : gradient[0],
                      border: '2px solid',
                      borderColor: active ? '#222' : 'white'
                    }"
                    width="30"
                    height="30"
                    class="mr-2"
                    @click.native="toggle"
                  ></v-card>
                </v-item>
              </v-layout>
            </v-item-group>
          </v-layout>
        </v-flex>

        <v-flex
          xs12
          md6
        >
          <v-slider
            v-model="width"
            label="Width"
            min="0.1"
            max="10"
            step="0.1"
            thumb-label
          ></v-slider>
        </v-flex>
 
        <v-flex xs6>
          <v-layout fill-height align-center>
            <v-subheader class="pl-0">Linecap</v-subheader>
            <v-btn-toggle v-model="lineCap" mandatory>
              <v-btn flat value="butt">butt</v-btn>
              <v-btn flat value="round">round</v-btn>
              <v-btn flat value="square">square</v-btn>
            </v-btn-toggle>
          </v-layout>
  
          <v-layout fill-height align-center>
            <v-subheader class="pl-0">Gradient direction</v-subheader>
            <v-btn-toggle v-model="gradientDirection" mandatory>
              <v-btn flat value="top">top</v-btn>
              <v-btn flat value="right">right</v-btn>
              <v-btn flat value="left">left</v-btn>
              <v-btn flat value="bottom">bottom</v-btn>
            </v-btn-toggle>
          </v-layout>
        </v-flex>

        <v-flex
          xs12
          md6
        >
          <v-slider
            v-model="radius"
            label="Radius"
            min="0"
            max="25"
            thumb-label
          ></v-slider>
        </v-flex>
  
        <v-flex
          xs12
          md6
          offset-md6
        >
          <v-slider
            v-model="padding"
            label="Padding"
            min="0"
            max="25"
            thumb-label
          ></v-slider>
        </v-flex>
          -->
      <!--    
      </v-layout>
      -->
    </v-container>
</template>

<script>

export default {
  data: () => ({
    width: 0.7,
    radius: 10,
    padding: 10,
    lineCap: 'round',
    gradient: gradients[5],
    value: [2, 10, 40, 10, 5, 10, 13, 5, 50, 10, 1, 8, 10, 9, 30,20,40,4,4,52,1,25,25,27,27],
    gradientDirection: 'bottom',
    gradients
  })
}

const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea']
  ]
</script>
