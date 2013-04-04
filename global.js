// JavaScript Document
var questions = "";
var glossary = "";
var key = "";
var previousquestions = "";
var questionsarray = [];

$(document).ready(
	function(){
		getHash();
		goToPage(hash);
	}
)

function getHash() {
	hash = window.location.hash;
	hash = hash.substring(2);
}

function goToPage(pageName){
	$.get('ajax/'+pageName.split("/",1)+'.html', function (data) {
		$("#container").html(data);		
	});
};

function q(qnum){
	jQuery.getJSON('questions.json', function (data) {
		$.each(data, function(){
       		if(qnum==this.questionID){
          		matchedQuestion = this;  // If time matches, set a variable to this object
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
};

function addhistory(qfrom,answer){
	$('#previousQ').append("<div id=\""+qfrom+"\">"+answer+"<a href=\"javascript:returnq("+qfrom+");\">Return to Question</a></div>");
	questionsarray.push(qfrom);
}

function k(knum){
	previousquestions = $('#previousQ').html()
	$.get('ajax/tree.html', function (data) {
		$("#container").html(data);
		loadk(knum);	
	});
};

function loadk(knum){
	$('#previousQ').html(previousquestions)
	jQuery.getJSON('key.json', function (data) {
		$.each(data, function(){
			if(knum==this.keyID){
				matchedPlant = this;  // If time matches, set a variable to this object
				return false; // break the loop
			}
		});
		$('#plantName').html(matchedPlant.commonName+" - "+matchedPlant.structure.genus+" "+matchedPlant.structure.species);
		$('#fullstructure').html(matchedPlant.structure.group+" > "+matchedPlant.structure.family+" > "+matchedPlant.structure.genus+" > <span class=\"italics\">"+matchedPlant.structure.genus.substr(0,1)+".&nbsp;"+matchedPlant.structure.species)+"</span>";
		$('#description').html(matchedPlant.description);
		$('#picture').html("<img src=\"plantimages/"+matchedPlant.photos.photo1+"\"/>");
		window.location.hash = "/tree/"+matchedPlant.keyID+"/"+matchedPlant.structure.genus+"-"+matchedPlant.structure.species;
	})		
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

function returnq(qnum){
	getHash();
	hashsplit = hash.split("/")
	previousquestions = $('#previousQ').html()
	if(hashsplit[0]==="tree"){
		$.get('ajax/key.html', function (data) {
			$("#container").html(data);
			$('#previousQ').html(previousquestions)	
		});
	}
	var i = 0;
	while(i<questionsarray.length){
		if(questionsarray[i]>=qnum){
			$('#'+questionsarray[i]).remove();
		}
		i++;
	}
	q(qnum);
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

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(window).bind('hashchange', function() {
	var hashsplit = hash.split("/");
	var currentsplit = window.location.hash.split("/");
	if(hashsplit[0]!==currentsplit[1]){
		getHash();
		goToPage(currentsplit[1]);
	}
});