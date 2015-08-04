// First stopping old version, before starting new one
if(stop!=null) stop();

// Initializing global variables
lastMsg, iid;

function loadStringFunctions() {
	// Trim
	String.prototype.trim = function() {
		return String(this).replace(/^\s+|\s+$/g, '');
	};

	// Remove whitespace
	String.prototype.removeWhitespace = function() {
		return String(this).replace(/\s+/g, '');
	};

	// Remove HTML inside string
	String.prototype.removeInnerHTML = function() {
		return String(this).replace(/<[^>]+>/g, '');
	};

	// Reverse string
	String.prototype.reverse = function() {
 		return String(this).split('').reverse().join('');
	};

	// Contains
	String.prototype.contains = function(x) {
		return this.indexOf(x) >= 0;
	};

	// De-HTML'ify
	String.prototype.deHTML = function(x) {
		return String(this)
			.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&amp;/g, '&');
	}
};

function fromMe(msgelem) {
	// Check if the message contains "$msg-true", in which case it is ours
	return msgelem.outerHTML.contains("$msg-true");
};

function sendMSG(msg) {
	// If there is no message to send, don't send. Simple as that
	if(msg==null) return;

	console.log("Sending \""+msg+"\"...");

	inputField=document.getElementsByClassName("input")[1];

	inputField.innerHTML=msg;

	// I should activate the 'send' button here, but I don't have any idea how yet... Will come
};

function getMSG() {
	// Get all messages
	x=document.getElementsByClassName("emojitext");

	// Get last message
	last=x[x.length-1];

	// If we somehow get some null stuff, just return null
	if(last==null) return null;
	if(last.innerHTML==null) return null;

	if( ( ! fromMe(last) ) && lastMsg != last ) {
		// We have a new message
		// Get text, and strip out emoji
		msg=last.innerHTML.removeInnerHTML();

		// Set new last message
		lastMsg=last;

		// Return stripped content
		return msg;
	}

	// If there is no new message, return null
	return null;
};

function main() {
	// Get the last new message
	msg=getMSG();
	// If there is no last new message, ignore
	if(msg!=null) {
		msg=msg.deHTML().reverse();
		sendMSG(msg); 
	}
};

function start() {
	// Set global variables
	lastMsg=null;
	iid=0;

	// Load custom String functions
	loadStringFunctions();

	// Start interval
	iid=setInterval(main, 1000);
	console.log("IntervalID: "+iid);
};

function stop() {
	// Stop interval
	clearInterval(iid);
	iid=0;
};

// Finally, start the process
start();
