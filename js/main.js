var course_name = null;
var is_instructor = null;

let observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (!mutation.addedNodes) return;
		// observer.disconnect();
		for (let i = 0; i < mutation.addedNodes.length; i++) {
			let node = mutation.addedNodes[i];
			if (node.className == HEADING_CLASS && node.childNodes[0].data == "Due") {
				let parent = node.parentNode;
				parent.insertBefore(open_suggestions_popup, node);
				parent.insertBefore(popup, node);
			}
			if(node.className=='u2mfde hN1OOc EZrbnd J1raN S6Vdac' && node.parentNode.parentNode.childElementCount==4) {
				is_instructor = true;
			}
		}
	});
});

function observeCourseName() {
	var course_name_node = document.getElementById('UGb2Qe');
	var course_name_node_2 = document.getElementsByClassName('YVvGBb dDKhVc')[0];
	if(course_name_node == null) return;
	temp = course_name_node.childNodes[0].data;
	if(course_name_node_2 != null) {
		temp += ' ' + course_name_node_2.childNodes[0].data;
	}
	if(course_name_node != null && course_name != temp && is_instructor) {
		course_name = temp;
		console.log(course_name);
		let check_student_schedule = `https://deadline-scheduling-suggestion.herokuapp.com/iiitd/${course_name}/student_schedule/week`;
		fetch(check_student_schedule).then(async (response) => {
			const score = await response.json();
			console.log(score);
			var settings = document.getElementsByClassName('fB7J9c kWv2Xb QRiHXd')[0];
			if(score.score == 0 && !settings.parentNode.contains(alert_bell_div) && alert_bell_div!=undefined) {
				settings.parentNode.insertBefore(alert_bell_div, settings);		
			} else if(score.score > 0 && settings.parentNode.contains(alert_bell_div)){
				settings.parentNode.removeChild(alert_bell_div);
			}
		});
	}
}

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	characterData: true,
});

setInterval(observeCourseName, 1000);
