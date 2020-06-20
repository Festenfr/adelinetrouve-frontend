<template>
    <div class="card_chart">
        <div class="menu">
            <div class="container_btn">
                <v-select
                    :items="pages"
                    label="Voir les Ventes par package"
                ></v-select>
            </div>
            <div class="container_btn">
                <v-btn
                    style="margin:10px"
                    :color="isActive === 'annee' ? 'primary' : 'darken3'"
                >
                    Année
                </v-btn>
                <v-btn
                    style="margin:10px"
                    :color="isActive === 'annee' ? 'primary' : 'darken3'"
                >
                    Mois
                </v-btn>
                <v-btn
                    style="margin:10px"
                    :color="isActive === 'annee' ? 'primary' : 'darken3'"
                >
                    Jour
                </v-btn>
            </div>
            <div class="container_btn">
                <v-btn icon style="margin:10px">
                    <v-icon>
                        mdi-chevron-left
                    </v-icon>
                </v-btn>
                <v-btn icon style="margin:10px">
                    <v-icon>
                        mdi-chevron-right
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <canvas id="myChart" width="400" height="400"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    data() {
        return {
            isActive: '',
            pages: ['Accueil', 'projet', 'photo', 'contact'],
            page: ''
        }
    },
    mounted() {
        var ctx = document.getElementById('myChart').getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    '0',
                    '1',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23',
                    '24'
                ],

                datasets: [
                    {
                        label: 'Visite',
                        data: [
                            5,
                            9,
                            2,
                            7,
                            8,
                            4,
                            5,
                            6,
                            3,
                            2,
                            8,
                            1,
                            5,
                            4,
                            6,
                            9,
                            8,
                            5,
                            9,
                            6,
                            7,
                            4,
                            5,
                            6,
                            3,
                            2,
                            5,
                            7,
                            8,
                            9,
                            5,
                            8,
                            7
                        ],
                        backgroundColor: '#01878655',
                        borderColor: '#03dac',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
        console.log(myChart)
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 800px) {
    .card_chart {
        position: relative;
        width: 40vw;
        z-index: 5;
        height: 50%;
        background-color: var(--color-2);
        padding: 20px;
        border-radius: 10px 10px 10px 10px;
    }
    .container_btn {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
@media screen and (max-width: 800px) {
    .card_chart {
        width: 80vw;
        height: 50%;
        background-color: var(--color-2);
        padding: 20px;
        border-radius: 10px 10px 10px 10px;
    }
}
</style>
