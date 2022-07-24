module.exports = {
    // css: {
    //     loaderOptions: {
    //         scss: {
    //             additionalData: `@import "@/assets/sass/main.scss";`
    //         }
    //     }
    // },
    // publicPath: '',
    devServer: {
        host: '192.168.56.102', // can be overwritten by process.env.HOST
        port: 8888,
        disableHostCheck: true,
    },
};
