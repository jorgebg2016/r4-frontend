<template>
    <Base>
        <template v-slot:breadcrumb>
            <span v-for="i in 3" :key="i" class="q-mr-md">
                Local_{{ i }}
            </span>
        </template>
        <template v-slot:content>
            <q-card class="bg-grey-9">
                <q-card-section>
                    Detail Category
                </q-card-section>
            </q-card>
        </template>
    </Base>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Base from '../../components/common/layout/Base.vue';

export default defineComponent({
    components: {
        Base
    },
    props: {
        category_id: {
            type: Number,
            default: 0
        }
    },
    setup(props: any) {

        return {};
    }
});
</script>