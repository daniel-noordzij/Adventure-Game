var upCode = 87,
downCode = 83,
leftCode = 65,
rightCode = 68,
useCode = 70,
slashCode = 32,
menuCode = 73;

function setInput(target) {
	$("#"+target.id).val("");
}

function saveControls() {
	document.getElementById("saved").style.display = "inline-block";
	upCode = document.getElementById("upInput").value.toUpperCase().charCodeAt(0);
	downCode = document.getElementById("downInput").value.toUpperCase().charCodeAt(0);
	leftCode = document.getElementById("leftInput").value.toUpperCase().charCodeAt(0);
	rightCode = document.getElementById("rightInput").value.toUpperCase().charCodeAt(0);
	useCode = document.getElementById("useInput").value.toUpperCase().charCodeAt(0);
	slashCode = document.getElementById("slashInput").value.toUpperCase().charCodeAt(0);
}

function startGame() {
	document.getElementById('gameBorder').style.display = "inline-block";
	document.getElementById('startButton').style.display = "none";
	document.getElementById('controls').style.display = "none";

	var slashing = false;
	var slashTimer = false;
	var using = false;
	var menuOpen = false;
	var movementSpeed = 4;
	var stopAnim = false;
	var ableToMoveUp = true,
		ableToMoveDown = true,
		ableToMoveLeft = true,
		ableToMoveRight = true;
	var pressedKeys = [];
	var player = document.getElementById('player'),
	style = window.getComputedStyle(player);
	var slashTime = 5000;
	var indexes = {0:"1", 4:"2", 8:"3", 12:"4", 16:"5", 20:"6", 24:"7", 28:"8", 32:"9", 36:"10", 40:"11", 44:"12", 48:"13", 52:"14", 56:"15", 60:"16", 64:"17", 68:"18", 72:"19", 76:"20", 80:"21", 84:"22", 88:"23", 92:"24", 96:"25", 100:"26", 104:"27", 108:"28", 112:"29", 116:"30", 120:"31", 124:"32", 128:"33", 132:"34", 136:"35", 140:"36", 144:"37", 148:"38", 152:"39", 156:"40", 160:"41", 164:"42", 168:"43", 172:"44", 176:"45", 180:"46", 184:"47", 188:"48", 192:"49", 196:"50", 200:"51", 204:"52", 208:"53", 212:"54", 216:"55", 220:"56", 224:"57", 228:"58", 232:"59", 236:"60", 240:"61", 244:"62", 248:"63", 252:"64", 256:"65", 260:"66", 264:"67", 268:"68", 272:"69", 276:"70", 280:"71", 284:"72", 288:"73", 292:"74", 296:"75", 300:"76", 304:"77", 308:"78", 312:"79", 316:"80", 320:"81", 324:"82", 328:"83", 332:"84", 336:"85", 340:"86", 344:"87", 348:"88", 352:"89", 356:"90", 360:"91", 364:"92", 368:"93", 372:"94", 376:"95", 380:"96", 384:"97", 388:"98", 392:"99", 396:"100", 400:"101", 404:"102", 408:"103", 412:"104", 416:"105", 420:"106", 424:"107", 428:"108", 432:"109", 436:"110"};
	var hitboxes = document.getElementsByClassName("hitbox");

	$(document.body).keydown(function (evt) {
		if(!pressedKeys.includes(evt.keyCode)){
			pressedKeys.push(evt.keyCode);
		}
		pressedKeys[evt.keyCode] = true;

		if(pressedKeys[menuCode] === true) {
			if(menuOpen === false) {
				menuOpen = true;
				document.getElementById("inventoryMenu").style.left = "0";
			} else {
				menuOpen = false;
				document.getElementById("inventoryMenu").style.left = "-131px";
			}
		}

		if(pressedKeys[useCode] === true) {
			if(using === false && menuOpen === false) {
				using = true;
				console.log("use");
			}
		}
	});

	function walkAnimation(direction) {
		if (direction === upCode && pressedKeys[upCode] === true && stopAnim === false) {
			stopAnim = true;
			player.src = "images/player/p_up_static.png";
			if (pressedKeys[upCode] === true) {
				player.src = "images/player/p_up_walk1.png";
				setTimeout(function() {
					if (pressedKeys[upCode] === true) {
						player.src = "images/player/p_up_walk2.png";
						setTimeout(function() {
							if (pressedKeys[upCode] === true) {
								player.src = "images/player/p_up_walk3.png";
								setTimeout(function() {
									if (pressedKeys[upCode] === true) {
										player.src = "images/player/p_up_walk4.png";
										setTimeout(function(){
											stopAnim = false;
										}, 200);
									}
								}, 200);
							}
						}, 200);
					}
				}, 200);
			}
		} else if (direction === downCode && pressedKeys[downCode] === true && stopAnim === false) {
			stopAnim = true;
			player.src = "images/player/p_down_static.png";
			if (pressedKeys[downCode] === true) {
				player.src = "images/player/p_down_walk1.png";
				setTimeout(function() {
					if (pressedKeys[downCode] === true) {
						player.src = "images/player/p_down_walk2.png";
						setTimeout(function() {
							if (pressedKeys[downCode] === true) {
								player.src = "images/player/p_down_walk3.png";
								setTimeout(function() {
									if (pressedKeys[downCode] === true) {
										player.src = "images/player/p_down_walk4.png";
										setTimeout(function(){
											stopAnim = false;
										}, 200);
									}
								}, 200);
							}
						}, 200);
					}
				}, 200);
			}
		} else if (direction === leftCode && pressedKeys[leftCode] === true && stopAnim === false) {
			stopAnim = true;
			player.src = "images/player/p_left_static.png";
			if (pressedKeys[leftCode] === true) {
				player.src = "images/player/p_left_walk1.png";
				setTimeout(function() {
					if (pressedKeys[leftCode] === true) {
						player.src = "images/player/p_left_walk2.png";
						setTimeout(function() {
							if (pressedKeys[leftCode] === true) {
								player.src = "images/player/p_left_walk1.png";
								setTimeout(function() {
									if (pressedKeys[leftCode] === true) {
										player.src = "images/player/p_left_walk3.png";
										setTimeout(function(){
											stopAnim = false;
										}, 200);
									}
								}, 200);
							}
						}, 200);
					}
				}, 200);
			}
		} else if (direction === rightCode && pressedKeys[rightCode] === true && stopAnim === false) {
			stopAnim = true;
			player.src = "images/player/p_right_static.png";
			if (pressedKeys[rightCode] === true) {
				player.src = "images/player/p_right_walk1.png";
				setTimeout(function() {
					if (pressedKeys[rightCode] === true) {
						player.src = "images/player/p_right_walk2.png";
						setTimeout(function() {
							if (pressedKeys[rightCode] === true) {
								player.src = "images/player/p_right_walk1.png";
								setTimeout(function() {
									if (pressedKeys[rightCode] === true) {
										player.src = "images/player/p_right_walk3.png";
										setTimeout(function(){
											stopAnim = false;
										}, 200);
									}
								}, 200);
							}
						}, 200);
					}
				}, 200);
			}
		}
	}

	setInterval(function() {
		if(pressedKeys[upCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "0px" && ableToMoveUp === true) {
				var newTopNum = parseInt(top) - movementSpeed,
				newTop = newTopNum + "px";
					
				player.style.marginTop = newTop;
				walkAnimation(upCode);
			}
		}
		if(pressedKeys[rightCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "720px" && ableToMoveRight === true) {
				var newSideNum = parseInt(side) + movementSpeed,
				newSide = newSideNum + "px";
					
				player.style.marginLeft = newSide;
				walkAnimation(rightCode);
			}
		}
		if(pressedKeys[leftCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "0px" && ableToMoveLeft === true) {
				var newSideNum = parseInt(side) - movementSpeed,
				newSide = newSideNum + "px";
					
				player.style.marginLeft = newSide;
				walkAnimation(leftCode);
			}
		}
		if(pressedKeys[downCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "436px" && ableToMoveDown === true) {
				var newTopNum = parseInt(top) + movementSpeed,
				newTop = newTopNum + "px";
					
				player.style.marginTop = newTop;
				walkAnimation(downCode);
			}
		}
		if(pressedKeys[slashCode] === true) {
			if(slashing === false && menuOpen === false) {
					slashing = true;
					/*player.src = "images/playerSlash.png";*/
					setTimeout(function(){
						/*player.src = "images/player.png";*/
					}, 150);
			}
		}
		// change between z-indexes to create depth illusion

		var currentHeight = player.style.marginTop;
		var indexNum = indexes[parseInt(currentHeight)];
		player.style.zIndex = indexNum;

		// Stop moving when hitting a hitbox
		
		var playerHitbox = player.getBoundingClientRect();
		var hitboxAmount = hitboxes.length;

		for (var i = 0; i < hitboxAmount; i++) {
			var hitbox_coords = hitboxes[i].getBoundingClientRect();
			var hitbox_coords_left = parseInt(hitbox_coords.left) - 36;
			var hitbox_coords_right = parseInt(hitbox_coords.right) + 36;
			var hitbox_coords_top = parseInt(hitbox_coords.top);
			var hitbox_coords_bottom = parseInt(hitbox_coords.bottom);
			var hitbox_coords_left_min = parseInt(hitbox_coords.left) - 4;
			var hitbox_coords_left_max = parseInt(hitbox_coords.left) - 8;
			var hitbox_coords_right_min = parseInt(hitbox_coords.right);
			var hitbox_coords_right_max = parseInt(hitbox_coords.right) + 4;
			var hitbox_coords_top_min = parseInt(hitbox_coords.top);
			var hitbox_coords_top_max = parseInt(hitbox_coords.top) - 4;
			var hitbox_coords_bottom_min = parseInt(hitbox_coords.bottom);
			var hitbox_coords_bottom_max = parseInt(hitbox_coords.bottom) + 4;
			if (playerHitbox.top >= hitbox_coords_bottom_min && playerHitbox.top <= hitbox_coords_bottom_max && playerHitbox.left >= hitbox_coords_left && playerHitbox.right <= hitbox_coords_right) {
				ableToMoveUp = false;
			} else {
				ableToMoveUp = true;
			}
			if (playerHitbox.bottom <= hitbox_coords_top_min && playerHitbox.bottom >= hitbox_coords_top_max && playerHitbox.left >= hitbox_coords_left && playerHitbox.right <= hitbox_coords_right) {
				ableToMoveDown = false;
			} else {
				ableToMoveDown = true;
			}
			if (playerHitbox.bottom >= hitbox_coords_top && playerHitbox.top <= hitbox_coords_bottom && playerHitbox.left >= hitbox_coords_right_min && playerHitbox.left <= hitbox_coords_right_max) {
				ableToMoveLeft = false;
			} else {
				ableToMoveLeft = true;
			}
			if (playerHitbox.bottom >= hitbox_coords_top && playerHitbox.top <= hitbox_coords_bottom && playerHitbox.right >= hitbox_coords_left_min && playerHitbox.right <= hitbox_coords_right_max) {
				ableToMoveRight = false;
			} else {
				ableToMoveRight = true;
			}	
		}

		
	}, 30);

	/*var treeHitbox = hitboxes.getBoundingClientRect();
	console.log(treeHitbox);*/

	$(document.body).keyup(function (evt) {
		pressedKeys[evt.keyCode] = false;

		if(evt.keyCode === slashCode && slashTimer === false) {
			slashTimer = true;
			setTimeout(function(){
				slashing = false;
				slashTimer = false;
			}, slashTime);
		}
		if (evt.keyCode === useCode) {
			using = false;
		}
		if (evt.keyCode === upCode) {
			stopAnim = false;
			player.src = "images/player/p_up_static.png";
		} else if (evt.keyCode === downCode) {
			stopAnim = false;
			player.src = "images/player/p_down_static.png";
		} else if (evt.keyCode === leftCode) {
			stopAnim = false;
			player.src = "images/player/p_left_static.png";
		} else if (evt.keyCode === rightCode) {
			stopAnim = false;
			player.src = "images/player/p_right_static.png";
		}
	});
}