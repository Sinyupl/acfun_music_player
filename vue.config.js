module.exports = {
    filenameHashing: false,
    css: {
        extract: false
    },
    lintOnSave: false,
    configureWebpack: config => {
        config.optimization.minimize = false
        if (process.env.NODE_ENV === 'test') {
            config.externals = {
                vue: 'Vue',
                vuex: 'Vuex'
            }
        }
    }
    // {
    //     optimization: {
    //         minimize: false,
    //     },
    //     externals: {
    //         vue: 'Vue',
    //         vuex: 'Vuex'
    //     }
    // },
    //lintOnSave: false,

}