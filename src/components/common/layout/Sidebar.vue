<template>
    <q-drawer
        v-model="props.show"
        :breakpoint="700"
        class="sidebar bg-grey-10 shadow-1"
    >
        <q-scroll-area class="fit">
            <QList separator class="left-navbar text-blue-grey-11">
                <QItem clickable class="sidebar-mobile-bar q-py-sm">
                    <q-item-section avatar side class="row justify-between full-width q-py-xs q-px-none">
                        <q-btn flat round dense icon="menu" @click="showHideSidebar" class="self-end q-ma-none" />
                    </q-item-section>
                </QItem>
                <QItem clickable class="q-py-md"
                    v-for="(item, index) in navbarItems" :key="index" v-ripple 
                    :active="false" :ref="item.ref"
                >
                    <q-item-section avatar><q-icon :name="item.icon" /></q-item-section>
                    <q-item-section>{{ item.label }}</q-item-section>
                </QItem>
            </QList>
        </q-scroll-area>
    </q-drawer>
</template>

<script lang="ts">
import { QItem } from 'quasar';
import { defineComponent, Ref, ref, SetupContext } from 'vue';

interface NavbarItem {
    name: string;
    icon: string;
    ref: Ref<InstanceType<typeof QItem>|null>;
    label: string;
}

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any, { emit }: SetupContext) {

        const navbarItems: NavbarItem[] = [
            {
                name: 'dashboardOption',
                icon: 'dashboard',
                label: 'Dashboard',
                ref: ref(null)
            },
            {
                name: 'categoriesOption',
                icon: 'category',
                label: 'Categorias',
                ref: ref(null)
            },
            {
                name: 'productsOption',
                icon: 'inventory_2',
                label: 'Produtos',
                ref: ref(null)
            },
        ];

        function showHideSidebar(): void {

            emit('showHide');
        };

        return {
            props,
            navbarItems,
            showHideSidebar
        };
    }
});
</script>

<style scoped>

.sidebar {
    width: 300px;
}

.sidebar-mobile-bar {
    display: none;
}

@media (max-width: 700px) {
    .sidebar-mobile-bar {
        display: block;
    }
}
</style>