"use strict";

var durationUnit = "";
var scheduleResponse;
var fetchSchedulesButtonDisabled = false;
var setReminderButtonDisabled = false;
var selectedFlexibleSchedule = null;
var selectedFixedSchedule = null;
var isFlexibleSchedule = false;
var alertBannerPrepared = false;
var tagsPanel;

function removeDateTimeFields() {
    var form = document.getElementById('new_deadline');
    var formRow = null;
    for (var i = 0; i < form.childNodes.length; ++i) {
        if (form.childNodes[i].className == "row") {
            formRow = form.childNodes[i];
        }
    }

    var childrenToRemove = [];
    for (var i = 0; i < formRow.childNodes.length; ++i) {
        var className = formRow.childNodes[i].className;
        if (className == undefined)
            continue;
        var classes = className.split(" ");
        if (classes.includes("topten"))
            childrenToRemove.push(formRow.childNodes[i]);
    }

    for (let child of childrenToRemove) {
        formRow.removeChild(child);
    }
}

function getDurationField() {
    var durationInputAppend = document.createElement('div');
    durationInputAppend.className = "input-append";

    var durationInputGroup = document.createElement('div');
    durationInputGroup.className = "input-group";
    durationInputAppend.appendChild(durationInputGroup);

    var durationInput = document.createElement('input');
    durationInput.className = "form-control";
    durationInput.setAttribute("placeholder", "Time to complete");
    durationInput.setAttribute("type", "number");
    durationInput.setAttribute("min", "1");
    durationInput.setAttribute("max", "200");
    durationInput.setAttribute("style", "padding-right:10px;");
    durationInputGroup.appendChild(durationInput);

    var inputGroupAddon = document.createElement('span');
    inputGroupAddon.className = "input-group-addon";
    durationInputGroup.appendChild(inputGroupAddon);

    inputGroupAddon.innerHTML += "Days";
    return (durationInputAppend);
}

function getHeaderRow(title) {
    var header = document.createElement('div');
    header.className = "panelHeader";
    header.innerHTML += ("" + title);
    return (header);
}

function getPanelRow(childElement, overrideStyle = "") {
    var row = document.createElement('div');
    row.className = "panelRow";
    if (overrideStyle !== "") {
        row.setAttribute("style", overrideStyle);
    }
    row.appendChild(childElement);
    return (row);
}


function durationDaysClicked() {
    var hoursButton = document.getElementById("btn-hours");
    var daysButton = document.getElementById("btn-days");
    hoursButton.className = "middleButton csButton btn btn-default";
    daysButton.className = "rightButton csButtonSelected btn btn-default";
    durationUnit = "days";
}

function durationHoursClicked() {
    var hoursButton = document.getElementById("btn-hours");
    var daysButton = document.getElementById("btn-days");
    hoursButton.className = "middleButton csButtonSelected btn btn-default";
    daysButton.className = "rightButton csButton btn btn-default";
    durationUnit = "hours";
}

function getDurationPicker() {
    var durationContainer = document.createElement('div');
    durationContainer.className = "durationContainer";

    var daysInput = document.createElement('input');
    daysInput.id = "input-days";
    daysInput.setAttribute("style", "height:100% !important;");
    daysInput.className = "form-control durationInputLeft";
    daysInput.setAttribute("type", "number");
    daysInput.setAttribute("min", "0");
    durationContainer.appendChild(daysInput);

    var daysLabel = document.createElement('div');
    daysLabel.className = 'input-label label-middle';
    daysLabel.innerHTML = '<span>Days</span>';
    durationContainer.appendChild(daysLabel);

    var hoursInput = document.createElement('input');
    hoursInput.id = "input-hours";
    hoursInput.setAttribute("style", "height:100% !important;");
    hoursInput.className = "form-control durationInputMiddle";
    hoursInput.setAttribute("type", "number");
    hoursInput.setAttribute("min", "0");
    durationContainer.appendChild(hoursInput);

    var hoursLabel = document.createElement('div');
    hoursLabel.className = 'input-label label-right';
    hoursLabel.innerHTML = '<span>Hours</span>';
    durationContainer.appendChild(hoursLabel);

    return (durationContainer);
}

function typeUnscheduledClicked() {
    var unscheduledButton = document.getElementById('btn-unscheduled');
    var scheduledButton = document.getElementById('btn-scheduled');
    unscheduledButton.className = "leftButton csButtonSelected btn btn-default";
    scheduledButton.className = "rightButton csButton btn btn-default";
    showNormalOptions();
}

function typeScheduledClicked() {
    var unscheduledButton = document.getElementById('btn-unscheduled');
    var scheduledButton = document.getElementById('btn-scheduled');
    unscheduledButton.className = "leftButton csButton btn btn-default";
    scheduledButton.className = "rightButton csButtonSelected btn btn-default";
    showSchedulingOptions();
}

function getTypeSelector() {
    var typeSelectorContainer = document.createElement('div');
    typeSelectorContainer.className = "typeSelectorContainer";

    var unscheduledButton = document.createElement('a');
    unscheduledButton.id = "btn-unscheduled";
    unscheduledButton.className = "leftButton csButton btn btn-default";
    unscheduledButton.innerHTML += "Normally Scheduled";
    unscheduledButton.onclick = typeUnscheduledClicked;
    typeSelectorContainer.appendChild(unscheduledButton);

    var scheduledButton = document.createElement('a');
    scheduledButton.id = "btn-scheduled";
    scheduledButton.className = "rightButton csButton btn btn-default";
    scheduledButton.innerHTML += "Optimally Scheduled";
    scheduledButton.onclick = typeScheduledClicked;
    typeSelectorContainer.appendChild(scheduledButton);

    return (typeSelectorContainer);
}

function typeNowClicked() {
    var unscheduledButton = document.getElementById('btn-now');
    var scheduledButton = document.getElementById('btn-later');
    unscheduledButton.className = "leftButton csButtonSelected btn btn-default";
    scheduledButton.className = "rightButton csButton btn btn-default";

    var releaseDateSelection = document.getElementById('due-start');
    releaseDateSelection.className = 'invisible';

    var submitDeadlineButton = document.getElementById('submitdeadline');
    submitDeadlineButton.className = 'btn btn-primary pull-right';

    var setReminderButton = document.getElementById('addReminder');
    setReminderButton.className = 'invisible';


}

function typeLaterClicked() {
    var unscheduledButton = document.getElementById('btn-now');
    var scheduledButton = document.getElementById('btn-later');
    unscheduledButton.className = "leftButton csButton btn btn-default";
    scheduledButton.className = "rightButton csButtonSelected btn btn-default";
    var releaseDateSelection = document.getElementById('due-start');
    releaseDateSelection.className = 'dateTimeContainer';

    var submitDeadlineButton = document.getElementById('submitdeadline');
    submitDeadlineButton.className = 'invisible';

    var setReminderButton = document.getElementById('addReminder');
    setReminderButton.className = 'btn btn-primary pull-right';

}

function getScheduleTypeSelector() {
    var typeSelectorContainer = document.createElement('div');
    typeSelectorContainer.className = "typeSelectorContainer";

    var unscheduledButton = document.createElement('a');
    unscheduledButton.id = "btn-now";
    unscheduledButton.className = "leftButton csButton btn btn-default";
    unscheduledButton.innerHTML += "Now";
    unscheduledButton.onclick = typeNowClicked;
    typeSelectorContainer.appendChild(unscheduledButton);

    var scheduledButton = document.createElement('a');
    scheduledButton.id = "btn-later";
    scheduledButton.className = "rightButton csButtonSelected btn btn-default";
    scheduledButton.innerHTML += "Later";
    scheduledButton.onclick = typeLaterClicked;
    typeSelectorContainer.appendChild(scheduledButton);

    var submitDeadlineButton = document.getElementById('submitdeadline');
    submitDeadlineButton.className = 'invisible';

    var submitCancel = document.getElementsByClassName('submitcancel').item(0);
    submitCancel.className = 'submitcancel flex';

    var setReminderButton = document.getElementById('addReminder');
    if (!(setReminderButton === null)) {
    }
    else {
        setReminderButton = document.createElement('div');
        setReminderButton.id = 'addReminder';
        insertAfter(setReminderButton, submitDeadlineButton);
    }

    setReminderButton.className = 'btn btn-primary';
    setReminderButton.setAttribute("data-placement", "top");
    setReminderButton.setAttribute("data-toggle", "tooltip");
    setReminderButton.innerHTML = "Set Reminder";
    setReminderButton.onclick = setReminderClicked;

    var reminderButtonLoader = document.createElement('div');
    reminderButtonLoader.className = 'invisible';
    reminderButtonLoader.id = 'setReminderButtonLoader';
    setReminderButton.appendChild(reminderButtonLoader);

    var loader = document.createElement('div');
    loader.className = 'loader';
    reminderButtonLoader.appendChild(loader);

    return (typeSelectorContainer);
}

