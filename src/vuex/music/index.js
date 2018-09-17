import {
    getSongUrl,
    getLyric,
    getsongAlbum
} from "@/api/api"
export default {
    namespaced: true,
    state: {
        audio: {
            id: 0,
            name: '歌曲名称',
            artists: [],
            albumPic: '@/assets/play/player-bar.png',
            location: '',
            album: {}
        },
        playType: 3, // 歌单列表播放方式:1,歌单循环;2,歌单随机;3,单曲循环
        lyricTxt: '', //歌词
        currentIndex: 0, // 当前播放的歌曲位置
        playing: false, // 播放状态:true,播放;false,暂停
        loading: false, // 是否正在加载中
        showDetail: false, // 显示详细
        songList: [], // 播放歌单列表
        currentTime: 0,
        tmpCurrentTime: 0,
        durationTime: 0,
        bufferedTime: 0,
        change: false, // 判断是更改的时间还是播放的时间
        search: 'and i am home' //搜索词
    },
    getters: {


    },
    mutations: {
        updateMessage(state, value) {
            state.search = value
        },
        play(state) {
            state.playing = true
        },
        pause(state) {
            state.playing = false
        },
        togglePlay(state) {
            state.playing = !state.playing
        },
        setLocation(state, value) {
            state.audio.location = value
        },
        setLrc(state, value) {
            state.lyricTxt = value
        },
        setAudio(state) {
            state.audio = state.songList[state.currentIndex - 1];
        },
        setcurrentTime(state, value) {
            state.currentTime = value
        },
        setdurationTime(state, value) {
            state.durationTime = value
        },
        setAlbumUrl(state, value) {
            state.audio.albumPic = value;
        },
        PlayAndAddTolist(state, song) {
            if (state.songList.length === 0) {
                state.songList.push(song);
            }
            state.songList.forEach((v, i) => {
                // 检测歌曲重复
                if (v.id === song.id) {
                    state.currentIndex = i + 1;
                } else {
                    state.songList.push(song);
                    state.currentIndex = state.songList.length;
                }
            });
        }
    },
    actions: {
        async AddAndPlay({
            commit,
            dispatch
        }, song) {
            commit("PlayAndAddTolist", song); //添加到列表
            commit('setAudio') //添加到播放对象
            Promise.all([dispatch("getSong", song.id), dispatch("getLrc", song.id), dispatch("getAlbum", song.album.id)])
        },
        async getSong({
            commit
        }, id) {
            let res = await getSongUrl(id)
            let url = res.data.data[0].url
            commit('setLocation', url)
        },
        async getAlbum({
            commit
        }, id) {
            let res = await getsongAlbum(id)
            let url = res.data.album.blurPicUrl
            commit('setAlbumUrl', url)
        },
        async getLrc({
            commit
        }, id) {
            commit('setLrc', '加载中。。')
            let res = await getLyric(id)
            if (res.data.nolyric) {
                commit('setLrc', '(⊙０⊙) 暂无歌词')
            } else {
                commit('setLrc', res.data.lrc.lyric)
            }


        },
    }
}

function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = [];
    for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        var clause = lyric.replace(timeReg, "");
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj.push([time, clause]);
        }
    }
    return lrcObj;
}