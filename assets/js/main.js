function ajaxHandler(data) {
    const xhr = new XMLHttpRequest();
    let res = {error: false};
    xhr.open('POST', '/handler.php', false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send(data);
    console.log(xhr);
    if (xhr.status != 200) {
        res.error = true;
        res.message = 'Something went wrong';
    } else {
        res = { ...res, ...JSON.parse(xhr.responseText)};
    }
    return res;
}

function weatherWidgetModule() {
    let city = 'Kyiv';
    let selector;
    function loadWeather() {
        city = document.getElementById('city').value || city;
        return new Promise((resolve => {
           resolve(ajaxHandler('city=' + city));
        }))
    }

    function init(target) {
        selector = document.querySelector(target);
        document.querySelector('.loadWeather').addEventListener('click', buildWidget);
        buildWidget();
    }

    function buildWidget() {
        selector.classList.add('loading');
        loadWeather().then((data) => {

            setTimeout(function () { //just to see the spinner
                selector.classList.remove('loading');
                if(data.error) {
                    selector.innerHTML = `<h3>${data.message}</h3>`;
                }else{
                    selector.innerHTML = generateDOM(data);
                }
            },1000)


        });
    }

    function generateDOM(data) {
        let html = `<div>
                        <h3 class="cityTitle">${data.city}</h3>
                        <div class="weatherInfo">
                           <div class="dataBlock">
                                <span class="temp">${data.temp}<sup>&deg;C</sup></span>
                                <span class="wind">S ${data.wind} km/h</span>
                            </div> 
                            <div class="dataBlock">
                                <span class="weatherIcon">
                                    <img src="/assets/img/cloud.png" />
                                </span>
                                <span class="general">${data.weather}</span>
                            </div>
                        </div>`;
        return html;
    }

    return {
        'init': init
    }

}

const weatherWidget = weatherWidgetModule();

window.onload = function() {
    weatherWidget.init('.widgetData');
}