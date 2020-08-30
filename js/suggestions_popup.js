const BUTTON_CLASS = "U26fgb cd29Sd p0oLxb BEAGS CG2qQ QRiHXd bVp04e";
const HEADING_CLASS = "gtuckc tLDEHd-Wvd9Cc";

// duration
var duration_div = document.createElement("div");
duration_div.className = "block";

var duration_title = document.createElement("p");
var duration_title_text = document.createTextNode("Duration");
duration_title.appendChild(duration_title_text);
duration_title.className = HEADING_CLASS;

var duration_input = document.createElement("div");

duration_div.appendChild(duration_title);
duration_div.appendChild(duration_input);

labels = ["days:", "hours:"];
for (var i = 0; i < 2; ++i) {
  var input_div = document.createElement("div");
  input_div.className = "horizontal";

  var input = document.createElement("input");
  input.className = "input";
  input.type = "number";
  input.min = "0";
  input.style.width = "70px";
  input.id = labels[i];
  if (i == 1) {
    input.max = 23;
  }

  var label = document.createElement("label");
  var text = document.createTextNode(labels[i]);
  label.appendChild(text);

  input_div.appendChild(label);
  input_div.appendChild(input);
  duration_input.appendChild(input_div);
}

//maximum date
var max_due_date = document.createElement("div");
max_due_date.className = "horizontal";

var max_due_date_title = document.createElement("p");
var max_due_date_title_text = document.createTextNode("Maximum Due Date");
max_due_date_title.appendChild(max_due_date_title_text);
max_due_date_title.className = HEADING_CLASS;

var max_due_date_input = document.createElement("input");
max_due_date_input.className = "input";
max_due_date_input.type = "date";
max_due_date_input.min = new Date().toISOString().split("T")[0];

max_due_date.appendChild(max_due_date_title);
max_due_date.appendChild(max_due_date_input);


//minimum due date
var min_due_date = document.createElement("div");
min_due_date.className = "horizontal";

var min_due_date_title = document.createElement("p");
var min_due_date_title_text = document.createTextNode("Minimum due date");
min_due_date_title.appendChild(min_due_date_title_text);
min_due_date_title.className = HEADING_CLASS;

var min_due_date_input = document.createElement("input");
min_due_date_input.className = "input";
min_due_date_input.type = "date";
min_due_date_input.min = new Date().toISOString().split("T")[0];

min_due_date.appendChild(min_due_date_title);
min_due_date.appendChild(min_due_date_input);


// flexi_suggestions
var flexi_suggestions = document.createElement('div');
var flexi_suggestions_input = document.createElement('input');
var flexi_suggestions_label = document.createElement('label');
flexi_suggestions.appendChild(flexi_suggestions_input);
flexi_suggestions.appendChild(flexi_suggestions_label);
flexi_suggestions_input.setAttribute('type', 'checkbox');
flexi_suggestions.setAttribute('id', 'check');
flexi_suggestions.setAttribute('name', 'check');
flexi_suggestions_label.setAttribute('for', 'check');
var flexi_suggestions_label_text = document.createTextNode('Suggestions with flexible duration');
flexi_suggestions_label.appendChild(flexi_suggestions_label_text);

// get suggestions
var get_suggestions = document.createElement("div");
get_suggestions.className = "vertical buttonHeight";

var get_suggestions_button = document.createElement("div");
get_suggestions_button.className = BUTTON_CLASS;

var get_suggestions_div = document.createElement("div");
get_suggestions_div.className = "GcVcmc Fxmcue cd29Sd";
var get_suggestions_text = document.createTextNode("Get Suggestions");

get_suggestions_div.appendChild(get_suggestions_text);
get_suggestions_button.appendChild(get_suggestions_div);
get_suggestions.appendChild(get_suggestions_button);
get_suggestions.addEventListener("click", fetchSuggestions);

var all_suggestions = document.createElement('div');

// popup
var popup = document.createElement("div");
popup.className = "modal";

var popup_content = document.createElement("div");
popup_content.className = "modal-content";

var popup_span = document.createElement("span");
popup_span.className = "close";

popup_content.appendChild(popup_span);
popup_content.appendChild(duration_div);
popup_content.appendChild(max_due_date);
popup_content.appendChild(min_due_date);
popup_content.appendChild(flexi_suggestions);
popup_content.appendChild(get_suggestions);
popup_content.appendChild(all_suggestions);
popup.appendChild(popup_content);

// open popup on click
var open_suggestions_popup = document.createElement("div");
open_suggestions_popup.className = 'vertical buttonHeight'

var open_suggestions_popup_button = document.createElement("div");
open_suggestions_popup_button.className = BUTTON_CLASS;

var open_suggestions_popup_div = document.createElement("div");
open_suggestions_popup_div.className = "GcVcmc Fxmcue cd29Sd";
var open_suggestions_popup_text = document.createTextNode("Get Due Date Suggestions");

open_suggestions_popup_div.appendChild(open_suggestions_popup_text);
open_suggestions_popup_button.appendChild(open_suggestions_popup_div);
open_suggestions_popup_button.addEventListener("click", () => {
  popup.style.display = "block"
});
open_suggestions_popup.appendChild(open_suggestions_popup_button);

// close popup on click
var close_popup = document.createElement("div");
close_popup.className = "vertical buttonHeight";

var close_popup_button = document.createElement("div");
close_popup_button.className = BUTTON_CLASS;

var close_popup_div = document.createElement("div");
close_popup_div.className = "GcVcmc Fxmcue cd29Sd";

var close_popup_text = document.createTextNode("Close");

close_popup_div.appendChild(close_popup_text);
close_popup_button.appendChild(close_popup_div);
close_popup.appendChild(close_popup_button);
close_popup_button.addEventListener("click", () => {
  popup.style.display = "none"
});

popup_content.appendChild(close_popup);
