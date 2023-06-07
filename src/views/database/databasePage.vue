<template>
    <div class="common-layout">
        <el-container style="height: 100vh;width: 100vw;">
            <!-- 侧边栏 -->
            <el-aside :width="!isCollapse ? '12vw' : '4vw'" :style="{ transition: 'all 0.25s 0s linear', }">
                <el-menu background-color="#545C64" text-color="#fff" active-text-color="#409EFF"
                    class="el-menu-vertical-demo" default-active="0" :collapse="isCollapse" style="height: 100%">
                    <el-menu-item v-for="(item, index) in databaseMenu" :key="index" :index="index.toString()"
                        v-show="!item.meta.isIframe" @click="toPage(index)">
                        {{ item.meta.title }}
                    </el-menu-item>
                    <el-sub-menu v-for="(item, index) in databaseMenu" :key="index" :index="index.toString()"
                        v-show="item.meta.isIframe">
                        <template #title>
                            <el-icon>
                                <Setting />
                            </el-icon>
                            <span> {{ item.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="(item2, index2) in item.children" :key="index + '' + index2"
                            :index="index.toString() + '-' + index2.toString()" v-show="!item2.meta.isIframe"
                            @click="toPage(index, index2)">
                            {{ item2.meta.title }}
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <!-- 主要内容 -->
            <router-link :to="{ name: '', query }"></router-link>
            <el-container>
                <el-header style="height: 11.5vh; grid-template-columns: 1fr">
                    <el-menu :default-active="0" mode="horizontal" :ellipsis="false" style=" height: 6vh;">
                        <el-menu-item index="0">
                            <el-radio-group v-model="isCollapse">
                                <el-radio-button :label="!isCollapse">
                                    <el-icon v-show="isCollapse">
                                        <Expand />
                                    </el-icon>
                                    <el-icon v-show="!isCollapse">
                                        <Fold />
                                    </el-icon>
                                </el-radio-button>
                            </el-radio-group>
                        </el-menu-item>
                        <el-menu-item index="1">
                            <!-- 面包屑 -->
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item :to="{ name: 'homePage', params: { userId } }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item v-show="route.meta.isHide">
                                    {{ metaName }}</el-breadcrumb-item>
                                <el-breadcrumb-item v-show="route.meta.isHide" :style="{
                                    Animation: 'breadcrumb 0.25s 0s linear',
                                }">{{ route.meta.title }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>

                        </el-menu-item>
                        <div style=" flex-grow: 1" />
                        <el-menu-item index="2">
                            <el-icon>
                                <CirclePlus />
                            </el-icon>
                            <el-icon>
                                <Mic />
                            </el-icon>
                            <el-icon>
                                <Search />
                            </el-icon>
                            <el-icon>
                                <Bicycle />
                            </el-icon>
                            <el-icon>
                                <Sunset />
                            </el-icon>
                            <el-icon>
                                <FullScreen />
                            </el-icon>
                        </el-menu-item>
                        <el-sub-menu index="3">
                            <template #title>
                                <span>{{ baseMsg[1].inputs[0].inputItem }}</span>
                            </template>
                            <el-menu-item index="3-1">item one</el-menu-item>
                            <el-menu-item index="3-2">item two</el-menu-item>
                            <el-menu-item index="3-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                    <el-tabs v-model="title" type="card" class="demo-tabs" closable @tab-remove="removeTab"
                        @tab-click="toTab">
                        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title"
                            :name="item.name"></el-tab-pane>
                    </el-tabs>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  

<script>
import indexScss from '@/public/database/index.scss'
import { ref, toRefs, reactive, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
    name: "databasePage",
    setup() {
        const router = useRouter();
        const route = useRoute();
        let tabs = ref([]);
        let metaName = ref(""); // 控制面包屑的内容展示
        let title = ref(route.meta.title); // 控制标签页v-model值
        onUpdated(() => {
            setTimeout(() => {
                isPlay.value = false;
            }, 250);
            let newStr = route.fullPath.slice(10);
            let newStr2 = newStr.slice(0, newStr.indexOf("/"));
            switch (newStr2) {
                case "system":
                    metaName.value = "系统管理";
                    break;
                case "fun":
                    metaName.value = "功能";
                    break;
                case "pages":
                    metaName.value = "页面";
                    break;
            }
            let newTabs = tabs.value.map((item) => item.title);
            if (!newTabs.includes(route.meta.title)) {
                tabs.value.push({
                    title: route.meta.title,
                    name: route.meta.title,
                    routeName: route.name
                });
            }
            title.value = route.meta.title;
        });
        let isPlay = ref(false);
        let isCollapse = ref(false);
        let pages = reactive(JSON.parse(sessionStorage.getItem("database")).databaseMenu);
        let userId = JSON.parse(localStorage.getItem("users")).userId;
        // 前往不同的路由页面，并给予动态路由参数
        function toPage(i, j) {
            route.meta.isHide = false;
            isPlay.value = true;
            if (j == undefined) {
                router.push({
                    name: pages[i].name,
                    params: {
                        userId
                    }
                });
            }
            else {
                router.push({
                    name: pages[i].children[j].name,
                    params: {
                        userId
                    }
                });
            }
        }
        // 
        function toTab(target) {
            route.meta.isHide = false;
            isPlay.value = true;
            // console.log(target);
            tabs.value.forEach((item) => {
                if (item.name === target.paneName) {
                    router.push({
                        name: item.routeName,
                        params: {
                            userId
                        }
                    });
                }
            });
        }
        setTimeout(() => {
            router.push({
                name: "homePage",
                params: {
                    userId
                }
            });
        }, 1000);
        const removeTab = (targetName) => {
            const newTabs = tabs.value;
            let activeName = title.value;
            if (activeName === targetName) {
                newTabs.forEach((item, index) => {
                    if (item.name === targetName) {
                        const nextTab = newTabs[index + 1] || newTabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                            console.log(activeName);
                            toTab({ paneName: activeName });
                        }
                    }
                });
            }
            title.value = activeName;
            tabs.value = newTabs.filter((item) => item.name !== targetName);
            tabs.value = reactive(tabs.value);
        };
        return {
            isCollapse,
            ...toRefs(JSON.parse(sessionStorage.getItem("database"))),
            toPage,
            ...toRefs(JSON.parse(sessionStorage.getItem("baseMsg"))),
            userId,
            route,
            metaName,
            isPlay,
            removeTab,
            title,
            tabs,
            toTab,
            indexScss
        };
    },
}
</script>

<style lang="scss" scoped></style>