// ==UserScript==
// @name		   Shi options
// @namespace	  Tidus Zero
// @description	Reply and thread loading, image, video and music embedding and more options.
// @include		http://*.bungie.net/*
// @license		Shi options by Tidus Zero is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version		2.8
// ==/UserScript==

var $ = unsafeWindow.$telerik.$;

var debug = true;

shi_ltemp = '1';
var shi_rlint1;
var shi_rlint2;
var shi_greenhai = '<span class="shi_intst" style="color:green;">ON</span>';
var shi_rednai = '<span class="shi_intst" style="color:red;">OFF</span>';

$.fn.outerHTML = function(s){
return (s) 
? this.before(s).remove() 
: $('<p>').append(this.eq(0).clone()).html();
}

function d(info){
	if(debug){
	    try{
	        GM_log(info);
        }
        catch(e){
            console.log(info);
        }
    }
}

lstorage = {
	get: function(key, fallback)
	{
		if(localStorage[key] != null && localStorage[key] != ''){
			return localStorage[key];
		}
		else{
			return fallback;
		}
	}
}

function parseReplyURL(){
	$(".postbody a").each(function(){
		$(this).outerHTML($(this).outerHTML()
			.replace(/<a ((\s|\S)*?)href\=('|")(http\:\/\/(\S*?)\.(mp3|ogg|wav))('|")((\s|\S)*?)>((\s|\S)*?)<\/a>/ig, '<audio controls src="$4">[HTML5 Audio not supported]</audio><br>[$10]')
			.replace(/<a ((\s|\S)*?)href\=('|")(http\:\/\/(\S*?)\.(mp4|ogv|webm))('|")((\s|\S)*?)>((\s|\S)*?)<\/a>/ig, '<video controls src="$4">[HTML5 Video not supported]</video><br>[$10]')
			.replace(/<a ((\s|\S)*?)href\=('|")(http\:\/\/(\S*?)\.(svg))('|")((\s|\S)*?)>((\s|\S)*?)<\/a>/ig, '<object data="$4" width="535" height="535" type="image/svg+xml"></object><br>[$10]')
			.replace(/<a ((\s|\S)*?)href\=('|")(http\:\/\/www\.youtube\.com\/(\S*?)(\?|&amp;)v\=(\S{11})((\s|\S)*?))('|")((\s|\S)*?)>((\s|\S)*?)<\/a>/ig, '<iframe src="http://www.youtube.com/embed/$7" class="youtube-iframe" width="480" height="385" frameborder="0"></iframe><br>[$13]')
			.replace(/<a (\s|\S)*?href\=('|")(http\:\/\/\S*?\.(gif|png|jpg|jpeg|bmp))\S*?('|")(\s|\S)*?>((\s|\S)*?)<\/a>/ig, '<img alt="[posted image]" src="$3"><br>[$7]')
		);
	});
	$(".IBBquotedtable img, video").each(function(){
		$(this).css('max-width', $(this).parent().width()+'px !important');
	});
}
function shi_modo(){
	if(shi_ltemp == "0"){
	if($(".block-a > .forum_item").length >= 13){
		$(".forum_main_col_posts:last").html() == "<span></span>";
	}
	if($(".shi_tobo:last").html() == ""){
		$(".shi_tobo:last").prev().attr('class').match(/shi_page((\d){1,5})/);
		var z = parseInt(RegExp.$1);
		if(z == NaN){
			return false;
		}
		else{
		$(document).ready(function(){
		$(".forum_main_col_posts:last").prev('.shi_tobo').load(window.location.href.replace(/#((\s|\S|\0)*)/, '').replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p="+z+" .forum_item, .forum_alt_item", function(){
			if(localStorage['shi_parsewh-op'] != '3' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
		});
		if($(".shi_tobo:last").prev().attr('class').length >= 17 || $(".shi_tobo:last").prev().attr('class').length <= 9){
			$(".shi_kyuu").load(window.location.href.replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p="+z+" .pagination_container:first > *");
		}
		else if($(".shi_tobo:last").prev().attr('class').length > 9 && $(".shi_tobo:last").prev().attr('class').length < 16){
			$(".shi_kyuu").load(window.location.href.replace(/#((\s|\S|\0)*)/, '')+" .pagination_container:first > *");
		}
		});
		}
	}
	else{
		$(".forum_item:last").parent().attr('class').match(/shi_page((\d){1,5})/);
		var i = parseInt(RegExp.$1);
		var y = i+1;
		if(y == NaN){
			return false;
		}
		else{
		$("#ctl00_mainColPanel > .block-a > .clear").before('<div class="shi_tobo col forum_main_col_posts shi_page'+y+'"></div>');
		$(".shi_page"+y).load(window.location.href.replace(/#((\s|\S|\0)*)/, '').replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p="+y+" .forum_item, .forum_alt_item", function(){
			if(localStorage['shi_parsewh-op'] != '3' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
		});
		$(".shi_kyuu").load(window.location.href.replace(/#((\s|\S|\0)*)/, '').replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p="+y+" .pagination_container:first > *");
		}
	}
	}
	else{
	shi_ltemp = '0';
	if(!window.location.href.match(/postRepeater1-p=\d{1,5}/)){
		i = 2;
		$("#ctl00_mainColPanel > .block-a > .clear").before('<div class="shi_tobo col forum_main_col_posts shi_page'+i+'"></div>');
	}
	else if(window.location.href.match(/postRepeater1-p=((\d){1,5})/)){
		i = parseInt(RegExp.$1)+1;
		$("#ctl00_mainColPanel > .block-a > .clear").before('<div class="shi_tobo col forum_main_col_posts shi_page'+i+'"></div>');
	}
	if(!window.location.href.match(/postRepeater1-p=\d{1,5}/) && i != NaN){
		$(".shi_page"+i+"").load(window.location.href.replace(/#((\s|\S|\0)*)/, '').replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p=2 .forum_item, .forum_alt_item", function(){
			if(localStorage['shi_parsewh-op'] != '3' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
		});
		$(".shi_kyuu").load(window.location.href.replace(/#((\s|\S|\0)*)/, '').replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p=2 .pagination_container:first > *");
	}
	else if(window.location.href.match(/postRepeater1-p=((\d){1,5})/)){
		var i = parseInt(RegExp.$1);
		var y = i+1;
		$(".shi_page"+y).load(window.location.href.replace(/#((\s|\S|\0)*)/, '').replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p="+y+" .forum_item, .forum_alt_item", function(){
			if(localStorage['shi_parsewh-op'] != '3' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
		});
		$(".shi_kyuu").load(window.location.href.replace(/#((\s|\S|\0)*)/, '').replace(/&postRepeater1-p=\d{1,5}((\s|\S|\0)*)/ig, '')+"&postRepeater1-p="+y+" .pagination_container:first > *");
	}
	}
}
function threadPreviewAll(){
	if(localStorage['shi_preperm-op'] == '1'){
		$(".odd, .even").each(function(){
			if($(this).children('td:last').children('.shi_prelod').children('.shi_tprtxt').html().length < 33){
				$(this).children('td:last').children('.shi_prelod').children('.shi_tprtxt').load('http://www.bungie.net'+ $(this).children('td:first').children('div').children('a').attr('href') +' .postbody:first', function(){
					if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
				});
			}
		});
		$(".shi_prelod, .shi_prepage").show();
	}
	else if(localStorage['shi_preperm-op'] == '2' || localStorage['shi_preperm-op'] == null){
		$(".grid:last .odd, .grid:last .even").each(function(){
			if($(this).children('td:last').children('.shi_prelod').children('.shi_tprtxt').html().length < 33){
				$(this).children('td:last').children('.shi_prelod').children('.shi_tprtxt').load('http://www.bungie.net'+ $(this).children('td:first').children('div').children('a').attr('href') +' .postbody:first', function(){
					if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
				});
			}
		});
		$(".grid:last .shi_prelod, .grid:last .shi_prepage").show();
	}
	else if(localStorage['shi_preperm-op'] == '3'){
		$(".grid:last .odd:eq(0), .grid:last .odd:eq(1), .grid:last .odd:eq(2), .grid:last .even:eq(0), .grid:last .even:eq(1), .grid:last .even:eq(2)").each(function(){
			if($(this).children('td:last').children('.shi_prelod').children('.shi_tprtxt').html().length < 33){
				$(this).children('td:last').children('.shi_prelod').children('.shi_tprtxt').load('http://www.bungie.net'+ $(this).children('td:first').children('div').children('a').attr('href') +' .postbody:first', function(){
					if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
				});
			}
		});
		for(i=0;i<3;i++){
			if($(".grid:last .odd:eq("+i+")").children('td:last').children('.shi_prelod').children('.shi_tprtxt').html().length < 33){
				$(".grid:last .odd:eq("+i+")").children('td:last').children('.shi_prelod').children('.shi_tprtxt').load('http://www.bungie.net'+ $(".grid:last .odd:eq("+i+")").children('td:first').children('div').children('a').attr('href') +' .postbody:first', function(){
					if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
				});
			}
			if($(".grid:last .even:eq("+i+")").children('td:last').children('.shi_prelod').children('.shi_tprtxt').html().length < 33){
				$(".grid:last .even:eq("+i+")").children('td:last').children('.shi_prelod').children('.shi_tprtxt').load('http://www.bungie.net'+ $(".grid:last .even:eq("+i+")").children('td:first').children('div').children('a').attr('href') +' .postbody:first', function(){
					if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
				});
			}
		}
		for(i=0;i<6;i++){
			$(".grid:last .shi_prelod:eq("+i+"), .grid:last .shi_prelod:eq("+i+")").show();
		}
	}
}
function threadExpand(elem, type){
	if(type == 0){
		d("Type: 0 == " + type);
		var shi_lapagenum = elem.parent().prev().children('p').children('span:first').children('a:last');
		if(shi_lapagenum.length > 0){
			elem.parent().load('http://www.bungie.net' + elem.parent('.shi_prelod').prev('.list-h').children('h5').children('a').attr('href') + ' .forum_item, .forum_alt_item', function(){
				if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
			});
			var shi_pagemath = parseFloat(shi_lapagenum.html()) + 1;
			for(i=2;i<shi_pagemath;i++){
				elem.parent().parent().append('<span class="shi_prepage shi_prepage'+i+'"></span>')
				elem.parent().siblings('.shi_prepage'+i).load('http://www.bungie.net' + elem.parent('.shi_prelod').prev('.list-h').children('h5').children('a').attr('href')+'&postRepeater1-p='+i+' .forum_item, .forum_alt_item', function(){
					if(localStorage['shi_parsewh-op'] != '2' && (lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai || lstorage.get('shi_arpars', shi_greenhai) == null)){ parseReplyURL(); }
				});
			}
		}
		else{
			elem.parent().load('http://www.bungie.net' + elem.parent('.shi_prelod').prev('.list-h').children('h5').children('a').attr('href')+' .forum_item, .forum_alt_item', function(){
				if(localStorage['shi_parsewh-op'] != '2' && (lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai || lstorage.get('shi_arpars', shi_greenhai) == null)){ parseReplyURL(); }
			});
		}
	}
	else{
		d("Type: 1 == " + type);
		var shi_lapagenum = elem.parent().prev('span').children('a:last');
		if(shi_lapagenum.length > 0){
			elem.parent().parent('p').parent('.list-h').next('.shi_prelod').load('http://www.bungie.net' + elem.parent().parent().prev('h5').children('a').attr('href') + ' .forum_item, .forum_alt_item', function(){
				if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
			});
			var shi_pagemath = parseFloat(shi_lapagenum.html()) + 1;
			for(i=2;i<shi_pagemath;i++){
				elem.parent().parent('p').parent('.list-h').next('.shi_prelod').parent().append('<span class="shi_prepage shi_prepage'+i+'"></span>')
				elem.parent().parent('p').parent('.list-h').next('.shi_prelod').siblings('.shi_prepage'+i).load('http://www.bungie.net' + elem.parent().parent().prev('h5').children('a').attr('href') + '&postRepeater1-p='+i+' .forum_item, .forum_alt_item', function(){
					if(localStorage['shi_parsewh-op'] != '2' && (lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai || lstorage.get('shi_arpars', shi_greenhai) == null)){ parseReplyURL(); }
				});
			}
		}
		else{
			elem.parent().parent('p').parent('.list-h').next('.shi_prelod').load('http://www.bungie.net' + elem.parent().parent().prev('h5').children('a').attr('href') + ' .forum_item, .forum_alt_item', function(){
				if(localStorage['shi_parsewh-op'] != '2' && (lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai || lstorage.get('shi_arpars', shi_greenhai) == null)){ parseReplyURL(); }
			});
		}
	}
}
var thread = {
	hide: function(){
		t = [];
		try{
			t = JSON.parse(localStorage['shi_threads-v']);
		}
		catch(e){
			t = [];
		}
		for(i=0;i<t.length;i++){
			t[i] = '[href="' + t[i] + '"]';
		}
		$(t.join(',')).each(function(){
			$(this).closest('.odd, .even').hide();
		});
		$("#shi_threads-o input[type='button']").val(t.length + " threads");
	},
	append: function(href){
		t = [];href = $.isArray(href) ? href : [href];
		d('Trying to JSON.parse the lS string, t = ' + t);
		try{
			t = JSON.parse(lstorage.get('shi_threads-v', []));
			d('Try success, t = ' + t);
		}
		catch(e){
			t = [];
			d('Try error, t = ' + t);
		}
		d('Trying to join arrays...');
		localStorage['shi_threads-v'] = JSON.stringify(t.concat(href));
		d('Hell yeah: ' + localStorage['shi_threads-v']);
	},
	empty: function(){
		localStorage['shi_threads-v'] = '';
	}
}

if(localStorage['shi_prestatus-op'] == '1'){localStorage['shi_prevstatus'] = 'Hide previews';}else if(localStorage['shi_prestatus-op'] == '0' || localStorage['shi_prestatus-op'] == null){localStorage['shi_prevstatus'] = 'Show previews';}

$("body").prepend('<style>\
html, body, body > div[style^="height"] { height: auto !important; }\
.shi_nep:hover{color:white;text-shadow:0 0 2px white;cursor:pointer;}\
.postbody img{max-width: 535px;}\
.postbody video{max-width:525px;}\
.shi_tobo{border-top:1px solid #777;}\
.postbody p img:hover{cursor:pointer;box-shadow: 0 0 7px white;}\
.shi_imglar{width:'+window.innerWidth+'px;z-index:9002;background:rgba(0,0,0,0.5);display:none;position:fixed;overflow-y:scroll;}\
.shi_imglar img{max-width:100%;cursor:pointer;}\
.shi_imglarcl:hover{cursor:pointer;}\
\
' + lstorage.get('shi_barstyle', '.shi_setout{bottom:0px;position:fixed;z-index:9001;width:100%;}.shi_settings{background:rgba(19, 19, 19, 0.8);border:1px solid rgba(118,118,118,0.8);border-bottom:0px solid transparent;width:100%;}#shi_bbtog{bottom:0px;position:fixed;padding:5px;border:1px solid transparent;right:0px;}.shi_more{float:left;}') + '\
\
.shi_newpm{display:none;right:0px;max-width:450px;background:rgba(19, 19, 19, 0.8);border-top:1px solid rgba(118,118,118,0.8);border-left:1px solid rgba(118,118,118,0.8);border-top-left-radius: 10px 10px;padding:3px;padding-bottom:27px;float:right;}\
.shi_newpm font{text-align:center;padding-bottom:5px;}\
.shi_tprtxt{background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.4);margin:3px;padding:3px;}\
.shi_preplus, .shi-thread-v { cursor:pointer;text-shadow:0 0 3px black;color:#9D9D9D !important; }\
.shi_preplus:hover, .shi-thread-v:hover { text-shadow:0 0 3px white; }\
#shi_moreop { background:rgba(0,0,0,0.9);border:1px solid rgba(255,255,255,0.4);padding: 7px;margin-top:10%;max-width:700px;width:700px;max-height:450px;height:450px;position:fixed;z-index:9001;display:none; }\
#shi_moreop tr { text-align: -webkit-center; }\
.shi_title { font-size:37px;text-shadow:0 0 5px white;text-align:center;margin-top: 15px; margin-bottom: 25px; }\
.shi_option, .shi_button { display:table-cell;width:200px;max-width:200px; }\
.shi_optitle { display:table-cell; }\
.shi_pmclose { float:right;color:red;cursor:pointer; }\
.shi_tprtxt .author_header_block, .shi_tprtxt .floatingprofile { display:none; }\
.shi_prefull{margin: 2px 0 2px 0;}\
.shi_prelod{display:none;}\
</style>');

$("body style:first").after('\
<div class="shi_imglar" style="height:100%;">\
    <div align="center"></div>\
</div>\
<div style="width:700px;margin: auto;">\
	<div id="shi_moreop">\
		<span class="shi_pmclose">X</span>\
		<div class="shi_title">Options</div>\
		<table>\
			<tbody>\
				<tr>\
					<td class="shi_optitle">Bar location:</td>\
					<td class="shi_option" id="shi_barloc" align="right">\
						<select>\
							<option value="top">Top</option>\
							<option value="left">Left</option>\
							<option value="right">Right</option>\
							<option value="bottom">Bottom</option>\
						</select>\
					</td>\
				</tr>\
				<tr>\
					<td class="shi_optitle">Preview content:</td>\
					<td class="shi_option" id="shi_preperm" align="right">\
						<select>\
							<option value="1">All topics</option>\
							<option value="2">No pinned or top</option>\
							<option value="3">Six first</option>\
						</select>\
					</td>\
				</tr>\
				<tr>\
					<td class="shi_optitle">Preview status:</td>\
					<td class="shi_option" id="shi_prestatus" align="right">\
						<select>\
							<option value="1">On</option>\
							<option value="0">Off</option>\
						</select>\
					</td>\
				</tr>\
				<tr>\
					<td class="shi_optitle">Expand mode:</td>\
					<td class="shi_option" id="shi_premode" align="right">\
						<select>\
							<option value="0">Full</option>\
							<option value="1">Preview</option>\
						</select>\
					</td>\
				</tr>\
				<tr>\
					<td class="shi_optitle">Parse URLs:</td>\
					<td class="shi_option" id="shi_parsewh" align="right">\
						<select>\
							<option value="1">Both</option>\
							<option value="2">Threads only</option>\
							<option value="3">Topic view only</option>\
						</select>\
					</td>\
				</tr>\
				<tr>\
					<td class="shi_optitle">Private message notification:</td>\
					<td class="shi_option" id="shi_pmnotif" align="right">\
						<select>\
							<option value="1">Show</option>\
							<option value="0">Hide</option>\
						</select>\
					</td>\
				</tr>\
				<tr>\
					<td class="shi_optitle">Empty hidden threads:</td>\
					<td class="shi_button" id="shi_threads-o" align="right">\
						<input type="button">\
					</td>\
				</tr>\
			</tbody>\
		</table>\
	</div>\
</div>');
if(window.location.href.match('topics.aspx?')){
	$("body").append('<style>.grid .post-actions{width:465px !important;}.postbody{max-width:460px;}.forum_post_report_button, .forum_post_ninjas_button{display:none !important;}.signature{width:451px !important;}.forum_item_outer_shell{width:auto !important;}.postbody > a{display:none;}.postbody img{max-width:450px;}.youtube-iframe{width:420px !important;height:330px !important;}.pinned_topic_grid .postbody, .pinned_topic_grid .postbody img, .pinned_topic_grid .postbody audio, .pinned_topic_grid .postbody .youtube-iframe{max-width:220px;}.pinned_topic_grid .forumavatar, .pinned_topic_grid .title, .pinned_topic_grid .author_header_links{display:none;}.pinned_topic_grid .post-actions{width:130px !important;}.IBBquotedtable{background-color:#161617;border:1px inset #414547;display:block;margin-bottom:5px;margin-top:5px;padding:2px 2px 2px 4px;}</style><div class="shi_setout"><div class="shi_newpm"><font>'+$(".messages a").html()+' new message(s)!</font><font class="shi_pmclose">X</font></div><div class="pagination_container shi_settings"><span class="shi_more shi_nep">More options</span><div class="list-j shi_jplist" align="center"><span class="shi_nep shi_ipars">Parse URLs: '+lstorage.get('shi_arpars', shi_greenhai)+'</span> | <span class="shi_nep shi_previ">Show URLs on hover: '+lstorage.get('shi_pshur', shi_greenhai)+'</span> | <span class="shi_nep shi_pload">Auto-reload topics: '+lstorage.get('shi_artopics', shi_rednai)+'</span> / <span class="shi_nep shi_pload" name="this">Auto-load this</span> | <span class="shi_nep shi_bupreto">'+lstorage.get('shi_prevstatus', "Show previews")+'</span> <span style="color:transparent;">Hide</span></div></div><span id="shi_bbtog" class="shi_nep">Hide</span></div>');
	$(document).ready(function(){
		thread.hide();
	});
	$(".odd, .even").each(function(){
		$(this).children('td:last').children('div').after('<div class="shi_prelod"><div class="shi_tprtxt"><progress>Loading...</progress></div><span class="shi_nep shi_prefull">Load full thread</span></div>');
		$(this).children('td:last').children('div').children('p').append('<span> | <span class="shi_preplus">Expand</span></span>');
	});
	$("[id$='_replyCountLabel']").each(function(){
		$(this).after('&nbsp;|&nbsp;<a class="shi-thread-v" href="javascript:;">[ - ]</a>');
	});
	if(localStorage['shi_prestatus-op'] == '1'){
		threadPreviewAll();
		if(localStorage['shi_preperm-op'] == '1'){
			$(".shi_preplus").text("Collapse");
		}
		else if(localStorage['shi_preperm-op'] == '2' || localStorage['shi_preperm-op'] == null){
			$(".grid:last .shi_preplus, .grid:last .shi_preplus").text("Collapse");
		}
		else if(localStorage['shi_preperm-op'] == '3'){
			for(i=0;i<6;i++){
				$(".grid:last .shi_preplus:eq("+i+")").text("Collapse");
			}
		}
	}
	if(lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai || lstorage.get('shi_arpars', shi_greenhai) == null){
		if(localStorage['shi_parsewh-op'] != '2'){ parseReplyURL(); }
	}
}
else if(window.location.href.match('posts.aspx?')){
	$("body").append('<div class="shi_setout"><div class="shi_newpm"><font>'+$(".messages a").html()+' new message(s)!</font><font class="shi_pmclose">X</font></div><div class="pagination_container shi_settings"><span class="shi_more shi_nep">More options</span><div class="list-j" align="center"><span class="shi_nep shi_ipars">Parse URLs: '+lstorage.get('shi_arpars', shi_greenhai)+'</span> | <span class="shi_nep shi_previ">Show URLs on hover: '+lstorage.get('shi_pshur', shi_greenhai)+'</span> | <span class="shi_nep shi_alreply">Load on scroll: '+lstorage.get('shi_rerato', shi_rednai)+'</span> / <span class="shi_nep shi_alload">Load next</span> <span style="color:transparent;">Hide</span></div></div><span id="shi_bbtog" class="shi_nep">Hide</span></div>');
	$(".pagination_container:last:not('.shi_settings')").addClass("shi_kyuu");
	if(lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai || lstorage.get('shi_arpars', shi_greenhai) == null){
		if(localStorage['shi_parsewh-op'] != '3'){ parseReplyURL(); }
	}
}
else{
	$("body").append('<div class="shi_setout"><div class="shi_newpm"><font>'+$(".messages a").html()+' new message(s)!</font><font class="shi_pmclose">X</font></div></div>');
}
$(".shi_option").live('change', function(){
	localStorage[$(this).attr('id')+'-op'] = $(this).children('select').children('option:selected').val();
	if($(this).attr('id') == 'shi_barloc'){
		if($("#shi_barloc option:selected").val() != "right" && $("#shi_barloc option:selected").val() != "left"){
			localStorage['shi_barstyle'] = '.shi_setout{'+localStorage['shi_barloc-op']+':0px;position:fixed;z-index:9001;width:100%;}.shi_settings{background:rgba(19, 19, 19, 0.8);border:1px solid rgba(118,118,118,0.8);border-'+localStorage['shi_barloc-op']+':0px solid transparent;width:100%;}#shi_bbtog{'+localStorage['shi_barloc-op']+':0px;position:fixed;padding:5px;border:1px solid transparent;right:0px;}.shi_more{float:left;}';
		}
		else{
			localStorage['shi_barstyle'] = '.shi_setout{bottom:0px;'+localStorage['shi_barloc-op']+':0px;position:fixed;z-index:9001;width:10%;height:100%;}.shi_settings{background:rgba(19, 19, 19, 0.8);border:1px solid rgba(118,118,118,0.8);border-'+localStorage['shi_barloc-op']+':0px solid transparent;height:100%;float:'+localStorage['shi_barloc-op']+';}#shi_bbtog{'+localStorage['shi_barloc-op']+':0px;bottom:0px;position:fixed;padding:5px;border:1px solid transparent;}.shi_settings .shi_nep{display:block;}.shi_settings > .list-j{margin-top:25px;}.shi_more{float:'+localStorage['shi_barloc-op']+';}';
		}
	}
});
$(".shi_button input[type='button']").live('click', function(){
	if($(this).parent().attr('id') == 'shi_threads-o'){
		thread.empty();
		thread.hide();
	}
});
var shi_logroup = ['shi_barloc:bottom', 'shi_preperm:2', 'shi_premode:0', 'shi_parsewh:1', 'shi_pmnotif:1', 'shi_prestatus:0'];
for(i=0;i<shi_logroup.length;i++){
	$("#" + shi_logroup[i].split(':')[0] + " option[value='" + lstorage.get(shi_logroup[i].split(':')[0] + '-op', shi_logroup[i].split(':')[1]) + "']").attr('selected', 'selected');
}
$("#shi_bbtog").click(function(){
	if($(this).text() == "Show"){
		$(this).text("Hide");
		$(".shi_settings").fadeIn("slow");
		localStorage['shi_bbtogs'] = '0';
	}
	else if($(this).text() == "Hide"){
		$(this).text("Show");
		$(".shi_settings").fadeOut("slow");
		localStorage['shi_bbtogs'] = '1';
	}
});
if(localStorage['shi_bbtogs'] == '1'){
	$("#shi_bbtog").text('Show');
	$(".shi_settings").hide();
}
if($(".messages a").html() >= 1 && lstorage.get('shi_pmnotif-op', '1') == '1'){
	$(".shi_newpm").fadeIn("slow");
	var mesq = parseFloat($(".messages a").html()) - 1;
	for(i=0;i<=mesq;i++){
		$(".shi_newpm").append('<div><progress>Loading...</progress></div>');
		$(".shi_newpm div:eq("+i+")").load("http://www.bungie.net/Account/Profile.aspx?page=Messages .new:eq("+i+")");
	}
}
$(".shi_pmclose").click(function(){ $(this).parent().fadeOut("fast"); });
if(localStorage['shi_artopics'] == shi_greenhai){
	shi_rlint1 = setInterval(function(){
		$(".grid:last").load(window.location.href+" .grid:last tbody", function(){
		});
	}, 10000);
	$(".shi_preplus").parent().hide();
}
$(".shi_more").click(function(){ if($("#shi_moreop").is(":visible")){ $("#shi_moreop").fadeOut("fast"); } else{ $("#shi_moreop").fadeIn("slow"); } });

////////////////////////////////////////////////////////
$(".shi-thread-v").live('click', function(){
	thread.append($(this).siblings('a').attr('href'));
	thread.hide();
});
$(".postbody p a").live('mouseover', function(){
	if(localStorage['shi_pshur'] == shi_greenhai || localStorage['shi_pshur'] == null){
		$(this).append("<span class='shi_aap'> ("+$(this).attr("href")+")</span>");
	}
}); 
$(".postbody p a").live('mouseout', function(){
	if(localStorage['shi_pshur'] == shi_greenhai || localStorage['shi_pshur'] == null){
		$(this).find(".shi_aap").remove();
	}
});
$(".postbody p img").live('click', function(){
	$(".shi_imglar").show().children('div').html($(this).outerHTML());
	$(".shi_imglar div img").attr('style', '')
});
$(".shi_preplus").live('click', function(){
	if(lstorage.get('shi_premode-op', '0') == '1'){
		var peropero = $(this).parent().parent().parent();
		if($(this).text() == "Collapse"){
			peropero.siblings('.shi_prelod, .shi_prepage').hide();
			$(this).text("Expand");
		}
		else if($(this).text() == "Expand" && peropero.next().children().html().length < 33){
			peropero.next('.shi_prelod').children('.shi_tprtxt').load('http://www.bungie.net'+ $(this).parent().parent().prev('h5').children('a').attr('href') +' .postbody:first', function(){
				if(localStorage['shi_parsewh-op'] != '2' && lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai){ parseReplyURL(); }
			});
			$(this).text("Collapse");
			peropero.siblings('.shi_prelod, .shi_prepage').show();
		}
		else{
			peropero.siblings('.shi_prelod, .shi_prepage').show();
			$(this).text("Collapse");
		}
	}
	else{
		var peropero = $(this).parent().parent().parent();
		if($(this).text() == "Collapse"){
			peropero.siblings('.shi_prelod, .shi_prepage').hide();
			$(this).text("Expand");
		}
		else if($(this).text() == "Expand" && peropero.next().children().html().length < 33){
			peropero.siblings('.shi_prelod, .shi_prepage').show();
			$(this).text("Collapse");
			threadExpand($(this), 1);
		}
		else{
			peropero.siblings('.shi_prelod, .shi_prepage').show();
			$(this).text("Collapse");
		}
	}
});
$(".forum_item_outer_shell .expanded_arrows_collapsed, .forum_item_outer_shell .expanded_arrows_expanded").live('click', function(){
	if(window.location.href.match('posts.aspx?')){
		$(this).toggleClass('expanded_arrows_collapsed expanded_arrows_expanded').parent().parent().next().toggle();
		return false;
	}
});
////////////////////////////////////////////////////////

$(".shi_imglar, .shi_imglar div img").click(function(){ $(".shi_imglar").hide(); });
$(".shi_pload").click(function(){
	if($(this).attr('name') == 'this'){ 
		shi_rlint2 = setInterval(function(){
			$(".grid:last").load(window.location.href+" .grid:last", function(){
			});
		}, 10000);
		$(this).attr('name', 'not_this');$(this).attr('style', 'color:green;');
	}
	else if($(this).attr('name') == 'not_this'){
		clearInterval(shi_rlint2);
		$(this).attr('name', 'this');$(this).attr('style', '');
	}
	else if(localStorage['shi_artopics'] != shi_greenhai){
		localStorage['shi_artopics'] = shi_greenhai;
		$(".shi_pload").children(".shi_intst").css('color', 'green').text("ON");
		$(".grid:last").load(window.location.href+" .grid:last");
		shi_rlint2 = setInterval(function(){
			$(".grid:last").load(window.location.href+" .grid:last", function(){
			});
		}, 10000);
	}
	else{
		localStorage['shi_artopics'] = shi_rednai;
		$(".shi_pload").children(".shi_intst").css('color', 'red').text("OFF");
		clearInterval(shi_rlint1);
		clearInterval(shi_rlint2);
		$(".odd, .even").each(function(){
			if($(this).children('td:last').children('div').children('p').children('span').outerHTML().length < 7){
				$(this).children('td:last').children('div').children('p').append(' | <span class="shi_preplus">Expand</span>');
			}
		});
		$(".shi_preplus").parent().show();
	}
});
$(".shi_bupreto").click(function(){
	if( ($(".shi_tprtxt").children(':not("progress")').length < 1 && localStorage['shi_prevstatus'] == 'Show previews') || localStorage['shi_prevstatus'] == null){
		threadPreviewAll();
		localStorage['shi_prevstatus'] = 'Hide previews';
		$(this).text('Hide previews');
		if(localStorage['shi_preperm-op'] == '1'){
			$(".shi_prelod, .shi_prepage").show();
			$(".shi_preplus").text("Collapse");
		}
		else if(localStorage['shi_preperm-op'] == '2' || localStorage['shi_preperm-op'] == null){
			$(".grid:last .shi_prelod, .grid:last .shi_prepage").show();
			$(".grid:last .shi_preplus").text("Collapse");
		}
		else if(localStorage['shi_preperm-op'] == '3'){
			for(i=0;i<5;i++){
				$(".grid:last .shi_prelod:eq("+i+"), .grid:last .shi_prepage:eq("+i+")").show();
				$(".grid:last .shi_preplus:eq("+i+")").text("Collapse");
			}
		}
	}
	else if(localStorage['shi_prevstatus'] == 'Show previews'){
		localStorage['shi_prevstatus'] = 'Hide previews';
		$(this).text('Hide previews');
		if(localStorage['shi_preperm-op'] == '1'){
			$(".shi_prelod, .shi_prepage").show();
			$(".shi_preplus").text("Collapse");
		}
		else if(localStorage['shi_preperm-op'] == '2' || localStorage['shi_preperm-op'] == null){
			$(".grid:last .shi_prelod, .grid:last .shi_prepage").show();
			$(".grid:last .shi_preplus").text("Collapse");
		}
		else if(localStorage['shi_preperm-op'] == '3'){
			for(i=0;i<6;i++){
				$(".grid:last .shi_prelod:eq("+i+"), .grid:last .shi_prepage:eq("+i+")").show();
				$(".grid:last .shi_preplus:eq("+i+")").text("Collapse");
			}
		}
	}
	else{
		localStorage['shi_prevstatus'] = 'Show previews';
		$(this).text('Show previews');
		if(localStorage['shi_preperm-op'] == '1'){
			$(".shi_prelod, .shi_prepage").hide();
			$(".shi_preplus").text("Expand");
		}
		else if(localStorage['shi_preperm-op'] == '2' || localStorage['shi_preperm-op'] == null){
			$(".grid:last .shi_prelod, .grid:last .shi_prepage").hide();
			$(".grid:last .shi_preplus").text("Expand");
		}
		else if(localStorage['shi_preperm-op'] == '3'){
			for(i=0;i<6;i++){
				$(".grid:last .shi_prelod:eq("+i+"), .grid:last .shi_prepage:eq("+i+")").hide();
				$(".grid:last .shi_preplus:eq("+i+")").text("Expand");
			}
		}
	}
});
$(".shi_prefull").live('click', function(){
	threadExpand($(this), 0);
});
$(".shi_ipars").click(function(){
	if(localStorage['shi_arpars'] != shi_greenhai){
		localStorage['shi_arpars'] = shi_greenhai;
		$(".shi_ipars").children(".shi_intst").css('color', 'green').text("ON");
		if(localStorage['shi_parsewh-op'] != '3' && (lstorage.get('shi_arpars', shi_greenhai) == shi_greenhai || lstorage.get('shi_arpars', shi_greenhai) == null)){ parseReplyURL(); }
	}
	else{
		localStorage['shi_arpars'] = shi_rednai;
		$(".shi_ipars").children(".shi_intst").css('color', 'red').text("OFF");
	}
});
$(".shi_previ").click(function(){
	if(localStorage['shi_pshur'] != shi_greenhai){
		localStorage['shi_pshur'] = shi_greenhai;
		$(".shi_previ").children(".shi_intst").css('color', 'green').text("ON");
	}
	else{
		localStorage['shi_pshur'] = shi_rednai;
		$(".shi_previ").children(".shi_intst").css('color', 'red').text("OFF");
	}
});
$(".shi_alreply").click(function(){
	if(localStorage['shi_rerato'] != shi_greenhai){
		localStorage['shi_rerato'] = shi_greenhai;
		$(".shi_alreply").children(".shi_intst").css('color', 'green').text("ON");
	}
	else{
		localStorage['shi_rerato'] = shi_rednai;
		$(".shi_alreply").children(".shi_intst").css('color', 'red').text("OFF");
	}
});
$(".shi_alload").click(function(){ shi_modo(); });
$(window).scroll(function(){
	if($(window).scrollTop() == $(document).height() - $(window).height() && localStorage['shi_rerato'] == shi_greenhai){
		shi_modo();
	}
});
