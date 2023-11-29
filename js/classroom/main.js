// function observeCourseName() {
// 	var course_name_node = document.getElementsByClassName('wy758b')[0].childNodes[0].childNodes[0];
// 	var course_name_node_2 = document.getElementsByClassName('wy758b')[0].childNodes[0].childNodes[1];
// 	if(course_name_node == null) return;
// 	temp = course_name_node.childNodes[0].data;
// 	if(course_name_node_2 != null && course_name_node_2.childNodes[0].data != null) {
// 		temp += ' ' + course_name_node_2.childNodes[0].data;
// 	}
// 	if(course_name_node != null && course_name != temp && is_instructor) {
// 		course_name = temp;
// 		console.log(course_name);
// 		onCourseNameChange(course_name)
// 	}
// }
var is_instructor = true
var announcement_box = null
var announcement_text = null
var checked_announcement = false

// function initializeScript() {
//     const bellIcon = document.getElementById('bell-icon');

//     // Check if the bell icon is available
//     if (bellIcon) {
//         bellIcon.addEventListener('click', () => {
//             main();
//         });
//     } else {
//         // If the bell icon is not found, log an error
//         console.error('Element with ID "bell-icon" not found.');
//     }

//     // Add other initialization code here if needed
// }

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.removedNodes.forEach((node) => {
      if (node.ariaLabel == "Announce something to your class") {
        announcement_text = null
      }
    })
    if (!mutation.addedNodes) return
    for (let i = 0; i < mutation.addedNodes.length; i++) {
      let node = mutation.addedNodes[i]
      if (
        node.className == "gtuckc iLjzDc" &&
        node.childNodes[0].data == "Due"
      ) {
        let parent = node.parentNode
        parent.insertBefore(open_suggestions_popup, node)
        parent.insertBefore(popup, node)
      }
      if (
        node.className == "u2mfde hN1OOc EZrbnd J1raN S6Vdac" &&
        node.parentNode.parentNode.childElementCount == 4
      ) {
        is_instructor = true
      }
      if (node.ariaLabel == "Announce something to your class") {
        announcement_box = node
      }
    }
    // mutations.forEach((mutation) => {
    //     if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
    //         // Call the initializeScript function when changes occur in the DOM
    //         initializeScript();
    //     }
    // });
  })
})

// // Set up the MutationObserver to observe the body of the document
// observer.observe(document.body, { childList: true, subtree: true });

// // Call the initializeScript function immediately to handle the case where the bell icon is already present
// initializeScript();
// Function to add the bell GIF to the Google Classroom page
// function addBellGif() {
//     const targetElement = document.querySelector('.target-class'); // Replace '.target-class' with the class of the target element in Google Classroom where you want to place the bell

//     if (targetElement) {
//         const bellGif = document.createElement('img');
//         bellGif.src = '/assets/bell.gif'; // Replace with the actual path to your bell GIF
//         bellGif.style.cursor = 'pointer'; // Make the cursor a pointer to indicate it's clickable
//         bellGif.alt = 'Bell';

//         // Add an onclick event to the bell GIF
//         bellGif.addEventListener('click', () => {
//             main(); // Replace with the desired alert message
//         });

//         targetElement.appendChild(bellGif);
//     } else {
//         console.error('Target element for bell GIF not found.');
//     }
// }

// // Run the addBellGif function when the page loads
// window.addEventListener('load', addBellGif);

function observeAnnouncement() {
  if (
    announcement_box != null &&
    announcement_text != announcement_box.textContent
  ) {
    announcement_text = announcement_box.textContent
    if (announcement_text.toLowerCase().includes("quiz")) {
      if (!checked_announcement) {
        document.body.appendChild(createQuizPopup())
        checked_announcement = true
        // Once "quiz" is detected in an announcement, fetch student data and calculate the completion rate
        // addBellGif(); //change 1
      }
    } else {
      checked_announcement = false
    }
  }
}

