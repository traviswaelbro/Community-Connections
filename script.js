/**
 * Author: 	Travis Waelbroeck
 * Date: 		November 10, 2015
 */
/*jslint browser: true*/
/*jslint globalstrict: true*/

"use strict";

var numPeople  = 1;
var imgCounter = 1;
var community  = [];

// Construct the first two people of the community
function firstPerson() {
	community.push({
		firstName: 		"Travis",
		lastName: 		"Waelbroeck",
		jobTitle: 		"Web Developer",
		streetNumber: "6386 W",
		streetName: 	"Happy Holler Rd"
	});
	community.push({
		firstName: 		"John",
		lastName: 		"Jacob",
		jobTitle: 		"Jingleheimer",
		streetNumber: "123",
		streetName: 	"Schmidt St."
	});
}

// This function will create a new person as specified from the form overlay
function createPerson() {
	numPeople++;
	community.push({
	 	firstName: 		document.getElementById('firstNameValue').value,
	  lastName: 		document.getElementById('lastNameValue').value,
	  jobTitle: 		document.getElementById('jobTitleValue').value,
	  streetNumber: document.getElementById('streetNumberValue').value,
	  streetName: 	document.getElementById('streetNameValue').value
	});

	addPerson();
	closeOverlay();
}

function addPerson() {
	var newPerson = document.createElement("li");
	if(imgCounter > 20) { imgCounter = 1; }
	newPerson.id = "person" + numPeople;
	newPerson.innerHTML = '<img src="images/faces/' + imgCounter + '.jpg" height="128" width="128" /><h2>' + community[numPeople - 1].firstName + " " + community[numPeople - 1].lastName + '</h2><a href="javascript:void(0);" class="tooltip" title="Say Hi" onclick="sayHi(' + numPeople + ')"><i class="mi">insert_emoticon</i><span>Say Hi</span></a><a href="javascript:void(0);" class="tooltip" title="Introduction" onclick="introduction(' + numPeople + ')"><i class="mi">chat</i><span>Introduction</span></a><a href="javascript:void(0);" class="tooltip" title="Can I Send You a Gift?" onclick="sendGift(' + numPeople + ')"><i class="mi">redeem</i><span>Can I Send You a Gift?</span></a><a href="#" class="tooltip" title="Have a Child" onclick="openChildOverlay(' + numPeople + ')"><i class="mi">face</i><span>Have a Child</span></a><a href="javascript:void(0);" class="tooltip" title="Move Away" onclick="moveAway(this.parentNode)"><i class="mi">delete</i><span>Move Away</span></a>';
	document.getElementById("people").appendChild(newPerson);
	closeFormOverlay();
	imgCounter++;

	/* Clear form */
	document.getElementById('firstNameValue').value    = "";
	document.getElementById('lastNameValue').value     = "";
	document.getElementById('jobTitleValue').value     = "";
	document.getElementById('streetNumberValue').value = "";
	document.getElementById('streetNameValue').value   = "";

	if(typeof(Storage) != undefined) {
		localStorage.removeItem('community');
		localStorage.setItem('community', JSON.stringify(community));
	}
}

function addChild() {
	var newChild = document.createElement("li");
	if(imgCounter > 10) { imgCounter = 1; }
	newChild.id = "person" + numPeople;
	newChild.innerHTML = '<img src="images/faces/children/' + imgCounter + '.jpg" height="128" width="128" /><h2>' + community[numPeople - 1].firstName + " " + community[numPeople - 1].lastName + '</h2><a href="javascript:void(0);" class="tooltip" title="Say Hi" onclick="sayHi(' + numPeople + ')"><i class="mi">insert_emoticon</i><span>Say Hi</span></a><a href="javascript:void(0);" class="tooltip" title="Introduction" onclick="childIntroduction(' + numPeople + ')"><i class="mi">chat</i><span>Introduction</span></a><a href="javascript:void(0);" class="tooltip" title="Can I Send You a Gift?" onclick="sendChildGift(' + numPeople + ')"><i class="mi">redeem</i><span>Can I Send You a Gift?</span></a><a href="javascript:void(0);" class="tooltip" title="Move Away" onclick="moveAway(this.parentNode)"><i class="mi">delete</i><span>Move Away</span></a>';
	document.getElementById("people").appendChild(newChild);
	imgCounter++;

	/* Clear form */
	document.getElementById('childFirstNameValue').value    = "";

	if(typeof(Storage) != undefined) {
		localStorage.removeItem('community');
		localStorage.setItem('community', JSON.stringify(community));
	}
}

