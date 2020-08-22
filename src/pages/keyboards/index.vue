<template>
    <div>
        <h1 class="display-2">Mechanical Keyboards</h1>
        <v-hover>
            <template v-slot="{ hover }">
                <div
                    :class="`elevation-${hover ? 24 : 6}`"
                    class="mx-auto pa-6 transition-swing"
                >
                    Class based elevation
                </div>
            </template>
        </v-hover>
    </div>
</template>
<script>
export default {
    name: 'keyboards',
    metaInfo: {
        title: "Francis Usher's keyboard creations.",
        description: 'Mechanical keyboard design, production, and modding.',
        htmlAttrs: {
            lang: 'en',
            amp: true,
        },
    },
};
</script>
