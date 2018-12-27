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
        pullingDownFlagChange(state) {
            state.pullingDownFlag = true
            setTimeout(() => {
                state.pullingDownFlag = false
            }, 20)
        },
        pullingUpFlagChange(state) {
            state.pullingUpFlag = true
            setTimeout(() => {
                state.pullingUpFlag = false
            }, 20)
        },
        tabIndexChange(state, value) {
            state.tabIndex = value
        }
    },
    actions: {


    }
}