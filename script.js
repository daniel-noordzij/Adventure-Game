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
	var playerHitbox = player.getBoundingClientRect();
	var hitboxCoords = {left:[], right:[], top:[], bottom:[], left_min:[], left_max:[], right_min:[], right_max:[], top_min:[], top_max:[], bottom_min:[], bottom_max:[]};
	var hblengthDiv = hitboxes.length / 3;
	var HBAmount = 0,
		HBAmount2 = Math.floor(hblengthDiv),
		HBAmount3 = Math.floor(hitboxes.length - hblengthDiv);
	var currentHitbox;

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
			if (pressedKeys[upCode] === true && stopAnim === true) {
				player.src = "images/player/p_up_walk1.png";
				setTimeout(function() {
					if (pressedKeys[upCode] === true && stopAnim === true) {
						player.src = "images/player/p_up_walk2.png";
						setTimeout(function() {
							if (pressedKeys[upCode] === true && stopAnim === true) {
								player.src = "images/player/p_up_walk3.png";
								setTimeout(function() {
									if (pressedKeys[upCode] === true && stopAnim === true) {
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
			if (pressedKeys[downCode] === true && stopAnim === true) {
				player.src = "images/player/p_down_walk1.png";
				setTimeout(function() {
					if (pressedKeys[downCode] === true && stopAnim === true) {
						player.src = "images/player/p_down_walk2.png";
						setTimeout(function() {
							if (pressedKeys[downCode] === true && stopAnim === true) {
								player.src = "images/player/p_down_walk3.png";
								setTimeout(function() {
									if (pressedKeys[downCode] === true && stopAnim === true) {
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
			if (pressedKeys[leftCode] === true && stopAnim === true) {
				player.src = "images/player/p_left_walk1.png";
				setTimeout(function() {
					if (pressedKeys[leftCode] === true && stopAnim === true) {
						player.src = "images/player/p_left_walk2.png";
						setTimeout(function() {
							if (pressedKeys[leftCode] === true && stopAnim === true) {
								player.src = "images/player/p_left_walk1.png";
								setTimeout(function() {
									if (pressedKeys[leftCode] === true && stopAnim === true) {
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
			if (pressedKeys[rightCode] === true && stopAnim === true) {
				player.src = "images/player/p_right_walk1.png";
				setTimeout(function() {
					if (pressedKeys[rightCode] === true && stopAnim === true) {
						player.src = "images/player/p_right_walk2.png";
						setTimeout(function() {
							if (pressedKeys[rightCode] === true && stopAnim === true) {
								player.src = "images/player/p_right_walk1.png";
								setTimeout(function() {
									if (pressedKeys[rightCode] === true && stopAnim === true) {
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

	for (var i = hitboxes.length - 1; i >= 0; i--) {
		hitbox_coords = hitboxes[i].getBoundingClientRect();
		hitboxCoords.left.push(parseInt(hitbox_coords.left) - 36);
		hitboxCoords.right.push(parseInt(hitbox_coords.right) + 36);
		hitboxCoords.top.push(parseInt(hitbox_coords.top));
		hitboxCoords.bottom.push(parseInt(hitbox_coords.bottom));
		hitboxCoords.left_min.push(parseInt(hitbox_coords.left) - 4);
		hitboxCoords.left_max.push(parseInt(hitbox_coords.left) - 8);
		hitboxCoords.right_min.push(parseInt(hitbox_coords.right));
		hitboxCoords.right_max.push(parseInt(hitbox_coords.right) + 4);
		hitboxCoords.top_min.push(parseInt(hitbox_coords.top));
		hitboxCoords.top_max.push(parseInt(hitbox_coords.top) - 4);
		hitboxCoords.bottom_min.push(parseInt(hitbox_coords.bottom));
		hitboxCoords.bottom_max.push(parseInt(hitbox_coords.bottom) + 4);

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
		var currentHeight = player.style.marginTop,
			indexNum = indexes[parseInt(currentHeight)];
			player.style.zIndex = indexNum;
	}, 30);

	setInterval(function(){
		if (HBAmount >= hitboxes.length) {
			HBAmount = 0;
		}
		playerHitbox = player.getBoundingClientRect();
		// Stop moving when hitting a hitbox

		if (playerHitbox.top >= hitboxCoords.bottom_min[HBAmount] && playerHitbox.top <= hitboxCoords.bottom_max[HBAmount] && playerHitbox.left >= hitboxCoords.left[HBAmount] && playerHitbox.right <= hitboxCoords.right[HBAmount]) {
			ableToMoveUp = false;
			currentHitbox = HBAmount;
			if(pressedKeys[upCode] === true && menuOpen === false && pressedKeys[downCode] === false && pressedKeys[rightCode] === false && pressedKeys[leftCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_up_static.png";
			}
		} else if (currentHitbox !== HBAmount) {
		} else {
			ableToMoveUp = true;
		}

		if (playerHitbox.bottom <= hitboxCoords.top_min[HBAmount] && playerHitbox.bottom >= hitboxCoords.top_max[HBAmount] && playerHitbox.left >= hitboxCoords.left[HBAmount] && playerHitbox.right <= hitboxCoords.right[HBAmount]) {
			ableToMoveDown = false;
			currentHitbox = HBAmount;
			if(pressedKeys[downCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[rightCode] === false && pressedKeys[leftCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_down_static.png";
			}
		} else if (currentHitbox !== HBAmount) {
		} else {
			ableToMoveDown = true;
		}

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount] && playerHitbox.top <= hitboxCoords.bottom[HBAmount] && playerHitbox.left >= hitboxCoords.right_min[HBAmount] && playerHitbox.left <= hitboxCoords.right_max[HBAmount]) {
			ableToMoveLeft = false;
			currentHitbox = HBAmount;
			if(pressedKeys[leftCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[rightCode] === false && pressedKeys[downCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_left_static.png";
			}
		} else if (currentHitbox !== HBAmount) {
		} else {
			ableToMoveLeft = true;
		}

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount] && playerHitbox.top <= hitboxCoords.bottom[HBAmount] && playerHitbox.right >= hitboxCoords.left_min[HBAmount] && playerHitbox.right <= hitboxCoords.right_max[HBAmount]) {
			ableToMoveRight = false;
			currentHitbox = HBAmount;
			if(pressedKeys[rightCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[leftCode] === false && pressedKeys[downCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_right_static.png";
			}
		} else if (currentHitbox !== HBAmount) {
		} else {
			ableToMoveRight = true;
		}

		HBAmount++;
	}, 1);
	setInterval(function(){
		if (HBAmount2 >= hitboxes.length) {
			HBAmount2 = Math.floor(hblengthDiv);
		}
		playerHitbox = player.getBoundingClientRect();
		// Stop moving when hitting a hitbox

		if (playerHitbox.top >= hitboxCoords.bottom_min[HBAmount2] && playerHitbox.top <= hitboxCoords.bottom_max[HBAmount2] && playerHitbox.left >= hitboxCoords.left[HBAmount2] && playerHitbox.right <= hitboxCoords.right[HBAmount2]) {
			ableToMoveUp = false;
			currentHitbox = HBAmount2;
			if(pressedKeys[upCode] === true && menuOpen === false && pressedKeys[downCode] === false && pressedKeys[rightCode] === false && pressedKeys[leftCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_up_static.png";
			}
		} else if (currentHitbox !== HBAmount2) {
		} else {
			ableToMoveUp = true;
		}

		if (playerHitbox.bottom <= hitboxCoords.top_min[HBAmount2] && playerHitbox.bottom >= hitboxCoords.top_max[HBAmount2] && playerHitbox.left >= hitboxCoords.left[HBAmount2] && playerHitbox.right <= hitboxCoords.right[HBAmount2]) {
			ableToMoveDown = false;
			currentHitbox = HBAmount2;
			if(pressedKeys[downCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[rightCode] === false && pressedKeys[leftCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_down_static.png";
			}
		} else if (currentHitbox !== HBAmount2) {
		} else {
			ableToMoveDown = true;
		}

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount2] && playerHitbox.top <= hitboxCoords.bottom[HBAmount2] && playerHitbox.left >= hitboxCoords.right_min[HBAmount2] && playerHitbox.left <= hitboxCoords.right_max[HBAmount2]) {
			ableToMoveLeft = false;
			currentHitbox = HBAmount2;
			if(pressedKeys[leftCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[rightCode] === false && pressedKeys[downCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_left_static.png";
			}
		} else if (currentHitbox !== HBAmount2) {
		} else {
			ableToMoveLeft = true;
		}

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount2] && playerHitbox.top <= hitboxCoords.bottom[HBAmount2] && playerHitbox.right >= hitboxCoords.left_min[HBAmount2] && playerHitbox.right <= hitboxCoords.right_max[HBAmount2]) {
			ableToMoveRight = false;
			currentHitbox = HBAmount2;
			if(pressedKeys[rightCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[leftCode] === false && pressedKeys[downCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_right_static.png";
			}
		} else if (currentHitbox !== HBAmount2) {
		} else {
			ableToMoveRight = true;
		}

		HBAmount2++;
	}, 1);
	setInterval(function(){
		if (HBAmount3 >= hitboxes.length) {
			HBAmount3 = Math.floor(hitboxes.length - hblengthDiv);
		}
		playerHitbox = player.getBoundingClientRect();
		// Stop moving when hitting a hitbox

		if (playerHitbox.top >= hitboxCoords.bottom_min[HBAmount3] && playerHitbox.top <= hitboxCoords.bottom_max[HBAmount3] && playerHitbox.left >= hitboxCoords.left[HBAmount3] && playerHitbox.right <= hitboxCoords.right[HBAmount3]) {
			ableToMoveUp = false;
			currentHitbox = HBAmount3;
			if(pressedKeys[upCode] === true && menuOpen === false && pressedKeys[downCode] === false && pressedKeys[rightCode] === false && pressedKeys[leftCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_up_static.png";
			}
		} else if (currentHitbox !== HBAmount3) {
		} else {
			ableToMoveUp = true;
		}

		if (playerHitbox.bottom <= hitboxCoords.top_min[HBAmount3] && playerHitbox.bottom >= hitboxCoords.top_max[HBAmount3] && playerHitbox.left >= hitboxCoords.left[HBAmount3] && playerHitbox.right <= hitboxCoords.right[HBAmount3]) {
			ableToMoveDown = false;
			currentHitbox = HBAmount3;
			if(pressedKeys[downCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[rightCode] === false && pressedKeys[leftCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_down_static.png";
			}
		} else if (currentHitbox !== HBAmount3) {
		} else {
			ableToMoveDown = true;
		}

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount3] && playerHitbox.top <= hitboxCoords.bottom[HBAmount3] && playerHitbox.left >= hitboxCoords.right_min[HBAmount3] && playerHitbox.left <= hitboxCoords.right_max[HBAmount3]) {
			ableToMoveLeft = false;
			currentHitbox = HBAmount3;
			if(pressedKeys[leftCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[rightCode] === false && pressedKeys[downCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_left_static.png";
			}
		} else if (currentHitbox !== HBAmount3) {
		} else {
			ableToMoveLeft = true;
		}

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount3] && playerHitbox.top <= hitboxCoords.bottom[HBAmount3] && playerHitbox.right >= hitboxCoords.left_min[HBAmount3] && playerHitbox.right <= hitboxCoords.right_max[HBAmount3]) {
			ableToMoveRight = false;
			currentHitbox = HBAmount3;
			if(pressedKeys[rightCode] === true && menuOpen === false && pressedKeys[upCode] === false && pressedKeys[leftCode] === false && pressedKeys[downCode] === false) {
				stopAnim = false;
				player.src = "images/player/p_right_static.png";
			}
		} else if (currentHitbox !== HBAmount3) {
		} else {
			ableToMoveRight = true;
		}

		HBAmount3++;
	}, 1);

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