import { writable, derived } from 'svelte/store';

import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);


export const fec = [
    {floor: '6', rooms: [
        {room: 'F601', kogi: [0, 0,1,1,1,1,0, 1,0,1,1,0,0, 1,1,0,1,0,0, 0,1,1,1,1,0, 1,1,1,1,1,0, 0,0,0,0,0,0]},
        {room: 'F602', kogi: [0, 0,1,1,1,1,0, 0,1,1,1,1,0, 0,1,0,0,0,0, 1,1,1,1,0,0, 1,0,0,1,0,0, 0,0,0,0,0,0]},
        {room: 'F603', kogi: [0, 0,0,0,1,1,0, 0,0,0,1,1,0, 0,0,0,0,1,0, 0,0,1,1,1,0, 0,1,0,1,1,1, 0,0,0,0,0,0]},
        {room: 'F604', kogi: [0, 0,1,1,1,1,0, 0,0,1,1,1,0, 0,0,0,0,0,0, 1,1,1,1,1,0, 0,0,0,1,0,0, 0,0,0,0,0,0]},
        {room: 'F605', kogi: [0, 0,0,0,1,1,0, 0,1,1,1,1,0, 0,0,0,0,0,0, 1,1,1,0,1,0, 1,0,1,0,1,0, 0,0,0,0,0,0]},
        {room: 'F606', kogi: [0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0]},
        {room: 'F607', kogi: [0, 0,1,0,1,0,0, 0,0,1,1,0,0, 0,0,0,0,0,0, 0,0,0,0,1,0, 0,0,0,1,0,0, 0,0,0,0,0,0]},
    ]},
    {floor: '5', rooms: [
        {room: 'F502', kogi: [0, 0,0,1,1,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0]},
        {room: 'F504', kogi: [0, 0,0,0,1,1,0, 0,1,1,1,1,0, 0,0,0,0,0,0, 1,1,0,0,1,0, 0,1,1,1,0,0, 0,0,0,0,0,0]},
        {room: 'F505', kogi: [0, 0,0,1,1,1,0, 0,1,0,1,1,0, 0,0,0,0,0,0, 0,1,1,0,1,0, 0,1,0,0,1,0, 0,0,0,0,0,0]},
        {room: 'F507', kogi: [0, 0,1,1,1,0,0, 1,0,1,1,0,0, 0,0,0,0,0,0, 0,1,0,0,0,0, 0,1,1,0,0,0, 0,0,0,0,0,0]},
        {room: 'F511', kogi: [0, 0,1,1,0,0,0, 1,0,0,0,0,0, 0,0,0,0,0,0, 0,1,1,1,1,0, 0,0,0,0,0,0, 0,0,0,0,0,0]},
    ]},
    {floor: '4', rooms: [
        {room: 'F403', kogi: [0, 1,1,0,1,0,0, 0,0,0,1,1,0, 0,0,0,0,0,0, 0,0,1,0,0,0, 1,1,0,1,0,0, 0,0,1,0,0,0]},
        {room: 'F404', kogi: [0, 1,1,1,0,0,0, 0,1,1,0,1,0, 1,1,1,1,0,0, 1,1,1,1,1,0, 1,1,0,0,0,0, 0,0,0,0,0,0]},
        {room: 'F405', kogi: [0, 1,1,1,1,1,0, 1,0,0,0,0,0, 1,1,0,0,0,0, 1,1,1,1,0,0, 1,1,0,1,0,0, 1,0,0,0,0,0]},
        {room: 'F408', kogi: [0, 1,1,1,0,0,0, 1,0,1,1,1,0, 1,1,1,1,0,0, 1,1,1,0,1,0, 0,1,1,1,0,0, 0,0,0,0,0,0]},
        {room: 'F410', kogi: [0, 1,1,1,1,0,0, 0,0,0,1,0,0, 1,1,1,1,0,0, 1,1,1,1,1,0, 0,0,0,1,0,0, 0,0,0,0,0,0]},
    ]},
    {floor: '3', rooms: [
        {room: 'F301', kogi: [0, 0,0,0,0,0,0, 0,0,1,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0]},
        {room: 'F308', kogi: [0, 1,1,1,1,1,0, 1,1,0,0,0,0, 1,1,1,1,0,0, 1,1,0,0,0,0, 1,1,0,0,0,0, 0,1,1,1,0,0]},
        {room: 'F310', kogi: [0, 1,1,1,1,0,1, 1,1,1,1,1,0, 1,1,0,0,0,0, 1,1,1,1,0,0, 1,1,1,1,0,0, 0,1,0,0,0,0]},
        {room: 'Hall', kogi: [0, 0,0,0,0,0,0, 0,1,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0]},
    ]},
    {floor: '2', rooms: [
        {room: 'Fpcr', kogi: [0, 0,1,0,1,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,1,1, 0,1,0,0,0,0]},
    ]}
]

