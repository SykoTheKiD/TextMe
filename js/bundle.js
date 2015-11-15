// OnClick Listeners

$(function() {
    $('#paste').click(function() {
        setText(buildUI);
    });
});

$(function() {
    $('#sendMessage').click(function() {
        sendMessage();
    });
});

// Set TextArea value
// If text selection is made on page -> TextArea value = selction
// Else TextArea value = current website URL
function setText(callback) {
    chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }, function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {
            method: "getSelection"
        }, function(response) {
            if (response.data === null) {
                chrome.tabs.query({
                    currentWindow: true,
                    active: true
                }, function(tabs) {
                    callback(tabs[0].url);
                });
            } else {
                callback(response.data);
            }
        });
    });
}

// Send message to Number
function sendMessage() {
    var phoneNumber = document.getElementById('phoneNumber').value;
    var messageArea = document.getElementById("message").value;
    var status = document.getElementById("status");
    status.innerHTML = "Sending Text to " + phoneNumber + "...";
    $.ajax({
        type: "POST",
        url: 'http://jaysyko.com/projects/TextMe/sendMessage',
        data: {
            phoneNumber: phoneNumber,
            message: messageArea
        },
        success: function(response) {
            status.innerHTML = "Sent!";
            return;
        }
    });
}

// Build UI elements and setText
function buildUI(messageText) {
    var messageArea = document.getElementById("message");
    messageArea.value = messageText;
    return messageArea.value;
}