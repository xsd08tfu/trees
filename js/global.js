// JavaScript Document
var questions = "";
var glossary = "";
var key = "";
var previousquestions = "";
var questionsarray = [];
var randomOn = 0;
var ranKey = 0;

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
		$('#fullstructure').html(matchedPlant.structure.group+"&nbsp;> "+matchedPlant.structure.family+"&nbsp;> "+matchedPlant.structure.genus+"&nbsp;> <span class=\"italics\">"+matchedPlant.structure.genus.substr(0,1)+".&nbsp;"+matchedPlant.structure.species+"</span>");
		$('#description').html(matchedPlant.description);
		$('#picture').html("<img src=\"plantimages/"+matchedPlant.photos.photo1+"\"/>");
		plantqtoggle();
		if (randomOn==1){
			if(ranKey==knum){
				$('#huntresult').html('<div class="success"><h2 class="serif">Well done!</h2>Arrrgh! You found it!<br>Perhaps try another one? or Tweet your happiness? <a href="http://www.twitter.com/?status=I+just+found+'+matchedPlant.commonName+' - '+matchedPlant.structure.genus+'. '+matchedPlant.structure.species+'.+Have+a+go+yourself!+http://goo.gl/vOhjG"><img src="tweet.png" alt="Tweet!" target="blank"></a></div>');
				randomOn = 0;
				randomend();
				$('#survey').html('<div class="infobox"><h2 class="serif">Please Help!</h2>Can you fill in this very short feedback questionnaire? Thank you!<br /><a href="javascript:goToPage(\'survey\');" class="button">Feedback Questionnaire</a></div>')
			} else {
				$('#huntresult').html('<div class="failure"><h2 class="serif">Bad luck!</h2>Perhaps use the Previous Questions section to go back?</div>');
				$('#survey').html('');
			}
		}
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

function plantshow() {
	$('#questioncontainer').slideDown();
	$('#treecontainer').slideUp();
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

function randomtree(){
	$('#random').slideToggle('slow');
}

function randomend(){
	$('#randomstart').hide();
}

function randomstart(){
	ranKey = Math.ceil(Math.random()*47);
	jQuery.getJSON('key.json', function (data) {
		$.each(data, function(){
			if(ranKey==this.keyID){
				matchedPlant = this;  // If time matches, set a variable to this object
				return false; // break the loop
			}
		});
		$('#random').html("<img src=\"plantimages/"+matchedPlant.photos.photo1+"\"/>");
	})		
	$('#randomstart').slideDown('slow');
	randomOn=1;
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
		$('#menuitems').append('<a href="javascript:goToPage(\'survey\');" class="button">Feedback Questionnaire</a>');
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