export const time = dayjs();

export let yo_bi = writable(time.format('dd'))
// export let day = derived(yo_bi, ($yo_bi) => {return Number({月:1, 火:2, 水:3, 木:4, 金:5}[$yo_bi])})
// export const time2koma = (time) => {
//     if (time.isBefore(dayjs({h:9,m:0}))) { return 0 }
//     else if (time.isBetween(dayjs({h:9,m:0}),dayjs({h:10,m:40}),'m','[]')){return 1}
//     else if (time.isBetween(dayjs({h:10,m:50}),dayjs({h:12,m:30}),'m','[]')){return 2}
//     else if (time.isBetween(dayjs({h:12,m:30}),dayjs({h:13,m:20}),'m','[]')){return 0}
//     else if (time.isBetween(dayjs({h:13,m:20}),dayjs({h:15,m:0}),'m','[]')){return 3}
//     else if (time.isBetween(dayjs({h:15,m:10}),dayjs({h:16,m:50}),'m','[]')){return 4}
//     else if (time.isBetween(dayjs({h:17,m:0}),dayjs({h:18,m:40}),'m','[]')){return 5}
//     else if (time.isBetween(dayjs({h:18,m:50}),dayjs({h:20,m:30}),'m','[]')){return 6}
//     else {return 0}
// }; 
let KomaVanilla = (() => {
    if (time.isBefore(dayjs({h:9,m:0}))) { return 0 }
    else if (time.isBetween(dayjs({h:9,m:0}),dayjs({h:10,m:40}),'m','[]')){return 1}
    else if (time.isBetween(dayjs({h:10,m:50}),dayjs({h:12,m:30}),'m','[]')){return 2}
    else if (time.isBetween(dayjs({h:12,m:30}),dayjs({h:13,m:20}),'m','[]')){return 0}
    else if (time.isBetween(dayjs({h:13,m:20}),dayjs({h:15,m:0}),'m','[]')){return 3}
    else if (time.isBetween(dayjs({h:15,m:10}),dayjs({h:16,m:50}),'m','[]')){return 4}
    else if (time.isBetween(dayjs({h:17,m:0}),dayjs({h:18,m:40}),'m','[]')){return 5}
    else if (time.isBetween(dayjs({h:18,m:50}),dayjs({h:20,m:30}),'m','[]')){return 6}
    else {return 0}
})()
export let koma = writable( KomaVanilla )
// export let koma = writable( (() => {
//     if (time.isBefore(dayjs({h:9,m:0}))) { return 0 }
//     else if (time.isBetween(dayjs({h:9,m:0}),dayjs({h:10,m:40}),'m','[]')){return 1}
//     else if (time.isBetween(dayjs({h:10,m:50}),dayjs({h:12,m:30}),'m','[]')){return 2}
//     else if (time.isBetween(dayjs({h:12,m:30}),dayjs({h:13,m:20}),'m','[]')){return 0}
//     else if (time.isBetween(dayjs({h:13,m:20}),dayjs({h:15,m:0}),'m','[]')){return 3}
//     else if (time.isBetween(dayjs({h:15,m:10}),dayjs({h:16,m:50}),'m','[]')){return 4}
//     else if (time.isBetween(dayjs({h:17,m:0}),dayjs({h:18,m:40}),'m','[]')){return 5}
//     else if (time.isBetween(dayjs({h:18,m:50}),dayjs({h:20,m:30}),'m','[]')){return 6}
//     else {return 0}
// })() )
// export let yo_bikomaID = derived((yo_bi, koma), ($yo_bi, $koma) => { return 6 * ({月:1, 火:2, 水:3, 木:4, 金:5}[$yo_bi] - 1) + Number($koma) })
// export let yo_bikomaID = derived((day, koma), ($day, $koma) => { return 6 * ($day - 1) + Number($koma) })
export let yo_bikomaID = derived([yo_bi, koma], ([$yo_bi, $koma]) => { return (6 * (Number({月:1, 火:2, 水:3, 木:4, 金:5}[$yo_bi]) - 1 ) + Number($koma)) * Number(Boolean($koma)) } )
// export let yo_bikomaID = derived([yo_bi, koma], ([$yo_bi, $koma]) => { return Number(Boolean($koma)) } )
// export let yo_bikomaID = derived([yo_bi, koma], ([$yo_bi, $koma]) => { return (6 * (Number({月:1, 火:2, 水:3, 木:4, 金:5}[$yo_bi]) - 1) + $koma) } )

