var alert_bell_div;
var alert_bell;
var img;

alert_bell_div = document.createElement('div')
alert_bell_div.className = 'rightMargin';
alert_bell = document.createElement('div');
alert_bell.className = 'uArJ5e Y5FYJe cjq2Db oxacD xSP5ic M9Bg4d'
alert_bell.setAttribute('jsaction', 'mouseenter:tfO1Yc; mouseleave:JywGue');

img = document.createElement('img');
img.className = 'icon';
img.setAttribute('src', 'https://images.squarespace-cdn.com/content/v1/59b209f2f9a61e9322ea89dd/1579562667557-8OK0ZMW9GO8JWO96VH19/ke17ZwdGBToddI8pDm48kGfiFqkITS6axXxhYYUCnlRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpynMgxFZ6RzSE45ir_sniaZBw7FOrln7zsnpr66I7c2YLH858feRDDLIQWAxIBqV54/noun_Bell_325307.png');

alert_bell.appendChild(img);
alert_bell_div.appendChild(alert_bell);

alert_bell.addEventListener("click", () => {
	window.alert("Students are relatively free this week! If you were going to post an assignment in the near future, now is the time!");
});
