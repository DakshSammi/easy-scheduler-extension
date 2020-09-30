function informAboutQuiz(date) {
	var start_date = new Date(date)
	var end_date = new Date(date)
	end_date.setHours(end_date.getHours() + 1)
	fetch(`https://deadline-scheduling-suggestion.herokuapp.com/iiitd/{course_name}/inform_about_event/${course_name} Quiz/${start_date.toISOString()}/${end_date.toISOString()}`).then((response) => {
		return response.json();
	}).then((res) => {
		console.log(res)
	})
}