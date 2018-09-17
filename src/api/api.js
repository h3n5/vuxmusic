import apiMusic from './api.url'
import HttpRequest from './axios'
const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "/"
let axios = new HttpRequest(baseUrl)
export const getBanner = () => {
    return axios.request({
        url: apiMusic.banner,
        method: 'get'
    })
}
export const getpersonalized = () => {
    return axios.request({
        url: apiMusic.personalized,
        method: 'get'
    })
}
export const getSongListByOrder = (data) => {
    return axios.request({
        url: apiMusic.topPlaylist,
        method: 'get',
        params: data
    })
}
export const getAllTag = (params = {}) => {
    return axios.request({
        url: apiMusic.allTag,
        method: 'get',
        params: params
    })
}
export const getSongUrl = (id) => {
    return axios.request({
        url: apiMusic.musicUrl,
        method: 'get',
        params: {
            id: id
        }
    })
}
export const getLyric = (id) => {
    return axios.request({
        url: apiMusic.lyric,
        method: 'get',
        params: {
            id: id
        }
    })
}
export const gethotSearch = () => {
    return axios.request({
        url: apiMusic.hotSearch,
        method: 'get',
    })
}
export const searchMusic = (data) => {
    return axios.request({
        url: apiMusic.search,
        method: 'get',
        params: {
            keywords: data
        }
    })
}
export const getsongDetail = (id) => {
    return axios.request({
        url: apiMusic.songDetail,
        method: 'get',
        params: {
            ids: id
        }
    })
}
export const getsongAlbum = (id) => {
    return axios.request({
        url: apiMusic.album,
        method: 'get',
        params: {
            id: id
        }
    })
}