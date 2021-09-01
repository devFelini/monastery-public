import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

export function getWeekDay(num) {
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    return days[num]
}

export function getMonthLabel(num, type = 1) {
    let months = []
    if(type === 1) {
        months = ["Январь", "Фераль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    } else if(type === 2) {
        months = ["января", "фераля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    }
    
    return months[num]
}

// export function fetchRequest(request, action, data = {}) {
//     data.request = request
//     let formData = new FormData()

//     for(let key in data) {
//       formData.append(key, data[key])
//     }
    
//     let url = 'http://public.devkater.ru/data.php'

//     try {
//         fetch(url, {
//           method: 'POST',
//           body: formData,
//         })
//             .then(response => response.json())
//             .then(respBody => {
//               this.dispatch({ type: "LOADED_POSTS_LIST", payload: respBody});
//             })
//       } catch (error) {
//         return {status: 'Error '+error, data: null};
//       }
// }