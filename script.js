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
    saveTimeRecord(inputDate.value, inputFrom.value, inputUntil.value, inputLocation.value, inputWorkDescription.value);
}

function saveTimeRecord (date, from, until, location, workdescription) {

    const timeRecord = {
        ID: Date.now(),
        From: calculateTimeString(date, from),
        Until: calculateTimeString(date, until),
        Location: location,
        Workdescription: workdescription
    };
    myTimeRecords.push(timeRecord);
    console.log(myTimeRecords);
}

function calculateTimeString(dateString, timeString){
    const myDateTime = new Date();
    myDateTime.setFullYear(dateString.slice(-8,-4));
    myDateTime.setMonth(dateString.slice(-4,-2) - 1);
    myDateTime.setDate(dateString.slice(-2));
    myDateTime.setHours(timeString.slice(-4,-2));
    myDateTime.setMinutes(timeString.slice(-2));
    return myDateTime;
}

//event handlers
inputSaveButton.addEventListener('click', submitRecord);