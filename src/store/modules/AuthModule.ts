import {
    ActionContext,
    ActionTree,
    GetterTree,
    MutationTree,
    Module,
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
} from 'vuex';

import { State as RootState } from '../index';
import store from '../index';
import AuthService from '../../services/AuthService';
import { LoggedUser, UserCredentials } from '../../types/AuthTypes';


// Declare state
export type State = {
    loggedIn: boolean;
    user?: LoggedUser;
};

// Create initial state
const state: State = {
    loggedIn: sessionStorage.getItem('token')? true : false,
    user: sessionStorage.getItem('token')? JSON.parse(localStorage.getItem('user') as string): undefined,
};

// Mutation contracts
export type Mutations<StateType = State> = {
    loginSuccess(state: StateType, data: LoggedUser): void;
    loginFailure(state: StateType): void;
    logout(state: StateType): void;
};

// Define mutations
const mutations: MutationTree<State> & Mutations = {
    loginSuccess(state: State, data: LoggedUser) {
        state.loggedIn = true;
        state.user = data;
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data));
    },
    loginFailure(state: State) {
        state.loggedIn = false;
        state.user = undefined;
    },
    logout(state: State) {
        state.loggedIn = false;
        state.user = undefined;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    },
};

// Actions context
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

// Actions contracts
export interface Actions {
    login({ commit }: AugmentedActionContext, data: UserCredentials): Promise<void>;
};

// Define actions
export const actions: ActionTree<State, RootState> & Actions = {
    async login({ commit }, data: UserCredentials): Promise<void> {

        return AuthService.login(data)
            .then(async (response: LoggedUser) => {

                store.commit('loginSuccess', response);
            })
            .catch(async (error: any) => {

                store.commit('loginFailure');
            })
    }
};

// getters types
export type Getters = {
    isLoggedIn(state: State): boolean;
    getUserData(state: State): LoggedUser|undefined;
    getAuthToken(state: State): string|undefined;
};

// getters
export const getters: GetterTree<State, RootState> & Getters = {
    isLoggedIn: (state) => {

        return state.loggedIn;
    },
    getUserData: (state) => {

        return state.user;
    },
    getAuthToken: (state) => {

        return state.user?.token
    }
};

//setup store type
export type Store<S = State> = Omit<
    VuexStore<S>,
    'commit' | 'getters' | 'dispatch'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>;
    };
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload?: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>;
};

export const AuthModule: Module<State, RootState> = {
    state,
    mutations,
    actions,
    getters,
};
