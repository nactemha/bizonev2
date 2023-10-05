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
      <q-list bordered>
        <q-expansion-item group="somegroup" icon="explore" label="First" default-opened header-class="text-primary">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item group="somegroup" icon="perm_identity" label="Second" header-class="text-teal">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item group="somegroup" icon="shopping_cart" label="Third" header-class="text-purple">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item group="somegroup" icon="bluetooth" label="Fourth" header-class="bg-teal text-white"
          expand-icon-class="text-white">
          <q-card class="bg-teal-2">
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
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
