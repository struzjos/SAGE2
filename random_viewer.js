//
// SAGE2 application: random_viewer
// by: Josef Struz <struzjosa@fit.cvut.cz>
//
// Copyright (c) 2017
//

"use strict";

/* global  */

var random_viewer = SAGE2_App.extend({
	init: function(data) {
		// Create div into the DOM
		this.SAGE2Init("div", data);
		// Set the DOM id
		this.element.id = "div_" + data.id;
		// Set the background to black
		this.element.style.backgroundColor = 'grey';

		this.imgHeightCount = 5;

		this.imgCount = Math.floor(this.element.clientWidth / this.element.clientHeight * this.imgHeightCount * this.imgHeightCount)

        this.pictures = [];

        this.count = 0;

        this.modulo = 1033;

        this.step = 101;
		
		// move and resize callbacks
		this.resizeEvents = "continuous"; // onfinish
		// this.moveEvents   = "continuous";

		// SAGE2 Application Settings
		//
		// Control the frame rate for an animation application
		this.maxFPS = 2.0;
		// Not adding controls but making the default buttons available
		this.controls.finishedAddingControls();
		this.enableControls = true;

	},

	showImg: function(src){

	
		var height = Math.floor(this.element.clientHeight / this.imgHeightCount);

		

		this.img = document.createElement("img");
		this.img.src = src;
	
    	this.img.height = height;
    	this.pictures.push(this.img);
		this.element.appendChild(this.img);

	},


	writeText: function(text){
		this.text = document.createElement("p");
		var node = document.createTextNode(text);
		this.text.appendChild(node);
		this.element.appendChild(this.text);
	},

	WriteToFile: function(){ 
		var fh = fopen(".\\MyFile.txt", 3); 

		this.writeText("hi");

		if(fh!=-1) 
		{
		    var str = "Some text goes here...";
		    fwrite(fh, str); 
		    fclose(fh); 
		    this.writeText("not fail");
		} else{
			this.writeText("fail");
		}
	},
	
		
	load: function(date) {
		this.refresh(date);
	},

	draw: function(date) {
		//this.WriteToFile();
		for(var i in this.pictures){
            this.element.removeChild(this.pictures[i]);
        }
        this.pictures = [];



		for (var i = 0; i < this.imgCount; i++) {

			var tmp = ((this.count + date.getMinutes() + 60 * date.getHours() ) * this.step) % this.modulo;

			this.showImg('https://picsum.photos/1600/1200/?image=' + tmp.toString());
			this.count++;
		}

	},

	resize: function(date) {
		// Called when window is resized
		/*
		for(var i in this.pictures){
            this.element.removeChild(this.pictures[i]);
        }
        this.pictures = [];

		for (var i = 0; i < this.imgCount; i++) {
			this.showImg('https://source.unsplash.com/random/' + this.count.toString());
			this.count++;
		}
		*/
		this.refresh(date);
	},

	move: function(date) {
		// Called when window is moved (set moveEvents to continuous)
		this.refresh(date);
	},

	quit: function() {
		// Make sure to delete stuff (timers, ...)
	},

	event: function(eventType, position, user_id, data, date) {
		if (eventType === "pointerPress" && (data.button === "left")) {
			// click
		} else if (eventType === "pointerMove" && this.dragging) {
			// move
		} else if (eventType === "pointerRelease" && (data.button === "left")) {
			// click release
		} else if (eventType === "pointerScroll") {
			// Scroll events for zoom
		} else if (eventType === "widgetEvent") {
			// widget events
		} else if (eventType === "keyboard") {
			if (data.character === "m") {
				this.refresh(date);
			}
		} else if (eventType === "specialKey") {
			if (data.code === 37 && data.state === "down") {
				// left
				this.refresh(date);
			} else if (data.code === 38 && data.state === "down") {
				// up
				this.refresh(date);
			} else if (data.code === 39 && data.state === "down") {
				// right
				this.refresh(date);
			} else if (data.code === 40 && data.state === "down") {
				// down
				this.refresh(date);
			}
		}
	}
});