function setReminderClicked() {
    if (setReminderButtonDisabled)
        return;
    var heading = document.getElementsByClassName('cover-info').item(0).firstElementChild.firstElementChild;

    var headingComp = heading.innerHTML.split(" ");
    var coursecode = headingComp[1];

    var assignmentName = document.getElementById('deadline_title').value;

    var releaseDate = document.getElementById("due-start").childNodes[0].childNodes[0].childNodes[0].value;
    var releaseTime = document.getElementById("due-start").childNodes[1].childNodes[0].childNodes[0].value;

    var dueDate = document.getElementById("due-end").childNodes[0].childNodes[0].childNodes[0].value;
    var dueTime = document.getElementById("due-end").childNodes[1].childNodes[0].childNodes[0].value;

    setCreateReminderLoadingState();
    chrome.runtime.sendMessage({ type: "setReminder", coursecode: coursecode, assignmentName: assignmentName, releaseDate: releaseDate, releaseTime: releaseTime, dueDate: dueDate, dueTime: dueTime });

}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getDateTimeSelector(id) {
    var dateTimeSelectionContainer = document.createElement('div');
    dateTimeSelectionContainer.id = id;
    dateTimeSelectionContainer.className = "dateTimeContainer";

    var inputAppendDate = document.createElement('div');
    inputAppendDate.className = "input-append";
    inputAppendDate.style.marginRight = "10px";
    dateTimeSelectionContainer.appendChild(inputAppendDate);

    var inputGroupDate = document.createElement('div');
    inputGroupDate.className = "input-group datepicker";
    inputAppendDate.appendChild(inputGroupDate);

    var dateInput = document.createElement('input');
    dateInput.className = "form-control valid";
    dateInput.setAttribute("data-date-format", "DD/MM/YYYY");
    dateInput.setAttribute("placeholder", "Date");
    dateInput.setAttribute("type", "text");
    dateInput.setAttribute("style", "padding-right:2px;");
    inputGroupDate.appendChild(dateInput);

    var inputGroupAddonDate = document.createElement('span');
    inputGroupAddonDate.className = "input-group-addon";
    inputGroupDate.appendChild(inputGroupAddonDate);

    var calendarIcon = document.createElement('span');
    calendarIcon.className = "glyphicon-calendar glyphicon";
    inputGroupAddonDate.appendChild(calendarIcon);

    var inputAppendTime = document.createElement('div');
    inputAppendTime.className = "input-append";
    dateTimeSelectionContainer.appendChild(inputAppendTime);

    var inputGroupTime = document.createElement('div');
    inputGroupTime.className = "input-group timepicker";
    inputAppendTime.appendChild(inputGroupTime);

    var timeInput = document.createElement('input');
    timeInput.className = "form-control";
    timeInput.setAttribute("data-date-format", "HH:mm");
    timeInput.setAttribute("placeholder", "Time");
    inputGroupTime.appendChild(timeInput);

    var inputGroupAddonTime = document.createElement('span');
    inputGroupAddonTime.className = "input-group-addon";
    inputGroupTime.appendChild(inputGroupAddonTime);

    var timeIcon = document.createElement('span');
    timeIcon.className = "glyphicon glyphicon-time";
    inputGroupAddonTime.appendChild(timeIcon);


    return (dateTimeSelectionContainer);
}

function showSchedulingOptions() {
    var schedulingPanel = document.getElementById('scheduling-panel');
    while (schedulingPanel.childNodes.length > 2)
        schedulingPanel.removeChild(schedulingPanel.lastChild);
    schedulingPanel.appendChild(getHeaderRow("Duration"));
    schedulingPanel.appendChild(getPanelRow(getDurationPicker()));

    var flexBox = document.createElement('div');
    flexBox.className = "panelFlexContainer";
    schedulingPanel.appendChild(flexBox);

    var flexColumn1 = document.createElement('div');
    flexColumn1.className = "panelFlexColumn";
    flexColumn1.appendChild(getHeaderRow("Minimum Due Date & Time"));
    flexColumn1.appendChild(getPanelRow(getDateTimeSelector("min-due")));
    flexBox.appendChild(flexColumn1);

    var currentMillis = Date.now();
    var minDate = new Date(currentMillis);
    var minDateString = "" + parseDateValue(minDate.getDate()) + "/" + parseMonth(minDate.getMonth()) + "/" + minDate.getFullYear();
    var minTimeString = "" + parseDateValue(minDate.getHours()) + ":" + parseDateValue(minDate.getMinutes());
    document.getElementById("min-due").childNodes[0].childNodes[0].childNodes[0].value = minDateString;
    document.getElementById("min-due").childNodes[1].childNodes[0].childNodes[0].value = minTimeString;


    var flexColumn2 = document.createElement('div');
    flexColumn2.className = "panelFlexColumn";
    flexColumn2.appendChild(getHeaderRow("Maximum Due Date & Time"));
    flexColumn2.appendChild(getPanelRow(getDateTimeSelector("max-due")));
    flexBox.appendChild(flexColumn2);


    var computeButton = document.createElement('a');
    computeButton.className = "csButton btn btn-default";
    computeButton.innerHTML += "Get Deadline Schedule Suggestions";
    computeButton.id = 'computeButton';
    computeButton.setAttribute("style", "margin-left:0px !important;")
    computeButton.onclick = showSuggestions;

    var computeButtonLoader = document.createElement('div');
    computeButtonLoader.className = 'invisible';
    computeButtonLoader.id = 'computeButtonLoader';
    computeButton.appendChild(computeButtonLoader);

    var loader = document.createElement('div');
    loader.className = 'loader';
    computeButtonLoader.appendChild(loader);

    schedulingPanel.appendChild(getPanelRow(computeButton));
    repositionFooter();
}

function resetSchedulePanel() {
    var unscheduledButton = document.getElementById('btn-unscheduled');
    var scheduledButton = document.getElementById('btn-scheduled');
    unscheduledButton.className = "leftButton csButton btn btn-default";
    scheduledButton.className = "rightButton csButton btn btn-default";
    var schedulingPanel = document.getElementById('scheduling-panel');
    while (schedulingPanel.childNodes.length > 2)
        schedulingPanel.removeChild(schedulingPanel.lastChild);

    var submitDeadlineButton = document.getElementById('submitdeadline');
    submitDeadlineButton.className = 'btn btn-primary pull-right';

    var setReminderButton = document.getElementById('addReminder');
    setReminderButton.className = 'invisible';

    document.getElementById('deadline_title').value = "";
    repositionFooter();
}

function showNormalOptions() {
    var schedulingPanel = document.getElementById('scheduling-panel');
    while (schedulingPanel.childNodes.length > 2)
        schedulingPanel.removeChild(schedulingPanel.lastChild);
    schedulingPanel.appendChild(getHeaderRow("Due Date & Time"));
    schedulingPanel.appendChild(getPanelRow(getDateTimeSelector("normal-due")));
    document.getElementById("normal-due").childNodes[0].childNodes[0].childNodes[0].setAttribute("name", "deadline[date_part]");
    document.getElementById("normal-due").childNodes[1].childNodes[0].childNodes[0].setAttribute("name", "deadline[time_part]");

    var submitDeadlineButton = document.getElementById('submitdeadline');
    submitDeadlineButton.className = 'btn btn-primary pull-right';

    var setReminderButton = document.getElementById('addReminder');
    setReminderButton.className = 'invisible';

    repositionFooter();
}

