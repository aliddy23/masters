<template>
  <v-app-bar density="compact" color="#146E4E">
    <v-app-bar-title>
      <h6 class="text-h6 font-weight-regular">The Masters</h6>
    </v-app-bar-title>
    <!-- <v-spacer></v-spacer>
    <v-btn size="small" prepend-icon="mdi-chevron-left">Logout</v-btn> -->
  </v-app-bar>

  <main>
    <v-row no-gutters>
      <v-col cols="12" md="9" style="position: relative">
        <video
          id="video"
          class="video-js vjs-fluid vjs-default-skin"
          controls
          preload="auto"
          data-setup="{}"
        >
          <source
            v-if="activeFeed"
            :src="activeFeed"
            type="application/x-mpegURL"
          />
          <v-btn
            :icon="paused ? 'mdi-play' : 'mdi-pause'"
            size="x-large"
            :color="paused ? '#F9F400' : '#146E4E'"
            @click="paused ? play() : pause()"
          ></v-btn>
        </video>

        <div
          style="position: absolute; top: 15vw; width: 100%"
          class="text-center"
          v-if="!activeFeed"
        >
          <h3 class="text-h3 font-weight-light">The Masters</h3>
          <p class="mt-4">Select a channel</p>
        </div>

        <div
          style="position: absolute; top: 16vw; width: 100%"
          class="text-center"
          v-if="loading"
        >
          <v-progress-circular indeterminate :size="60"></v-progress-circular>
          <p class="mt-4">Loading...</p>
        </div>

        <div class="mt-6 mx-6 d-flex" style="align-items: center">
          <v-btn
            :icon="paused ? 'mdi-play' : 'mdi-pause'"
            size="x-large"
            :color="
              activeFeed && !loading ? (paused ? '#F9F400' : '#146E4E') : ''
            "
            @click="paused ? play() : pause()"
            :disabled="!activeFeed || loading"
          ></v-btn>

          <v-btn
            class="ml-2"
            :icon="muted ? 'mdi-volume-mute' : 'mdi-volume-high'"
            :active="muted"
            variant="text"
            @click="toggleMute()"
            :disabled="!activeFeed || loading"
          ></v-btn>

          <v-btn
            :active="isLive"
            variant="text"
            rounded="xl"
            size="large"
            @click="goLive()"
            :disabled="!activeFeed || loading"
            >LIVE</v-btn
          >

          <v-spacer></v-spacer>

          <v-btn
            class="ml-2"
            icon="mdi-fullscreen"
            :active="muted"
            variant="text"
            @click="fullscreen()"
            :disabled="!activeFeed || loading"
          ></v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <v-list class="bg-transparent mt-3 mx-6" density="compact">
          <v-list-subheader class="mb-2">CHANNELS</v-list-subheader>

          <v-item-group
            mandatory
            v-model="activeFeed"
            @update:model-value="set()"
          >
            <v-item
              v-for="(feed, index) in feeds.sort((a: any, b: any) =>
                a.name.localeCompare(b.name)
              ).filter((i: any) => i.channelId != 'fg2')"
              :key="feed.channelId"
              v-slot="{ isSelected, selectedClass, toggle }"
              :value="feed.desktop[1].url"
            >
              <v-list-item
                @click="toggle"
                :active="isSelected"
                rounded="lg"
                :prepend-avatar="feed.carousel_thumb"
              >
                <v-list-item-title
                  >{{ feed.name
                  }}<v-chip
                    :color="feed.live ? 'red' : 'grey'"
                    class="ml-2"
                    style="margin-top: -2px; cursor: pointer"
                    density="compact"
                  >
                    {{ feed.live ? "LIVE" : "OFFLINE" }}
                  </v-chip></v-list-item-title
                >
              </v-list-item>
            </v-item>
          </v-item-group>
          <!-- 
          <div v-if="activeFeed">
            <v-list-subheader class="mb-2 mt-6">ON NOW</v-list-subheader>

            <v-list-item
              v-for="id in activeFeed.upcoming_group.split(',')"
              rounded="lg"
              :prepend-avatar="`https://images.masters.com/players/2023/240x240/${id}.jpg`"
            >
              <v-list-item-title
                v-for="player in [scores.player.find((i) => i.id == id)]"
                :key="player.id"
                ><span class="font-weight-bold">{{ player.last_name }}, </span
                >{{ player.first_name }}
              </v-list-item-title>
            </v-list-item>
          </div> -->
        </v-list>
      </v-col>
    </v-row>

    <v-container v-if="scores" class="mt-2">
      <v-table density="compact" class="rounded-lg mb-2" fixed-header>
        <thead>
          <tr>
            <th class="text-center"></th>
            <th class="text-left"></th>
            <th class="text-center" style="white-space: nowrap">To Par</th>
            <th class="text-center">Thru</th>
            <th class="text-center">Today</th>
            <th class="text-center">R1</th>
            <th class="text-center">R2</th>
            <th class="text-center">R3</th>
            <th class="text-center">R4</th>
            <th class="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in scores?.player" :key="player.id">
            <td
              v-if="player.status == 'C'"
              class="font-weight-black text-center"
            >
              MC
            </td>
            <td
              v-else-if="player.status == 'W'"
              class="font-weight-black text-center"
            >
              WD
            </td>
            <td v-else class="font-weight-black text-center">
              {{ player?.pos }}
            </td>
            <td style="min-width: 200px">
              <v-list-item
                class="ma-0 pa-0"
                :prepend-avatar="`https://images.masters.com/players/2023/240x240/${player.id}.jpg`"
              >
                <v-list-item-title>
                  <span class="font-weight-bold">{{ player?.last_name }}</span
                  ><span v-if="mdAndUp">, {{ player?.first_name }}</span>
                  <span v-if="player?.amateur"> (A)</span>
                </v-list-item-title>
              </v-list-item>
            </td>
            <td
              class="text-center"
              :class="{
                'text-red': pInt(player.topar) < 0,
                'text-green': pInt(player.topar) >= 0 || player.topar == 'E',
              }"
            >
              {{ player.topar || "-" }}
            </td>
            <td
              class="text-center"
              v-if="player.status != 'C' && player.status != 'W'"
            >
              {{ player.thru || "-" }}
            </td>
            <td
              class="text-center"
              v-if="player.status != 'C' && player.status != 'W'"
              :class="{
                'text-red': pInt(player.today) < 0,
                'text-green': pInt(player.today) >= 0 || player.today == 'E',
              }"
            >
              {{ player.today || "-" }}
            </td>
            <td class="text-center" v-else colspan="2">
              {{ player.status == "C" ? "Missed Cut" : "Withdrew" }}
            </td>
            <td
              :class="{
                'text-red': player.round1.total < par,
                'text-green': player.round1.total >= par,
                'text-grey-lighten-5': player.round1.total == null,
              }"
              class="text-center"
            >
              {{ player.round1.total || "-" }}
            </td>
            <td
              :class="{
                'text-red': player.round2.total < par,
                'text-green': player.round2.total >= par,
                'text-grey-lighten-5': player.round2.total == null,
              }"
              class="text-center"
            >
              {{ player.round2.total || "-" }}
            </td>
            <td
              :class="{
                'text-red': player.round3.total < par,
                'text-green': player.round3.total >= par,
                'text-grey-lighten-5': player.round3.total == null,
              }"
              class="text-center"
            >
              {{ player.round3.total || "-" }}
            </td>
            <td
              :class="{
                'text-red': player.round4.total < par,
                'text-green': player.round4.total >= par,
                'text-grey-lighten-5': player.round4.total == null,
              }"
              class="text-center"
            >
              {{ player.round4.total || "-" }}
            </td>
            <td
              :class="{
                'text-red': player.totalUnderPar == 'true',
                'text-green': player.totalUnderPar == 'false',
                'text-grey-lighten-5':
                  player.total == null || player.status == 'W',
              }"
              class="text-center"
            >
              {{ player.total || "-" }}
            </td>

            <v-menu
              open-on-hover
              :close-on-content-click="false"
              activator="parent"
            >
              <v-card style="background: #191919" class="rounded-lg">
                <v-row no-gutters>
                  <v-col cols="12" md="2">
                    <v-img
                      :src="`https://images.masters.com/players/2023/240x240/${player.id}.jpg`"
                    >
                      <h3
                        class="text-h3 pa-3 font-weight-black text-white"
                        style="
                          text-shadow: 0 0 6px black;
                          position: absolute;
                          bottom: 0px;
                          right: 0px;
                        "
                      >
                        {{ player?.pos }}
                      </h3>
                    </v-img>

                    <div
                      class="pa-4"
                      v-if="player.status != 'C' && player.status != 'W'"
                    >
                      <p>
                        <span class="font-weight-bold">Tee Time: </span
                        >{{ player.teetime }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Group: </span
                        >{{ player.group }}
                      </p>
                      <p>
                        <span class="font-weight-bold">Thru: </span
                        >{{ player.thru }}
                      </p>
                    </div>

                    <div class="pa-4" v-else>
                      <p v-if="player.status == 'C'">Missed Cut</p>
                      <p v-else-if="player.status == 'W'">Withdrew</p>
                    </div>
                  </v-col>

                  <v-col cols="12" md="10">
                    <div class="ma-4 d-flex" style="align-items: baseline">
                      <h4 class="text-h4 font-weight-medium">
                        {{ player?.first_name }} {{ player?.last_name }}
                        <span v-if="player?.amateur"> (A)</span>
                      </h4>
                      <v-spacer></v-spacer>
                      <h6
                        class="text-h6 mr-2 font-weight-regular"
                        :class="{
                          'text-red': player.totalUnderPar == 'true',
                          'text-green': player.totalUnderPar == 'false',
                        }"
                      >
                        {{ player.total || "-" }}
                      </h6>

                      <h4
                        class="text-h4 font-weight-regular"
                        :class="{
                          'text-red': pInt(player.topar) < 0,
                          'text-green':
                            pInt(player.topar) >= 0 || player.topar == 'E',
                        }"
                      >
                        {{ player.topar || "-" }}
                      </h4>
                    </div>

                    <v-table density="compact" class="bg-transparent">
                      <thead>
                        <tr>
                          <th class="text-center">Hole</th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 0 }"
                          >
                            1
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 1 }"
                          >
                            2
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 2 }"
                          >
                            3
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 3 }"
                          >
                            4
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 4 }"
                          >
                            5
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 5 }"
                          >
                            6
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 6 }"
                          >
                            7
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 7 }"
                          >
                            8
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 8 }"
                          >
                            9
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 9 }"
                          >
                            10
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 10 }"
                          >
                            11
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 11 }"
                          >
                            12
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 12 }"
                          >
                            13
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 13 }"
                          >
                            14
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 14 }"
                          >
                            15
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 15 }"
                          >
                            16
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 16 }"
                          >
                            17
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 17 }"
                          >
                            18
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 18 }"
                          >
                            Total
                          </th>
                        </tr>
                        <tr>
                          <th class="text-center">Par</th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 0 }"
                          >
                            {{ scores?.pars?.round1[0] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 1 }"
                          >
                            {{ scores?.pars?.round1[1] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 2 }"
                          >
                            {{ scores?.pars?.round1[2] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 3 }"
                          >
                            {{ scores?.pars?.round1[3] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 4 }"
                          >
                            {{ scores?.pars?.round1[4] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 5 }"
                          >
                            {{ scores?.pars?.round1[5] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 6 }"
                          >
                            {{ scores?.pars?.round1[6] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 7 }"
                          >
                            {{ scores?.pars?.round1[7] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 8 }"
                          >
                            {{ scores?.pars?.round1[8] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 9 }"
                          >
                            {{ scores?.pars?.round1[9] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 10 }"
                          >
                            {{ scores?.pars?.round1[10] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 11 }"
                          >
                            {{ scores?.pars?.round1[11] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 12 }"
                          >
                            {{ scores?.pars?.round1[12] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 13 }"
                          >
                            {{ scores?.pars?.round1[13] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 14 }"
                          >
                            {{ scores?.pars?.round1[14] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 15 }"
                          >
                            {{ scores?.pars?.round1[15] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 16 }"
                          >
                            {{ scores?.pars?.round1[16] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 17 }"
                          >
                            {{ scores?.pars?.round1[17] }}
                          </th>
                          <th
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 18 }"
                          >
                            {{ par }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="i in 4"
                          :key="i"
                          :class="{
                            highlighted: currentRound == i,
                          }"
                        >
                          <td class="text-center font-weight-bold">R{{ i }}</td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 0 }"
                          >
                            {{ player[`round${i}`].scores[0] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 1 }"
                          >
                            {{ player[`round${i}`].scores[1] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 2 }"
                          >
                            {{ player[`round${i}`].scores[2] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 3 }"
                          >
                            {{ player[`round${i}`].scores[3] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 4 }"
                          >
                            {{ player[`round${i}`].scores[4] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 5 }"
                          >
                            {{ player[`round${i}`].scores[5] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 6 }"
                          >
                            {{ player[`round${i}`].scores[6] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 7 }"
                          >
                            {{ player[`round${i}`].scores[7] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 8 }"
                          >
                            {{ player[`round${i}`].scores[8] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 9 }"
                          >
                            {{ player[`round${i}`].scores[9] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 10 }"
                          >
                            {{ player[`round${i}`].scores[10] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 11 }"
                          >
                            {{ player[`round${i}`].scores[11] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 12 }"
                          >
                            {{ player[`round${i}`].scores[12] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 13 }"
                          >
                            {{ player[`round${i}`].scores[13] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 14 }"
                          >
                            {{ player[`round${i}`].scores[14] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 15 }"
                          >
                            {{ player[`round${i}`].scores[15] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 16 }"
                          >
                            {{ player[`round${i}`].scores[16] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 17 }"
                          >
                            {{ player[`round${i}`].scores[17] || "-" }}
                          </td>
                          <td
                            class="text-center"
                            :class="{ 'bg-primary': pInt(player.thru) == 18 }"
                          >
                            {{ player[`round${i}`].total || "-" }}
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-col>
                </v-row>
              </v-card>
            </v-menu>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </main>
</template>

<script lang="ts" setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref, computed, Ref } from "vue";
import videojs from "video.js";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
let scores: Ref<any> = ref({});
let feeds: Ref<any> = ref({});
let activeFeed = ref(null);
let player: any = null;
let loading = ref(false);
let paused = ref(true);
let muted = ref(false);
let totalPar = ref(Number.MAX_SAFE_INTEGER);
let par = ref(72);
let isLive = ref(false);

const currentRound = computed(() => {
  if (scores?.value.currentRound == "1000") return 1;
  else if (scores?.value.currentRound == "0100") return 2;
  else if (scores?.value.currentRound == "0010") return 3;
  else if (scores?.value.currentRound == "0001") return 4;
  else return 0;
});

onMounted(() => {
  refreshScoreboard();
  refreshFeeds();

  player = videojs("video", {
    autoplay: "play",
  });

  player.on("pause", () => {
    paused.value = true;
    isLive.value = false;
  });

  player.on("play", () => {
    paused.value = false;
  });

  player.on("playing", () => {
    loading.value = false;
  });

  player.on("loadeddata", () => {
    loading.value = false;
  });

  player.on("loadstart", () => {
    loading.value = true;
  });

  setInterval(() => refreshScoreboard(), 30000);
  setInterval(() => refreshFeeds(), 60000);
});

let pause = () => {
  paused.value = true;
  player.pause();
};

let play = () => {
  paused.value = false;
  player.play();
};

let set = () => {
  loading.value = true;
  player.src(activeFeed.value);
  isLive.value = true;
  play();
};

let toggleMute = () => {
  player.muted(!muted.value);
  muted.value = !muted.value;
};

let fullscreen = () => {
  player.requestFullscreen();
};

let pInt = (input: string) => {
  if (input == "F") return 18;
  return parseInt(input);
};

let goLive = () => {
  set();
};

let refreshScoreboard = () => {
  axios.get("/api/scores").then((response) => {
    scores.value = response.data;
    switch (response.data.currentRound) {
      case "1000":
        totalPar.value = par.value * 1;
        break;
      case "0100":
        totalPar.value = par.value * 2;
        break;
      case "0010":
        totalPar.value = par.value * 3;
        break;
      case "0001":
        totalPar.value = par.value * 4;
        break;
    }
  });
};

let refreshFeeds = () => {
  axios.get("/api/feeds").then((response) => {
    feeds.value = response.data;
  });
};
</script>

<style>
.vjs-control-bar,
.vjs-big-play-button,
.vjs-loading-spinner {
  display: none !important;
}

.v-table__wrapper table tbody tr:hover,
.highlighted {
  background: rgba(255, 255, 255, 0.1);
}
</style>
