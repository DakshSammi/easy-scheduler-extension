async function onCourseNameChange(course_name) {
	// check if course is present in the database
	var is_present = `https://deadline-scheduling-suggestion.herokuapp.com/iiitd/courses/${course_name}/is_present`
	var response = fetch(is_present)
	is_present = response.body == 'true'

	console.log(is_present)
	// if not first get the course added
	if(is_present == false) {
		await promptUserToAddCourse()
	}

	// check student schedule
	var check_student_schedule = `https://deadline-scheduling-suggestion.herokuapp.com/iiitd/student_schedule/${course_name}/week`;
	response = await fetch(check_student_schedule)
	const score = await response.json();
	console.log(score);
	var settings = document.getElementsByClassName('fB7J9c kWv2Xb QRiHXd')[0];
	if(score.score == 0 && !settings.parentNode.contains(alert_bell_div) && alert_bell_div!=undefined) {
		settings.parentNode.insertBefore(alert_bell_div, settings);		
	} else if(score.score > 0 && settings.parentNode.contains(alert_bell_div)){
		settings.parentNode.removeChild(alert_bell_div);
	}
}

async function promptUserToAddCourse() {
	// carry out oauth process for classroom api to get permission for fetching students
	// fetch student ids (any unique identifier, eg email) using api
	// Get instructor name, email
	// call addCourse

	await addCourse(course_name, 'Raghava Mutharaju', 'raghava@iiitd.ac.in', ['2019001', '2019002', '2019003', '2019004'])
}

async function addCourse(course_name, professor_name, professor_email, students) {

	var add_course = `https://deadline-scheduling-suggestion.herokuapp.com/iiitd/courses/${course_name}/add_course/${professor_name}/${professor_email}/${students.join(',')}`
	response = await fetch(add_course)
	
}