function getSchedulingPanel() {
    var schedulingPanel = document.createElement('div');
    schedulingPanel.className = "schedulingPanel";
    schedulingPanel.id = 'scheduling-panel';
    schedulingPanel.appendChild(getHeaderRow("Assignment Type"));
    schedulingPanel.appendChild(getPanelRow(getTypeSelector()));
    return (schedulingPanel);
}

function parseMonth(month) {
    month += 1;
    month = "" + month;
    if (month.length == 1)
        month = "0" + month;
    return (month);
}

function parseDateValue(value) {
    value = "" + value;
    if (value.length == 1)
        value = "0" + value;
    return (value);
}


function showSuggestions() {
    if (fetchSchedulesButtonDisabled == true)
        return;
    var schedulingPanel = document.getElementById('scheduling-panel');
    var daysInput = document.getElementById("input-days");
    var hoursInput = document.getElementById("input-hours");


    var minDueDate = document.getElementById("min-due").childNodes[0].childNodes[0].childNodes[0].value;
    var minDueTime = document.getElementById("min-due").childNodes[1].childNodes[0].childNodes[0].value;

    var maxDueDate = document.getElementById("max-due").childNodes[0].childNodes[0].childNodes[0].value;
    var maxDueTime = document.getElementById("max-due").childNodes[1].childNodes[0].childNodes[0].value;

    while (schedulingPanel.childNodes.length > 6)
        schedulingPanel.removeChild(schedulingPanel.lastChild);

    if (daysInput.value === "" && hoursInput.value === "") {
        schedulingPanel.appendChild(getHeaderRow("Please Specify Time to Complete."));
    }
    else if (maxDueDate === "" || maxDueTime === "") {
        schedulingPanel.appendChild(getHeaderRow("Please Specify Maximum Due Date & Time."));
    }
    else {
        function convertDate(date) {
            var arr = date.split("/");
            if (arr.length < 3)
                return ("");
            return ("" + arr[1] + "/" + arr[0] + "/" + arr[2]);
        }
        if (daysInput.value === "")
            daysInput.value = "0";
        if (hoursInput.value === "")
            hoursInput.value = "0";
        chrome.runtime.sendMessage({
            type: "fetchSuggestions", hours: hoursInput.value, days: daysInput.value, minDueDate: minDueDate, minDueTime: minDueTime,
            maxDueDate: maxDueDate, maxDueTime: maxDueTime
        });
        setFetchSuggestionLoadingState();
    }
}

function repositionFooter() {
    var mainCourseDiv = document.getElementsByClassName('main-course-div').item(0);
    var footer = document.getElementById('newFooter');
    var top = 0;
    if (mainCourseDiv.offsetHeight + 30 < 979)
        top = 979;
    else
        top = mainCourseDiv.offsetHeight + 30;
    footer.style.top = top + "px";
}

function toggleSuggestionsDropDown() {
    var dropdownMenu = document.getElementById('suggestionsDropdownMenu');
    var arrowIcon = document.getElementById('suggestionsDropDownIcon');

    if (dropdownMenu.className === 'dropdownMenu') {
        dropdownMenu.className = 'invisible';
        arrowIcon.className = 'icon-caret-down dropDownIcon';
    }
    else {
        dropdownMenu.className = 'dropdownMenu';
        arrowIcon.className = 'icon-caret-up dropDownIcon';
    }
}

function getMonth(monthString) {
    var monthNum = 0;
    if (monthString[0] == '0') {
        monthNum = (+monthString[1]);
    }
    else {
        monthNum = +monthString;
    }
    var months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (months[monthNum]);
}

function getDate(dateString) {
    if (dateString[0] == "0")
        return (dateString.slice(1));
    return (dateString);
}

function parseDate(dateString) {
    var comp = dateString.split('T');
    var dateComp = comp[0].split('-');
    // var monthString = getMonth(dateComp[1]);
    var monthString = dateComp[1];
    // var dateString = getDate(dateComp[2]);
    var dateString = dateComp[2];
    var yearString = dateComp[0];
    return dateString + "/" + monthString;
}

function parseDateInput(dateString) {
    var comp = dateString.split('T');
    var dateComp = comp[0].split('-');
    return (dateComp[2] + "/" + dateComp[1] + "/" + dateComp[0]);
}

function parseTime(dateString) {
    var comp = dateString.split('T');
    var timeComp = comp[1].split(':');
    return timeComp[0] + ":" + timeComp[1];
}

function getDateSpan(dateString, showTime) {
    var fromSpan = document.createElement('div');
    fromSpan.className = 'suggestionSpan';

    var fromDateSpan = document.createElement('span');
    fromDateSpan.style.width = '70%';
    var fromDateTextSpan = document.createElement('span');
    fromDateTextSpan.innerHTML = parseDate(dateString);
    var calendarIcon = document.createElement('span');
    calendarIcon.className = 'glyphicon-calendar glyphicon suggestionIcon';
    fromDateSpan.appendChild(calendarIcon);
    fromDateSpan.appendChild(fromDateTextSpan);
    fromSpan.appendChild(fromDateSpan);

    if (showTime) {
        var fromTimeSpan = document.createElement('span');
        var fromTimeTextSpan = document.createElement('span');
        fromTimeTextSpan.innerHTML = parseTime(dateString);
        var timeIcon = document.createElement('span');
        timeIcon.className = 'glyphicon-time glyphicon suggestionIcon';
        fromTimeSpan.appendChild(timeIcon);
        fromTimeSpan.appendChild(fromTimeTextSpan);
        fromSpan.appendChild(fromTimeSpan);
    }

    return (fromSpan);
}

function getDropDownItem(suggestion, mode = 1) {
    var suggestionContainer = document.createElement('div');
    if (mode == 1) {
        suggestionContainer.className = 'suggestionContainer';
    }
    else
        suggestionContainer.className = 'suggestionItem';

    var textSpan = document.createElement('div');
    textSpan.className = 'dropDownButtonContent';

    var toDiv = document.createElement('div');
    toDiv.innerHTML = 'to';
    toDiv.className = 'toDiv';

    var showTime = false;
    if (suggestion.showTime !== undefined && suggestion.showTime !== null)
        showTime = suggestion.showTime;

    textSpan.appendChild(getDateSpan(suggestion.start_date, showTime));
    textSpan.appendChild(toDiv);
    textSpan.appendChild(getDateSpan(suggestion.end_date, showTime));

    suggestionContainer.appendChild(textSpan);
    return (suggestionContainer);
}

function getDateObject(suggestionString) {
    var comps = suggestionString.split('T');
    var dateComp = comps[0];
    var compsDate = dateComp.split('-');

    var yearNum = +compsDate[0];

    var monthStr = compsDate[1];
    if (monthStr[0] == '0')
        monthStr = monthStr.substr(1);

    var dateStr = compsDate[2];
    if (dateStr[0] == '0')
        dateStr = dateStr.substr(1);

    var dateNum = +dateStr;
    var monthNum = +monthStr;

    var timeComp = comps[1];
    var compsTime = timeComp.split(':');

    var hourStr = compsTime[0];
    var minStr = compsTime[1];

    if (hourStr[0] == '0')
        hourStr = hourStr.substr(1);

    if (minStr[0] == '0')
        minStr = minStr.substr(1);

    return new Date(yearNum, monthNum - 1, dateNum, +hourStr, +minStr, 0, 0);
}

function calculateOverlapPercentage(sd_1, ed_1, sd_2, ed_2) {
    var start_1 = getDateObject(sd_1);
    var end_1 = getDateObject(ed_1);

    var start_2 = getDateObject(sd_2);
    var end_2 = getDateObject(ed_2);


    var overlapTime = 0;

    if (end_1.getTime() < start_2.getTime() || start_1.getTime() > end_2.getTime()) {
        return (0);
    }
    else if (start_2.getTime() >= start_1.getTime() && end_2.getTime() <= end_1.getTime()) {
        overlapTime = end_2.getTime() - start_2.getTime();
    }
    else if (start_1.getTime() > start_2.getTime() && end_1.getTime() < end_2.getTime()) {
        overlapTime = end_1.getTime() - start_1.getTime();
    }
    else if (start_1.getTime() <= start_2.getTime()) {
        overlapTime = end_1.getTime() - start_2.getTime();
    }
    else if (end_1.getTime() >= end_2.getTime()) {
        overlapTime = end_2.getTime() - start_1.getTime();
    }


    var totalTime = end_1.getTime() - start_1.getTime();

    return (Math.floor((overlapTime / totalTime) * 100));
}

