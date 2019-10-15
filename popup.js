function onPageDetailsReceived(pageDetails) {
    document.getElementById('title').value = pageDetails.title;
    document.getElementById('url').value = pageDetails.url;
    document.getElementById('summary').innerText = pageDetails.summary;
}

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = 'https://api.whatsapp.com/send?';

    // Set up an asynchronous AJAX POST request
    
    // Prepare the data to be POSTed by URLEncoding each field's contents
    var phone = document.getElementById('phone');
    
    var params = 'phone=' + encodeURIComponent(phone.value) 
                 
	window.open(postUrl+params,'_blank');

 

    
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark')
            .addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This
        // injects content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});