var is_instructor = null;

var announcement_box = null;

let observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (!mutation.addedNodes) return;
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
			if(node.className == 'QRiHXd ') {
				observeAnnouncement(node)
			}
			if(node.className == 'hqfVKd tL9Q4c') {
				announcement_box = node
			}
		}
	});
});

function observeAnnouncement(node) {
	node.addEventListener('click', () => {
		announcement = announcement_box.childNodes[0].data.toLowerCase()
		if(announcement.includes('quiz')) {
			document.body.appendChild(createQuizPopup())
		}
	})
}

// function observeCourseName() {
// 	var course_name_node = document.getElementsByClassName('wy758b')[0].childNodes[0].childNodes[0];
// 	var course_name_node_2 = document.getElementsByClassName('wy758b')[0].childNodes[0].childNodes[1];
// 	if(course_name_node == null) return;
// 	temp = course_name_node.childNodes[0].data;
// 	if(course_name_node_2 != null && course_name_node_2.childNodes[0].data != null) {
// 		temp += ' ' + course_name_node_2.childNodes[0].data;
// 	}
// 	if(course_name_node != null && course_name != temp && is_instructor) {
// 		course_name = temp;
// 		console.log(course_name);
// 		onCourseNameChange(course_name)
// 	}
// }

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	characterData: true,
});

setInterval(observeCourseName, 1000);
