// JavaScript Document
var questions = "";
var glossary = "";
var key = "";
var previousquestions = "";
var questionsarray = [];

function goToPage(pageName){
	$.get('ajax/'+pageName+'.html', function (data) {
		$("#container").html(data);	
	});
};

function q(qnum){
	jQuery.getJSON('questions.json', function (data) {
		$.each(data, function(){
       		if(qnum==this.questionID){
          		matchedQuestion = this;  // If matches, set a variable to this object
          		return false; // break the loop
       		}
		});
		$('#questionfamily').html(matchedQuestion.family);
		$('#answerA').html("<a class=\"button\" href=\"javascript:addhistory("+matchedQuestion.questionID+",'"+matchedQuestion.answer.a+"'); "+matchedQuestion.actions.a+";\">"+matchedQuestion.answer.a+"</a>");
		$('#answerB').html("<a class=\"button\" href=\"javascript:addhistory("+matchedQuestion.questionID+",'"+matchedQuestion.answer.b+"'); "+matchedQuestion.actions.b+";\">"+matchedQuestion.answer.b+"</a>");
		$('#glossaryitems').html("");
		glossaryup();
		var glossary = matchedQuestion.glossary;
		var i = 0;
		while(i<glossary.length){
			g(glossary[i]);
			i++;
		};
	})
	previousup();
};
var order = 0
function addhistory(qfrom,answer){
	order++;
	$('#previousitems').append("<div id=\""+order+"\" class=\"previous\"><a href=\"javascript:returnq("+qfrom+","+order+");\">"+answer+"</a></div>");
	questionsarray.push(qfrom);
}

function k(knum){
	jQuery.getJSON('key.json', function (data) {
		$.each(data, function(){
			if(knum==this.keyID){
				matchedPlant = this;  // If time matches, set a variable to this object
				return false; // break the loop
			}
		});
		$('#plantName').html(matchedPlant.commonName+" - <span class=\"italics\">"+matchedPlant.structure.genus+"&nbsp;"+matchedPlant.structure.species)+"</span>";
		$('#fullstructure').html(matchedPlant.structure.group+"&nbsp;> "+matchedPlant.structure.family+"&nbsp;> "+matchedPlant.structure.genus+"&nbsp;> <span class=\"italics\">"+matchedPlant.structure.genus.substr(0,1)+".&nbsp;"+matchedPlant.structure.species)+"</span>";
		$('#description').html(matchedPlant.description);
		$('#picture').html("<img src=\"plantimages/"+matchedPlant.photos.photo1+"\"/>");
		plantqtoggle();
	})		
	previousup();
}

function g(gnum) {
	jQuery.getJSON('glossary.json', function (data) {
		$.each(data, function(){
       		if(gnum==this.glossaryID){
          		matchedGlossary = this;  // If time matches, set a variable to this object
          		return false; // break the loop
       		}
		});
		$('#glossaryitems').append("<div class=\"glossaryentry\"><span class=\"bold\">"+capitaliseFirstLetter(matchedGlossary.word)+"</span>: "+matchedGlossary.definition+"</div>");
	})
}

function removehistory(num){
	$('.previous').each(function(){
		if($(this).attr('id')>=num){
			$(this).html('');
		}
	});
};

function returnq(qnum,num){
	q(qnum);
	removehistory(num);
	plantshow();
	previousup();
}

function plantqtoggle() {
	$('#questioncontainer').slideToggle();
	$('#treecontainer').slideToggle();
}

function plantqtoggle() {
	$('#questioncontainer').slideUp();
	$('#treecontainer').slideDown();
}

function menu(){
	$('#menuitems').slideToggle('slow');
}

function menuup(){
	$('#menuitems').slideUp('slow');
}

function menudn(){
	$('#menuitems').slideDown('slow');
}

function glossarytoggle(){
	$('#glossaryitems').slideToggle('slow');
}

function glossaryup(){
	$('#glossaryitems').slideUp('slow');
}

function previoustoggle(){
	$('#previoustitle').slideToggle('slow');
	$('#previousitems').slideToggle('slow');
}

function previousup(){
	$('#previoustitle').slideUp('slow');
	$('#previousitems').slideUp('slow');
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setWidth() {
	var w = $(window).width();
	if(w>766){
		goToPage('introduction');
		menudn();
	}
}

function widescreen() {
	var w = $(window).width();
	if(w>766){
		menudn();
	} else {
		menuup();
	}
}