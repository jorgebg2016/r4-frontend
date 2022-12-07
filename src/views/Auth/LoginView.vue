<template>
    <div class="login-page row justify-center items-center bg-grey-10">
        <q-card class="login-form shadow-9 bg-grey-9">
            <q-card-section class="q-pa-lg row justify-center">
                <span class="text-h5 text-bold text-grey-5">
                    {{ $t('app') }}
                </span>
            </q-card-section>
            <q-card-section class="q-py-md">
                <q-input color="grey-5" rounded outlined v-model="refs.email.value" :label="$t('auth.email')" >
                    <template v-slot:prepend>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-section class="q-py-md">
                <q-input color="grey-5" :type="passType" rounded outlined v-model="refs.password.value" :label="$t('auth.password')" >
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                        <q-icon :name="passIcon" @click="changeVisibility" class="cursor-pointer" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-section class="q-pa-lg row justify-center">
                <q-btn @click="login" color="primary" class="q-py-sm q-px-lg text-h6 shadow-1" :label="$t('auth.login')" push></q-btn>
            </q-card-section>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, ComputedRef, reactive } from 'vue';
import store from '../../store';
import router from '../../router';
import { UserCredentials } from '../../types/AuthTypes';

interface Refs {
    email: Ref<string|null>;
    password: Ref<string|null>;
};

interface Book {
    visibility: boolean;
};

export default defineComponent({
    setup() {

        const refs: Refs = {
            email: ref(null),
            password: ref(null)
        };

        const state: Book = reactive({
            visibility: false,
        });

        const passType: ComputedRef<"text"|"password"> = computed(()=>{

            if(state.visibility == true) return 'text';

            return 'password'
        });

        const passIcon: ComputedRef<"visibility_off"|"visibility"> = computed(()=>{

            if(state.visibility) return 'visibility_off';

            return 'visibility';
        });

        function changeVisibility(): void {


            state.visibility = !state.visibility;
        };

        async function login(): Promise<void> {

            if(refs.email.value && refs.password.value) {

                const data: UserCredentials = {
                    email: refs.email.value,
                    password: refs.password.value
                };

                await store.dispatch('login', data);

                if(store.getters.isLoggedIn) router.push({ name: 'Dashboard' });
            }
        };

        return {
            refs,
            state,
            passType,
            passIcon,
            changeVisibility,
            login
        };
    }
});
</script>

<style scoped>

    .login-page {
        height: 100%;
        width: 100%;
    }

    .login-form {
        width: 400px;
    }

    @media (max-width: 400px) {
        .login-form {
            width: 90%;
        }
    }

    @media (max-width: 700px) {
        .login-form {
            width: 70%;
        }
    }
</style>