function selectSuggestion(suggestion) {
    var selectedList = document.getElementsByClassName('suggestionCardSelected');
    for (var i = 0; i < selectedList.length; ++i) {
        selectedList.item(i).className = selectedList.item(i).className.replace('suggestionCardSelected', 'suggestionCard');
    }
    var selectedList = document.getElementsByClassName('suggestionCardGreenSelected');
    for (var i = 0; i < selectedList.length; ++i) {
        selectedList.item(i).className = selectedList.item(i).className.replace('suggestionCardGreenSelected', 'suggestionCardGreen');
    }
    var selectedList = document.getElementsByClassName('suggestionCardYellowSelected');
    for (var i = 0; i < selectedList.length; ++i) {
        selectedList.item(i).className = selectedList.item(i).className.replace('suggestionCardYellowSelected', 'suggestionCardYellow');
    }
    var suggestionCard = document.getElementById("card-" + suggestion.id);
    suggestionCard.className = suggestionCard.className.replace('suggestionCard', 'suggestionCardSelected');
    suggestionCard.className = suggestionCard.className.replace('suggestionCardGreen', 'suggestionCardGreenSelected');
    suggestionCard.className = suggestionCard.className.replace('suggestionCardYellow', 'suggestionCardYellowSelected');

    var showTime = 'false';
    var defaultTime = "00:00";
    if (suggestion.showTime !== undefined && suggestion.showTime !== null)
        showTime = suggestion.showTime;

    document.getElementById("due-start").childNodes[0].childNodes[0].childNodes[0].value = parseDateInput(suggestion.start_date);

    if (showTime)
        document.getElementById("due-start").childNodes[1].childNodes[0].childNodes[0].value = parseTime(suggestion.start_date);
    else
        document.getElementById("due-start").childNodes[1].childNodes[0].childNodes[0].value = defaultTime;

    document.getElementById("due-end").childNodes[0].childNodes[0].childNodes[0].value = parseDateInput(suggestion.end_date);

    if (showTime)
        document.getElementById("due-end").childNodes[1].childNodes[0].childNodes[0].value = parseTime(suggestion.end_date);
    else
        document.getElementById("due-end").childNodes[1].childNodes[0].childNodes[0].value = defaultTime;

    if (isFlexibleSchedule)
        selectedFlexibleSchedule = suggestion;
    else
        selectedFixedSchedule = suggestion;

    showSuggestionMessage(suggestion);
}

function getSuggestionCard(suggestionData, selected = false) {
    var suggestionCardContainer = document.createElement('div');
    suggestionCardContainer.className = 'suggestionCardContainer';

    var suggestionCard = document.createElement('div');
    suggestionCard.id = "card-" + suggestionData.id;

    if (suggestionData.clash.score <= 0) {
        if (selected)
            suggestionCard.className = 'suggestionCardSelected suggestionCardGreenSelected';
        else
            suggestionCard.className = 'suggestionCard suggestionCardGreen';
    }
    else {
        if (selected)
            suggestionCard.className = 'suggestionCardSelected suggestionCardYellowSelected';
        else
            suggestionCard.className = 'suggestionCard suggestionCardYellow';
    }

    suggestionCard.onclick = () => {

        selectSuggestion(suggestionData);
    };

    suggestionCardContainer.appendChild(suggestionCard);

    var textSpan = document.createElement('span');
    suggestionCard.appendChild(textSpan);

    textSpan.innerHTML = `${parseDate(suggestionData.start_date)} - ${parseDate(suggestionData.end_date)}`;

    return suggestionCardContainer;
}

function showSuggestionMessage(suggestion) {
    var suggestionMessage = document.getElementById('suggestion-message');
    var suggestionsPanelContainer = document.getElementById('suggestions-panel-container');

    var suggestionsPanel = document.getElementById('suggestions-panel');


    if (suggestion.id == 0) {
        suggestionMessage.innerHTML = '<span style="font-size:25px; margin-right:5px;">&#10003;</span> Selected schedule is most optimal.';
        if (!suggestionMessage.className.includes("correctMessage")) {
            if (suggestionMessage.className.includes("warningMessage")) {
                suggestionMessage.className = suggestionMessage.className.replace("warningMessage", "correctMessage");
            }
            else
                suggestionMessage.className = suggestionMessage.className + " correctMessage";
        }
        suggestionMessage.style.bottom = ((-1 * suggestionMessage.offsetHeight) - 5) + 'px';
        suggestionsPanelContainer.style.marginBottom = (suggestionMessage.offsetHeight + 5 + 10) + 'px';
        suggestionsPanel.className = 'suggestionsPanelCorrect';
    }

    else if (suggestion.clash.score == 0) {
        suggestionMessage.style.zIndex = "3";
        suggestionMessage.style.bottom = (5) + 'px';
        suggestionsPanelContainer.style.marginBottom = '10px';
        suggestionsPanel.className = 'suggestionsPanel';
        return;
    }

    else {
        var clashes = "";
        for (var i = 0; i < suggestion.clash.reason.length; ++i) {
            var str = `<span style="margin-top:5px;"><b>${suggestion.clash.reason[i].fraction_of_students * 100}%</b> students have a deadline of <b>${suggestion.clash.reason[i].courseWork.course_name}</b> with \
        <b>${calculateOverlapPercentage(suggestion.start_date, suggestion.end_date, suggestion.clash.reason[i].courseWork.start_date, suggestion.clash.reason[i].courseWork.end_date)}%</b> overlap.</span>`;
            clashes += str;
        }
        suggestionMessage.innerHTML = '<span style="font-size:25px; margin-right:5px;">&#9888;</span> Selected schedule clashes with ' + suggestion.clash.reason.length + ' other deadline schedules. \
        <span class="tooltipTrigger">Learn More<div class="tooltiptext" id="tooltipText">'+ clashes + '</div>';
        if (!suggestionMessage.className.includes("warningMessage")) {
            if (suggestionMessage.className.includes("correctMessage")) {
                suggestionMessage.className = suggestionMessage.className.replace("correctMessage", "warningMessage");
            }
            else
                suggestionMessage.className = suggestionMessage.className + " warningMessage";
        }
        suggestionMessage.style.bottom = ((-1 * suggestionMessage.offsetHeight) - 5) + 'px';
        suggestionsPanelContainer.style.marginBottom = (suggestionMessage.offsetHeight + 5 + 10) + 'px';
        suggestionsPanel.className = 'suggestionsPanelWarning';
    }


    setTimeout(() => {
        suggestionMessage.style.zIndex = "10";
    }, 500);
}

