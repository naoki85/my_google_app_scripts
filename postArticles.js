function postArticles() {
  var slackApp = SlackApp.create(YOUR SLACK_BOT_TOKEN);

  var html = UrlFetchApp.fetch(HATENA_BOOKMARK_ENTRYLIST_URL).getContentText();
  var doc = Parser.data(html).from('data-track-section="default">').to('<div class="recommend-issue">').build();
  
  var contents = Parser.data(doc).from('<div class="entry-contents">').to('</div>').iterate()
  
  var message　= '';
  
  for(i=0;i<10;++i) {
    var content = contents[i];
    var link = Parser.data(content).from('<a href="').to('" class="entry-link"').build();
    var title = Parser.data(content).from('data-track-click-target="direct">').to('</a></h3>').build();
    message += "[" + (i+1) + "] " + title + "\n" + link + "\n"
  }
  slackApp.postMessage(CHANNEL_ID, message, {username : BOT_NAME});
}
