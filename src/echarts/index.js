import * as echarts from 'echarts/core';
import { Request } from '@/hooks/request';
import url from '@/api/url';
import { reactive } from 'vue';
import store from '@/store';

export async function expMedicals(dom) {
    //获取数据
    let sources = await Request.get(url.database.home.expMedicals);
    //调用仓库方法，将数据存入仓库
    store.commit('database/CHANGE_EXP_MEDICAL',sources.data.datas)
    store.commit('CHANGE_STORE','isexpMedical')

    //处理数据
    sources = sources.data.datas.map(item => ({
        medical_name:item.medical_name,
        鳞癌ORR:item.id > 9 ? '' : item.medical_ORR.slice(0,item.medical_ORR.indexOf('%')),
        鳞癌OS:item.id > 9 ? '' : item.medical_OS == '/' ? '' : item.medical_OS,
        非鳞癌ORR:item.id > 9 ? item.medical_ORR.slice(0,item.medical_ORR.indexOf('%')) : '',
        非鳞癌OS:item.id > 9 ? (item.medical_OS == '/' ? '' : item.medical_OS) : '',
        company:item.company,
        medical_Tree:item.medical_TREE,
        id:item.id
    }))
}