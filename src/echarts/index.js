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
    store.commit('database/CHANGE_EXP_MEDICAL', sources.data.datas)
    store.commit('CHANGE_STORE', 'isexpMedical')

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
export async function basicMedicals(dom){
    let sources = await Request.get(url.database.home.basicMedical);
    let source = sources.data.datas;
    const newData = reactive([])
}