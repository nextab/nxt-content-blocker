document.addEventListener("DOMContentLoaded", function() {
	var agreementButtons = document.querySelectorAll(".agreement-button");
	
	agreementButtons.forEach(function(button) {
		button.addEventListener("click", function() {
			// Set the cookie as before
			document.cookie = "nxt-content-agreement=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
			
			// Get the overlay that's parent to the clicked button
			var overlay = button.closest('.agreement-overlay');
			
			// Assuming you store the actual content as data-content attribute
			var actualContent = overlay.getAttribute('data-content');
			
			// Replace the overlay with the actual content
			if (actualContent) {
				overlay.outerHTML = actualContent;
			} else {
				overlay.style.display = "none";
			}
		});
	});
});