<template>
    <div class="q-pa-none relative-box">
        <q-layout view="hHh Lpr fFf" container class="relative-box">

            <q-header class="bg-grey-10 shadow-1">
                <q-toolbar>
                    <q-toolbar-title>R4 frontend</q-toolbar-title>
                </q-toolbar>
            </q-header>
    
            <q-footer class="bg-grey-10 shadow-up-3">
                <q-toolbar>
                    <q-toolbar-title></q-toolbar-title>
                </q-toolbar>
            </q-footer>
    
            <Sidebar :show="state.drawerLeft" 
                @showHide="() => { state.drawerLeft = !state.drawerLeft }"
            >
            </Sidebar>
    
            <q-page-container style="height: 100%;">

                <q-page style="padding-top: 75px" class="q-pa-md bg-grey-10">

                    <div class="q-pa-sm" style="height: 100px;">
                        <slot name="content"></slot>
                    </div>
        
                    <q-page-sticky position="top" expand class="bg-grey-10 shadow-down-3 text-blue-grey-11 q-py-xs shadow-1">
                        <q-toolbar class="row">
                            <div class="col-auto q-mr-lg">
                                <q-btn flat @click="state.drawerLeft = !state.drawerLeft" round dense icon="menu" />
                            </div>
                            <div class="col-auto row">
                                <slot name="breadcrumb"></slot>
                            </div>
                        </q-toolbar>
                    </q-page-sticky>
                </q-page>
        
                <q-page-scroller position="bottom">
                    <q-btn fab icon="keyboard_arrow_up" color="red" />
                </q-page-scroller>

            </q-page-container>

        </q-layout>
    </div>
</template>
  
<script lang="ts">
import { ref, Ref, defineComponent, reactive } from 'vue';
import { QList, QItem } from 'quasar';
import Sidebar from './Sidebar.vue';


export default defineComponent({
    components: {
        QList,
        QItem,
        Sidebar
    },
    setup() {

        const state = reactive({
            drawerLeft: ref(true)
        });

        return {
            state
        };
    }
});
</script>

<style scope>

.left-navbar {
    font-size: 16px;
    color: whitesmoke;
}

</style>
  