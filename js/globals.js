var course_name = null;
const BUTTON_CLASS = "U26fgb cd29Sd p0oLxb BEAGS CG2qQ QRiHXd bVp04e center";
const HEADING_CLASS = "gtuckc tLDEHd-Wvd9Cc";
// const DEADLINE_SCHEDULING_SUGGESTION_API = 'http://103.25.231.35:8200'
// const COLLEGE_NAME = 'IIIT Delhi' 
const DEADLINE_SCHEDULING_SUGGESTION_API = 'https://deadline-scheduling-suggestion.herokuapp.com'
const COLLEGE_NAME = 'iiitd' 

function fetch_ (url, options, timeout = 10000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}