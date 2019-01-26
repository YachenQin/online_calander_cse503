var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



var date = new Date();
var todaydate = date.getDate();
var todaymonth = date.getMonth();
var todayyear = date.getFullYear();

var currentmonth=new Month(todayyear,todaymonth);


var token;

document.addEventListener("DOMContentLoaded", all(), false);

function premonth(){
    currentmonth = currentmonth.prevMonth();
    updateCalendar();
}
function nextmonth(){
    currentmonth = currentmonth.nextMonth();
    updateCalendar();
}

function all(){
    updateCalendar();
    loginshow();
    registershow();
    cleanCalender();
    //displayevent();
}

function cleanCalender(){
    var xmlhttprequest=new XMLHttpRequest();
    xmlhttprequest.open("POST","Cleancalender.php",true);
    xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttprequest.send(null);
}

function updateCalendar() {
    var month = currentmonth.month;
    var year = currentmonth.year;
    
    $("#calendar").empty();
    $("#calendar").append("<caption id='canlendartitle'></caption>");
    $("#canlendartitle").append("<button class='pre' id='premonth'>Pre</button>");
    $("#canlendartitle").append("<a1 id='monthtitle'></a1>");
    $("#monthtitle").text( (monthNames[month]) + " " + year);
    $("#canlendartitle").append("<button class='next' id='nextmonth'>Next</button>");
    
    
    $("#calendar").append("<tr id='week' class='weekdays'></tr>");
	$("#week").append("<td>Sun</td>");
	$("#week").append("<td>Mon</td>");
	$("#week").append("<td>Tue</td>");
	$("#week").append("<td>Wed</td>");
	$("#week").append("<td>Thu</td>");
	$("#week").append("<td>Fri</td>");
	$("#week").append("<td>Sat</td>");
    
    var weeks = currentmonth.getWeeks();
    for (var week in weeks) {
        $("#calendar").append("<tr id='"+week+"'></tr>");
        var days = weeks[week].getDates();
        for (var day in days) {
            if (days[day].getMonth() == month)
             {
                var datetext = days[day].getDate();
                if(datetext<10){
                    datetext="0"+datetext.toString();
                }
				let dt= days[day].getFullYear().toString()+(days[day].getMonth()+1).toString()+datetext.toString();
                $("#"+week).append("<td id='"+ dt +"'>"+datetext+"</td>");
                $("#"+dt).append("<button class='button4'>+</button>");
                
			}
            else {
				$("#"+week).append("<td></td>");
			}
        }
    }
    
    
    $("#premonth").on("click", premonth);
	$("#nextmonth").on("click", nextmonth);
    $(".button4").on('click', addEvent);

	if($('#login').children().length == 0) {
		displayevent();
	}
    
}

function loginshow() {
    $("#hello").append('<label> Welcome Guset! Now you can only see Public event and you can not change them </label>');
	$('#login').append('<label class="loginfont">Login:</label>');
	$('#login').append('<input type="text" class="inputdesign" name="username" id="username" placeholder="Enetr Username">');
	$('#login').append('<input type="password" class="inputdesign" name="password" id="password" placeholder="Enter Password">');
	$('#login').append('<button id="loginbutton" class="button5">login</button>');
	$('#loginbutton').on("click", login);
}
function login(event){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
    var xmlhttprequest=new XMLHttpRequest();
    xmlhttprequest.open("POST","login.php",true);
    xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttprequest.addEventListener("load",function(e){
        var jsonData = JSON.parse(e.target.responseText); 
		if(!jsonData.success){  
			alert("You can't log in"+jsonData.message);
		}else{
			token = jsonData.token;
			alert("Now you are login!");
			$("#login").empty();
            $("#newuser").empty();
            $("#hello").empty();
			updateCalendar();
            logoutshow();   
        }
    },false);
    xmlhttprequest.send(dataString);
    //displayevent();
}

function registershow(){
    $('#newuser').append('<label class="regfont">New User:</label>');
	$('#newuser').append('<input type="text" name="new_user" class="inputdesign" id="new_user" placeholder="New Username">');
	$('#newuser').append('<input type="password" name="new_pass" class="inputdesign" id="new_pass" placeholder="New Password">');
	$('#newuser').append('<button id="registerbutton" class="button6">Create newuser</button>');
	$('#registerbutton').on("click", register);
}

function register(event){
    var newuser=document.getElementById("new_user").value;
    var password=document.getElementById("new_pass").value;
    var dataString = "newuser=" + encodeURIComponent(newuser) + "&password=" + encodeURIComponent(password);
    
    var xmlhttprequest=new XMLHttpRequest();
    xmlhttprequest.open("POST","createnewuser.php",true);
    xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttprequest.addEventListener("load",function(e){
        var jsonData = JSON.parse(e.target.responseText); 
		if(!jsonData.success){  
			alert("You can't Register!"+jsonData.message);
		}else{
			alert(jsonData.message);
        }
    },false);
    xmlhttprequest.send(dataString);
}

