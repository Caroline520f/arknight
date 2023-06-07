<template>
    <div>
        <div class="main">

        </div>
        <router-view />
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'testPage',
    setup() {
        let myChart = echarts.init(document.getElementById('main'));
        console.log(document.getElementById('main'))
        let option = {
            title: {
                text: "the Wrold's economic",
            },
            tooltip: {},
            xAxis:{
                type: 'category',
                data:['world','China','India','USA','Indonesia','Brazil']
            },
            yAxis:{},
            series:[
                {
                    type:'bar',
                    name:'World',
                    data:[]
                },
                {
                    type:'bar',
                    name:'China',
                    data:[100323,101233]
                },
                {
                    type:'bar',
                    name:'India',
                    data:[100333,101233]
                },
                {
                    type:'bar',
                    name:'USA',
                    data:[55555,66666]
                },
                {
                    type:'bar',
                    name:'Indonesia',
                    data:[44444,455566]
                },
                {
                    type:'bar',
                    name:'Brazil',
                    data:[23333,25555]
                }
            ]

        }
        myChart.setOption(option)

        return {}
    }
}
</script>

<style lang="scss" scoped></style>