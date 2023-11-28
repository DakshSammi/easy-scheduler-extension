// var alert_bell_div;
// var alert_bell;
// var img;

// alert_bell_div = document.createElement('div')
// alert_bell_div.className = 'rightMargin';
// alert_bell = document.createElement('div');
// alert_bell.className = 'uArJ5e Y5FYJe cjq2Db oxacD xSP5ic M9Bg4d'
// alert_bell.setAttribute('jsaction', 'mouseenter:tfO1Yc; mouseleave:JywGue');

// img = document.createElement('img');
// img.className = 'icon';
// img.setAttribute('src', chrome.runtime.getURL('assets/bell.gif'));

// alert_bell.appendChild(img);
// alert_bell_div.appendChild(alert_bell);

// alert_bell.addEventListener("click", () => {
// 	window.alert("Students are relatively free this week! If you were going to post an assignment in the near future, now is the time!");
// });

// Your existing code to create the bell icon and div
var alert_bell_div = document.createElement('div');
alert_bell_div.className = 'rightMargin';
var alert_bell = document.createElement('div');
alert_bell.className = 'uArJ5e Y5FYJe cjq2Db oxacD xSP5ic M9Bg4d';
alert_bell.setAttribute('jsaction', 'mouseenter:tfO1Yc; mouseleave:JywGue');

var img = document.createElement('img');
img.className = 'icon';
img.setAttribute('src', chrome.runtime.getURL('assets/bell.gif'));

alert_bell.appendChild(img);
alert_bell_div.appendChild(alert_bell);

alert_bell.addEventListener("click", () => {
    window.alert("Students are relatively free this week! If you were going to post an assignment in the near future, now is the time!");
});

// // Find the container for the Meet video call icon to place the bell icon next to it
// var meetVideoCallIconContainer = document.querySelector('.TFpTO[data-unique-tt-id="ucc-10"]');
// if(meetVideoCallIconContainer) {
//     // Insert the bell icon div before the Meet video call icon container
//     meetVideoCallIconContainer.parentNode.insertBefore(alert_bell_div, meetVideoCallIconContainer);
// } else {
//     console.error('Meet video call icon container not found.');
// }

