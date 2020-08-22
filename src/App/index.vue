<template>
    <v-app>
        <app-bar></app-bar>
        <v-content>
            <v-container fluid>
                <transition name="top-level" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-container>
        </v-content>
        <bottom-nav class="d-sm-none"></bottom-nav>
    </v-app>
</template>

<script>
import appBar from './components/app-bar';
import bottomNav from './components/bottom-nav';
export default {
    name: 'App',
    components: { appBar, bottomNav },
    data: () => ({
        //
    }),
};
</script>
<style lang="scss" scoped>
.top-level-enter,
.top-level-leave-to {
    opacity: 0;
}

.top-level-leave-active {
    transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
}
.top-level-enter-active {
    transition: opacity 0.25s cubic-bezier(0.4, 0, 1, 1);
}
// .top-level-leave-active,
// .top-level-enter-active {
//     transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1);
// }
</style>
