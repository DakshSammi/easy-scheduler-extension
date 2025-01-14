// const BUTTON_CLASS = "U26fgb cd29Sd p0oLxb BEAGS CG2qQ QRiHXd bVp04e center";
const BUTTON_CLASS  = "U26fgb cd29Sd p0oLxb BEAGS nmr34b RDPZE center";
// const HEADING_CLASS = "gtuckc tLDEHd-Wvd9Cc";
const HEADING_CLASS = "gtuckc iLjzDc";


const LESS_SUGGESTIONS = 6

function createSuggestions(heading, suggestions) {
	var suggestions_div = document.createElement('div')
	suggestions_div.className = 'suggestions'

	var suggestions_title = document.createElement('div')
	suggestions_title.className = HEADING_CLASS
	var suggestions_title_text = document.createTextNode(heading)
	suggestions_title.appendChild(suggestions_title_text)

	var suggestions_body_less = document.createElement('div')
	suggestions.slice(0, LESS_SUGGESTIONS).forEach((suggestion) => {
		suggestions_body_less.appendChild(createSuggestion(suggestion))
	})
	suggestions_body_less.style.display = "block"

	var suggestions_body_more = document.createElement('div')
	suggestions.forEach((suggestion) => {
		suggestions_body_more.appendChild(createSuggestion(suggestion))
	})
	suggestions_body_more.style.display = "none"

	var showMore = false

	// get suggestions
	var show_more_button = createButton("Show More", () => {})
	show_more_button.addEventListener("click", () => {
		suggestions_body_less.style.display = "none"
		suggestions_body_more.style.display = "block"
		show_more_button.style.display = "none"
		show_less_button.style.display = "block"
	})

	var show_less_button = createButton("Show Less", () => {})
	show_less_button.addEventListener("click", () => {
		suggestions_body_less.style.display = "block"
		suggestions_body_more.style.display = "none"
		show_more_button.style.display = "block"
		show_less_button.style.display = "none"
	})
	show_less_button.style.display = "none"

	suggestions_div.appendChild(suggestions_title)
	suggestions_div.appendChild(suggestions_body_less)

	if(suggestions.length > 8) {
		suggestions_div.appendChild(suggestions_body_more)
		suggestions_div.appendChild(show_less_button)
		suggestions_div.appendChild(show_more_button)
	}


	return suggestions_div
}

function createSuggestion(suggestion) {
	var suggestion_row = document.createElement('div')
	suggestion_row.className = 'suggestionRow neutral'

	var suggestion_head = document.createElement('div')
	suggestion_head.className = 'suggestionHead'

	var suggestion_date_text_div = document.createElement('div')
	suggestion_date_text_div.className = HEADING_CLASS + ' suggestionDate'
	var suggestion_date_text = document.createTextNode(`${('0' + (new Date(suggestion.start_date)).getDate()).slice(-2)}/${('0' + ((new Date(suggestion.start_date)).getMonth() + 1)).slice(-2)} to ${('0' + (new Date(suggestion.end_date)).getDate()).slice(-2)}/${('0' + ((new Date(suggestion.end_date)).getMonth() + 1)).slice(-2)}`)
	suggestion_date_text_div.appendChild(suggestion_date_text)
	suggestion_head.appendChild(suggestion_date_text_div)

	suggestion_row.appendChild(suggestion_head)


	if(suggestion.clash.score == 0) {
		suggestion_row.className = 'suggestionRow good'
	} else {
		if(suggestion.clash.score >= 2) {
			suggestion_row.className = 'suggestionRow bad'
		}
		var reason_dropdown = document.createElement('div')
		var reason_dropdown_icon = document.createElement('img')
		reason_dropdown_icon.className = 'smallIcon'
		reason_dropdown_icon.setAttribute('src', 'https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/dropdown_arrow-512.png')
		reason_dropdown.appendChild(reason_dropdown_icon)
		suggestion_head.appendChild(reason_dropdown)

		var reasons = document.createElement('div')
		reasons.style.display = 'none'

		suggestion.clash.reason.forEach((reason) => {
			var reason_row = createReason(reason)
			reasons.appendChild(reason_row)
		})

		reason_dropdown.addEventListener("click", () => {
			if(reasons.style.display == 'none') {
				reasons.style.display = 'inline-block'
			} else {
				reasons.style.display = 'none'
			}
		})
		suggestion_row.appendChild(reasons)
	}


	return suggestion_row
}

function createReason(reason) {
	var reason_row = document.createElement('div')
	reason_row.className = 'reason'
	// var reason_text = document.createTextNode(`${(reason.fraction_of_students * 100).toFixed(0)}% students have an overlap with an assignment of course '${reason.courseWork.course_name}' due on ${('0' + (new Date(reason.courseWork.end_date)).getDate()).slice(-2)}/${('0' + ((new Date(reason.courseWork.end_date)).getMonth() + 1)).slice(-2)}`)
	var reason_row_1 = document.createTextNode('Overlap with')
	var reason_row_2_name = document.createElement('b')
	reason_row_2_name.appendChild(document.createTextNode(`Course: `))
	var reason_row_2_text = document.createTextNode(`${reason.courseWork.course_name}`)
	var reason_row_3_name = document.createElement('b')
	reason_row_3_name.appendChild(document.createTextNode(`Student Overlap: `))
	var reason_row_3_text = document.createTextNode(`${(reason.fraction_of_students * 100).toFixed(1)}%`)
	var reason_row_4_name = document.createElement('b')
	reason_row_4_name.appendChild(document.createTextNode(`Due Date: `))
	var reason_row_4_text = document.createTextNode(`${('0' + (new Date(reason.courseWork.end_date)).getDate()).slice(-2)}/${('0' + ((new Date(reason.courseWork.end_date)).getMonth() + 1)).slice(-2)}`)

	reason_row.appendChild(reason_row_1)
	reason_row.appendChild(document.createElement('br'))
	reason_row.appendChild(reason_row_2_name)
	reason_row.appendChild(reason_row_2_text)
	reason_row.appendChild(document.createElement('br'))
	reason_row.appendChild(reason_row_3_name)
	reason_row.appendChild(reason_row_3_text)
	reason_row.appendChild(document.createElement('br'))
	reason_row.appendChild(reason_row_4_name)
	reason_row.appendChild(reason_row_4_text)
	reason_row.appendChild(document.createElement('br'))

	return reason_row
}
