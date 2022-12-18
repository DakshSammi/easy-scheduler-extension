var is_instructor = true;

var announcement_box = null;
var announcement_text = null;
var checked_announcement = false;

let observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.removedNodes.forEach(node => {
			if(node.ariaLabel == 'Announce something to your class') {
				announcement_text = null;
			}	
		});
		if (!mutation.addedNodes) return;
		for (let i = 0; i < mutation.addedNodes.length; i++) {
			let node = mutation.addedNodes[i];
			if (node.className == "gtuckc iLjzDc" && node.childNodes[0].data == "Due") {
				let parent = node.parentNode;
				parent.insertBefore(open_suggestions_popup, node);
				parent.insertBefore(popup, node);
			}
			if(node.className=='u2mfde hN1OOc EZrbnd J1raN S6Vdac' && node.parentNode.parentNode.childElementCount==4) {
				is_instructor = true;
			}
			if(node.ariaLabel == 'Announce something to your class') {
				announcement_box = node;
			}
		}
	});
});

function observeAnnouncement() {
	if(announcement_box != null && announcement_text != announcement_box.textContent) {
		announcement_text = announcement_box.textContent;
		if(announcement_text.toLowerCase().includes('quiz')) {
			if(!checked_announcement) {
				document.body.appendChild(createQuizPopup())
				checked_announcement = true;
			}
		} else {
			checked_announcement = false;
		}
	}

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

setInterval(observeAnnouncement, 100);
