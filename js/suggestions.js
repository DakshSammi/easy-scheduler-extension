// Suggestion
var suggestion = document.createElement("div");

var suggestion_title = document.createElement("p");
var suggestion_title_text = document.createTextNode("Suggested Start date");
suggestion_title.appendChild(suggestion_title_text);
suggestion_title.className = HEADING_CLASS;

var suggestion_input = document.createElement("input");
suggestion_input.className = "input";
suggestion_input.type = "date";
suggestion_input.min = new Date().toISOString().split("T")[0];

suggestion.appendChild(suggestion_title);
suggestion.appendChild(suggestion_input);

//drop down for suggestions
var drop_down = document.createElement('div');
drop_down.className = 'dropdown';
var button = document.createElement('button');
button.className = 'dropbtn';
var btntext = document.createTextNode('Suggestions');
button.appendChild(btntext);
drop_down.appendChild(button);
var drop_down_content = document.createElement('div');
drop_down_content.className = 'dropdown-content';
drop_down.appendChild(drop_down_content);
var list_item1 = document.createElement('span');
var list_item1_text = document.createTextNode('1) dd/mm/yyyy');
list_item1.appendChild(list_item1_text);
//drop_down_content.appendChild(list_item1);
var list_item2 = document.createElement('span');
var list_item2_text = document.createTextNode('2) dd/mm/yyyy');
list_item2.appendChild(list_item2_text);
//drop_down_content.appendChild(list_item2);
var list_item3 = document.createElement('span');
var list_item3_text = document.createTextNode('3) dd/mm/yyyy');
list_item3.appendChild(list_item3_text);
//drop_down_content.appendChild(list_item3);
button.className = BUTTON_CLASS;


//checkbox begins
var check_box = document.createElement('div');
var check_box_input = document.createElement('input');
var check_box_label = document.createElement('label');
check_box.appendChild(check_box_input);
check_box.appendChild(check_box_label);
check_box_input.setAttribute('type', 'checkbox');
check_box.setAttribute('id', 'check');
check_box.setAttribute('name', 'check');
check_box_label.setAttribute('for', 'check');
var check_box_label_text = document.createTextNode('Suggestions with flexible duration');
check_box_label.appendChild(check_box_label_text);

//drop down for suggestions
var drop_down_flexible = document.createElement('div');
drop_down_flexible.className = 'dropdown';
var button_flexible = document.createElement('button');
button_flexible.className = 'dropbtn';
var btntext_flexible = document.createTextNode('Flexible duration suggestions');
button_flexible.appendChild(btntext_flexible);
drop_down_flexible.appendChild(button_flexible);
var drop_down_content_flexible = document.createElement('div');
drop_down_content_flexible.className = 'dropdown-content';
drop_down_flexible.appendChild(drop_down_content_flexible);
var list_item1_flexible = document.createElement('span');
var list_item1_text_flexible = document.createTextNode('1) dd/mm/yyyy');
list_item1_flexible.appendChild(list_item1_text_flexible);
//drop_down_content_flexible.appendChild(list_item1_flexible);
var list_item2_flexible = document.createElement('span');
var list_item2_text_flexible = document.createTextNode('2) dd/mm/yyyy');
list_item2_flexible.appendChild(list_item2_text_flexible);
//drop_down_content_flexible.appendChild(list_item2_flexible);
var list_item3_flexible = document.createElement('span');
var list_item3_text_flexible = document.createTextNode('3) dd/mm/yyyy');
list_item3_flexible.appendChild(list_item3_text_flexible);
//drop_down_content_flexible.appendChild(list_item3_flexible);
button_flexible.className = BUTTON_CLASS;