function getSuggestionsPanel(scheduleResponse, flexible = false, update = false) {
    var suggestionsPanelContainer = null;
    var suggestionsPanel = null;
    var suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'suggestionsContainer';

    if (!update) {
        suggestionsPanelContainer = document.createElement('div');
        suggestionsPanelContainer.className = 'suggestionsPanelContainer';
        suggestionsPanelContainer.id = 'suggestions-panel-container';

        suggestionsPanel = document.createElement('div');
        suggestionsPanel.className = 'suggestionsPanel';
        suggestionsPanel.id = 'suggestions-panel';
        suggestionsPanel.style.width = (document.getElementById('scheduling-panel').offsetWidth - 10) + 'px';
        suggestionsPanel.appendChild(suggestionsContainer);
    }
    else {
        suggestionsPanelContainer = document.getElementById('suggestions-panel-container');
        suggestionsPanel = document.getElementById('suggestions-panel');
        while (suggestionsPanel.children.length != 0)
            suggestionsPanel.removeChild(suggestionsPanel.lastChild);
        suggestionsPanel.appendChild(suggestionsContainer);
    }
    var suggestionList = null;
    if (flexible)
        suggestionList = scheduleResponse.flexi_suggestions;
    else
        suggestionList = scheduleResponse.suggestions;

    for (let i = 0; i < suggestionList.length; ++i) {
        if (i == 0)
            suggestionsContainer.appendChild(getSuggestionCard(suggestionList[i], true));
        else
            suggestionsContainer.appendChild(getSuggestionCard(suggestionList[i]));
    }

    var rows = Math.ceil(suggestionList.length / 6);
    if (rows <= 3)
        suggestionsPanel.style.overflowY = "visible";
    else
        suggestionsPanel.style.overflowY = "auto";
    suggestionsPanel.style.maxHeight = ((66.6667 * 3) + 10 + 15) + "px";
    suggestionsPanel.style.height = ((66.6667 * rows) + 10 + 15) + "px";

    if (!update) {
        var suggestionMessage = document.createElement('div');
        suggestionMessage.className = 'suggestionMessage';
        suggestionMessage.id = 'suggestion-message';
        suggestionsPanelContainer.appendChild(suggestionMessage);
        suggestionsPanelContainer.appendChild(suggestionsPanel);
    }

    return (suggestionsPanelContainer);
}

function fixedDurationClicked() {
    if (!isFlexibleSchedule)
        return;
    isFlexibleSchedule = false;
    var unscheduledButton = document.getElementById('btn-fixed-duration');
    var scheduledButton = document.getElementById('btn-flexible-duration');
    unscheduledButton.className = "leftButton csButtonSelected btn btn-default";
    scheduledButton.className = "rightButton csButton btn btn-default";

    getSuggestionsPanel(scheduleResponse, false, true);
    selectSuggestion(selectedFixedSchedule);
}

function flexibleDurationClicked() {
    if (isFlexibleSchedule)
        return;
    isFlexibleSchedule = true;
    var unscheduledButton = document.getElementById('btn-flexible-duration');
    var scheduledButton = document.getElementById('btn-fixed-duration');
    unscheduledButton.className = "rightButton csButtonSelected btn btn-default";
    scheduledButton.className = "leftButton csButton btn btn-default";

    getSuggestionsPanel(scheduleResponse, true, true);
    selectSuggestion(selectedFlexibleSchedule);
}

function getFlexibleDurationSelector() {
    isFlexibleSchedule = false;
    var typeSelectorContainer = document.createElement('div');
    typeSelectorContainer.className = "typeSelectorContainer";

    var unscheduledButton = document.createElement('a');
    unscheduledButton.id = "btn-fixed-duration";
    unscheduledButton.className = "leftButton csButtonSelected btn btn-default";
    unscheduledButton.innerHTML += "Fixed Duration";
    unscheduledButton.onclick = fixedDurationClicked;
    typeSelectorContainer.appendChild(unscheduledButton);

    var scheduledButton = document.createElement('a');
    scheduledButton.id = "btn-flexible-duration";
    scheduledButton.className = "rightButton csButton btn btn-default";
    scheduledButton.innerHTML += "Flexible Duration";
    scheduledButton.onclick = flexibleDurationClicked;
    typeSelectorContainer.appendChild(scheduledButton);

    return (typeSelectorContainer);
}

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type == 'fetchSuggestions') {
        scheduleResponse = JSON.parse(msg.message);
        var id = 0;
        for (var i = 0; i < scheduleResponse.suggestions.length; ++i)
            scheduleResponse.suggestions[i].id = id++;
        for (var i = 0; i < scheduleResponse.flexi_suggestions.length; ++i)
            scheduleResponse.flexi_suggestions[i].id = id++;
        unsetFetchSuggestionLoadingState();
        var schedulingPanel = document.getElementById('scheduling-panel');

        schedulingPanel.appendChild(getHeaderRow("Deadline Schedule Suggestions"));
        schedulingPanel.appendChild(getPanelRow(getFlexibleDurationSelector(), "margin-bottom:5px;"));
        schedulingPanel.appendChild(getSuggestionsPanel(scheduleResponse));

        schedulingPanel.appendChild(getHeaderRow("Deadline Release Date & Time"));


        var rowDiv = document.createElement('div');
        rowDiv.setAttribute('style', "display:flex; width:100%");
        rowDiv.appendChild(getScheduleTypeSelector());
        rowDiv.appendChild(getDateTimeSelector("due-start"));
        schedulingPanel.appendChild(getPanelRow(rowDiv));

        schedulingPanel.appendChild(getHeaderRow("Deadline Due Date & Time"));
        schedulingPanel.appendChild(getPanelRow(getDateTimeSelector("due-end")));

        document.getElementById("due-start").childNodes[0].childNodes[0].childNodes[0].value = parseDateInput(scheduleResponse.suggestions[0].start_date);
        document.getElementById("due-start").childNodes[1].childNodes[0].childNodes[0].value = parseTime(scheduleResponse.suggestions[0].start_date);

        document.getElementById("due-end").childNodes[0].childNodes[0].childNodes[0].value = parseDateInput(scheduleResponse.suggestions[0].end_date);
        document.getElementById("due-end").childNodes[1].childNodes[0].childNodes[0].value = parseTime(scheduleResponse.suggestions[0].end_date);

        document.getElementById("due-end").childNodes[0].childNodes[0].childNodes[0].setAttribute("name", "deadline[date_part]");
        document.getElementById("due-end").childNodes[1].childNodes[0].childNodes[0].setAttribute("name", "deadline[time_part]");
        repositionFooter();

        showSuggestionMessage(scheduleResponse.suggestions[0]);
        selectedFixedSchedule = scheduleResponse.suggestions[0];
        selectedFlexibleSchedule = scheduleResponse.flexi_suggestions[0];
    }

    else if (msg.type == 'setReminder') {
        unsetCreateReminderLoadingState(msg.message);
        var noShowDiv = document.getElementById('deadline_no_show');
        noShowDiv.setAttribute('style', 'display:none;')
    }

    else if (msg.type == 'check-announcement-tags') {
        tagsPanel.addTagsAuto(msg.tags);
    }
});

function setFetchSuggestionLoadingState() {
    fetchSchedulesButtonDisabled = true;
    var computeButton = document.getElementById('computeButton');
    computeButton.className = 'csButtonDisabled btn btn-default';

    var computeButtonLoader = document.getElementById('computeButtonLoader');
    computeButtonLoader.className = 'computeButtonLoader';
}

function unsetFetchSuggestionLoadingState() {
    fetchSchedulesButtonDisabled = false;
    var computeButton = document.getElementById('computeButton');
    computeButton.className = 'csButton btn btn-default';

    var computeButtonLoader = document.getElementById('computeButtonLoader');
    computeButtonLoader.className = 'invisible';
}

function setCreateReminderLoadingState() {
    setReminderButtonDisabled = true;
    var setReminderButton = document.getElementById('addReminder');
    setReminderButton.className = 'btn btn-primary disabled-btn-primary';

    var setReminderButtonLoader = document.getElementById('setReminderButtonLoader');
    setReminderButtonLoader.className = 'computeButtonLoader';
}

function unsetCreateReminderLoadingState(message) {
    setReminderButtonDisabled = false;

    var setReminderButton = document.getElementById('addReminder');
    setReminderButton.className = 'btn btn-primary';

    var setReminderButtonLoader = document.getElementById('setReminderButtonLoader');
    setReminderButtonLoader.className = 'invisible';

    resetSchedulePanel();
    showAlertMessage(`<span style="font-size:25px; margin-right:10px;">&#10003;</span> Reminder set for deadline "${message.assignmentName}" to be released on ${message.dueDate}`, "success", 4500);
}

function showAlertMessage(message, type, duration) {
    displayAlertBanner(message, type);
    setTimeout(() => {
        hideAlertBanner();
    }, duration);
}