// Function to fetch data from the fallback URL if API request fails
async function fetchAppropriateData(apiUrl, fallbackUrl) {
  // try {
  //   const response = await fetch(apiUrl, {
  //     headers: {
  //       'X-API-Key': '018aac80'
  //     }
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     return data;
  //   }

  //   console.warn('API request failed. Attempting to fetch from local dataset...');
    const fallbackResponse = await fetch(fallbackUrl);

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      return fallbackData;
    } else {
      throw new Error('Failed to fetch data from both API and local dataset.');
    }
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   return null;
  // }
}

function showNotification(message) {
  // Create a notification element
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  // Create a button to close the notification
  const closeButton = document.createElement("button")
  closeButton.textContent = "Close"
  closeButton.style.marginLeft = "10px"
  closeButton.style.cursor = "pointer"
  closeButton.style.padding = "5px"
  closeButton.style.borderRadius = "5px"
  closeButton.style.border = "none"
  closeButton.style.backgroundColor = "#4285F4"
  closeButton.style.color = "white"
  // Add some space between the message and the button

  // Append the button to the notification
  notification.appendChild(closeButton)

  // Append the notification to the body
  document.body.appendChild(notification)

  // Add an event listener to the button to remove the notification
  closeButton.addEventListener("click", function () {
    notification.remove()
  })
}

// Function to send an email notification
// function sendEmailNotification(message) {
//     // Didn't receive e-mail from (not working):
//     //user_id: 'S1kc7FXk2tkt7-aK6',

//     var templateParams = {
//         message: message,
//     };

//     emailjs.send('service_gr3u3vj', 'template_roh5mta', templateParams) //Define emailjs in my code/ load the emailjs library
//         .then(function(response) {
//            console.log('SUCCESS!', response.status, response.text);
//         }, function(error) {
//            console.log('FAILED...', error);
//         });

// }

function calculateAverageScore(scores) {
  const totalScores = scores.reduce((sum, score) => sum + score, 0);
  return totalScores / scores.length;
}

function checkLowScores(scores, threshold, type) {
  const averageScore = calculateAverageScore(scores);
  if (averageScore < threshold) {
    const message = `Low ${type} Scores Alert: The average ${type} score is ${averageScore}. Many students are performing poorly. Consider reviewing the material or offering additional support.`;
    showNotification(message);
  }
}

function calculateAssignmentCompletionRate(data, assignmentId) {
  
  const submissions = data.filter(
    (entry) => entry.assignmentsubmission_id === assignmentId
  )
  const totalAssignments = submissions.length

  
  const uniqueSubmittedStudents = [
    ...new Set(submissions.map((entry) => entry.student_id)),
  ]
  const completedAssignments = uniqueSubmittedStudents.length

  if (totalAssignments === 0) {
    const message = "No submissions found for the specified assignment."
    showNotification(message)
    return null
  }

  const completionRate = (completedAssignments / totalAssignments) * 100
  return completionRate
}

function calculateQuizCompletionRate(data, quizId) {
  const submissions = data.filter((entry) => entry.quiz_id === quizId)
  const totalQuizzes = submissions.length
  const uniqueSubmittedStudents = [
    ...new Set(submissions.map((entry) => entry.student_id)),
  ]
  const completedQuizzes = uniqueSubmittedStudents.length
  if (totalQuizzes === 0) {
    const message = "No submissions found for the specified quiz."
    showNotification(message)
    return null
  }
  const completionRate = (completedQuizzes / totalQuizzes) * 100
  return completionRate
}

function checkForQuizClash(quizId, assignmentId, assignmentData, quizData) {
  // Find the quiz and assignment data using their IDs
  const quiz = quizData.find((q) => q.quiz_id === quizId)
  const assignment = assignmentData.find((a) => a.id === assignmentId)

  // Log quiz and assignment for debugging
  console.log("Quiz:", quiz)
  console.log("Assignment:", assignment)

  // Check if either quiz or assignment is not found
  if (!quiz || !assignment) {
    const message = "Quiz or assignment not found."
    showNotification(message)
  }

  // Check if the quiz date is close to the assignment deadline
  const quizDate = new Date(quiz.deadline)
  const assignmentDeadline = new Date(assignment.deadline)

  // Log dates for debugging
  console.log("Quiz Date:", quizDate)
  console.log("Assignment Deadline:", assignmentDeadline)

  const timeDiff = Math.abs(quizDate - assignmentDeadline)
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

  if (diffDays <= 2) {
    // Assuming "close" means within 2 days
    const message = "Quiz Clash Alert: There is a potential clash between a quiz and an assignment. Please reschedule accordingly."
    showNotification(message)
  }
}

