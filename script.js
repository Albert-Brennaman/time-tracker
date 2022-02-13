//selectors
const inputSaveButton = document.querySelector('#input-save-btn');


//data states
const myTimeRecords = [];

//functions
function submitRecord (event) {
    event.preventDefault();

    const inputDate = document.querySelector('#input-date');
    const inputFrom = document.querySelector('#input-from');
    const inputUntil = document.querySelector('#input-until');
    const inputLocation = document.querySelector('#input-location');
    const inputWorkDescription = document.querySelector('#input-work');

     //YEAR 
     let textInputYear = '20' + inputDate.value.toString().slice(-8,-4);
     //MONTH
     let textInputMonth = parseInt(inputDate.value.toString().slice(-4,-2)) - 1 ;
     //DAY
     let textInputDay = inputDate.value.toString().slice(-2);
     //HOUR 
     let textInputFromTimeHour = inputFrom.value.slice(-4,-2);
     let textInputUntilTimeHour = inputUntil.value.slice(-4,-2);
     //MINUTE
     let textInputFromTimeMinute = inputFrom.value.slice(-2);
     let textInputUntilTimeMinute = inputUntil.value.slice(-2);

     if(parseInt(textInputMonth) < 12 
        && parseInt(textInputDay) < 32 
        && parseInt(textInputFromTimeHour) < 24
        && parseInt(textInputUntilTimeHour) < 24
        && parseInt(textInputFromTimeMinute) < 60
        && parseInt(textInputUntilTimeMinute) < 60
        ){
            //set date and time FROM
            let dateTimeFrom = new Date(textInputYear,textInputMonth,textInputDay);
            dateTimeFrom.setHours(textInputFromTimeHour);
            dateTimeFrom.setMinutes(textInputFromTimeMinute);

            //set date and time UNTIL
            let dateTimeUntil = new Date(textInputYear, textInputMonth, textInputDay);
            dateTimeUntil.setHours(textInputUntilTimeHour);
            dateTimeUntil.setMinutes(textInputUntilTimeMinute);

            let myDuration = calcDuration(dateTimeFrom, dateTimeUntil);

            saveTimeRecord(dateTimeFrom, dateTimeUntil, myDuration, inputLocation.value, inputWorkDescription.value);
        } else {
            console.log('unvalid input');
        }    
    
        //event.target.parentElement.parentElement.parentElement.reset();
        //event.target.parentElement.parentElement.parentElement.reset();
        //event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.reset();
        const leftForm = document.querySelector('#form-left');
        const rightForm = document.querySelector('#form-right');
        leftForm.reset();
        rightForm.reset();
}

function saveTimeRecord (from, until, duration, location, workdescription) {

    const timeRecord = {
        ID: Date.now(),
        From: from,
        Until: until,
        Duration: duration,
        Location: location,
        Workdescription: workdescription
    };
    myTimeRecords.push(timeRecord);
    displayTimeRecords();
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
        return timeDifferenceHours.toString().padStart(2, '0') + ':00';
    } else {
        timeDifferenceHours = timeDifference / 60;
        timeDifferenceMinutes = timeDifference % 60;
        return Math.floor(timeDifferenceHours).toString().padStart(2,'0') + ':' + timeDifferenceMinutes.toString().padStart(2, '0')
    }
}

function displayTimeRecords(){
    const html = myTimeRecords.map(record => `
            <tr>
                <td>${dayjs(record.From).format('DD/MM/YYYY')}</td>
                <td>${dayjs(record.From).format('HH:mm')}</td>
                <td>${dayjs(record.Until).format('HH:mm')}</td>
                <td>${record.Duration}</td>
                <td>${record.Workdescription}</td>
                <td>${record.Location}</td>
            </tr>`
        ).join('');
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = html;
}

//event handlers
inputSaveButton.addEventListener('click', submitRecord);