function createButton(text, onclick) {
  var new_button = document.createElement("div");
  new_button.className = "vertical buttonHeight";

  var new_button_button = document.createElement("div");
  new_button_button.className = BUTTON_CLASS;

  var new_button_div = document.createElement("div");
  new_button_div.className = "GcVcmc Fxmcue cd29Sd";
  var new_button_text = document.createTextNode(text);

  new_button_div.appendChild(new_button_text);
  new_button_button.appendChild(new_button_div);
  new_button.appendChild(new_button_button);
  new_button.addEventListener("click", onclick);

  return new_button;
}

// duration
var duration_div = document.createElement("div");
duration_div.className = "inputCell";

var duration_title = document.createElement("p");
var duration_title_text = document.createTextNode("Duration");
duration_title.appendChild(duration_title_text);
duration_title.className = HEADING_CLASS;

var duration_input = document.createElement("div");
duration_input.className = "flexBox";

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

// dates
var dates = document.createElement("div");
dates.className = "flexBox";

var max_due_date = document.createElement("div");
max_due_date.className = "inputCell";

var max_due_date_title = document.createElement("p");
var max_due_date_title_text = document.createTextNode("Maximum Due Date");
max_due_date_title.appendChild(max_due_date_title_text);
max_due_date_title.className = HEADING_CLASS;

var max_due_date_input = document.createElement("input");
max_due_date_input.className = "input";
max_due_date_input.type = "date";
// max_due_date_input.min = new Date().toISOString().split("T")[0];

max_due_date.appendChild(max_due_date_title);
max_due_date.appendChild(max_due_date_input);

var min_due_date = document.createElement("div");
min_due_date.className = "inputCell";

var min_due_date_title = document.createElement("p");
var min_due_date_title_text = document.createTextNode("Minimum due date");
min_due_date_title.appendChild(min_due_date_title_text);
min_due_date_title.className = HEADING_CLASS;

var min_due_date_input = document.createElement("input");
min_due_date_input.className = "input";
min_due_date_input.type = "date";
// min_due_date_input.min = new Date().toISOString().split("T")[0];

min_due_date.appendChild(min_due_date_title);
min_due_date.appendChild(min_due_date_input);

dates.appendChild(min_due_date);
dates.appendChild(max_due_date);


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
var get_suggestions = createButton("Get Suggestions", fetchSuggestions);

// all inputs
var all_inputs = document.createElement("div");
all_inputs.className = "flexBox";
all_inputs.appendChild(duration_div);
duration_div.style.flex = 0.4;
all_inputs.appendChild(dates);
dates.style.flex = 0.6;

// showing all suggestions
var all_suggestions = document.createElement("div");

// popup
var popup = document.createElement("div");
popup.className = "popupWindow";
popup.style.display = "none"

var popup_content = document.createElement("div");
popup_content.className = "popup largePopup";

var popup_span = document.createElement("span");
popup_span.className = "close";

popup_content.appendChild(all_inputs);
popup_content.appendChild(flexi_suggestions);
popup_content.appendChild(get_suggestions);
popup_content.appendChild(all_suggestions);
popup.appendChild(popup_content);
popup.appendChild(popup_span);

// open popup on click
var open_suggestions_popup = createButton("Get Due Date Suggestions", () => {
  if(all_suggestions.childNodes.length > 0) all_suggestions.removeChild(all_suggestions.childNodes[0]);
  if(all_suggestions.childNodes.length > 0) all_suggestions.removeChild(all_suggestions.childNodes[0]);
  popup.style.display = "block"
});

// close popup on click
var close_popup = createButton("Close", () => {
  popup.style.display = "none"
});

popup_content.appendChild(close_popup);