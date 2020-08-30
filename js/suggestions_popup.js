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
get_suggestions_div.className = "GcVcmc Fxmcue cd29Sd get_suggestions_button";
var get_suggestions_text = document.createTextNode("Get Suggestions");

get_suggestions_div.appendChild(get_suggestions_text);
get_suggestions_button.appendChild(get_suggestions_div);
get_suggestions.appendChild(get_suggestions_button);

// popup
var popup = document.createElement("div");
popup.className = "modal";

var popup_content = document.createElement("div");
popup_content.className = "modal-content";

var popup_span = document.createElement("span");
popup_span.className = "close";

//reasons for the chosen date
var reasons_div = document.createElement("div");
reasons_div.className = "block reasons";
var reasons_title = document.createElement("p");
var reasons_title_text = document.createTextNode("");
reasons_div.appendChild(reasons_title);
reasons_title.appendChild(reasons_title_text);
reasons_title.className = HEADING_CLASS;


popup_content.appendChild(popup_span);
popup_content.appendChild(duration_div);
popup_content.appendChild(min_due_date);
popup_content.appendChild(max_due_date);
popup_content.appendChild(flexi_suggestions);
popup_content.appendChild(get_suggestions);
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
popup_content.appendChild(reasons_div);

var drop_down_container = document.createElement('div');
drop_down_container.className = 'drop_down_container';

//dropdown for fixed suggestions
var drop_down = document.createElement('div');
drop_down.className = 'dropdown fixed';
var button = document.createElement('button');
button.className = 'dropbtn';
var btntext = document.createTextNode('Fixed Duration Suggestions');
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
//popup_content.appendChild(drop_down);

//drop down for flexible suggestions
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
//popup_content.appendChild(drop_down);

drop_down_container.appendChild(drop_down);
drop_down_container.appendChild(drop_down_flexible);
popup_content.appendChild(drop_down_container);

//fetch the data on clicking the button
get_suggestions_button.addEventListener('click', function() {
  while (drop_down_content.firstChild) {
    drop_down_content.removeChild(drop_down_content.firstChild);
  }
  while (drop_down_content_flexible.firstChild) {
    drop_down_content_flexible.removeChild(drop_down_content_flexible.firstChild);
  }
  var arr = [];
  labels.forEach(lbl => {
    arr.push(document.getElementById(lbl).value);
    console.log(lbl + document.getElementById(lbl).value);
  })
  console.log(arr);
  console.log(min_due_date_input.value);
  console.log(max_due_date_input.value);
  let base_url = "https://deadline-scheduling-suggestion.herokuapp.com/iiitd/course 1/get_suggestions/";
  var min_date = min_due_date_input.value;
  var max_date = max_due_date_input.value;
  base_url = base_url+arr[0]+'-'+arr[1]+'-0/'+min_date+'T00:00:00.000Z/'+max_date+'T00:00:00.000Z';
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
      var end_date = suggestions_object["end_date"].substring(0, 10);
      var number = parseInt(i)+1;
      var start_date_text = number + ') ' + start_date + ' - ' + end_date;
      var list_item_text = document.createTextNode(start_date_text);
      list_item.appendChild(list_item_text);
      list_item.addEventListener('click', function() {
        console.log(list_item.innerHTML);
        var start_date_chosen = list_item.innerHTML.substring(3,13);
        var rank = list_item.innerHTML.substring(0,1);
        for (var j in suggestions) {
          if (start_date_chosen == suggestions[j]["start_date"].substring(0,10)) {
            var reason = suggestions[j]["clash"]["reason"];
            var score = suggestions[j]["clash"]["score"];
            console.log("reason = "+reason);
            console.log("score = "+score);
            if (rank == '1') {
              reasons_title.className = 'good_decision';
              reasons_title_text = document.createTextNode("This is the best decision");
            } else {
              reasons_title.className = 'bad_decision';
              reasons_title_text = document.createTextNode("This is not the best decision");
            }
            popup_content.appendChild(reasons_div);
          }
        }
      })
      drop_down_content.appendChild(list_item);
    }
    if (flexi_suggestions_input.checked) {
      for (let i in flexi_suggestions) {
        var flexi_list_item = document.createElement('span');
        var flexi_suggestions_object = flexi_suggestions[i];
        var flexi_start_date = flexi_suggestions_object["start_date"].substring(0, 10);
        var flexi_end_date = flexi_suggestions_object["end_date"].substring(0, 10);
        var flexi_number = parseInt(i)+1;
        var flexi_start_date_text = flexi_number + ') ' + flexi_start_date + ' - ' + flexi_end_date;
        var flexi_list_item_text = document.createTextNode(flexi_start_date_text);
        flexi_list_item.appendChild(flexi_list_item_text);
        flexi_list_item.addEventListener('click', function() {
          console.log(flexi_list_item.innerHTML);
          var start_date_chosen = flexi_list_item.innerHTML.substring(3,13);
          var rank = flexi_list_item.innerHTML.substring(0,1);
          for (var j in flexi_suggestions) {
            if (start_date_chosen == flexi_suggestions[j]["start_date"].substring(0,10)) {
              var reason = flexi_suggestions[j]["clash"]["reason"];
              var score = flexi_suggestions[j]["clash"]["score"];
              console.log("reason = "+reason);
              console.log("score = "+score);
              if (rank == '1') {
                reasons_title.className = 'good_decision';
                reasons_title_text.innerHTML = "This is the best decision";
              } else {
                reasons_title.className = 'bad_decision';
                reasons_title_text.innerHTML = "This is not the best decision";
              }
              popup_content.appendChild(reasons_div);
            }
          }
        })
        drop_down_content_flexible.appendChild(flexi_list_item);
      }
    }
  });
});