function logoutshow(){
    $('#logout').append('<button id="logoutbutton" class="button1">logout</button>');
    $('#logoutbutton').on("click", logout); 
}

function logout(e) {
	var xmlhttprequest=new XMLHttpRequest();
    xmlhttprequest.open("POST","logout.php",true);
    xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttprequest.addEventListener("load", function(e){
		var jsonData = JSON.parse(e.target.responseText);
		if (jsonData.success) {
			alert("You have already logged out!");
			loginshow();
            registershow();
			updateCalendar();
		}else{
			alert("You can't logout");
		}}, false);
	xmlhttprequest.send(null);
    $("#logout").empty();
    updateCalendar();
}


function addEvent() {
	addeventactionother();
	$(this).append("<div class='issue'></div>");
	$('.issue').append("<form class='newevent'></form>");
    
	$('.newevent').append('<label>Event Title:</label>');
	$('.newevent').append('<br>');
	$('.newevent').append('<input type="text" name="newtitle" id="newtitle">');
	$('.newevent').append('<br>');
    
    $('.newevent').append('<label>Content:</label>');
	$('.newevent').append('<br>');
	$('.newevent').append('<input type="text" name="newcontent" id="newcontent">');
	$('.newevent').append('<br>');
    
	$('.newevent').append('<label>Category:</label>');
	$('.newevent').append('<br>');
	$('.newevent').append('<input type="radio" name="category" value="work">work');
    $('.newevent').append('<input type="radio" name="category" value="life">life');
	$('.newevent').append('<input type="radio" name="category" value="other">other');
	$('.newevent').append('<br>');
    
    
	$('.newevent').append('<label>Time:</label>');
	$('.newevent').append('<br>');
	$('.newevent').append('<input type="text" name="time" id="newtime">');
	$('.newevent').append('<br>');
    
    $('.newevent').append('<label>Type:</label>');
	$('.newevent').append('<br>');
	$('.newevent').append('<input type="radio" name="type" value="public">public');
    $('.newevent').append('<input type="radio" name="type" value="private">Private');
	$('.newevent').append('<br>');
    
    $('.newevent').append('<label>Share:</label>');
	$('.newevent').append('<br>');
    $('.newevent').append('<input type="text" name="share" id="shareusername" placeholder="Other username or blank as no one">');
	$('.newevent').append('<br>');
    
	$('.newevent').append('<input type="button" name="add" id="add" value="Add">');
	$('.newevent').append('<input type="button" name="cancel" id="cancel" value="Cancel">');
    
    
	$(this).off('click',addEvent);
    
	$('#cancel').on('click', canceleventaction);
	$('#add').on('click', addeventaction);
}

function canceleventaction(){
    $('.newevent').remove();
    updateCalendar();
}

function addeventactionother(){
    $($('.newevent').parent()).on('click', addEvent);
    $('.newevent').remove();
}

function addeventaction() {
    
	let title = $('#newtitle').val();
    let content = $('#newcontent').val();
	let category = $("input[name='category']:checked").val();
	let type = $("input[name='type']:checked").val();
    let time = $('#newtime').val();
    let shareusername = $('#shareusername').val();
	let date = $(this).parent().parent().parent().parent().attr('id');

	var xmlhttprequest=new XMLHttpRequest();
	xmlhttprequest.open("POST", "addevent.php", true);
	xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttprequest.addEventListener("load", function(e){
		var jsonData = JSON.parse(e.target.responseText);
		if (!jsonData.success) {
			alert(" You can't add an event" + jsonData.message);
		}else{
			alert("Success!"+ jsonData.message);
		}}, false);
	xmlhttprequest.send("title=" + encodeURIComponent(title) + "&content="+encodeURIComponent(content)+"&category=" + encodeURIComponent(category) + "&date=" + encodeURIComponent(date) +"&type="+ encodeURIComponent(type) + "&shareusername=" + encodeURIComponent(shareusername) +"&time=" +  decodeURIComponent(time) + "&token=" + decodeURIComponent(token));
	canceleventaction();
}

function displayevent(){
	var xmlhttprequest=new XMLHttpRequest();
	xmlhttprequest.open("POST", "displayevent.php", true);
	xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttprequest.addEventListener("load", function(e){
		var jsonData = JSON.parse(e.target.responseText);
		if (jsonData.success) {
			for (var index in jsonData.events) {
                if(jsonData.events[index]!=undefined){
                    var date = $('#' + jsonData.events[index].event_date);
                    let event_id =jsonData.events[index].eventid;
                    let title = jsonData.events[index].title;
                    let category = jsonData.events[index].category;
                    let eventtime = jsonData.events[index].event_time;
                    date.append('<br>');
                    date.append('<button category="' + category + '" class="event" id="' + event_id + 'event">' + title +' Time:' +eventtime+  '</button>');
                }
			}
		}
		$('.event').on('click', showevent);}, false);
	xmlhttprequest.send(null);
}



