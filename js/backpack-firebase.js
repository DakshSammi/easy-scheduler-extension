// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAxSvEXTPNWznk4eBJ3trIHpBW0VrYwg9k",
    authDomain: "deadline-schedule-suggestions.firebaseapp.com",
    databaseURL: "https://deadline-schedule-suggestions.firebaseio.com",
    projectId: "deadline-schedule-suggestions",
    storageBucket: "deadline-schedule-suggestions.appspot.com",
    messagingSenderId: "701437125587",
    appId: "1:701437125587:web:df5d6ab89853b75aecc526",
    measurementId: "G-9B0H8VQZF6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.type == 'setReminder') {
            // db.collection("colleges").doc("iiitd").collection('courses').doc(message.coursecode).collection('assignments').add({
            //     dueDate:firebase.firestore.Timestamp.fromDate(getDateObject(message.dueDate,message.dueTime)),
            //     releaseDate:firebase.firestore.Timestamp.fromDate(getDateObject(message.releaseDate,message.releaseTime)),
            //     name:message.assignmentName
            // }).then(function(){
            //     var msg={
            //         type:'setReminder',
            //         message:message
            //     }
            //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            //         chrome.tabs.sendMessage(tabs[0].id, msg);
            //     });
            // }).catch(function(error){});
            
            setTimeout(() => {
                var msg={
                    type:'setReminder',
                    message:message
                }
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, msg);
                });
            }, 1000);
        }
        return (true);
    }
);

function getDateObject(dateString, timeString) {
    var dateComp = dateString.split("/");
    dateComp = dateComp.map(x => +x);

    var timeComp = timeString.split(':');
    timeComp = timeComp.map(x => +x);

    var date = new Date(dateComp[2], dateComp[1] - 1, dateComp[0], timeComp[0], timeComp[1], 0, 0);

    return (date);
}