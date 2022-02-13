const datePickFrom = document.querySelector('#datefrom');
const datePickUntil = document.querySelector('#dateuntil');
const submitButton = document.querySelector('#submit');
const dateTextInput = document.querySelector('#date-text');
const timeFromTextInput = document.querySelector('#timefrom-text');
const timeUntilTextInput = document.querySelector('#timeuntil-text');
const submitTextButton = document.querySelector('#submit-text');


let myDate1;
let myDate2;

function calcDateFromPicker(event){
    event.preventDefault();
    let myDate1 = new Date(datePickFrom.value);
    let myDate2 = new Date(datePickUntil.value);
    calcDuration(myDate1, myDate2);
}

function calcDateFromTextInput(event){
    event.preventDefault();
    //YEAR 
    let textInputYear = '20' + dateTextInput.value.toString().slice(-8,-4);
    //MONTH
    let textInputMonth = parseInt(dateTextInput.value.toString().slice(-4,-2)) - 1 ;
    //DAY
    let textInputDay = dateTextInput.value.toString().slice(-2);
    //HOUR 
    let textInputFromTimeHour = timeFromTextInput.value.slice(-4,-2);
    let textInputUntilTimeHour = timeUntilTextInput.value.slice(-4,-2);
    //MINUTE
    let textInputFromTimeMinute = timeFromTextInput.value.slice(-2);
    let textInputUntilTimeMinute = timeUntilTextInput.value.slice(-2);
    
    if(parseInt(textInputMonth) < 12 
        && parseInt(textInputDay) < 32 
        && parseInt(textInputFromTimeHour) < 24
        && parseInt(textInputUntilTimeHour) < 24
        && parseInt(textInputFromTimeMinute) < 60
        && parseInt(textInputUntilTimeMinute) < 60
        ){
            console.log('valid input');
            //set date and time from
            let dateTimeFrom = new Date(textInputYear,textInputMonth,textInputDay);
            dateTimeFrom.setHours(textInputFromTimeHour);
            dateTimeFrom.setMinutes(textInputFromTimeMinute);

            //set date and time until
            let dateTimeUntil = new Date(textInputYear, textInputMonth, textInputDay);
            dateTimeUntil.setHours(textInputUntilTimeHour);
            dateTimeUntil.setMinutes(textInputUntilTimeMinute);

            //format it with day js
            let finalDate = dayjs(dateTimeFrom).format('DD/MM/YYYY');
            let finalFrom = dayjs(dateTimeFrom).format('HH:mm');
            let finalUntil = dayjs(dateTimeUntil).format('HH:mm');

            calcDuration(dateTimeFrom, dateTimeUntil);
        } else {
            console.log('unvalid input');
        }    
}

function calcDuration(from, until){
    let myTextElement = document.querySelector('h1');
    
    let myDateFrom = dayjs(from);
    let myDateUntil = dayjs(until);

    let timeDifference = myDateUntil.diff(myDateFrom, 'm');
    
    let timeDifferenceHours;
    let timeDifferenceMinutes;

    if(timeDifference % 60 === 0){
        timeDifferenceHours = timeDifference / 60;
        myTextElement.innerText = 'Duration is: ' + timeDifferenceHours.toString().padStart(2, '0') + ':00';
    } else {
        timeDifferenceHours = timeDifference / 60;
        timeDifferenceMinutes = timeDifference % 60;
        myTextElement.innerText = 'Duration is ' + Math.floor(timeDifferenceHours).toString().padStart(2,'0') + ':' + timeDifferenceMinutes.toString().padStart(2, '0')
    }
}


submitButton.addEventListener('click', calcDateFromPicker);
submitTextButton.addEventListener('click', calcDateFromTextInput);

