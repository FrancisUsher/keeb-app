<template>
    <v-bottom-navigation fixed grow>
        <v-btn text :to="{ name: 'imugi' }">
            <span>Imugi</span>
            <v-icon>{{ mdiGesture }}</v-icon>
        </v-btn>
        <v-btn text :to="{ name: 'slope' }">
            <span>SlopE</span>
            <v-icon>{{ mdiLink }}</v-icon>
        </v-btn>
        <v-btn text :to="{ name: 'about' }">
            <span>About</span>
            <v-icon>{{ mdiInformation }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import { mdiGesture, mdiInformation, mdiLink } from '@mdi/js';
export default {
    name: 'bottom-nav',
    data() {
        return {
            mdiGesture,
            mdiInformation,
            mdiLink,
        };
    },
};
</script>
