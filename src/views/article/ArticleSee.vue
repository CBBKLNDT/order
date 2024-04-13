<script setup>
import * as echarts from 'echarts'
import { artDelService, artGetListService } from '../../api/article';

import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue';
const articleList = ref([])
//const { proxy } = getCurrentInstance()
const chart = ref() // dom实例
let myChart = null // echarts实例
const params = ref({
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
})
onMounted(() => {
    renderChart()
})
const renderChart = async () => {
    const res = await artGetListService(params.value)
    articleList.value = res.data.data
    var List = []
    var map = new Map()
    res.data.data.forEach((item) => {
        List.push(item.cate_name)
        if (map.has(item.cate_name)) {
            map.set(item.cate_name, map.get(item.cate_name) + 1)
        } else {
            map.set(item.cate_name, 1)
        }
    })

    List = Array.from(new Set(List))
    const List2 = []
    map.forEach((value, key) => {
        List2.push(value)
    })
    console.log(List2)

    myChart = echarts.init(document.getElementById('chart'))

    myChart.setOption({
        title: {
            text: '违约类型数量分析'
        },
        tooltip: {},
        legend: {
            data: ['数量']
        },
        xAxis: {
            data: List
        },
        yAxis: {
            minInterval: 1
        },
        series: [
            {

                data: List2,
                type: 'bar',
                barWidth: 25,
                showBackground: true,
                backgroundStyle: {
                    color: '#0b224d'//改变柱子的背景颜色
                },

            }
        ]
    });
}



</script>


<template>
    <page-container title="违约情况分析">
        <div id="chart" ref="articleList"></div>
    </page-container>
</template>




<style lang="scss" scoped>
#chart {
    width: 400px;
    height: 400px;
    margin: 0 auto;
}
</style>