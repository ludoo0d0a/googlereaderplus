var gblog = {};

var requestFailureCount = 0;  // used for exponential backoff
var BLOGLIST_SCOPE = 'http://www.blogger.com/feeds';
var BLOGLIST_FEED = BLOGLIST_SCOPE + '/default/blogs';
var KEY_DOC = 'ReaderPlus_preferences';
var e = encodeURIComponent;

//http://code.google.com/apis/blogger/docs/1.0/developers_guide_js.html#Acquire_Library

var DEFAULT_MIMETYPES = {
  'atom': 'application/atom+xml',
  'document': 'text/plain',
  'spreadsheet': 'text/csv',
  'presentation': 'text/plain',
  'pdf': 'application/pdf'
};
var WINDOW_STYLE = 'scrollbars=yes,width=475,height=300,top=175,left=75,' +
                       'status=yes,resizable=yes';
var FORM_NAME = 'bloggerForm';

function build_url(url, title, desc) {
	  //Encodes special characters while building the URL.
	  return 'http://www.blogger.com/blog-this.g?t=' + e(title) +
	      '&u=' + e(url) +
	      '&n=' + e(title) +
	      '&source=chrome';
}
	
function popupBlogger(a, cb){
	var request_form = document.createElement('form');
	request_form.setAttribute('method', 'post');
	var url = build_url(a.url, a.title, a.desc);
	request_form.setAttribute('action', url);
	document.body.appendChild(request_form);
	window.open(null, FORM_NAME, WINDOW_STYLE);
	request_form.target = FORM_NAME;
	request_form.submit();
}


/*
function logMeIn() {
  var token = google.accounts.user.login(BLOGLIST_SCOPE);
}

function setupMyService() {
  var myService = new google.gdata.blogger.BloggerService('exampleCo-exampleApp-1');
  logMeIn();
  return myService;
}
*/

function postblogger(a,cb){
	var bloggerService = new google.gdata.blogger.BloggerService('GoogleInc-jsguide-1.0');
	
	var handleBlogFeed = function(blogFeedRoot) {
	  var blogEntries = blogFeedRoot.feed.getEntries();
	  if (blogEntries.length) {
	    var blogEntry = blogEntries[0]; // only get first blog
	    // This is the feed uri for the blog's posts 
	    var postsFeedUri = blogEntry.getEntryPostLink().getHref();
	    bloggerService.getBlogPostFeed(postsFeedUri, handleBlogPostFeed, handleError);
	  } 
	};
	
	var handleError = function(error){
		if (cb) {
			cb({
				error: error
			});
		}
	};
		
	var handleBlogPostFeed = function(postsFeedRoot){
		// Constuct an new BlogPostEntry
		var o = {
			title: {
				type: 'text',
				text: a.title || '[New title here]'
			},
			content: {
				type: 'text',
				text: a.text || '[New text here]'
			},
			categories: []
		};
		iterate(a.tags, function(i, tag){
			o.categories.push({
				scheme: 'http://www.blogger.com/atom/ns#',
				term: tag
			});
		});
		var newEntry = new google.gdata.blogger.BlogPostEntry(o);
		
		// mark post as a draft?
		// newEntry.setControl({draft: {value: google.gdata.Draft.VALUE_YES}});
		
		postsFeedRoot.feed.insertEntry(newEntry, cb, handleError);
	};
	
	bloggerService.getBlogFeed(BLOGLIST_FEED, handleBlogFeed, handleError);
}

/**
 * Creates a new document in Google Docs.
 * docType= {document,presentation,spreadsheet}
 */
gblog.createPost = function(url, title, desc, cb) {
  if (!title) {
    return;
  }

  var handleSuccess = function(googleDocObj, xhr) {
	docs.splice(0, 0, googleDocObj);
    requestFailureCount = 0;
	cb(googleDocObj);
  };

  var params = {
    'method': 'POST',
    'headers': {
      'GData-Version': '3.0',
      'Content-Type': 'multipart/related; boundary=END_OF_PART'
    },
    'parameters': {'alt': 'json'},
    'body': gblog.constructContentBody_(url, title, desc)
  };

  sendSignedRequest(BLOGLIST_FEED, handleSuccess, params);
};