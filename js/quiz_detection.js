// Create a div for asking whether the announcement is a quiz

function createQuizPopup() {
	quiz_popup_window = document.createElement('div')
	quiz_popup_window.className = 'popupWindow'
		quiz_popup = document.createElement('div')
		quiz_popup.className = 'popup smallPopup center'

			is_quiz = document.createElement('div')

				is_quiz_title = document.createElement('div')


					is_quiz_title_text = document.createElement('div')
					is_quiz_title_text.className = 'title'
					is_quiz_title_text.appendChild(document.createTextNode('Are you announcing a quiz?'))


					is_quiz_info = document.createElement('div')
					is_quiz_info.style.position = 'relative'
						is_quiz_info_img = document.createElement('img')
						is_quiz_info_img.className = 'smallIcon'
						is_quiz_info_img.setAttribute('src', 'https://images.vexels.com/media/users/3/131139/isolated/preview/ff49ce17e1541baa9298514ce6ad37ae-information-circle-icon-by-vexels.png')
					
						is_quiz_info_hover_text = document.createElement('div')
						is_quiz_info_hover_text.className = 'hovertext hide'
						is_quiz_info_hover_text.appendChild(document.createTextNode('Help up improve our deadline due date suggestions by informing us about any upcoming quizzes!'))				

						is_quiz_info_img.addEventListener('mouseenter', () => {
							is_quiz_info_hover_text.className = 'hovertext'
							is_quiz_info_img.className = 'smallIcon pointer'
						})
						is_quiz_info_img.addEventListener('mouseout', () => {
							is_quiz_info_hover_text.className = 'hovertext hide'
							is_quiz_info_img.className = 'smallIcon'
						})

					is_quiz_info.appendChild(is_quiz_info_hover_text)
					is_quiz_info.appendChild(is_quiz_info_img)

				
				is_quiz_title.appendChild(is_quiz_info)
				is_quiz_title.appendChild(is_quiz_title_text)

				is_quiz_options = document.createElement('div')

					is_quiz_yes = document.createElement('div')
					is_quiz_yes.className = 'horizontal'
					is_quiz_yes.appendChild(createButton('Yes', () => {
										quiz_popup.removeChild(is_quiz)
										quiz_popup.appendChild(quiz_date)
									}))

					is_quiz_no = document.createElement('div')
					is_quiz_no.className = 'horizontal'
					is_quiz_no.appendChild(createButton('No', () => {
										document.body.removeChild(quiz_popup_window)
									}))

			is_quiz_options.appendChild(is_quiz_yes)
			is_quiz_options.appendChild(is_quiz_no)

			is_quiz.appendChild(is_quiz_title)
			is_quiz.appendChild(is_quiz_options)

			quiz_date = document.createElement('div')

				quiz_date_title = document.createElement('div')
				quiz_date_title.className = 'title'
				quiz_date_title.appendChild(document.createTextNode('Quiz Date'))

				quiz_date_input = document.createElement('input')
				quiz_date_input.setAttribute('type', 'date')
				quiz_date_input.className = 'input'
				quiz_date_input.min = new Date().toISOString().split("T")[0];

				quiz_date_submit = createButton('Submit', () => {
					informAboutQuiz(quiz_date_input.value)
					document.body.removeChild(quiz_popup_window)
				})

			quiz_date.appendChild(quiz_date_title)
			quiz_date.appendChild(quiz_date_input)
			quiz_date.appendChild(quiz_date_submit)

		quiz_popup.appendChild(is_quiz)
	quiz_popup_window.appendChild(quiz_popup)

	// Quiz date inputs

	return quiz_popup_window
}
