export default {
    debounce: (callback, delay = 1000) => {
        let time
        return function () {
            clearTimeout(time)
            time = setTimeout(() => {
                callback.apply(this, arguments)
            }, delay)
        }
    },
    throttle: (callback, delay = 1000, immediate = false) => {
        let time
        return function () {
            if (!time) {
                immediate && callback.apply(this, arguments)
                time = setTimeout(() => {
                    time = null
                    callback.apply(this, arguments)
                }, delay)
            }
        }
    }
}