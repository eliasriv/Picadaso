(function(a){a.fn.twittie=function(){var b=(arguments[0] instanceof Object)?arguments[0]:{},h=(typeof arguments[0]==="function")?arguments[0]:arguments[1];var d=a.extend({username:null,list:null,hashtag:null,count:10,hideReplies:false,dateFormat:"%b/%d/%Y",template:"{{date}} - {{tweet}}",apiPath:Drupal.settings.basePath+"awe-content/twitter",loadingText:"Loading..."},b);if(d.list&&!d.username){a.error("If you want to fetch tweets from a list, you must define the username of the list owner.")}var f=function(j){var i=j.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig,'<a href="$1" target="_blank" title="Visit this link">$1</a>').replace(/#([a-zA-Z0-9_]+)/g,'<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>').replace(/@([a-zA-Z0-9_]+)/g,'<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>');return i};var g=function(n){var q=n.split(" ");n=new Date(Date.parse(q[1]+" "+q[2]+", "+q[5]+" "+q[3]+" UTC"));var k=["January","February","March","April","May","June","July","August","September","October","November","December"];var l={"%d":n.getDate(),"%m":n.getMonth()+1,"%b":k[n.getMonth()].substr(0,3),"%B":k[n.getMonth()],"%y":String(n.getFullYear()).slice(-2),"%Y":n.getFullYear()};var m=d.dateFormat;var p=d.dateFormat.match(/%[dmbByY]/g);for(var o=0,j=p.length;o<j;o++){m=m.replace(p[o],l[p[o]])}return m};var c=function(n){var k=d.template;var m=["date","tweet","avatar","url","retweeted","screen_name","user_name"];for(var l=0,j=m.length;l<j;l++){k=k.replace(new RegExp("{{"+m[l]+"}}","gi"),n[m[l]])}return k};this.html("<span>"+d.loadingText+"</span>");var e=this;a.getJSON(d.apiPath,{username:d.username,list:d.list,hashtag:d.hashtag,count:d.count,exclude_replies:d.hideReplies},function(i){e.find("span").fadeOut("fast",function(){e.html('<ul class="tweet_list"></ul>');for(var j=0;j<d.count;j++){var l=false;if(i[j]){l=i[j]}else{if(i.statuses!==undefined&&i.statuses[j]){l=i.statuses[j]}else{break}}var k={user_name:l.user.name,date:g(l.created_at),tweet:(l.retweeted)?f("RT @"+l.user.screen_name+": "+l.retweeted_status.text):f(l.text),avatar:'<img src="'+l.user.profile_image_url+'" />',url:"https://twitter.com/"+l.user.screen_name+"/status/"+l.id_str,retweeted:l.retweeted,screen_name:f("@"+l.user.screen_name)};e.find("ul").append("<li>"+c(k)+"</li>")}if(typeof h==="function"){h()}})})}})(jQuery);