// Function to check for student inactivity and show an alert
function checkForStudentInactivity(
  studentData,
  quizSubmissionsData,
  assignmentSubmissionsData
) {
  const allStudentIds = new Set(
    studentData.map((student) => student.student_id)
  )
  const studentsWithQuizSubmissions = new Set(
    quizSubmissionsData.map((submission) => submission.student_id)
  )
  const studentsWithAssignmentSubmissions = new Set(
    assignmentSubmissionsData.map((submission) => submission.student_id)
  )

  const inactiveStudents = [...allStudentIds].filter((studentId) => {
    return (
      !studentsWithQuizSubmissions.has(studentId) &&
      !studentsWithAssignmentSubmissions.has(studentId)
    )
  })

  if (inactiveStudents.length > 0) {
    const message = `Inactive Students Alert: The following students have not submitted any quiz or assignment: ${inactiveStudents.join(", ")}.`
    showNotification(message)
    //sendEmailNotification(message);
  }
}

// Main function to fetch data and calculate the completion rate
async function main() {
  const apiUrl = 'https://my.api.mockaroo.com/a_completion.json';
  const fallbackUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/a-completion.json';
  const data = await fetchAppropriateData(apiUrl, fallbackUrl);
  const qapir = 'https://my.api.mockaroo.com/q_completion.json';
  const qfallbackUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/q-completion.json';
  const qdata = await fetchAppropriateData(qapir, qfallbackUrl);
  const assignmentApiUrl = 'https://my.api.mockaroo.com/assignment.json';
  const assignmentFallbackUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/assignment.json';
  const quizApiUrl = 'https://my.api.mockaroo.com/quiz.json';
  const quizFallbackUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/quiz.json';
  const assignmentData = await fetchAppropriateData(assignmentApiUrl, assignmentFallbackUrl);
  const quizData = await fetchAppropriateData(quizApiUrl, quizFallbackUrl);
  const assignmentIdToCheck = 833;
  const quizIdToCheck = 723;
  //eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.SpN6Po86vfHTAvY3FmJndfGfVcep3HnZQGSj56L_fo3ehUt9i-Zo096-lUl6ndBlk8AMh0Z9SZoGXBPcPz9HunPTO9gIDNJz.aK5Hx1VfYKMol1SSPsjIPA.PuGBvWQs2nyRlIRl0UJp46r7qftk3m_CVNjqP0hNxfyllgmiI5j3QPkHSqGyNeJGwHlGxAGHWR4YJDdHg1jEVeNTOlg-fODmo5o3p47ws-mmyuKIv5eUYpLBSBIb0yB_pZn-Wh0-9LTzIp2LJoTi8Q-P0VfDBxgK-yXdsCovdfY.TkYrTTSwRUcrRCEqVNwY_xDCAEmfiikckH-NeEGJmJc
  // Fetch data for the student, quiz submissions, and assignment submissions
  const studentApiUrl = "https://my.api.mockaroo.com/students.json";
  const studentFallbackUrl = "https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/students.json";
  const quizSubmissionsApiUrl = "https://my.api.mockaroo.com/quiz_submissions.json";
  const quizSubmissionsFallbackUrl = "https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/quiz_submissions.json";
  const assignmentSubmissionsApiUrl = "https://my.api.mockaroo.com/submissions.json";
  const assignmentSubmissionsFallbackUrl = "https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/submissions.json";

  const studentData = await fetchAppropriateData(studentApiUrl, studentFallbackUrl);
  const quizSubmissionsData = await fetchAppropriateData(quizSubmissionsApiUrl, quizSubmissionsFallbackUrl);
  const assignmentSubmissionsData = await fetchAppropriateData(assignmentSubmissionsApiUrl, assignmentSubmissionsFallbackUrl);

  if (studentData && quizSubmissionsData && assignmentSubmissionsData) {//working
    // Check for student inactivity and show alert if needed
    checkForStudentInactivity(studentData, quizSubmissionsData, assignmentSubmissionsData);
  }
  if (data) {
    // Replace '888' with the actual assignment ID you want to check
    const assignmentIdToCheck = 205; // Replace with the actual assignment ID
    const completionRate = calculateAssignmentCompletionRate(data, assignmentIdToCheck);
  
    // Notify about Assignment completion rate
    if (completionRate !== null) {
      if (completionRate > 70) {
        const message = `Assignment completion rate is ${completionRate}%. No need to extend the deadline. New Assignment can be scheduled!`;
        showNotification(message);
      } else if (completionRate < 30) {
        const message = `Assignment completion rate is ${completionRate}%. You may need to extend the deadline. New Assignment cannot be scheduled!`;
        showNotification(message);
      } else {
        const message = `Assignment completion rate is ${completionRate}%. You may need to extend the deadline. New Assignment can be scheduled!`;
        showNotification(message);
      }
    }
    // Fetch assignment scores for the assignment ID
    const assignmentScoresApiUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/a-score.json';
    const assignmentScoresFallbackUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/a-score.json';
    const assignmentScoresData = await fetchAppropriateData(assignmentScoresApiUrl, assignmentScoresFallbackUrl);

    if (assignmentScoresData) {
      const assignmentScores = assignmentScoresData
        .filter((entry) => entry.assignment_id === 692)
        .map((entry) => entry.score);

      checkLowScores(assignmentScores, 50, 'Assignment');
    } 
  }
  
  if (qdata) {
    // Replace '888' with the actual quiz ID you want to check
    const quizIdToCheck = 888; // Replace with the actual quiz ID
    const qcompletionRate = calculateQuizCompletionRate(qdata, quizIdToCheck);
  
    // Notify about Quiz completion rate
    if (qcompletionRate !== null) {
      if (qcompletionRate > 70) {
        const message = `Quiz completion rate is ${qcompletionRate}%. No need to extend the deadline. New Quiz can be scheduled!`;
        showNotification(message);
      } else if (qcompletionRate < 30) {
        const message = `Quiz completion rate is ${qcompletionRate}%. You may need to extend the deadline. New Quiz cannot be scheduled!`;
        showNotification(message);
      }
      // Fetch quiz scores for the quiz ID
      const quizScoresApiUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/q_score.json';
      const quizScoresFallbackUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/q_score.json';
      const quizScoresData = await fetchAppropriateData(quizScoresApiUrl, quizScoresFallbackUrl);

      if (quizScoresData) {
        const quizScores = quizScoresData
          .filter((entry) => entry.quiz_id === quizIdToCheck)
          .map((entry) => entry.score);

        checkLowScores(quizScores, 50, 'Quiz');
      }
    }
    // Fetch assignment scores for the assignment ID
    const assignmentScoresApiUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/a-score.json';
    const assignmentScoresFallbackUrl = 'https://raw.githubusercontent.com/DakshSammi/easy-scheduler-extension/master/js/classroom/a-score.json';
    const assignmentScoresData = await fetchAppropriateData(assignmentScoresApiUrl, assignmentScoresFallbackUrl);

    if (assignmentScoresData) {
      const assignmentScores = assignmentScoresData
        .filter((entry) => entry.assignment_id === assignmentIdToCheck)
        .map((entry) => entry.score);

      checkLowScores(assignmentScores, 50, 'Assignment');
    }  
  }
  if (assignmentData && quizData) {
    checkForQuizClash(
      quizIdToCheck,
      assignmentIdToCheck,
      assignmentData,
      quizData
    )
  }
}

// Run the main function when the page loads
window.addEventListener("load", () => {
  // Start observing announcements
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  })

  // Set up announcement monitoring
  setInterval(observeAnnouncement, 100)
})

window.onload = function () {
  main()
  // Other initialization code, if any
}

// Or, alternatively, using DOMContentLoaded which is often faster
document.addEventListener("DOMContentLoaded", function () {
  main()
  // Other initialization code, if any
})
