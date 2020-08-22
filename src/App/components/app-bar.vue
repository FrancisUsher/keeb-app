<template>
    <v-app-bar app>
        <v-toolbar-title class="headline">
            <router-link :to="{ name: 'home' }" class="toolbar-title">
                <span class="font-weight-bold">keeb.app</span>
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <v-btn :to="{ name: 'career' }" class="d-none d-sm-flex" text>
            <span>
                <span>Career</span>
            </span>
        </v-btn>
        <v-btn :to="{ name: 'keyboards' }" class="d-none d-sm-flex" text>
            <span>
                <span>Keyboards</span>
            </span>
        </v-btn>-->
        <v-btn
            href="https://www.instagram.com/faux_learning_machine/"
            rel="external"
            target="_blank"
            aria-label="Instagram Profile"
        >
            <v-icon class="d-flex" alt="Instagram Glyph">
                {{ mdiInstagram }}
            </v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mdiInformation, mdiInstagram } from '@mdi/js';
export default {
    name: 'app-bar',
    data() {
        return {
            mdiInformation,
            mdiInstagram,
        };
    },
};
</script>

<style lang="scss" scoped>
.toolbar-title {
    color: inherit;
    text-decoration: inherit;
}
</style>
