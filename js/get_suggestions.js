get_suggestions.addEventListener("click", function () {
	while (suggestions_dropdown.firstChild) {
		suggestions_dropdown.removeChild(suggestions_dropdown.firstChild);
	}
	while (suggestions_dropdown_flexible.firstChild) {
		suggestions_dropdown_flexible.removeChild(suggestions_dropdown_flexible.firstChild);
	}

	var arr = [];
	labels.forEach(lbl => {
		arr.push(document.getElementById(lbl).value);
		console.log(lbl + document.getElementById(lbl).value);
	})

	var min_due_date = min_due_date_input.value;
	var max_due_date = max_due_date_input.value;

	let base_url = "https://deadline-scheduling-suggestion.herokuapp.com/iiitd/course 1/get_suggestions/";
	base_url = base_url+arr[0]+'-'+arr[1]+'-0/'+min_due_date+'T00:00:00.000Z/'+max_due_date+'T00:00:00.000Z';
	console.log(base_url);

	const fetchPromise = fetch(base_url);
	fetchPromise.then((response) => {
		return response.json();
	}).then((res) => {
	var suggestions = res["suggestions"];
	var flexi_suggestions = res["flexi_suggestions"];
	//console.log(res);
	console.log(res);
	console.log(suggestions);
	console.log(flexi_suggestions);
	for (let i in suggestions) {
		var list_item = document.createElement('span');
		var suggestions_object = suggestions[i];
		var start_date = suggestions_object["start_date"].substring(0, 10);
		var number = parseInt(i)+1;
		var start_date_text = number + ') ' + start_date;
		var list_item_text = document.createTextNode(start_date_text);
		list_item.appendChild(list_item_text);
		suggestions_dropdown.appendChild(list_item);
	}
	if (check_box_input.checked) {
		for (let i in flexi_suggestions) {
			var flexi_list_item = document.createElement('span');
			var flexi_suggestions_object = flexi_suggestions[i];
			var flexi_start_date = flexi_suggestions_object["start_date"].substring(0, 10);
			var flexi_number = parseInt(i)+1;
			var flexi_start_date_text = flexi_number + ') ' + flexi_start_date;
			var flexi_list_item_text = document.createTextNode(flexi_start_date_text);
			flexi_list_item.appendChild(flexi_list_item_text);
			suggestions_dropdown_flexible.appendChild(flexi_list_item);
		}
	}
	})
});