function displayAlertBanner(message, type) {
    var alertMessage = document.getElementById('alertMessage');
    alertMessage.innerHTML = message;

    var alertBanner = document.getElementById('alertBanner');
    var courseTabContent = document.getElementById('course-tab-content');
    var tabCover = document.getElementsByClassName('tab-cover').item(0);

    alertBanner.style.top = (tabCover.offsetTop + tabCover.offsetHeight) + "px";
    courseTabContent.style.marginTop = alertBanner.offsetHeight + "px";
}

function hideAlertBanner() {
    var alertBanner = document.getElementById('alertBanner');
    var courseTabContent = document.getElementById('course-tab-content');
    var tabCover = document.getElementsByClassName('tab-cover').item(0);

    alertBanner.style.top = ((tabCover.offsetTop + tabCover.offsetHeight) - alertBanner.offsetHeight) + 'px';
    courseTabContent.style.marginTop = "0px";
}

function prepareAlertBanner() {
    var courseCover = document.getElementsByClassName('course-cover').item(0);
    var tabCover = document.getElementsByClassName('tab-cover').item(0);
    courseCover.style.position = 'relative';
    tabCover.style.position = 'relative';
    courseCover.style.zIndex = '5';
    tabCover.style.zIndex = '5';


    var body = document.getElementsByTagName('body').item(0);
    body.style.display = 'relative';
    var alertBanner = document.createElement('div');
    alertBanner.className = 'alertBanner';
    alertBanner.id = 'alertBanner';
    body.appendChild(alertBanner);
    hideAlertBanner();

    alertBanner.style.transition = 'top 0.3s ease-in';
    alertBanner.style.paddingLeft = "18%";

    var courseTabContent = document.getElementById('course-tab-content');
    courseTabContent.style.transition = 'margin-top 0.3s ease-in';

    var alertMessage = document.createElement('div');
    alertMessage.id = 'alertMessage';
    alertMessage.className = 'alertMessage';
    alertBanner.appendChild(alertMessage);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'TabUpdated') {
        var url = request.tab.url;
        var urlComp = url.split('/');
        if (urlComp[2] === "www.usebackpack.com" && urlComp[4] == "courses" && urlComp[6] == "deadlines") {
            var id = setInterval(() => {
                if (document.getElementById('new_deadline') !== null) {
                    clearInterval(id);
                    updateDom();
                }
            }, 200);
        }
        if (urlComp[2] !== "www.usebackpack.com") {
            alertBannerPrepared = false;
        }
        if (urlComp[2] === "www.usebackpack.com" && urlComp[4] == "courses" && urlComp[6] == "announcements") {
            var id = setInterval(() => {
                if (document.getElementById('announcement_title') !== null) {
                    clearInterval(id);
                    updateDomAnnouncements();
                }
            }, 200);
        }
    }
})

function updateDom() {
    removeDateTimeFields();
    var deadlineNoShow = document.getElementById('deadline_no_show');
    deadlineNoShow.insertBefore(getSchedulingPanel(), deadlineNoShow.childNodes[1]);
    if (!alertBannerPrepared) {
        prepareAlertBanner();
        alertBannerPrepared = true;
    }
}

function updateDomAnnouncements() {
    tagsPanel = new TagsPanel();
}

class TagsPanel {

    inputHandler() {
        clearTimeout(this.curId);
        this.curId = setTimeout(() => {
            if (this.auto == true) {
                var title = document.getElementById('announcement_title').value;
                var text = document.getElementById('announcement_body').value;
                chrome.runtime.sendMessage({
                    type: "check-announcement-tags", title: title, text: text
                });
            }
        }, 1000);
    }

    constructor() {
        this.addAutoTagToggle();
        this.auto = true;
        var announcementNoShow = document.getElementById('announcement_no_show');
        this.domPanel = document.createElement('div');
        announcementNoShow.insertBefore(this.domPanel, announcementNoShow.firstChild);
        this.domPanel.className = 'tags-panel';
        this.newTagButton = document.createElement('div');
        this.newTagWindow = document.createElement('div');
        this.skipNewTagToggle = false;

        this.tagAttributesPanel = document.createElement('div');
        this.tagAttributesPanel.className = 'tag-attr-panel';

        var textBox = document.getElementsByClassName('wysihtml5-sandbox').item(0);
        textBox.parentNode.insertBefore(this.tagAttributesPanel, textBox.nextSibling);

        this.tags = ['Assignment Clarification', 'Class Cancellation', 'Exam Announcement', 'Extra Class'];
        this.appliedTags = [];
        this.excludedAutoTags = [];
        this.TagMap = new Map();
        this.attributeTagsCount = 0;
        this.addNewTagButton();

        var titleInput = document.getElementById('announcement_title');
        this.textArea = document.getElementById('announcement_body');
        var prevlength = (this.textArea.value + titleInput.value).length;
        setInterval(() => {
            var curLength = (this.textArea.value + titleInput.value).length;
            if (prevlength != curLength) {
                prevlength = curLength;
                this.inputHandler();
            }
        }, 10);
        this.setupPersist();
        this.formatTags();
    }

    resetData() {
        this.autoToggle.setAttribute('checked','true');
        this.auto=true;
        for (let tag of this.appliedTags) {
            var tagD = this.TagMap.get(tag);
            this.removeTag(tagD);
        }
        this.appliedTags = [];
        this.excludedAutoTags = [];
    }

    setupPersist() {
        this.submit = document.getElementById('submitannouncememnt');
        this.submit.style.display = 'none';
        this.newSubmit = document.createElement('input');
        this.newSubmit.className = 'btn btn-primary';
        this.newSubmit.setAttribute('style', 'margin:10px 0px 0px 0px;');
        this.newSubmit.setAttribute('value', 'Make Announcement');

        this.newSubmitOverlay = document.createElement('div');
        this.newSubmitOverlay.setAttribute('style', 'position:absolute; top:0px; left:0px; right:0px; bottom:-13px; cursor:pointer;');

        this.submit.parentElement.style.position = 'relative';
        this.submit.parentElement.appendChild(this.newSubmitOverlay);
        this.submit.parentElement.appendChild(this.newSubmit);
        this.newSubmitOverlay.onclick = this.persistTags.bind(this);

        var cancelBtn=document.getElementById('announce_cancel');
        cancelBtn.onclick=this.resetData.bind(this);
    }

    persistTags() {
        this.textArea.setAttribute('name', '');
        var newTextArea = document.createElement('textarea');
        newTextArea.setAttribute('name', 'announcement[body]');
        newTextArea.style.display = 'none';
        var tagStr = "";
        for (var i = 0; i < this.appliedTags.length; ++i) {
            tagStr += this.appliedTags[i];
            if (i != this.appliedTags.length - 1)
                tagStr += ', ';
        }
        var appendValue = `<br><br><i>Tags :- ${tagStr}</i>`;
        newTextArea.value = `${this.textArea.value}${appendValue}`;
        this.textArea.parentNode.appendChild(newTextArea);
        this.submit.click();
        this.textArea.parentNode.removeChild(newTextArea);

        this.resetData();

        setTimeout(() => {
            this.formatTags();
        }, 1000);
    }

    addAutoTagToggle() {
        var toolbar = document.getElementsByClassName('wysihtml5-toolbar').item(0);

        var toolbarItem = document.createElement('li');
        toolbar.appendChild(toolbarItem);

        var toggleContainer = document.createElement('div');
        toggleContainer.className = 'auto-tag-toggle-cont';
        toolbarItem.appendChild(toggleContainer);

        var toggleLabel = document.createElement('span');
        toggleLabel.className = 'auto-tag-toggle-label';
        toggleLabel.innerHTML = 'Enable Auto-Tagging: ';
        toggleContainer.appendChild(toggleLabel);

        this.autoToggle = document.createElement('input');
        this.autoToggle.setAttribute('type', 'checkbox');
        this.autoToggle.setAttribute('data-toggle', 'switchbutton');
        this.autoToggle.setAttribute('checked', 'true');
        this.autoToggle.style.marginTop = '0px';
        this.autoToggle.style.marginLeft = '5px';
        toggleContainer.appendChild(this.autoToggle);

        this.autoToggle.addEventListener('input', this.toggleAuto.bind(this));
    }