// Remove loading icon after page loading is completed
function loadIcon() {
	document.getElementsByTagName("body")[0].className = "loaded";
}

/**
 * [setUpPage : Test if browser supports localStorage and whether
 * or not localStorage is empty. This will construct the default
 * community members unless localStorage exists and it will 
 * construct whoever is in storage.]
 */
function setUpPage() {
	if(typeof(Storage) != undefined && window.localStorage.length >= 1) {
		community = JSON.parse(localStorage.getItem('community'));
		for(var i = 0; i < community.length; i++) {
			if(community[i].parentName) {
				addChild();
			} else {
				addPerson();
			}
			numPeople++;
		}
	} else {
		firstPerson();
		addPerson();
		numPeople++;
		addPerson();
	}
	loadIcon();
}

// Say hi to the person
function sayHi(person) {
	var firstName = community[person - 1].firstName;
	openOverlay();
	document.getElementById("contents").innerHTML = "Hi, nice to meet you! My name is " + firstName + ".";
}

// Ask the person to introduce themselves
function introduction(person) {
	var firstName = community[person - 1].firstName;
	var lastName = community[person - 1].lastName;
	var jobTitle = community[person - 1].jobTitle;
	var streetName = community[person - 1].streetName;
	openOverlay();
	document.getElementById("contents").innerHTML = "Hi, my name is " + firstName + " " + lastName + ". I'm a " + jobTitle + " and I live over on " + streetName + ".";
}

function childIntroduction(person) {
	var firstName = community[person - 1].firstName;
	var lastName = community[person - 1].lastName;
	var parentName = community[person - 1].parentName;
	openOverlay();
	document.getElementById("contents").innerHTML = "Hi, my name is " + firstName + " " + lastName + ". I'm " + parentName + "'s kid.";
}

function sendGift(person) {
	var streetName = community[person - 1].streetName;
	var streetNumber = community[person - 1].streetNumber;
	openOverlay();
	document.getElementById("contents").innerHTML = "That's so kind of you! My address is " + streetNumber + " " + streetName + ".";
}

function sendChildGift(person) {
	var streetName = community[person - 1].streetName;
	var streetNumber = community[person - 1].streetNumber;
	openOverlay();
	document.getElementById("contents").innerHTML = "That's a little creepy, but sure! My address is " + streetNumber + " " + streetName + ".";
}

// Delete person from community
function moveAway(person) {
	parent = document.getElementById("people");
	parent.removeChild(person);
}

// Reset community to original two members
function resetAll() {
	document.getElementById("people").innerHTML = "";
	community = [];
	imgCounter = 1;
	firstPerson();
	numPeople = 1;
	addPerson();
	numPeople++;
	addPerson();

	// Reset localStorage
	localStorage.removeItem('community');
	localStorage.setItem('community', JSON.stringify(community));
}

function deleteAll() {
	document.getElementById("people").innerHTML = "";
	community = [];
	numPeople = 0;
	localStorage.removeItem('community');
}

// Open the message overlay
function openOverlay() {
	document.getElementById("overlay").setAttribute("class", "open");
}

// Close the message overlay
function closeOverlay() {
	document.getElementById("overlay").setAttribute("class", "close");
	document.getElementById("contents").innerHTML = "";
}

// Open the form overlay
function openFormOverlay() {
	document.getElementById("form-overlay").setAttribute("class", "valign-parent open");
}

// Close the form overlay
function closeFormOverlay() {
	document.getElementById("form-overlay").setAttribute("class", "valign-parent close");
}

function openChildOverlay(person) {
	document.getElementById("child-overlay").setAttribute("class", "valign-parent open");
	document.getElementById("parentId").value = person - 1;
}

function closeChildOverlay() {
	document.getElementById("child-overlay").setAttribute("class", "valign-parent close");	
}

function haveChild() {
	var parent = community[document.getElementById("parentId").value];
	community.push({
	 	firstName: 		document.getElementById("childFirstNameValue").value,
	  lastName: 		parent.lastName,
	  parentName: 	parent.firstName,
	  streetNumber: parent.streetNumber,
	  streetName: 	parent.streetName
	});

	addChild();
	numPeople++;
	closeChildOverlay();
}

/**
 * Remove Loading Icon After Page Load is Completed
 * Run Page Setup Afterwards
 * Add a click listener to close the form overlay more easily
 */
if(window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
  document.getElementById("overlay").addEventListener("click", closeOverlay, false);
} else if(window.attachEvent) {
  window.attachEvent("onload", setUpPage);
  document.getElementById("overlay").attachEvent("onclick", closeOverlay);
}