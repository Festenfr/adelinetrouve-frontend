export default {
    router: {
        middleware: ['checkAuth']
    },
    mode: 'universal',
    head: {
        htmlAttrs: {
            lang: 'fr'
        },
        title: 'Adeline Trouvé',
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
                href: 'https://vjs.zencdn.net/5.19/video-js.css'
            }
        ],
        script: [
            { src: 'https://vjs.zencdn.net/ie8/1.1/videojs-ie8.min.js' },
            { src: 'https://vjs.zencdn.net/5.19/video.js' }
        ]
    },
    webfontloader: {
        google: {
            families: ['MontSerrat:400,700', 'Playfair Display:400,700']
        }
    },
    css: ['./assets/main.scss'],
    axios: {
        proxy: true,
        prefix: '/api'
    },
    serverMiddleware: ['redirect-ssl'],
    buildModules: ['@nuxtjs/eslint-module'],
    modules: [
        'nuxt-webfontloader',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '~/modules/api',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        'vue-scrollto/nuxt'
    ],
    plugins: [
        { src: '@/plugins/vuetify', ssr: false },
        { src: '@/plugins/global', ssr: true },
        { src: '@/plugins/interceptors', ssr: false }
    ],
    robots: {
        UserAgent: '*',
        Disallow: ['/admin', '/client']
    },
    sitemap: {
        hostname: 'https://www.adelinetrouve.com',
        gzip: true,
        exclude: ['/admin', '/client'],
        routes: [
            '/',
            '/about',
            '/login',
            '/contact',
            '/Histoire-contemporaine',
            "/De-nuit-et--d'eau-!",
            'Couleur-de-Terre',
            "/De-l'industriel-au-particulier",
            '/Lumière-et-transparence'
        ]
    },
    pwa: {
        manifest: {
            name: 'adeline trouvé',
            short_name: 'adeline trouvé',
            lang: 'fr',
            display: 'standalone'
        },
        meta: {
            name: 'adeline trouvé',
            author: 'Wesley Dorsey',
            description:
                "Architecte d'intérieur pour particuliers ou professionnels, réalisation de plans, maquette 3d, rendu graphique denier cri, ainsi que le suivi du chantier",
            ogDescription:
                "Architecte d'intérieur pour particuliers ou professionnels, réalisation de plans, maquette 3d, rendu graphique denier cri, ainsi que le suivi du chantier",
            lang: 'fr'
        }
    },
    build: {
        transpile: ['gsap', 'GLTFLoader.js', 'OrbitControls.js'],
        extend() {}
    }
}
