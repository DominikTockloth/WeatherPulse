// This function returns the current date and time
function getDate() {
    const date = new Date();

    const dateOptions = {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-EN', dateOptions);
    return formattedDate;
}

function getTime() {
    const date = new Date();
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const formattedTime = date.toLocaleTimeString('en-EN', timeOptions);
    return formattedTime;
}

function updateDateTime() {
    const dateTimeDiv = document.getElementById('dateTime');
    const formattedDate = getDate();
    const formattedTime = getTime();
    dateTimeDiv.innerHTML = `${formattedDate} <span></span> <span>${formattedTime}</span>`;
}

