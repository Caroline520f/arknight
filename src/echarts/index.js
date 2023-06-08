import * as echarts from 'echarts';
import { Request } from '@/hooks/request';
import url from '@/api/url';
import { reactive } from 'vue';
import store from '@/store';
//靶向药实验数据的复合折线统计图
export async function expMedicals(dom) {
    //获取数据
    let sources = await Request.get(url.database.home.expMedicals);
    //调用仓库方法，将数据存入仓库
    store.commit('database/CHANGE_EXP_MEDICAL', sources.data.datas);
    store.commit('CHANGE_STORE', 'isexpMedical');

    //处理数据
    sources = sources.data.datas.map(item => ({
        medical_name: item.medical_name,
        鳞癌ORR: item.id > 9 ? '' : item.medical_ORR.slice(0, item.medical_ORR.indexOf('%')),
        鳞癌OS: item.id > 9 ? '' : item.medical_OS == '/' ? '' : item.medical_OS,
        非鳞癌ORR: item.id > 9 ? item.medical_ORR.slice(0, item.medical_ORR.indexOf('%')) : '',
        非鳞癌OS: item.id > 9 ? (item.medical_OS == '/' ? '' : item.medical_OS) : '',
        company: item.company,
        medical_Tree: item.medical_TREE,
        id: item.id
    }));
    //初始化echarts
    let exp = echarts.init(dom);
    //配置项
    let option = {
        title: {
            text: "医疗公司的靶向药(鳞癌和非鳞癌)实验数据",
        },
        //图例
        legend: {
            orient: 'horizontal',
            right: 10,
            top: 0
        },
        dataset: {
            dimensions: [
                "medical_name",
                "鳞癌ORR",
                "鳞癌OS",
                "非鳞癌ORR",
                "非鳞癌OS",
                "company",
                "medical_Tree",
                "id",
            ],
            source: sources
        },
        xAxis: {
            type: 'category'
        },
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 100,
            },
            {
                type: "value",
                min: 0,
                max: 100,
            }
        ],
        tooltip: {
            trigger: 'axis',//触发类型
            //映射数据
            formatter: (params) => {
                const { dimensionNames, data } = params[0];
                return `
                    <section>
                        <div class="ball"></div>
                        <span>${dimensionNames[6]}:</span>
                        <span style="margin-left:2vw;font-weight:bold">${data.company}</span>
                    </section>
                    <section>
                        <div class="ball"></div>
                        <span>${dimensionNames[7]}:</span>
                        <span style="margin-left:2vw;font-weight:bold">${data.medical_Tree}</span>
                    </section>
                    <section>
                        <div class="ball"></div>
                        <span>${dimensionNames[2]}:</span>
                        <span style="margin-left:2vw;font-weight:bold">${data["鳞癌ORR"]}%</span>
                    </section>
                    <section>
                        <div class="ball"></div>
                        <span>${dimensionNames[3]}:</span>
                        <span style="margin-left:2vw;font-weight:bold">${data["鳞癌OS"]}%</span>
                    </section>
                    <section>
                        <div class="ball"></div>
                        <span>${dimensionNames[4]}:</span>
                        <span style="margin-left:2vw;font-weight:bold">${data["非鳞癌ORR"]}%</span>
                    </section>
                    <section>
                        <div class="ball"></div>
                        <span>${dimensionNames[5]}:</span>
                        <span style="margin-left:2vw;font-weight:bold">${data["非鳞癌OS"]}%</span>
                    </section>
                `;
            },

        },
        series: [
            '鳞癌ORR',
            '鳞癌OS',
            '非鳞癌ORR',
            '非鳞癌OS'
        ].map((name) => ({
            type: 'line',
            name,
            label: {
                show: true,
                formatter: `{a}:{b}`
            }
        }))
    };
    //将配置项放入echarts实例中
    exp.setOption(option);
}

//环状图
export async function basicMedicals(dom) {
    let sources = await Request.get(url.database.home.basicMedical);
    let source = sources.data.datas; //获取数据并将数据存入source
    const newData = reactive([]); //创建响应式数据
    //将数据处理成环状图所需的数据
    let data = [...new Set(source.map(item => item.medical_company))]//获取医疗公司
    //将数据存到vuex中
    store.commit('database/CHANGE_BASIC_MEDICAL', data);
    store.commit('CHANGE_STORE', 'isbasicMedical');
    //处理数据集对象
    function rehandle(index, item) {
        //判断数据是否存在
        if (newData[index] == undefined) {
            newData.push({ //不存在则创建对象
                name: item.medical_company, //医疗公司
                value: 0, //初始值为0
                label: {
                    formatter: `{b}:{c}款，占市场的{d}%` //提示框的格式
                }
            });
        }
        newData[index].value++; //存在则将value值加1
    }

    source.forEach(item => {
        data.forEach((val, index) => {
            if (val == item.medical_company) {
                rehandle(index, item)
            }
            // switch(item.medical_company){
            //     case val:
            //         rehandle(index, item)
            //         break;
            // }
        });
    });

    let rin = echarts.init(dom)

    let option = {
        legend: {
            orient: 'vertical', //图例的排列方式为垂直
            right: 10, //图例距离右边的距离
            top: 'center', //图例距离上边的距离
        },
        title: {
            text: "各医疗公司所持有的靶向药数量市场占比",
        },
        series:{
            type: 'pie', //图表类型为饼图
            left: -100, //图表距离左边的距离
            radius: ['70%', '80%'], //饼图的半径
            avoidLabelOverlap: false, //是否启用防止标签重叠
            label:{
                position: 'center', //标签的位置
                show: false, //是否显示标签
            },
            emphasis: { //鼠标移入饼图时的样式
                label: {
                    show: true,
                    fontSize:'1.25rem',
                    fontWeight: 'bold',
                    color:'#ff0000'
                },
            },
            data: newData //数据
        },
    }
    rin.setOption(option)
}