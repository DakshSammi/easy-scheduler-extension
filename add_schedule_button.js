const BUTTON_CLASS = "U26fgb cd29Sd p0oLxb BEAGS CG2qQ QRiHXd bVp04e block";
const HEADING_CLASS = "gtuckc tLDEHd-Wvd9Cc";

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
//maximum date over

//release date
var release_date_left = document.createElement("div");

var release_date_left_title = document.createElement("p");
var release_date_left_title_text = document.createTextNode("Minimum due date");
release_date_left_title.appendChild(release_date_left_title_text);
release_date_left_title.className = HEADING_CLASS;

var release_date_left_input = document.createElement("input");
release_date_left_input.className = "input";
release_date_left_input.type = "date";
release_date_left_input.min = new Date().toISOString().split("T")[0];

release_date_left.appendChild(release_date_left_title);
release_date_left.appendChild(release_date_left_input);
//release date over

var s_date_left = document.createElement("div");

var s_date_left_title = document.createElement("p");
var s_date_left_title_text = document.createTextNode("Suggested Start date");
s_date_left_title.appendChild(s_date_left_title_text);
s_date_left_title.className = HEADING_CLASS;

var s_date_left_input = document.createElement("input");
s_date_left_input.className = "input";
s_date_left_input.type = "date";
s_date_left_input.min = new Date().toISOString().split("T")[0];

s_date_left.appendChild(s_date_left_title);
s_date_left.appendChild(s_date_left_input);

var schedule_button = document.createElement("div");
var schedule_button_div = document.createElement("div");
schedule_button_div.className = "GcVcmc Fxmcue cd29Sd";
var schedule_button_text = document.createTextNode("Get Due Date Suggestions");

schedule_button_div.appendChild(schedule_button_text);
schedule_button.appendChild(schedule_button_div);
schedule_button.className = BUTTON_CLASS;
schedule_button.addEventListener("click", function () {
  console.log(release_date_left_input.value);
  var arr = [];
  labels.forEach(lbl => {
    arr.push(document.getElementById(lbl).value);
    console.log(lbl + document.getElementById(lbl).value);
  })
  console.log(arr);
  console.log(max_due_date_input.value);
  console.log(release_date_left_input.value);
  console.log(s_date_left_input.value);
  console.log(course_name);
  var min_due_date = release_date_left_input.value;
  var max_due_date = max_due_date_input.value;
  const Http = new XMLHttpRequest();
  let base_url = "https://deadline-scheduling-suggestion.herokuapp.com/iiitd/course 1/get_suggestions/";
  base_url = base_url+arr[0]+'-'+arr[1]+'-0/'+max_due_date+'T00:00:00.000Z/'+min_due_date+'T00:00:00.000Z';
  console.log(base_url);
  const url='https://deadline-scheduling-suggestion.herokuapp.com/iiitd/course 1/get_suggestions/5-0-0/2020-09-01T17:00:00.000Z/2020-09-20T17:00:00.000Z';
  // Http.open("GET", base_url);
  // Http.send();
  // var response;
  // Http.onreadystatechange = (e) => {
  //   response = Http.responseText;
  //   var res = JSON.parse(response);
  //   var suggestions = res["suggestions"];
  //   var flexi_suggestions = res["flexi_suggestions"];
  //   //console.log(res);
  //   //console.log(response);
  //   //console.log(suggestions);
  //   //console.log(flexi_suggestions);
  //   for (let i in suggestions) {
  //     var list_item = document.createElement('span');
  //     var suggestions_object = suggestions[i];
  //     var start_date = suggestions_object["start_date"].substring(0, 10);
  //     var list_item_text = document.createTextNode(start_date);
  //     list_item.appendChild(list_item_text);
  //     drop_down_content.appendChild(list_item);
  //   }
  // }
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
      drop_down_content.appendChild(list_item);
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
        drop_down_content_flexible.appendChild(flexi_list_item);
      }
    }
  })
});

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

//course name input
// var course_name = document.createElement("div");
// var course_name_title = document.createElement("p");
// var course_name_title_text = document.createTextNode("Enter your course name");
// course_name_title.appendChild(course_name_title_text);
// course_name_title.className = HEADING_CLASS;
// var course_name_input = document.createElement("input");
// course_name_input.className = "input";
// course_name_input.type = "text";
// course_name.appendChild(course_name_title);
// course_name.appendChild(course_name_input);

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

var course_name;

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!mutation.addedNodes) return;
    observer.disconnect();
    for (let i = 0; i < mutation.addedNodes.length; i++) {
      let node = mutation.addedNodes[i];
      if (node.className == 'tNGpbb uTUgB YVvGBb') {
        course_name = node.textContent;
      }
      if (node.className == HEADING_CLASS && node.childNodes[0].data == "Due") {
        head = node;
        setTimeout(() => {
          let parent = node.parentNode;
          //parent.insertBefore(course_name, node);
          parent.insertBefore(duration_div, node);
          parent.insertBefore(max_due_date, node);
          parent.insertBefore(release_date_left, node);
          parent.insertBefore(check_box, node);
          parent.insertBefore(schedule_button, node);
          parent.insertBefore(drop_down, node);
          parent.insertBefore(drop_down_flexible, node);
        }, 300);
      }
    }

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
});

var req = 'https://deadline-scheduling-suggestion.herokuapp.com/iiitd/course 1/get_suggestions/5-0-0/2020-09-01T17:00:00.000Z/2020-09-20T17:00:00.000Z'
