<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="keeb.app Logo"
          class="shrink mr-2"
          contain
          src="/logo.svg"
          transition="scale-transition"
          width="40"
        />

        <h1>keeb.app</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/FrancisUsher/keeb-app"
        target="_blank"
        text
      >
        <span class="mr-2">Contribute</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
