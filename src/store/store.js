import { createStore } from "vuex";

let store = createStore({

    state : {

        loading: true,

        teleport: { name: null, data: null },

        form: {},

        calculated: {

            own: 0,
            agency: 0,
            total: 0

        }

    },

    mutations : {

        close(state) {

            state.teleport = { title: null, name: null, data: null }

        },

        open(state, teleport) {

            state.teleport.name = teleport.name

            state.teleport.data = teleport.data

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

        }

    },

    actions : {

        close({ commit }) {

            commit('close')

        },

        open({ commit }, teleport) {

            commit('open', teleport)

        },

        inputs({ commit }, form) {

            commit('inputs', form)

        },

        calculator({ commit }, calculator) {

            commit('calculate', calculator)

        },

        load({ commit }, state) {

            commit('load', state)

        }

    }
    
});

export default store;