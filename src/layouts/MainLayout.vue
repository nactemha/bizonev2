<template>
  <q-layout view="LHh LpR LFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn round v-if="requireSearch" class="searchicon" :icon="fasSearch" style="font-size: 15px;z-index: 100;"
          @click.stop="searhBarVisible = !searhBarVisible; searchKeyword = ''" />

        <q-btn round :icon="fasStar" style="margin-right: 10px;">
          <q-menu auto-close class="toolbar-menu">
            <q-list>
              <q-item clickable>
                <q-item-section>Recent tabs</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>History</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Downloads</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-btn>
        <q-btn round :icon="fasBell">
          <q-badge color="orange" floating>22</q-badge>
          <q-menu auto-close class="toolbar-menu">
            <q-list>
              <q-item clickable>
                <q-item-section>{{ $t('lbl_clean') }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Recent tabs</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>History</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Downloads</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <!--
      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
      -->
      <q-input v-if="requireSearch && searhBarVisible" dark dense standout bg-color="white" v-model="searchKeyword"
        input-class="text-left" label="Sistemde Ara" class="search">

      </q-input>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-card class="my-card text-white" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">

        <q-card-section>
          <div style="margin:5px">
            <img v-if="getLocale() != 'en'" @click="changeLocale('en')" src="/images/en.svg" alt="logo" width="15"
              height="15" class="shadow-3" />
            <img v-if="getLocale() != 'tr'" @click="changeLocale('tr')" src="/images/tr.svg" alt="logo" width="15"
              height="15" class="shadow-3" />
          </div>
          <div class="column justify-center items-center">
            <div>
              <q-item class="text-primary" to="/profile" clickable v-ripple>
                <q-avatar size="xl" style="background-color: white;">
                  <q-img fit="contain" src="/icons/people.svg" />
                </q-avatar>
              </q-item>
            </div>
            <div class="text-h6">Our Changing Planet
            </div>
            <div class="text-subtitle2">by John Doe
            </div>

          </div>
        </q-card-section>

      </q-card>
      <q-list bordered>
        <q-item class="text-primary" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="mdi-view-dashboard" />
          </q-item-section>
          <q-item-section>{{ $t('dashboard') }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item class="text-primary" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fa-solid fa-calendar-days" />
          </q-item-section>
          <q-item-section>{{ $t('calendar') }}</q-item-section>
        </q-item>
        <q-expansion-item group="1group" icon="fa-solid fa-people-group" :label="$t('human_resources')" default-opened
          header-class="text-primary">
          <q-card>
            <q-card-section>
              <q-list>
                <q-item class="text-primary" to="/workplace" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis" />
                  </q-item-section>
                  <q-item-section>{{ $t('workplace_location') }}</q-item-section>
                </q-item>
                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis" />
                  </q-item-section>
                  <q-item-section>{{ $t('osh_assignement') }}</q-item-section>
                </q-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('personal_management')"
                  header-class="text-primary">

                  <q-item class="text-primary" to="/employee-list" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('personal_list') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" to="/employee-health-info" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('personal_medical') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" to="/" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('personal_info') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('subcontractor_management')"
                  header-class="text-primary">

                  <q-item class="text-primary" to="/subcontractors" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('subcontractor_list') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('subcontractor_personals') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('subcontractor_documents') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('subcontractor_definations') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('recruitment_management')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('recruitment_authorization') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('recruitment_approval') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('education_management')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('education_annual_program') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" to="/educational-planning" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('education_plan') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('education_personal') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" to="/education-type" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('education_types') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('education_osh') }}</q-item-section>
                  </q-item>

                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('discipline_management')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('discipline_penalty_clauses') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('discipline_penalties') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('visitor_management')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('visitor_tracking') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('visitor_definations') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('guide')" header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('guide_department_specific') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('guide_duty_specific') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('guide_team_specific') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="mdi-view-dashboard" />
                  </q-item-section>
                  <q-item-section>{{ $t('osgb_authority') }}</q-item-section>
                </q-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('contracts')" header-class="text-primary">
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('contracts_workplace service agreement') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('contracts_personal') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="2group" :label="$t('definations')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('definations_department') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('definations_duty') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('definations_shift') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                    </q-item-section>
                    <q-item-section>{{ $t('definations_documents') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item group="1group" icon="fa-solid fa-mountain-city" :label="$t('facility_management')"
          default-opened header-class="text-primary">
          <q-card>
            <q-card-section>
              <q-expansion-item switch-toggle-side group="2group" :label="$t('stuff_management')"
                header-class="text-primary">

                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                  </q-item-section>
                  <q-item-section>{{ $t('tracking') }}</q-item-section>
                </q-item>
                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                  </q-item-section>
                  <q-item-section>{{ $t('operations') }}</q-item-section>
                </q-item>
                <q-expansion-item switch-toggle-side group="3group" :label="$t('definations')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('storage') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('grouping') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item group="1group" icon="fa-solid fa-house-medical" :label="$t('medical')" default-opened
          header-class="text-primary">
          <q-card>
            <q-card-section>
              <q-expansion-item switch-toggle-side group="2group" :label="$t('stuff_management')"
                header-class="text-primary">

                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                  </q-item-section>
                  <q-item-section>{{ $t('exposure_measurements') }}</q-item-section>
                </q-item>
                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                  </q-item-section>
                  <q-item-section>{{ $t('poisoning') }}</q-item-section>
                </q-item>
                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                  </q-item-section>
                  <q-item-section>{{ $t('occupational_disease') }}</q-item-section>
                </q-item>
                <q-item class="text-primary" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="fa-solid fa-ellipsis-vertical" />
                  </q-item-section>
                  <q-item-section>{{ $t('employee_file') }}</q-item-section>
                </q-item>

                <q-expansion-item switch-toggle-side group="3group" :label="$t('administrative')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('storage') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('grouping') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="3group" :label="$t('policlinic')" header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('storage') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('grouping') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
                <q-expansion-item switch-toggle-side group="3group" :label="$t('definations')"
                  header-class="text-primary">

                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('storage') }}</q-item-section>
                  </q-item>
                  <q-item class="text-primary" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="fa-solid fa-ellipsis" />
                    </q-item-section>
                    <q-item-section>{{ $t('grouping') }}</q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item group="1group" icon="fa-solid fa-user-shield" :label="$t('occupational_safety')" default-opened
          header-class="text-primary">
          <q-card>
            <q-card-section>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>{{ $t('scheduler') }}</q-item-section>
              </q-item>

            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item group="1group" icon="fa-solid fa-border-all" :label="$t('management_systems')" default-opened
          header-class="text-primary">
          <q-card>
            <q-card-section>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>{{ $t('scheduler') }}</q-item-section>
              </q-item>

            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />

        <q-expansion-item group="1group" icon="mdi-file-chart" :label="$t('reports')" header-class="text-primary">
          <q-card>
            <q-card-section>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>{{ $t('scheduler') }}</q-item-section>
              </q-item>

            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-item class="text-primary" clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fa-solid fa-chart-pie" />
          </q-item-section>
          <q-item-section>{{ $t('statistics') }}</q-item-section>
        </q-item>
        <q-separator />

        <q-expansion-item group="1group" icon="fa-solid fa-scale-balanced" :label="$t('law')" header-class="text-primary">
          <q-card>
            <q-card-section>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>{{ $t('scheduler') }}</q-item-section>
              </q-item>

            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item group="1group" icon="fa-solid fa-network-wired" :label="$t('biportal')"
          header-class="text-primary">
          <q-card>
            <q-card-section>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>{{ $t('scheduler') }}</q-item-section>
              </q-item>

            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />

        <q-expansion-item group="1group" icon="fa-solid fa-gears" :label="$t('settings')" header-class="text-primary">
          <q-card>
            <q-card-section>

              <q-item clickable v-ripple @click="changeTheme('blue')">
                <q-item-section avatar>
                  <q-icon color="blue" name="circle" />
                </q-item-section>
                <q-item-section>{{ $t('blue-theme') }}</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="changeTheme('red')">
                <q-item-section avatar>
                  <q-icon color="red" name="circle" />
                </q-item-section>
                <q-item-section>{{ $t('blue-theme') }}</q-item-section>
              </q-item>

            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="fa-solid fa-sign-out-alt" />
          </q-item-section>
          <q-item-section>{{ $t('logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { fasBell, fasStar, fasSearch } from '@quasar/extras/fontawesome-v5';
import { useTheme } from 'src/composables/theme';

const { changeTheme } = useTheme();

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
import { storeToRefs } from 'pinia';
import { useToolbarStore } from 'src/stores/toolbar';
const { requireSearch, searchKeyword } = storeToRefs(useToolbarStore());
const searhBarVisible = ref(false);

import { useI18n } from 'vue-i18n'
const { locale: i18n } = useI18n({ useScope: 'global' })
function changeLocale(loc) {
  i18n.value = loc
}
function getLocale() {
  return i18n.value
}
</script>
<style lang="scss">
html {
  height: 100%
}

body {
  background: #fff;
  height: 100%;
}

.searchicon {
  margin-right: 10px;

  @media(min-width: $breakpoint-xs) {}
}

.search {
  width: 80%;
  right: 3px;
  top: $toolbar-min-height;
  position: absolute;

  @media(min-width: $breakpoint-xs) {
    max-width: 500px;
  }
}

.toolbar-menu {
  width: 100%;
  padding: 0px;

  .q-item {
    font-size: small;
    padding: 10px;
  }

  @media (min-width: $breakpoint-xs) {
    width: 300px;
  }
}
</style>
