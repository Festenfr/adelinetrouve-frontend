export default {
    router: {
        middleware: ['checkAuth']
    },
    mode: 'universal',
    head: {
        htmlAttrs: {
            lang: 'fr'
        },
        title: '******',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family==Montserrat&display=swap|Playfair+Display:wght@400;600&display=swap'
            },
            { rel: 'import', href: 'https://vjs.zencdn.net/5.19/video-js.css' }
        ],
        script: [
            { src: 'https://vjs.zencdn.net/ie8/1.1/videojs-ie8.min.js' },
            { src: 'https://vjs.zencdn.net/5.19/video.js' }
        ]
    },
    loading: {
        color: '#a2564b',
        height: '2px'
    },
    css: ['./assets/main.scss'],
    axios: {
        proxy: true,
        prefix: '/api'
    },
    serverMiddleware: ['redirect-ssl'],
    buildModules: ['@nuxtjs/eslint-module'],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '~/modules/api',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots'
    ],
    plugins: [
        { src: '@/plugins/vuetify', ssr: false },
        { src: '@/plugins/ksvuefp', ssr: false },
        { src: '@/plugins/global', ssr: false },
        '~/plugins/interceptors'
    ],
    robots: {
        UserAgent: '*',
        Disallow: '/admin/**'
    },
    sitemap: {
        hostname: 'https://www.*******.com',
        gzip: true,
        exclude: ['/administration/**']
    },
    pwa: {
        manifest: {
            name: '******',
            short_name: '******',
            lang: 'fr',
            display: 'standalone'
        },
        meta: {
            name: '*******************',
            author: 'Wesley Dorsey',
            description: '*******************************',
            ogDescription: '******************************',
            lang: 'fr'
        }
    },
    build: {
        transpile: ['gsap', 'GLTFLoader.js', 'OrbitControls.js'],
        extend() {}
    }
}