    toggleAuto() {
        this.auto = !this.auto;
        if (this.auto == true) {
            this.inputHandler();
        }
        else {
            for (let tag of this.appliedTags) {
                var tagInst = this.TagMap.get(tag);
                if (tagInst.isAuto)
                    this.removeTag(tagInst, true);
            }
        }
    }

    addNewTagButton() {
        this.newTagButton.className = 'btn-new-tag';

        var overlay = document.createElement('div');
        overlay.className = 'tag-overlay-invisible';
        this.newTagButton.appendChild(overlay);

        this.newTagButton.overlay = overlay;

        this.newTagButtonText = document.createElement('font');
        this.newTagButtonText.innerHTML = '+ Add Tag';
        this.newTagButton.appendChild(this.newTagButtonText);
        this.newTagWindowOpen = false;

        this.newTagWindow.className = 'invisible';
        this.newTagButton.appendChild(this.newTagWindow);
        this.newTagButton.onclick = this.newTagToggle.bind(this);
        this.domPanel.appendChild(this.newTagButton);

        this.clickCatcher = document.createElement('div');
        this.clickCatcher.className = 'invisible';
        this.clickCatcher.id = 'click-catcher';

        this.clickCatcher.onclick = this.newTagToggle.bind(this);

        var body = document.getElementsByTagName('body').item(0);
        body.appendChild(this.clickCatcher);
    }

    hideAddTagButton() {
        this.newTagButton.overlay.className = 'tag-overlay-visible';
        this.newTagButton.style.borderColor = '#ececec';
        this.newTagButton.overlay.style.pointerEvents = 'all';
        setTimeout(() => {
            this.newTagButton.className = 'invisible';
        }, 300);
    }

    measureWidth(element) {
        var prevPosition = element.style.position;
        var prevVisibility = element.style.visibility;
        element.style.visibility = 'hidden';
        element.style.position = 'absolute';
        var body = document.getElementsByTagName('body').item(0);
        body.appendChild(element);
        var width = element.offsetWidth;
        body.removeChild(element);
        element.style.position = prevPosition;
        element.style.visibility = prevVisibility;
        return (width);
    }

    measureHeight(element) {
        var prevPosition = element.style.position;
        var prevVisibility = element.style.visibility;
        element.style.visibility = 'hidden';
        element.style.position = 'absolute';
        var body = document.getElementsByTagName('body').item(0);
        body.appendChild(element);
        var width = element.offsetHeight;
        body.removeChild(element);
        element.style.position = prevPosition;
        element.style.visibility = prevVisibility;
        return (width);
    }

    showAddTagButton() {
        this.newTagButton.className = 'btn-new-tag';
        this.newTagButton.style.visibility = '';

        setTimeout(() => {
            this.newTagButton.overlay.className = 'tag-overlay-invisible';
            this.newTagButton.overlay.style.pointerEvents = 'none';
            this.newTagButton.style.borderColor = '#3498db';
        }, 80);
    }

    populateTagWindow() {
        this.clearTagWindow();
        var remainingTags = this.tags.filter((el) => {
            if (this.appliedTags.includes(el))
                return (false);
            return (true);
        });
        for (let tag of remainingTags) {
            this.newTagWindow.appendChild(this.getTagDomElement(tag, true));
        }
    }

    clearTagWindow() {
        while (this.newTagWindow.childNodes.length > 0)
            this.newTagWindow.removeChild(this.newTagWindow.lastChild);
    }

    displayTagAttributes(tag, date = null) {
        if (tag.tagAttributeDom != null) {
            this.attributeTagsCount++;
            var height = this.measureHeight(tag.tagAttributeDom);
            this.tagAttributesPanel.style.height = (this.tagAttributesPanel.offsetHeight + height) + 'px';
            setTimeout(() => {
                this.tagAttributesPanel.appendChild(tag.tagAttributeDom);
                setTimeout(() => {
                    tag.tagAttributeDom.tagAttrOverlay.className = 'tag-attr-overlay-invisible';
                    if (date == null)
                        tag.tagAttributeDom.setDate(new Date(Date.now()));
                    else
                        tag.tagAttributeDom.setDate(date);
                }, 80);
            }, 200);
        }
    }

    removeTagAttributes(tag) {
        if (tag.tagAttributeDom != null) {
            this.attributeTagsCount--;
            var height = tag.tagAttributeDom.offsetHeight;
            tag.tagAttributeDom.tagAttrOverlay.className = 'tag-attr-overlay-visible';
            setTimeout(() => {
                this.tagAttributesPanel.removeChild(tag.tagAttributeDom);
                this.tagAttributesPanel.style.height = (this.tagAttributesPanel.offsetHeight - height) + 'px';
            }, 200);
        }
    }

    addTag(tagText, auto = false, date = null) {
        var tag = this.getTagDomElement(tagText, false, auto, false);
        this.TagMap.set(tagText, tag);
        var tagWidth = this.measureWidth(tag);

        this.domPanel.firstChild.style.transition = 'margin-left 0.2s linear';
        this.domPanel.firstChild.style.marginLeft = tagWidth + 'px';

        setTimeout(() => {
            this.domPanel.firstChild.style.transition = '';
            this.domPanel.firstChild.style.marginLeft = 0 + 'px';
            this.domPanel.insertBefore(tag, this.domPanel.firstChild);
            setTimeout(() => {
                tag.overlay.className = 'tag-overlay-invisible';
                this.displayTagAttributes(tag, date);
                this.appliedTags.push(tagText);
                if (this.appliedTags.length == this.tags.length) {
                    this.hideAddTagButton();
                }
            }, 50);
        }, 200);
    }

    removeTag(tag, autoRemove = false) {
        if (!autoRemove && tag.isAuto) {
            this.excludedAutoTags.push(tag);
        }
        this.TagMap.delete(tag.tagText);
        var tagText = tag.tagText;
        this.appliedTags = this.appliedTags.filter((el) => el !== tagText);
        var removeTag = document.getElementById(`tag-${tagText}`);
        var nextTag = removeTag.nextElementSibling;
        var tagWidth = removeTag.offsetWidth;
        removeTag.overlay.className = 'tag-overlay-visible';
        setTimeout(() => {
            this.domPanel.removeChild(removeTag);
            if (nextTag !== null) {
                nextTag.style.transition = '';
                nextTag.style.marginLeft = tagWidth + 'px';
                this.removeTagAttributes(tag);
                setTimeout(() => {
                    nextTag.style.transition = 'margin-left 0.2s linear';
                    nextTag.style.marginLeft = '0px';
                    this.showAddTagButton();
                }, 50);
            }
        }, 300);
    }

    getTagDomElement(tagText, forSelection = false, isAuto = false, forDisplay = false) {
        var tag = document.createElement('div');
        tag.style.position = 'relative';
        tag.innerHTML = tagText;
        if (forSelection)
            tag.className = 'tag-selection';
        else if (forDisplay)
            tag.className = 'tag-display';
        else if (isAuto) {
            var tagContent = document.createElement('div');
            tagContent.className = 'tag-auto';
            tag.innerHTML = '';
            tagContent.innerHTML = tagText;

            var tagClose = document.createElement('div');
            tagClose.innerHTML = 'x';
            tagClose.className = 'tag-close-auto';

            tag.appendChild(tagClose);
            tag.appendChild(tagContent);

            tag.style.display = 'flex';

            tagClose.onclick = (() => {
                this.removeTag(tag);
            }).bind(this);
        }
        else {
            var tagContent = document.createElement('div');
            tagContent.className = 'tag-manual';
            tag.innerHTML = '';
            tagContent.innerHTML = tagText;

            var tagClose = document.createElement('div');
            tagClose.innerHTML = 'x';
            tagClose.className = 'tag-close-manual';

            tag.appendChild(tagClose);
            tag.appendChild(tagContent);

            tag.style.display = 'flex';

            tagClose.onclick = (() => {
                this.removeTag(tag);
            }).bind(this);
        }

        var tagOverlay = document.createElement('div');

        if (forSelection || forDisplay)
            tagOverlay.className = 'tag-overlay-invisible';
        else
            tagOverlay.className = 'tag-overlay-visible';

        tag.appendChild(tagOverlay);
        tag.overlay = tagOverlay;

        if (forSelection && !forDisplay)
            tag.onclick = (() => {
                this.addTag(tagText);
                this.newTagToggle();
            }).bind(this);
        tag.id = `tag-${tagText}`;
        tag.tagText = tagText;
        tag.tagAttributeDom = this.getTagAttributeDom(tag);
        tag.isAuto = isAuto;
        return (tag);
    }

