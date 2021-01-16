function getDurationStr(duration, durationUnit) {
    if (durationUnit === "days") {
        return (`${duration}-0-0`);
    }
    else if (durationUnit === "hours") {
        return (`0-${duration}-0`);
    }
}

function getScheduleStr(dateStr, timeStr) {
    var dateComp = dateStr.split('/');
    var scheduleDateStr = `${dateComp[2]}-${dateComp[1]}-${dateComp[0]}`;
    var scheduleTimeStr = timeStr + ":00.000Z";
    var scheduleStr = `${scheduleDateStr}T${scheduleTimeStr}`;
    return (scheduleStr);
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function isQuizAnnouncement(content) {
    var examSynonyms = ['quiz', 'assesment', 'examination', 'test', 'exam', 'midsem', 'endsem'];
    var words = content.toLowerCase().split(' ');
    for (let word of words) {
        if (word == ' ')
            continue;
        var cleanWord = "";
        var chars = word.split('');
        for (let char of chars) {
            if (isLetter(char)) {
                cleanWord += char;
            }
        }
        if (examSynonyms.includes(cleanWord))
            return (true);
    }
    return (false);
}

function extractDate(content, forward = true) {
    var chrono = require('chrono-node');
    var dateNow = new Date(Date.now());
    var dateResult = chrono.parseDate(content.toUpperCase(), dateNow, { forwardDate: forward });
    if (dateResult !== null && dateResult !== undefined) {
        return (dateResult);
    }
    return (null);
}

function getAnnouncementContentFromMessage(message) {
    if (message.title === null || message.title === undefined)
        message.title = "";
    if (message.text === null || message.text === undefined)
        message.text = "";
    var striptags = require('striptags');
    var text = striptags(message.text, "", " ");
    text = text.replace(new RegExp("&nbsp;", "g"), ' ');

    var content = message.title + " " + text;
    return (content);
}

function sendMessage(tags) {
    var msg = {
        type: 'check-announcement-tags',
        tags: tags
    };
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

function checkAnnouncementTags(content) {
    var date = extractDate(content);
    if (date == null) {
        sendMessage([]);
        return;
    }
    tags = []
    if (isQuizAnnouncement(content)) {
        tags = [{
            name: 'Exam Announcement',
            attr1: date.getTime()
        }
        ];
        sendMessage(tags);
    }
    else {
        sendMessage([]);
        return;
    }
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.type == 'fetchSuggestions') {
            var xhr = new XMLHttpRequest();
            var durationStr = `${message.days}-${message.hours}-0`;
            var minScheduleStr = getScheduleStr(message.minDueDate, message.minDueTime);
            var maxScheduleStr = getScheduleStr(message.maxDueDate, message.maxDueTime);

            // API call fetch schedules

            // var request=`https://deadline-scheduling-suggestion.herokuapp.com/iiitd/CSE%20101%20-%20IP%20-%20Section%20A%20Section%20A/get_suggestions/${durationStr}/${minScheduleStr}/${maxScheduleStr}`;
            var request = "https://run.mocky.io/v3/c7140aa1-2056-4d30-bf54-4d66b53f5260";
            // var request = "https://run.mocky.io/v3/f7b9f325-a7bd-45fc-a51c-bd60dcade20d";
            xhr.open('GET', request);
            xhr.onload = function () {
                var msg = {
                    type: 'fetchSuggestions',
                    message: xhr.responseText
                };
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, msg);
                });
            };
            xhr.send();
            return (true);
        }

        else if (message.type == 'check-announcement-tags') {
            var content = getAnnouncementContentFromMessage(message);
            checkAnnouncementTags(content);
        }
    }
);

chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tabId, {
                message: 'TabUpdated',
                changeInfo: changeInfo,
                tab: tab
            });
        }
    });
});

chrome.windows.onCreated.addListener(function () {
    chrome.tabs.sendMessage(0, {
        message: 'TabUpdated',
        changeInfo: null,
        tab: null
    });
});


chrome.runtime.onStartup.addListener(function() {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tabId, {
                message: 'TabUpdated',
                changeInfo: changeInfo,
                tab: tab
            });
        }
    });
  });