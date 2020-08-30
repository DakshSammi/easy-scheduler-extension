var course_name;

let observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (!mutation.addedNodes) return;
		// observer.disconnect();
		for (let i = 0; i < mutation.addedNodes.length; i++) {
			let node = mutation.addedNodes[i];
			if (node.className == 'tNGpbb uTUgB YVvGBb') {
				course_name = node.textContent;
			}
			if (node.className == HEADING_CLASS && node.childNodes[0].data == "Due") {
				head = node;
				let parent = node.parentNode;
				parent.insertBefore(open_suggestions_popup, node);
				parent.insertBefore(popup, node);
			}
		}
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	characterData: true,
});