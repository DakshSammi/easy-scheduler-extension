function fetchSuggestions() {
	var duration = [];
	labels.forEach(lbl => {
		duration.push(document.getElementById(lbl).value);
		console.log(lbl + document.getElementById(lbl).value);
	})

	var min_due_date = min_due_date_input.value;
	var max_due_date = max_due_date_input.value;

	let base_url = `https://deadline-scheduling-suggestion.herokuapp.com/iiitd/get_suggestions/${course_name}/${duration[0]}-${duration[1]}-0/${min_due_date}T00:00:00.000Z/${max_due_date}T00:00:00.000Z`;
	console.log(base_url);

	const fetchPromise = fetch(base_url);
	fetchPromise.then((response) => {
		return response.json();
	}).then((res) => {
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
	})
}