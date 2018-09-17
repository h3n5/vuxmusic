export default {
    namespaced: true,
    state: {
        pullingDownFlag: false,
        pullingUpFlag: false,
        tabIndex: ''
    },
    getters: {


    },
    mutations: {
        pullingDownFlagChange(state, payload) {
            state.pullingDownFlag = payload
        },
        pullingUpFlagChange(state, payload) {
            state.pullingUpFlag = payload
        },
        tabIndexChange(state, value) {
            state.tabIndex = value
        }
    },
    actions: {


    }
}