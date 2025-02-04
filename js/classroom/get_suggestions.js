function dateDiffInDays(a, b) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

function fetchCourseNames(course_selection_dropdown) {
	console.log(course_selection_dropdown)
	while(course_selection_dropdown.childNodes.length > 0) course_selection_dropdown.removeChild(course_selection_dropdown.childNodes[0]);
	let base_url = `${DEADLINE_SCHEDULING_SUGGESTION_API}/${COLLEGE_NAME}/courses`;
	console.log(base_url);
	const fetchPromise = fetch_(base_url);
	fetchPromise.then((response) => {
		return response.json();
	}).then((res) => {
		console.log(res);
		for(var id in res) {
			var course = document.createElement("option");
			course.value = id;
			course.appendChild(document.createTextNode(res[id]));
			course_selection_dropdown.appendChild(course);
		}
	})

}

function fetchSuggestions() {
	error_message.style.display = 'none'		
	var duration = [];
	labels.forEach(lbl => {
		duration.push(document.getElementById(lbl).value);
		console.log(lbl + document.getElementById(lbl).value);
	})

	console.log(duration);

	var course_id = course_selection_dropdown.value;
	var min_due_date = min_due_date_input.value;
	var max_due_date = max_due_date_input.value;
	console.log(min_due_date);
	console.log(max_due_date);
	var min_date = new Date(min_due_date);
	var max_date = new Date(max_due_date);
	console.log(dateDiffInDays(min_date, max_date));

	let base_url = `${DEADLINE_SCHEDULING_SUGGESTION_API}/${COLLEGE_NAME}/get_suggestions/${course_id}/${duration[0]}-${duration[1]}-0/${min_due_date}T00:00:00.000Z/${max_due_date}T00:00:00.000Z`;
	console.log(base_url);

	const fetchPromise = fetch_(base_url);
	get_suggestions.style.display = 'none'
	get_suggestions_loading.style.display = 'block'

	fetchPromise.then((response) => {
		return response.json();
	}).then((res) => {
		get_suggestions.style.display = 'block'
		get_suggestions_loading.style.display = 'none'
		if(all_suggestions.childNodes.length > 0) all_suggestions.removeChild(all_suggestions.childNodes[0]);
		if(all_suggestions.childNodes.length > 0) all_suggestions.removeChild(all_suggestions.childNodes[0]);
		var suggestions = res["suggestions"];
		var flexi_suggestions = res["flexi_suggestions"];
		console.log(suggestions);
		console.log(flexi_suggestions);

		var suggestions = createSuggestions("Suggestions", suggestions);

		all_suggestions.appendChild(suggestions);

		if (flexi_suggestions_input.checked) {
			var flexi_suggestions = createSuggestions("Flexible Duration Suggestions (max duration+2 days)", flexi_suggestions);
			all_suggestions.appendChild(flexi_suggestions);
		}

	}).catch(err => {
	    console.error(err)
		get_suggestions.style.display = 'block'
		get_suggestions_loading.style.display = 'none'
	    error_message.style.display = 'block'
	})
}