function showevent(){
    var xmlhttprequest=new XMLHttpRequest();
    let eventid = parseInt($(this).attr('id'));
    xmlhttprequest.open("POST", "showoneevent.php", true);
	xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttprequest.addEventListener("load", function(e){
        var jsonData = JSON.parse(e.target.responseText);
		let title = jsonData.title;
        let content = jsonData.content;
		let category = jsonData.category;
		let time = jsonData.time;
        let type = jsonData.type;
		$('.issue').remove();

		$('#' + eventid + 'event').append('<div class="issue"></div>');

		$('.issue').append("<form class='newevent'></form>");
		$('.newevent').append('<label>Event:</label>');
		$('.newevent').append('<br>');
		$('.newevent').append('<input type="text" name="title" id="title" value="' + title + '">');
		$('.newevent').append('<br>');
        
        $('.newevent').append('<label>Content:</label>');
        $('.newevent').append('<br>');
        $('.newevent').append('<input type="text" name="content" id="content" value="'+content+ '">');
        $('.newevent').append('<br>');
        
		$('.newevent').append('<label>Category: ' + category + '</label>');
		$('.newevent').append('<br>');
        
        
		$('.newevent').append('<input type="radio" name="category" value="work">work');
        $('.newevent').append('<input type="radio" name="category" value="life">life');
		$('.newevent').append('<input type="radio" name="category" value="other">other');
		$('.newevent').append('<br>');
        
        
		$('.newevent').append('<label>Event Time:</label>');
		$('.newevent').append('<br>');
        
		$('.newevent').append('<input type="text" name="time" id="time" value="'+time+ '">');
		$('.newevent').append('<br>');
        
        $('.newevent').append('<label>Type:  ' + type + '</label>');
        $('.newevent').append('<br>');
        
		$('.newevent').append('<input type="button" name="saveevent" id="saveevent" value="Edit">');
		$('.newevent').append('<input type="button" name="delete" id="delete" value="Delete">');
		$('.newevent').append('<input type="button" name="cancel" id="cancel" value="Cancel">');


		$('#'+eventid+'event').off('click',showevent);
        
        $('#saveevent').on('click', editevent);
		$('#cancel').on('click', canceleventaction);
		$('#delete').on('click', deleteevent);
	}, false);
    xmlhttprequest.send("eventid=" + encodeURIComponent(eventid));
}


function deleteevent(){
    var xmlhttprequest = new XMLHttpRequest();
	let event_id = parseInt($(this).parent().parent().parent().attr('id'));
	xmlhttprequest.open("POST", "deleteevent.php", true);
	xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttprequest.addEventListener('load', function(e){
		var jsonData = JSON.parse(e.target.responseText);
		if (!jsonData.success) {
			alert('event delete failed'+jsonData.message);
		} else {
			alert('Now!'+jsonData.message);
		}}, false);
	xmlhttprequest.send("eventid="+encodeURIComponent(event_id)+"&token="+encodeURIComponent(token));
	canceleventaction();
}

function editevent(){
    let title = $('#title').val();
    let content = $('#content').val();
	let category = $("input[name='category']:checked").val();
	let time = $('#time').val();
    
	let eventid = parseInt($(this).parent().parent().parent().attr('id'));

	var xmlhttprequest = new XMLHttpRequest();
	xmlhttprequest.open("POST", "editevent.php", true);
	xmlhttprequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttprequest.addEventListener("load", function(e){
        var jsonData = JSON.parse(e.target.responseText);
        if (!jsonData.success) {
            alert("Changeevent failed"+jsonData.message);
            }
        else{
            alert(jsonData.message);
        }}, false);
	xmlhttprequest.send("title=" + encodeURIComponent(title) + "&content=" + encodeURIComponent(content) + "&category=" + encodeURIComponent(category) + "&time=" + encodeURIComponent(time) + "&id=" + decodeURIComponent(eventid) + "&token=" + token);
	canceleventaction();
}

$('#selectcat').on('click',selectcat);

function selectcat(){
    var button4 = $('.event');
    var str=document.getElementsByName("showcat");
    for(var t=0;t<button4.length;t++){
        if(str[0].checked==true){
            if($(button4[t]).attr('category') == 'work') {
                        $(button4[t]).show();
                }
            }
        if(str[1].checked==true){
            if($(button4[t]).attr('category') == 'life') {
                        $(button4[t]).show();
                }
            }
        if(str[2].checked==true){
            if($(button4[t]).attr('category') == 'other') {
                        $(button4[t]).show();
                }
            }
        if(str[0].checked==false){
            if($(button4[t]).attr('category') == 'work') {
                        $(button4[t]).hide();
                }
            }
        if(str[1].checked==false){
            if($(button4[t]).attr('category') == 'life') {
                        $(button4[t]).hide();
                }
            }
        if(str[2].checked==false){
            if($(button4[t]).attr('category') == 'other') {
                        $(button4[t]).hide();
                }
            }
        }
}









