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

// Function to fetch appropriate data from the API to check the completion rate
async function fetchAppropriateData(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-API-Key': '018aac80'
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch appropriate data');
        }
    } catch (error) {
        console.error('Error fetching appropriate data:', error);
        return null;
    }
}

function calculateAssignmentCompletionRate(data, assignmentId) {
    // Assuming your data structure matches the provided schema
    const submissions = data.filter(entry => entry.assignmentsubmission_id === assignmentId);
    const totalAssignments = submissions.length;

    // Assuming each student submits only once for an assignment
    const uniqueSubmittedStudents = [...new Set(submissions.map(entry => entry.student_id))];
    const completedAssignments = uniqueSubmittedStudents.length;

    if (totalAssignments === 0) {
        console.error('No submissions found for the specified assignment.');
        return null;
    }

    const completionRate = (completedAssignments / totalAssignments) * 100;
    return completionRate;
}

function calculateQuizCompletionRate(data, quizId) {
    const submissions = data.filter(entry => entry.quiz_id === quizId);
    const totalQuizzes = submissions.length;
    const uniqueSubmittedStudents = [...new Set(submissions.map(entry => entry.student_id))];
    const completedQuizzes = uniqueSubmittedStudents.length;
    if (totalQuizzes === 0) {
        console.error('No submissions found for the specified quiz.');
        return null;
    }
    const completionRate = (completedQuizzes / totalQuizzes) * 100;
    return completionRate;
}

// Main function to fetch data and calculate the completion rate
async function main() {
    const apiUrl = 'https://my.api.mockaroo.com/a_completion.json';
    const data = await fetchAppropriateData(apiUrl);
    const qapir = 'https://my.api.mockaroo.com/q_completion.json';
    const qdata = await fetchAppropriateData(qapir);
    if (data || qdata) {
        // Replace '888' with the actual assignment/quiz ID you want to check
        const completionRate = calculateAssignmentCompletionRate(data, '888');
        const qcompletionRate = calculateQuizCompletionRate(qdata, '888');
        console.log(`Assignment completion rate: ${completionRate.toFixed(2)}%`);
        // Show an alert to the professor if completion rate is > 70% or < 30%
        if (completionRate > 70) {
            alert(`Assignment completion rate is ${completionRate.toFixed(2)}%. No need to extend the deadline. New Assignment can be scheduled!`);
        } else if (completionRate < 30) {
            alert(`Assignment completion rate is ${completionRate.toFixed(2)}%. You may need to extend the deadline. New Assignment cannot be scheduled!`);
        }
        console.log(`Quiz completion rate: ${qcompletionRate.toFixed(2)}%`);
        // Show an alert to the professor if completion rate is > 70% or < 30%
        if (qcompletionRate > 70) {
            alert(`Quiz completion rate is ${qcompletionRate.toFixed(2)}%. No need to extend the deadline. New Quiz can be scheduled!`);
        } else if (qcompletionRate < 30) {
            alert(`Quiz completion rate is ${qcompletionRate.toFixed(2)}%. You may need to extend the deadline. New Quiz cannot be scheduled!`);
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