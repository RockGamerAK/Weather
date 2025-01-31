var descs = {
    200: 'Successful', 
    301: 'Resource Moved', 
    400: 'Bad Request', 
    401: 'Unauthorized', 
    403: 'Forbidden', 
    404: 'Not Found', 
    500: 'Internal Server Error', 
    503: 'Service Unavailable', 
}

var apiKey = btoa('6aa570c2eee5cfcd518f5c1e3efe2f7b')
apiKey = atob(apiKey)

var TEMP = 'imperial'
var TEMPS = {
    metric: 'C', 
    imperial: 'F', 
}
function getForecast() {
    let zipcode = document.getElementById("zip").value;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceivedHandler);   
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=${TEMP}&appid=${apiKey}`);
    xhr.responseType = "json";
    xhr.send();
}

function responseReceivedHandler() {
    let fElement = document.getElementById("forecast")
    fElement.innerHTML = ''
    if (this.status === 200) {
        console.log(this.response)
        let h1 = document.createElement('h1')
        h1.innerHTML = `Weather for ${this.response.name}`;
        fElement.appendChild(h1)

        let wElement = document.createElement('ul')
        wElement.id = 'weather'
        fElement.appendChild(wElement)

        var descStyle = document.createElement('style')
        for (let i = 0; i < this.response.weather.length; i++) {
            let w = this.response.weather[i]
            let main = w.main
            main = `${main.split('')[0].toUpperCase()}${main.substring(1)}`
            let desc = w.description
            desc = desc.split(' ')
            if (desc.length > 1) {
                desc.forEach(function(d, i) {
                    desc[i] = `${desc[i].split('')[0].toUpperCase()}${desc[i].substring(1)}`
                })
            }
            else {
                desc[0] = `${desc[0].split('')[0].toUpperCase()}${desc[0].substring(1)}`
            }
            desc = desc.join(' ')
            desc = String(desc).replace(',', ' ')

            let icon = w.icon
            let iconurl = `http://openweathermap.org/img/w/${icon}.png`;

            let li = document.createElement('li')
            li.id = `w${i}`
            li.innerHTML = `${main}: ${desc}`;
            wElement.appendChild(li)
            descStyle.innerHTML += `ul#weather li#w${i}::before { content: ''; background-image: url('${iconurl}') }`
        }
        document.head.appendChild(descStyle)

        let main = this.response.main
        let mElement = document.createElement('table')
        mElement.border = 1

        let mCapt = document.createElement('caption')
        mCapt.innerHTML = 'Temprature'
        mElement.appendChild(mCapt)

        let mHead = document.createElement('thead')
        mElement.appendChild(mHead)

        let mHeadRow = document.createElement('tr')
        mHead.appendChild(mHeadRow)
        
        let mBody = document.createElement('tbody')
        mElement.appendChild(mBody)

        let mBodyRow = document.createElement('tr')
        mBody.appendChild(mBodyRow)
        
        let mHeadRowHTML = ''
        let mBodyRowHTML = ''

        let mHeadItems = [
            'feels_like', 
            'humidity', 
            'temp', 
            'temp_max', 
            'temp_min', 
        ]
        mHeadItems.forEach(function(iName, i) {
            let item = main[iName]
            if (iName === 'humidity') item = `${item}%`
            else item = `${item} °${TEMPS[TEMP]}`
            iName = iName.split('_')
            if (iName.length > 1) {
                iName.forEach(function(d, i2) {
                    iName[i2] = `${iName[i2].split('')[0].toUpperCase()}${iName[i2].substring(1)}`
                })
            }
            else {
                iName[0] = `${iName[0].split('')[0].toUpperCase()}${iName[0].substring(1)}`
            }
            iName = iName.join(' ')
            iName = String(iName).replace(',', ' ')
            mHeadRowHTML += `<th>${iName}</th>`
            mBodyRowHTML += `<td>${item}</td>`
        })
        mHeadRow.innerHTML = mHeadRowHTML
        mBodyRow.innerHTML = mBodyRowHTML

        fElement.appendChild(mElement)

        let wind = this.response.wind

        let windElement = document.createElement('table')
        windElement.border = 1

        let windCapt = document.createElement('caption')
        windCapt.innerHTML = 'Wind'
        windElement.appendChild(windCapt)

        let windHead = document.createElement('thead')
        windElement.appendChild(windHead)

        let windHeadRow = document.createElement('tr')
        windHead.appendChild(windHeadRow)
        
        let windBody = document.createElement('tbody')
        windElement.appendChild(windBody)

        let windBodyRow = document.createElement('tr')
        windBody.appendChild(windBodyRow)
        
        let windHeadRowHTML = ''
        let windBodyRowHTML = ''

        let windHeadItems = [
            'deg', 
            'speed', 
        ]
        windHeadItems.forEach(function(iName, i) {
            let item = wind[iName]
            if (iName === 'deg') item = `${item}°`
            iName = iName.split('_')
            if (iName.length > 1) {
                iName.forEach(function(d, i2) {
                    iName[i2] = `${iName[i2].split('')[0].toUpperCase()}${iName[i2].substring(1)}`
                })
            }
            else {
                iName[0] = `${iName[0].split('')[0].toUpperCase()}${iName[0].substring(1)}`
            }
            iName = iName.join(' ')
            iName = String(iName).replace(',', ' ')
            windHeadRowHTML += `<th>${iName}</th>`
            windBodyRowHTML += `<td>${item}</td>`
        })
        windHeadRow.innerHTML = windHeadRowHTML
        windBodyRow.innerHTML = windBodyRowHTML

        fElement.appendChild(windElement)

        let sys = this.response.sys

        let sElement = document.createElement('table')
        sElement.border = 1

        let sCapt = document.createElement('caption')
        sCapt.innerHTML = 'Time'
        sElement.appendChild(sCapt)

        let sHead = document.createElement('thead')
        sElement.appendChild(sHead)

        let sHeadRow = document.createElement('tr')
        sHead.appendChild(sHeadRow)
        
        let sBody = document.createElement('tbody')
        sElement.appendChild(sBody)

        let sBodyRow = document.createElement('tr')
        sBody.appendChild(sBodyRow)
        
        let sHeadRowHTML = ''
        let sBodyRowHTML = ''

        let sHeadItems = [
            'country', 
            'sunrise', 
            'sunset', 
        ]
        sHeadItems.forEach(function(iName, i) {
            let item = sys[iName]
            let item2 = ''
            if (iName !== 'country') {
                let d = new Date(item*1000)
                if (iName === 'sunrise') {
                    item = `${d.getHours()}:${d.getMinutes()} AM`
                }
                if (iName === 'sunset') {
                    item = `${d.getHours()-12}:${d.getMinutes()} PM`
                    item2 = `${d.getHours()}:${d.getMinutes()}`
                }
            }
            iName = iName.split('_')
            if (iName.length > 1) {
                iName.forEach(function(d, i2) {
                    iName[i2] = `${iName[i2].split('')[0].toUpperCase()}${iName[i2].substring(1)}`
                })
            }
            else {
                iName[0] = `${iName[0].split('')[0].toUpperCase()}${iName[0].substring(1)}`
            }
            iName = iName.join(' ')
            iName = String(iName).replace(',', ' ')
            sHeadRowHTML += `<th>${iName}</th>`
            sBodyRowHTML += `<td>${item}</td>`
            if (iName === 'sunset') {
                sHeadRowHTML += `<th>${iName}-MIL</th>`
                sBodyRowHTML += `<td>${item2}</td>`
            }
        })
        sHeadRow.innerHTML = sHeadRowHTML
        sBodyRow.innerHTML = sBodyRowHTML

        fElement.appendChild(sElement)

    } 
    else {
        fElement.innerHTML = `<h1>Error ${this.status}: ${descs[this.status]}</h1>`;
    }

}

document.getElementById("search").addEventListener("click", getForecast);