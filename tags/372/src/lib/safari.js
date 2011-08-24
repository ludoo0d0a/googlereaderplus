
function sendEventToToolbarItems(msg, fn)
{
	var toolbarItems = safari.extension.toolbarItems;
	for (var i = 0; i < toolbarItems.length; ++i) {
		if (toolbarItems[i].identifier !== msg)
			continue;

		var f = toolbarItems[i][fn];
		if (typeof f ==='function'){
			f();
		}
	}
}

function register(eventName, command, fn){
	safari.application.addEventListener(eventName, function(event){
	if (event.command==command) {
		fn(event,event.target);
		//setBadgeText(event.target, unreadMessages);
	}
}, false);
}

function setBadgeText(target, text){
	if ("badge" in target){
		target.badge = text;
	}
}

function performCommand(event)
{
	// Switch based on the command of the event. You should always check the command.
	switch (event.command) {
	case "show-messages":
		// Show an alert with the number of messages.
		alert("You marked " + unreadMessages + " messages as read. Have a nice day!");

		// Reset the unread messages back to 0.
		updateUnreadMessageCount(0);
		break;
	}
}