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

function fetchSuggestions() {
	error_message.style.display = 'none'		
	var duration = [];
	labels.forEach(lbl => {
		duration.push(document.getElementById(lbl).value);
		console.log(lbl + document.getElementById(lbl).value);
	})

	console.log(duration);

	var min_due_date = min_due_date_input.value;
	var max_due_date = max_due_date_input.value;
	console.log(min_due_date);
	console.log(max_due_date);
	var min_date = new Date(min_due_date);
	var max_date = new Date(max_due_date);
	console.log(dateDiffInDays(min_date, max_date));

	let base_url = `${DEADLINE_SCHEDULING_SUGGESTION_API}/${COLLEGE_NAME}/get_suggestions/${course_name}/${duration[0]}-${duration[1]}-0/${min_due_date}T00:00:00.000Z/${max_due_date}T00:00:00.000Z`;
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

		var new_min_due_date = max_due_date;
		var new_max_due_date = formatDate(addDays(max_due_date, 20));
		var extra_date;
		let url = `${DEADLINE_SCHEDULING_SUGGESTION_API}/${COLLEGE_NAME}/get_suggestions/${course_name}/${duration[0]}-${duration[1]}-0/${new_min_due_date}T00:00:00.000Z/${new_max_due_date}T00:00:00.000Z`;
		const promise = fetch_(url);
		promise.then((response) => {
			return response.json();
		}).then((res) => {
			var extra_suggestions = res["suggestions"];
			var extra_flexi_suggestions = res["flexi_suggestions"];
			console.log(extra_suggestions);
			console.log(extra_flexi_suggestions);
			for (var i in extra_suggestions) {
				if (extra_suggestions[i]['clash']['score'] < 2) {
					extra_date = extra_suggestions[i]['start_date'];
					extra_date = formatDate(extra_date);
					break;
				}
			}
			for (var i in extra_flexi_suggestions) {
				if (extra_flexi_suggestions[i]['clash']['score'] < 2) {
					var temp = extra_flexi_suggestions[i]['start_date'];
					temp = formatDate(temp);
					if (new Date(extra_date) - new Date(temp) >= 0) {
						temp = extra_date;
					}
					break;
				}
			}
		}).catch(err => {
		    console.error(err)
			get_suggestions.style.display = 'block'
			get_suggestions_loading.style.display = 'none'
		    error_message.style.display = 'block'
		})
	}).catch(err => {
	    console.error(err)
		get_suggestions.style.display = 'block'
		get_suggestions_loading.style.display = 'none'
	    error_message.style.display = 'block'
	})
}
