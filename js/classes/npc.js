"use strict";

class NPC extends Sprite {
	constructor(img,x,y) {
		super(img,x,y);
		this.speed = 0.8;
		this.tree;
		this.curretQuery = 0;
		this.direction;
		this.currentSteps = 0;
	}

	popup(text, options) {
		if (document.getElementsByClassName('popup')[0]===undefined) {
			var obj = this;

			var div = document.createElement('div');
			div.className = 'popup';

			// Container for query and responses
			var textContainer = document.createElement('div');
			textContainer.className = "textContainer";
			div.appendChild(textContainer);

			// NPC query
			var querybox = document.createElement('div');
			querybox.className = "querybox";
			var querytext = document.createTextNode("");
			querybox.appendChild(querytext);
			textContainer.appendChild(querybox);

			// Scrolling text
			var i=0;
			var textscroll = setInterval(function () {
				querytext.nodeValue += text.charAt(i);
				i++;
				if (i==text.length) {
					clearInterval(textscroll);
				}
			}, 40); // Text scroll speed

            var answerBox = document.createElement('div');
			answerBox.className = "answerBox";
            textContainer.appendChild(answerBox);


			// Player response options

			for (let i = 0; i < options.length; i++) {
				var dialogueOption = document.createElement('p');
				// Set styling
				dialogueOption.className = "dialogueOption";
				dialogueOption.innerHTML = (options[i][0]);
				answerBox.appendChild(dialogueOption);

				// Check which option was chosen
				dialogueOption.addEventListener('click', function newQuery() {
					obj.curretQuery = options[i][1][0]-1;
					document.body.removeChild(document.getElementsByClassName('popup')[0]);
					obj.dialogue();
				}, false);
				// NOTE: Referencing dialogueOption below causes it and event listener to be retained in memory
			}

			document.body.appendChild(div);
		}
	}


	update(ctx) {
		// ======================
		//  NPC AI CODE GOES HERE
		// ======================

















		// ======================
		//  NPC AI CODE ENDS HERE
		// ======================

		// Dialogue tree
		if (this.tree != undefined) {
			if (this.distance(entities[0].player) < Game.scale*2 && 69 in entities[0].player.keysDown) {
				this.dialogue();
			}
		}
	}

	dialogue() {
		// Only create a popup if the npc is saying something
		if (this.tree.npcText[this.curretQuery] != undefined) {
			var options = [];
			for (var i = 0; i < this.tree.npcText[this.curretQuery][1].length; i++) {
				options.push(this.tree.playerText[this.tree.npcText[this.curretQuery][1][i]-1]);
			}
			this.popup(this.tree.npcText[this.curretQuery][0], options);
		}
	}

}
Game.NPC = NPC;
