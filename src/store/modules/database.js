export default{
    namespaced:true,
    state(){
        return{
            menuList:null,
            menuRoutes:null,
            baseMedical:null,
            expMedical:null,
            expMedicals:null
        }
    },
    getters:{},
    mutations:{
        CHANGE_MENULIST(state,data){
            state.menuList = data.menuList
            state.menuRoutes = data.a
        },
        CHANGE_BASIC_MEDICAL(state,data){
            state.baseMedical = data
        },
        CHANGE_EXP_MEDICAL(state,data){
            state.expMedical = data
        },
        CHANGE_EXP_MEDICALS(state,data){
            state.expMedicals = data
        }
    },
    actions:{}
}