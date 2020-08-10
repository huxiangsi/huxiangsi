/* 定义事件过滤器 全局 */
import Vue from 'vue'

Vue.filter('dateFormat', millisTime => {
    const dt = new Date(millisTime)

    /* 获取年月日 */
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    /* 获取时分秒 */
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')


    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})