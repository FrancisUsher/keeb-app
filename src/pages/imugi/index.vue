<template>
    <div>
        <h1 class="display-2">Imugi</h1>
        <h2>A 40% Ergo/Alice Hybrid</h2>
        <template>
            <v-carousel>
                <v-carousel-item>
                    <v-img src="/img/keebs/imugi/prototypes/rev-0-2.jpg">
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-carousel-item>

                <v-carousel-item>
                    <v-img src="/img/keebs/imugi/prototypes/rev-0-1.jpg">
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-carousel-item>
                <v-carousel-item>
                    <v-img src="/img/keebs/imugi/prototypes/pcb-0-2.jpg">
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-carousel-item>
                <v-carousel-item>
                    <v-img src="/img/keebs/imugi/prototypes/pcb-prototypes.jpg">
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-carousel-item>
                <v-carousel-item>
                    <v-img src="/img/keebs/imugi/prototypes/seoul-street.jpg">
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-carousel-item>
            </v-carousel>
        </template>
    </div>
</template>
<script>
export default {
    name: 'imugi',
    metaInfo: {
        title: 'keeb.app | Imugi 40% Ergo-Alice Hybrid',
        description:
            'Inspired by the Alice and its open-source derivations by FateNozomi and PrimeKB.',
        htmlAttrs: {
            lang: 'en',
            amp: true,
        },
    },
};
</script>
