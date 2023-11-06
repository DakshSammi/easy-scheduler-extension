// var is_instructor = true;

// var announcement_box = null;
// var announcement_text = null;
// var checked_announcement = false;

// let observer = new MutationObserver((mutations) => {
// 	mutations.forEach((mutation) => {
// 		mutation.removedNodes.forEach(node => {
// 			if(node.ariaLabel == 'Announce something to your class') {
// 				announcement_text = null;
// 			}	
// 		});
// 		if (!mutation.addedNodes) return;
// 		for (let i = 0; i < mutation.addedNodes.length; i++) {
// 			let node = mutation.addedNodes[i];
// 			if (node.className == "gtuckc iLjzDc" && node.childNodes[0].data == "Due") {
// 				let parent = node.parentNode;
// 				parent.insertBefore(open_suggestions_popup, node);
// 				parent.insertBefore(popup, node);
// 			}
// 			if(node.className=='u2mfde hN1OOc EZrbnd J1raN S6Vdac' && node.parentNode.parentNode.childElementCount==4) {
// 				is_instructor = true;
// 			}
// 			if(node.ariaLabel == 'Announce something to your class') {
// 				announcement_box = node;
// 			}
// 		}
// 	});
// });

// function observeAnnouncement() {
// 	if(announcement_box != null && announcement_text != announcement_box.textContent) {
// 		announcement_text = announcement_box.textContent;
// 		if(announcement_text.toLowerCase().includes('quiz')) {
// 			if(!checked_announcement) {
// 				document.body.appendChild(createQuizPopup())
// 				checked_announcement = true;
// 			}
// 		} else {
// 			checked_announcement = false;
// 		}
// 	}

// }

// // function observeCourseName() {
// // 	var course_name_node = document.getElementsByClassName('wy758b')[0].childNodes[0].childNodes[0];
// // 	var course_name_node_2 = document.getElementsByClassName('wy758b')[0].childNodes[0].childNodes[1];
// // 	if(course_name_node == null) return;
// // 	temp = course_name_node.childNodes[0].data;
// // 	if(course_name_node_2 != null && course_name_node_2.childNodes[0].data != null) {
// // 		temp += ' ' + course_name_node_2.childNodes[0].data;
// // 	}
// // 	if(course_name_node != null && course_name != temp && is_instructor) {
// // 		course_name = temp;
// // 		console.log(course_name);
// // 		onCourseNameChange(course_name)
// // 	}
// // }

// observer.observe(document.body, {
// 	childList: true,
// 	subtree: true,
// 	attributes: true,
// 	characterData: true,
// });

// setInterval(observeAnnouncement, 100);

var is_instructor = true;
var announcement_box = null;
var announcement_text = null;
var checked_announcement = false;

let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.removedNodes.forEach(node => {
            if (node.ariaLabel == 'Announce something to your class') {
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
            if (node.className == 'u2mfde hN1OOc EZrbnd J1raN S6Vdac' && node.parentNode.parentNode.childElementCount == 4) {
                is_instructor = true;
            }
            if (node.ariaLabel == 'Announce something to your class') {
                announcement_box = node;
            }
        }
    });
});

function observeAnnouncement() {
    if (announcement_box != null && announcement_text != announcement_box.textContent) {
        announcement_text = announcement_box.textContent;
        if (announcement_text.toLowerCase().includes('quiz')) {
            if (!checked_announcement) {
                document.body.appendChild(createQuizPopup());
                checked_announcement = true;
                // Once "quiz" is detected in an announcement, fetch student data and calculate the completion rate
                main();
            }
        } else {
            checked_announcement = false;
        }
    }
}

// Rest of your MutationObserver and announcement-related code here

// Function to fetch student data from the API
async function fetchStudentData() {
    const apiUrl = `${DEADLINE_SCHEDULING_SUGGESTION_API}/getStudentData?course=${course_name}`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return data; // Assuming the API returns an array of student data with a "submitted" property.
        } else {
            throw new Error('Failed to fetch student data');
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
        return null;
    }
}

// Function to calculate the assignment completion rate
function calculateAssignmentCompletionRate(students) {
    if (!students || students.length === 0) {
        return 0; // No students or data, so completion rate is 0%.
    }

    const submittedStudents = students.filter(student => student.submitted);
    const completionRate = (submittedStudents.length / students.length) * 100;
    return completionRate;
}

// Main function to fetch data and calculate the completion rate
async function main() {
    const studentData = await fetchStudentData();
    if (studentData) {
        const completionRate = calculateAssignmentCompletionRate(studentData);
        console.log(`Assignment completion rate: ${completionRate.toFixed(2)}%`);
        // Show an alert to the professor if completion rate is > 70% or < 30%
        if (completionRate > 70) {
            alert(`Assignment completion rate is ${completionRate.toFixed(2)}%. No need to extend the deadline. New Assignment can be scheduled!`);
        }
        else if (completionRte < 30){
            alert(`Assignment completion rate is ${completionRate.toFixed(2)}%. You may need to extend the deadline. New Assignment cannot be scheduled!`);
        }
    }
}

// Run the main function when the page loads
window.addEventListener('load', () => {
    // Start observing announcements
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
    });

    // Set up announcement monitoring
    setInterval(observeAnnouncement, 100);
});
