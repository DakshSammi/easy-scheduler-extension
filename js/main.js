var course_name = 'course 1';

let observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (!mutation.addedNodes) return;
		// observer.disconnect();
		for (let i = 0; i < mutation.addedNodes.length; i++) {
			let node = mutation.addedNodes[i];
			if (node.className == 'tNGpbb uTUgB YVvGBb') {
				course_name = node.textContent;
			}
			if (node.className == HEADING_CLASS && node.childNodes[0].data == "Due") {
				let parent = node.parentNode;
				parent.insertBefore(open_suggestions_popup, node);
				parent.insertBefore(popup, node);
			}
		}
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	characterData: true,
});

let check_student_schedule = `https://deadline-scheduling-suggestion.herokuapp.com/iiitd/${course_name}/student_schedule/week`;
fetch(check_student_schedule).then(async (response) => {
	const score = await response.json();
	console.log(score);
	if(score.score == 0) {
		var settings = document.getElementsByClassName('fB7J9c kWv2Xb QRiHXd')[0];
		settings.parentNode.insertBefore(alert_bell_div, settings);		
	}
})
