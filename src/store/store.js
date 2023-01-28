import { createStore } from "vuex";

let store = createStore({

    state : {

        ready: false,

        teleport: { name: null, data: null },

        form: {},

        calculated: {

            own: 0,
            agency: 0,
            total: 0

        },

        user: JSON.parse(localStorage.getItem("user"))

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

            state.calculated.total = Number(calculator.total).toFixed(4)

            state.calculated.agency = Number(calculator.agency).toFixed(4)

            state.calculated.own = Number(calculator.total - calculator.agency).toFixed(4)
            
        },

        load(state, ready) {

            if(ready == 'start') {

                state.ready = false

            }

            if(ready == 'finish') {

                state.ready = true

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

        load({ commit }, ready) {

            commit('load', ready)

        }

    },

    getters: {

        roles(state) {

            return {

                application: {
                    
                    view: {
                        reviewer: [3,4,5,6].includes(state.user.role.id),
                        officer: [2,3,5,6].includes(state.user.role.id)
                    },
                    requests: {
                       upload: [1].includes(state.user.role.id),
                       read: [2,3,4].includes(state.user.role.id)
                    },
                    manage: [2,3,4,5,6].includes(state.user.role.id),
                    add: [1].includes(state.user.role.id),
                    send: [1].includes(state.user.role.id),
                    edit: [1].includes(state.user.role.id),
                    report: [5,6].includes(state.user.role.id)

                },

                manage: {

                    review: [2].includes(state.user.role.id),
                    users: [6].includes(state.user.role.id),
                    projects: [6].includes(state.user.role.id),
                    add: {
                        request: [4,5,6].includes(state.user.role.id)
                    },
                    change: {

                        reviewer: [3,6].includes(state.user.role.id),
                        officer: [5,6].includes(state.user.role.id),
                        status: [4,5,6].includes(state.user.role.id),
                        ongoing_status: [4,5,6].includes(state.user.role.id),
    
                    }

                }

            }

        }

    }
    
});

export default store;