    getTagAttributeDom(tag) {
        var tagText = tag.tagText;
        if (tagText === 'Exam Announcement') {
            var tagAttributeContainer = document.createElement('div');
            tagAttributeContainer.className = 'tag-attr-container';

            var row1 = document.createElement('div');
            row1.className = 'tag-attr-container-row';
            tagAttributeContainer.appendChild(row1);

            var attrlabel = document.createElement('span');
            attrlabel.className = 'tag-attr-label';
            attrlabel.innerHTML = 'Date of Exam: ';
            row1.appendChild(attrlabel);

            var inputAppend = document.createElement('div');
            inputAppend.className = 'input-append';
            row1.appendChild(inputAppend);

            var inputGroupDatePicker = document.createElement('div');
            inputGroupDatePicker.className = 'input-group datepicker';
            inputAppend.appendChild(inputGroupDatePicker);

            var input = document.createElement('input');
            input.className = 'form-control valid';
            input.setAttribute('data-date-format', 'DD/MM/YYYY');
            input.setAttribute('placeholder', 'Date');
            input.setAttribute('type', 'text');
            input.setAttribute('style', 'padding-right:2px;');
            inputGroupDatePicker.appendChild(input);

            var iconSpan = document.createElement('span');
            iconSpan.className = 'input-group-addon';
            inputGroupDatePicker.appendChild(iconSpan);

            var icon = document.createElement('span');
            icon.className = 'glyphicon-calendar glyphicon';
            iconSpan.appendChild(icon);

            var tagAttrOverlay = document.createElement('div');
            tagAttrOverlay.className = 'tag-attr-overlay-visible';
            tagAttributeContainer.appendChild(tagAttrOverlay);

            tagAttributeContainer.tagAttrOverlay = tagAttrOverlay;
            tagAttributeContainer.setDate = function (date) {
                var month = "" + (date.getMonth() + 1);
                var dateS = "" + date.getDate();
                if (month.length == 1)
                    month = "0" + month;
                if (dateS.length == 1)
                    dateS = "0" + dateS;
                input.value = `${dateS}/${month}/${date.getFullYear()}`;
            };

            return (tagAttributeContainer);
        }
        else if (tagText === 'Class Cancellation') {
            var tagAttributeContainer = document.createElement('div');
            tagAttributeContainer.className = 'tag-attr-container';

            var row1 = document.createElement('div');
            row1.className = 'tag-attr-container-row';
            tagAttributeContainer.appendChild(row1);

            var attrlabel = document.createElement('span');
            attrlabel.className = 'tag-attr-label';
            attrlabel.innerHTML = 'Cancelled Class Date: ';
            row1.appendChild(attrlabel);

            var inputAppend = document.createElement('div');
            inputAppend.className = 'input-append';
            row1.appendChild(inputAppend);

            var inputGroupDatePicker = document.createElement('div');
            inputGroupDatePicker.className = 'input-group datepicker';
            inputAppend.appendChild(inputGroupDatePicker);

            var input = document.createElement('input');
            input.className = 'form-control valid';
            input.setAttribute('data-date-format', 'DD/MM/YYYY');
            input.setAttribute('placeholder', 'Date');
            input.setAttribute('type', 'text');
            input.setAttribute('style', 'padding-right:2px;');
            inputGroupDatePicker.appendChild(input);

            var iconSpan = document.createElement('span');
            iconSpan.className = 'input-group-addon';
            inputGroupDatePicker.appendChild(iconSpan);

            var icon = document.createElement('span');
            icon.className = 'glyphicon-calendar glyphicon';
            iconSpan.appendChild(icon);

            var tagAttrOverlay = document.createElement('div');
            tagAttrOverlay.className = 'tag-attr-overlay-visible';
            tagAttributeContainer.appendChild(tagAttrOverlay);

            tagAttributeContainer.tagAttrOverlay = tagAttrOverlay;
            tagAttributeContainer.setDate = function (date) {
                var month = "" + (date.getMonth() + 1);
                var dateS = "" + date.getDate();
                if (month.length == 1)
                    month = "0" + month;
                if (dateS.length == 1)
                    dateS = "0" + dateS;
                input.value = `${dateS}/${month}/${date.getFullYear()}`;
            };

            return (tagAttributeContainer);
        }
        return (null);
    }

    newTagToggle() {
        if (this.skipNewTagToggle) {
            this.skipNewTagToggle = false;
            return;
        }

        if (!this.newTagWindowOpen) {
            this.newTagWindow.className = 'tag-window-closed';

            this.newTagWindow.onclick = (() => {
                this.skipNewTagToggle = true;
            }).bind(this);

            this.newTagWindowOpen = true;
            var tagButtonWidth = this.newTagButton.offsetWidth;
            var tagWindowWidth = 200;

            var offset = (tagWindowWidth - tagButtonWidth) / 2;
            this.newTagWindow.style.left = ((-1) * offset) + 'px';

            this.clickCatcher.className = 'click-catcher';
            setTimeout(() => {
                this.clickCatcher.className = 'click-catcher-black';
                this.newTagWindow.className = 'tag-window-visible';
            }, 10);

            setTimeout(() => {
                this.populateTagWindow();
            }, 200);
        }
        else {
            this.newTagWindowOpen = false;
            this.newTagWindow.className = 'tag-window-hidden';
            this.clickCatcher.className = 'click-catcher';
            this.newTagWindow.className = 'tag-window-closed';
            this.clearTagWindow();
            setTimeout(() => {
                this.clickCatcher.className = 'invisible';
                this.newTagWindow.className = 'invisible';
            }, 200);
        }
    }

    addTagsAuto(tags) {
        var excludedNames = [];
        for (let tag of this.excludedAutoTags)
            excludedNames.push(tag.tagText);
        var tagNames = [];
        for (let tag of tags)
            tagNames.push(tag.name);
        if (!excludedNames.includes('Exam Announcement')) {
            if (!tagNames.includes('Exam Announcement') && this.appliedTags.includes('Exam Announcement')) {
                this.removeTag(this.TagMap.get('Exam Announcement'), true);
            }
            for (let tag of tags) {
                if (tag.name == 'Exam Announcement') {
                    if (this.appliedTags.includes(tag.name)) {
                        var tagInst = this.TagMap.get(tag.name);
                        tagInst.tagAttributeDom.setDate(new Date(tag.attr1));
                    }
                    else {
                        this.addTag(tag.name, true, new Date(tag.attr1));
                    }
                }
            }
        }
    }

    formatTags() {
        var qs = document.querySelectorAll('[id^="announce_"]');
        var announceDoms = [];
        for (var i = 0; i < qs.length; ++i)
            announceDoms.push(qs.item(i));
        for (let announceDom of announceDoms) {
            var contentDom = announceDom.getElementsByTagName('p').item(1);
            if (contentDom !== null && contentDom !== undefined) {
                var res = contentDom.innerHTML.match(new RegExp('<br><br><i>Tags :-.*</i>'));
                if (res !== null) {
                    var tagContent = res[0].match(new RegExp('Tags :-.*<'))[0];
                    tagContent = tagContent.substring(8, tagContent.length - 1);
                    var tags = tagContent.split(', ');
                    if (!(tags.length == 1 && tags[0] === '')) {
                        var tagContainer = document.createElement('div');
                        tagContainer.className = 'tags-panel';
                        tagContainer.style.marginBottom = '15px';
                        announceDom.insertBefore(tagContainer, announceDom.getElementsByTagName('p').item(1));
                        for (let tag of tags) {
                            tagContainer.appendChild(this.getTagDomElement(tag, false, false, true));
                        }
                    }
                    contentDom.innerHTML = contentDom.innerHTML.replace(res, '');
                }
            }
        }
    }
}