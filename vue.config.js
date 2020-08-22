module.exports = {
    pwa: {
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true,
        },
        name: 'Usher Codes',
        themeColor: '#303030',
        msTileColor: '#424242',
        appleMobileWebAppStatusBarStyle: 'black-translucent',
    },
    chainWebpack: config => {
        config.plugin('VuetifyLoaderPlugin').tap(() => [
            {
                progressiveImages: true,
            },
        ]);
        config.module
            .rule('webp')
            .test(/\.(jpe?g|png)/)
            .use('imagemin-webp-webpack-plugin')
            .loader('imagemin-webp-webpack-plugin')
            .end();
    },
};
