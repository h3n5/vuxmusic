import {
    getAllTag
} from "@/api/api";
export default {
    namespaced: true,
    state: {
        mainTab: [{
            type: "commend",
            name: '个性推荐'
        }, {
            type: "songList",
            name: '歌单'
        }, {
            type: "anchorRadio",
            name: '主播电台'
        }, {
            type: "ranking",
            name: '排行榜'
        }],
        mainContentTab: ["私人FM", "每日歌曲推荐", "云音乐热歌榜"],
        mainTag: [],
        showFoot: true,
        alive: ['search', 'Search']
    },
    getters: {
        mainTab: state => {
            return state.mainTab
        },
        mainContentTab: state => {
            return state.mainContentTab
        },
        mainTag: state => {
            return state.mainTag
        }

    },
    mutations: {
        GET_TAG_SUCCESS(state, tags) {
            state.mainTag = tags
        },
        toggleFoot(state, value) {
            state.showFoot = value
        }
    },
    actions: {
        async action_getAllTag({
            commit
        }, params) {
            let res = await getAllTag(params)
            let sort = sortRandom(res.data.sub).splice(1, 3)
            //let sort = getRandomArr(res.data.sub, 3)
            commit("GET_TAG_SUCCESS", sort)

        }

    }
}

function sortRandom(arr = []) {
    return arr.sort(() => {
        return Math.random() > 0.5 ? true : false;
    });
}