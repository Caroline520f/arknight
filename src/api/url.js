export default {
    centerPage: { 
        centerImg: "api/personalCenter",
        mathCode: 'api/user/getCode',
        getTelCode: 'api/user/telCode',
        register: 'api/user/register',
        login:'api/user/login',
        codeLogin:'api/user/codeLogin',
        home:'person/home',
        baseMsg:{
            getBaseMsg:'person/baseMsg/userBasic',
        },
        resetPsw:{
            resetPsw:'person/resetPsw',
            code:'person/resetPsw/code'
        },
        exchangeGift:{
            datas:'person/exchangeGift/getGift',
            getContext:"person/exchangeGift/getContext"
        },
        selfInquiries:'person/selfInquiries',
        selfList:{
            infoBasic:'person/personalList/infoBasic',
            infoRealname:'person/personalList/infoRealname',
            infoBehavior:'person/personalList/infoBehavior',
            infoDevice:'person/personalList/infoDevice',
        },
        shareList:'person/shareList',
    },
    database:{
        layout:{
            menu:"/database/layout/menu"
        },
        home:{
            messages:"/database/home/messages",
            expMedicals:"/database/home/expMedicals",
            basicMedical:"/database/home/basicMedical",
            navTools:"/database/home/navTools",
            naweiCompany:"/database/home/naweiCompany",
        },
        menu:{
            addMenu:"/database/menu/addMedical",
            setMenu:"/database/menu/setMedical",
            delMenu:"/database/menu/delMedical"
        },
        role:{
            addMenu:"/database/role/addMedical",
            delMenu:"/database/role/delMedical"
        },
        user:{
            queryMedicals:"database/home/expMedical"
        }
    }
}