<template>
  <div>
    <v-app-bar app fixed>
      <v-btn icon @click="back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-title
        ><small>{{ title }}</small></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <!-- details -->
        <v-card class="d-flex flex-no-wrap pa-2">
          <v-img max-width="50%" src="https://picsum.photos/200/300"></v-img>

          <div>
            <v-card-title class="headline primary--text">Eminem</v-card-title>
            <v-card-subtitle>
              <p class="ma-0 text--small">Director: Christopher Nolan</p>
              <p class="ma-0 text--small">Gender: Action</p>
              <p class="ma-0 text--small">Country: Iran</p>
              <p class="ma-0 text--small">Language: Persian</p>
              <p class="ma-0 text--small">IMDB rank: 8/10</p>
            </v-card-subtitle>
          </div>
        </v-card>
      </v-container>

      <v-container fluid>
        <v-sheet>
          <!-- summary -->
          <v-row>
            <!-- details -->
            <v-col cols="12" class="d-flex pa-1 align-center">
              <v-spacer></v-spacer>
              <v-icon small>mdi-calendar-check</v-icon>
              <span class="mr-3 text--x-small">1398/12/22 </span>

              <v-icon small>mdi-heart</v-icon>
              <span class="mr-3 text--x-small">52 </span>

              <v-icon small>mdi-eye</v-icon>
              <span class="text--x-small">1,420</span>
              <v-spacer></v-spacer>
            </v-col>
            <!-- summary -->
            <v-col cols="12" class=" ">
              <p class="text--small text--justify ma-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Pellentesque habitant morbi tristique senectus et netus.
              </p>
            </v-col>
          </v-row>

          <!-- tabs-windows -->
          <v-row>
            <!-- tabs -->
            <v-col cols="12" class="d-flex pa-0 ">
              <v-tabs v-model="tab" background-color="primary" dark fixed-tabs>
                <v-tab>
                  <span class="text--x-small">Download</span>
                </v-tab>
                <v-tab>
                  <span class="text--x-small">Subtitle</span>
                </v-tab>
                <v-tab>
                  <span class="text--x-small">Comments</span>
                </v-tab>
              </v-tabs>
            </v-col>
            <!-- windows -->
            <v-col cols="12" class="d-flex pa-0 ">
              <v-tabs-items v-model="tab" class="w-100">
                <!-- download-links -->
                <v-tab-item>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon small>mdi-movie</v-icon>
                          Download - 320
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-icon small color="primary">mdi-download</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon small>mdi-movie</v-icon>
                          Download - 128
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-icon small color="primary">mdi-download</v-icon>
                    </v-list-item>
                  </v-list>
                </v-tab-item>
                <!-- lyric -->
                <v-tab-item>
                  <p class="lyric">
                    lyric
                  </p>
                </v-tab-item>
                <!-- comments -->
                <v-tab-item>
                  <v-sheet>
                    <v-container class="align-end">
                      <v-textarea
                        v-model="comment"
                        hide-details
                        placeholder="Type Comment... "
                        dense
                        auto-grow
                        filled
                        rows="1"
                        class="text--small align-end"
                      >
                        <template v-slot:append-outer>
                          <v-btn icon color="primary" :disabled="!comment">
                            <v-icon>mdi-send</v-icon>
                          </v-btn>
                        </template>
                        <template v-slot:prepend-inner>
                          <v-chip v-if="replyTo" x-small close draggable>
                            Reply to @ali
                          </v-chip>
                        </template>
                      </v-textarea>
                    </v-container>
                  </v-sheet>
                  <v-sheet>
                    <v-list dense three-line>
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img src="https://picsum.photos/200"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title class="d-flex">
                            <div>
                              <p class="ma-0">Farshid Rezaei</p>
                              <v-icon x-small>mdi-calendar-check</v-icon>
                              <span class="text--x-small">1398/12/23</span>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn x-small color="primary" outlined
                              >Reply</v-btn
                            >
                          </v-list-item-title>
                          <span class="text--small text--justify">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفا ده از طراحان گرافیک است. چاپگرها
                            و متون بلدهایدی در شصت و سه در مورد استفاد ه قرار
                            گیرد.
                          </span>
                          <v-divider></v-divider>

                          <v-list dense three-line>
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img src="https://picsum.photos/200"></v-img>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title class="d-flex">
                                  <div>
                                    <p class="ma-0">Farshid Rezaei</p>
                                    <v-icon x-small>mdi-calendar-check</v-icon>
                                    <span class="text--x-small"
                                      >1398/12/23</span
                                    >
                                  </div>
                                </v-list-item-title>
                                <span class="text--small text--justify"
                                  >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                                  از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                  چاپگرها و متون بلدهایدی در شصت و سه در مورد
                                  استفاده قرار گیرد.</span
                                >
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img src="https://picsum.photos/200"></v-img>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title class="d-flex">
                                  <div>
                                    <p class="ma-0">Farshid Rezaei</p>
                                    <v-icon x-small>mdi-calendar-check</v-icon>
                                    <span class="text--x-small"
                                      >1398/12/23</span
                                    >
                                  </div>
                                </v-list-item-title>
                                <span class="text--small text--justify">
                                  Lorem ipsum dolor sit ame t, consectetur
                                  adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna a liqua.
                                  Pellentesque habitant morbi tristique senectus
                                  et netus.
                                </span>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img src="https://picsum.photos/200"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title class="d-flex">
                            <div>
                              <p class="ma-0">Farshid Rezaei</p>
                              <v-icon x-small>mdi-calendar-check</v-icon>
                              <span class="text--x-small">1398/12/23</span>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn x-small color="primary" outlined
                              >Reply</v-btn
                            >
                          </v-list-item-title>
                          <span class="text--small text--justify">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفا ده از طراحان گرافیک است. چاپگرها
                            و متون بلدهایدی در شصت و سه در مورد استفاد ه قرار
                            گیرد.
                          </span>
                          <v-divider></v-divider>

                          <v-list dense three-line>
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img src="https://picsum.photos/200"></v-img>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title class="d-flex">
                                  <div>
                                    <p class="ma-0">Farshid Rezaei</p>
                                    <v-icon x-small>mdi-calendar-check</v-icon>
                                    <span class="text--x-small"
                                      >1398/12/23</span
                                    >
                                  </div>
                                </v-list-item-title>
                                <span class="text--small text--justify"
                                  >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                                  از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                  چاپگرها و متون بلدهایدی در شصت و سه در مورد
                                  استفاده قرار گیرد.</span
                                >
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img src="https://picsum.photos/200"></v-img>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                <v-list-item-title class="d-flex">
                                  <div>
                                    <p class="ma-0">Farshid Rezaei</p>
                                    <v-icon x-small>mdi-calendar-check</v-icon>
                                    <span class="text--x-small"
                                      >1398/12/23</span
                                    >
                                  </div>
                                </v-list-item-title>
                                <span class="text--small text--justify">
                                  Lorem ipsum dolor sit ame t, consectetur
                                  adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna a liqua.
                                  Pellentesque habitant morbi tristique senectus
                                  et netus.
                                </span>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-sheet>
                </v-tab-item>
                <!-- related -->
                <v-tab-item> </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </v-content>
  </div>
</template>

<style lang="scss">
.w-100 {
  width: 100% !important;
}

.text--x-small {
  font-size: x-small;
}

.text--small {
  font-size: small;
  font-weight: 300;
}

.text--justify {
  text-align: justify;
  word-wrap: break-spaces;
}

.lyric {
  padding: 1em;
}

.v-input__append-outer {
  align-self: flex-end !important;
}

.v-input__prepend-inner {
  align-self: flex-start !important;
}
</style>

<script>
export default {
  layout: 'single',
  data() {
    return {
      title: 'Eminem - Rap god',
      tab: null,
      comment: '',
      replyTo: ''
    }
  },
  methods: {
    back() {
      if (window.history.length > 2) this.$router.back()
      else this.$router.push('/')
    }
  }
}
</script>
