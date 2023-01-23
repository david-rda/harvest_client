import { createStore } from "vuex";

let store = createStore({

    state : {

        loading: true,

        portal: {},

        form: {},

        calculated: {

            own: 0,
            agency: 0,
            total: 0

        },

        role : window.localStorage.getItem("role"),
        role_name : window.localStorage.getItem("role_name"),
        token : window.localStorage.getItem("token"),

    },

    mutations : {

        unportal(state) {

            state.portal = {}

        },

        teleport(state, data) {

            state.portal = data

        },

        inputs(state, form) {

            state.form = form

        },

        calculate(state, calculator) {

            console.log("Calculating ...")

            state.calculated.total = Number(calculator.total).toFixed(4)

            state.calculated.agency = Number(calculator.agency).toFixed(4)

            state.calculated.own = Number(calculator.total - calculator.agency).toFixed(4)
            
        },

        load(state, loading) {

            if(loading == 'start') {

                state.loading = true

            }

            if(loading == 'finish') {

                state.loading = false

            }

        },

        role(state) {
            state.role = window.localStorage.getItem("role");
        },

        roleName(state) {
            state.role_name = window.localStorage.getItem("role_name");
        },

        token(state) {
            state.token = window.localStorage.getItem("token");
        }
    },

    actions : {

        unportal({ commit }) {

            commit('unportal')

        },

        teleport({ commit }, data) {

            commit('teleport', data)

        },

        inputs({ commit }, form) {

            commit('inputs', form)

        },

        calculator({ commit }, calculator) {

            commit('calculate', calculator)

        },

        load({ commit }, state) {

            commit('load', state)

        },

        setRole(context) {
            context.commit("role");
        },

        setRoleName(context) {
            context.commit("roleName");
        },

        setToken(context) {
            context.commit("token");
        }

    }
});

export default store;