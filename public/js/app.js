console.log('Client side javascript loaded');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
//http://localhost:3000 will need to add this to run locally
    fetch('/weather?address='+location)
    .then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                
            }
            
        })
    })

})