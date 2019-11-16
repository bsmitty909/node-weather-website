const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'
// messageTwo.textContent = 'Second Message'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading Forecast..'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((weather) => {
            if (weather.error) {
                messageOne.textContent = weather.error

                // console.log(weather);
            } else {
                messageOne.textContent = weather.location
                messageTwo.textContent = weather.forecast
                    // console.log(weather.location);
                    // console.log(weather.forecast);

            }
        })


        console.log(location)
    })

})