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
	var pressedKeys = [];
	var player = document.getElementById('player'),
	style = window.getComputedStyle(player);
	var slashTime = 5000;
	var indexes = {0:"1", 4:"2", 8:"3", 12:"4", 16:"5", 20:"6", 24:"7", 28:"8", 32:"9", 36:"10", 40:"11", 44:"12", 48:"13", 52:"14", 56:"15", 60:"16", 64:"17", 68:"18", 72:"19", 76:"20", 80:"21", 84:"22", 88:"23", 92:"24", 96:"25", 100:"26", 104:"27", 108:"28", 112:"29", 116:"30", 120:"31"};


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
										}, 250);
									}
								}, 250);
							}
						}, 250);
					}
				}, 250);
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
										}, 250);
									}
								}, 250);
							}
						}, 250);
					}
				}, 250);
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
										}, 250);
									}
								}, 250);
							}
						}, 250);
					}
				}, 250);
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
										}, 250);
									}
								}, 250);
							}
						}, 250);
					}
				}, 250);
			}
		}
	}

	setInterval(function() {
		if(pressedKeys[upCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "0px") {
				var newTopNum = parseInt(top) - movementSpeed,
				newTop = newTopNum + "px";
					
				player.style.marginTop = newTop;
				walkAnimation(upCode);
			}
		}
		if(pressedKeys[rightCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "720px") {
				var newSideNum = parseInt(side) + movementSpeed,
				newSide = newSideNum + "px";
					
				player.style.marginLeft = newSide;
				walkAnimation(rightCode);
			}
		}
		if(pressedKeys[leftCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "0px") {
				var newSideNum = parseInt(side) - movementSpeed,
				newSide = newSideNum + "px";
					
				player.style.marginLeft = newSide;
				walkAnimation(leftCode);
			}
		}
		if(pressedKeys[downCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "436px") {
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
		var indexNum = indexes[currentHeight];
		player.style.zIndex = indexNum;
		
	}, 30);

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