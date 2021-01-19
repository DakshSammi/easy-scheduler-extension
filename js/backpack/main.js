examDate = null;
let observer = new MutationObserver((mutations) => {
	let url = window.location.toString()
    var urlComp = url.split('/');
    if (urlComp[4] == "courses" && urlComp[6] == "deadlines") {
        if (document.getElementById('new_deadline') !== null) {
            updated = true;
            updateDom();
        } else {
        	updated = false;
        }
    }
    alertBannerPrepared = false;
    if (urlComp[4] == "courses" && urlComp[6] == "announcements") {
        updateDomAnnouncements();
    }

    if(document.getElementById('submitannouncememnt')) {
        submitAnnouncememntButton = document.getElementById('submitannouncememnt');
        submitAnnouncememntButton.addEventListener("click", ()=>{
            console.log(examDate)
            informAboutQuiz(examDate);
        });
    }

    if(document.getElementById('examdate')) {
        examDate = document.getElementById('examdate').value;
    } else {
        examDate = null;
    }
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	characterData: true,
});

