import { createStore, createLogger } from 'vuex';

import {
    AuthModule,
    Store as AuthStore,
    State as AuthState,
} from './modules/AuthModule';

export type State = {
    auth: AuthState;
};

export type Store = AuthStore<Pick<State, 'auth'>>;

export const store = createStore({
    plugins: import.meta.env.MODE === 'production' ? [] : [createLogger()],
    modules: {
        AuthModule
    },
});

export function useStore(): Store {
    return store as Store;
}

export default store;
