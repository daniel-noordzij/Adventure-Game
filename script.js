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

function controls() {
	document.getElementById('controls').style.display = "inline-block";
	document.getElementById('startButton').style.display = "none";
	document.getElementById('contButton').style.display = "none";
	document.getElementById('backButton').style.display = "inline-block";
	document.getElementById('controlsButton').style.display = "none";
}

function backToMenu() {
	document.getElementById('controls').style.display = "none";
	document.getElementById('startButton').style.display = "inline-block";
	document.getElementById('contButton').style.display = "inline-block";
	document.getElementById('backButton').style.display = "none";
	document.getElementById('controlsButton').style.display = "inline-block";
}

function contGame() {
	document.getElementById('loadfile').style.display = "inline-block";
	document.getElementById('startButton').style.display = "none";
	document.getElementById('contButton').style.display = "none";
	document.getElementById('backButton').style.display = "inline-block";
	document.getElementById('controlsButton').style.display = "none";
}

function startRead() {
	var file = document.getElementById('save-file').files[0];
	if(file){
		getAsText(file);
	}
}
/*
$get('http://localhost/foo.txt', function(data) {
    alert(data);
});
*/

function getAsText(readFile) {

  var reader = new FileReader();

  reader.readAsText(readFile, "UTF-16");
  reader.onerror = errorHandler;
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    alert("Something went wrong, please try again!");
  }
}

function newGame() {
	document.getElementById('gameBorder').style.display = "inline-block";
	document.getElementById('menuBar').style.display = "inline-block";
	document.getElementById('startButton').style.display = "none";
	document.getElementById('contButton').style.display = "none";
	document.getElementById('controlsButton').style.display = "none";
	

	var slashing = false,
		slashTimer = false,
		using = false,
		menuOpen = false,
		stopAnim = false,
		movementSpeed = 4;
		ableToMoveUp = true,
		ableToMoveDown = true,
		ableToMoveLeft = true,
		ableToMoveRight = true,
		pressedKeys = [],
		player = document.getElementById('player'),
		style = window.getComputedStyle(player),
		slashTime = 5000,
		indexes = {0:"1", 4:"2", 8:"3", 12:"4", 16:"5", 20:"6", 24:"7", 28:"8", 32:"9", 36:"10", 40:"11", 44:"12", 48:"13", 52:"14", 56:"15", 60:"16", 64:"17", 68:"18", 72:"19", 76:"20", 80:"21", 84:"22", 88:"23", 92:"24", 96:"25", 100:"26", 104:"27", 108:"28", 112:"29", 116:"30", 120:"31", 124:"32", 128:"33", 132:"34", 136:"35", 140:"36", 144:"37", 148:"38", 152:"39", 156:"40", 160:"41", 164:"42", 168:"43", 172:"44", 176:"45", 180:"46", 184:"47", 188:"48", 192:"49", 196:"50", 200:"51", 204:"52", 208:"53", 212:"54", 216:"55", 220:"56", 224:"57", 228:"58", 232:"59", 236:"60", 240:"61", 244:"62", 248:"63", 252:"64", 256:"65", 260:"66", 264:"67", 268:"68", 272:"69", 276:"70", 280:"71", 284:"72", 288:"73", 292:"74", 296:"75", 300:"76", 304:"77", 308:"78", 312:"79", 316:"80", 320:"81", 324:"82", 328:"83", 332:"84", 336:"85", 340:"86", 344:"87", 348:"88", 352:"89", 356:"90", 360:"91", 364:"92", 368:"93", 372:"94", 376:"95", 380:"96", 384:"97", 388:"98", 392:"99", 396:"100", 400:"101", 404:"102", 408:"103", 412:"104", 416:"105", 420:"106", 424:"107", 428:"108", 432:"109", 436:"110"},
		hitboxes = document.getElementsByClassName("hitbox");
	var playerHitbox = player.getBoundingClientRect(),
		hitboxCoords = {left:[], right:[], top:[], bottom:[], left_min:[], left_max:[], right_min:[], right_max:[], top_min:[], top_max:[], bottom_min:[], bottom_max:[]},
		hblengthDiv = hitboxes.length / 3,
		HBAmount = 0,
		HBAmount2 = Math.floor(hblengthDiv),
		HBAmount3 = Math.floor(hitboxes.length - hblengthDiv),
		currentHitbox,
		loadboxes = document.getElementsByClassName("loadbox");
	var loadboxCoords = {left:[], right:[], top:[], bottom:[]},
		LBAmount = 0;

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

	for (var i = loadboxes.length - 1; i >= 0; i--) {
		loadbox_coords = loadboxes[i].getBoundingClientRect();
		loadboxCoords.left.push(parseInt(loadbox_coords.left) - 36);
		loadboxCoords.right.push(parseInt(loadbox_coords.right) + 36);
		loadboxCoords.top.push(parseInt(loadbox_coords.top));
		loadboxCoords.bottom.push(parseInt(loadbox_coords.bottom));
	}

	$("#saveButton").click(function() {
		var hearts = 3,
			locTop = player.style.marginTop,
			locLeft = player.style.marginLeft,
			data = { hearts: hearts, location_top: locTop, location_left: locLeft},
			fileName = "Savegame-" + Math.floor(Date.now() / 1000) + ".savegame";
		saveData(data, fileName);
	});

	var saveData = (function () {
	    var a = document.createElement("a");
	    document.body.appendChild(a);
	    a.style = "display: none";
	    return function (data, fileName) {
	        var json = JSON.stringify(data),
	            blob = new Blob([json], {type: "octet/stream"}),
	            url = window.URL.createObjectURL(blob);
	        a.href = url;
	        a.download = fileName;
	        a.click();
	        window.URL.revokeObjectURL(url);
	    };
	}());

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

		if (playerHitbox.top >= hitboxCoords.bottom_min[HBAmount] && playerHitbox.top <= hitboxCoords.bottom_max[HBAmount] && playerHitbox.left >= hitboxCoords.left[HBAmount] && playerHitbox.right <= hitboxCoords.right[HBAmount] && hitboxes[HBAmount].style.display !== "none") {
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

		if (playerHitbox.bottom <= hitboxCoords.top_min[HBAmount] && playerHitbox.bottom >= hitboxCoords.top_max[HBAmount] && playerHitbox.left >= hitboxCoords.left[HBAmount] && playerHitbox.right <= hitboxCoords.right[HBAmount] && hitboxes[HBAmount].style.display !== "none") {
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

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount] && playerHitbox.top <= hitboxCoords.bottom[HBAmount] && playerHitbox.left >= hitboxCoords.right_min[HBAmount] && playerHitbox.left <= hitboxCoords.right_max[HBAmount] && hitboxes[HBAmount].style.display !== "none") {
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

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount] && playerHitbox.top <= hitboxCoords.bottom[HBAmount] && playerHitbox.right >= hitboxCoords.left_min[HBAmount] && playerHitbox.right <= hitboxCoords.right_max[HBAmount] && hitboxes[HBAmount].style.display !== "none") {
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

		if (playerHitbox.top >= hitboxCoords.bottom_min[HBAmount2] && playerHitbox.top <= hitboxCoords.bottom_max[HBAmount2] && playerHitbox.left >= hitboxCoords.left[HBAmount2] && playerHitbox.right <= hitboxCoords.right[HBAmount2] && hitboxes[HBAmount2].style.display !== "none") {
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

		if (playerHitbox.bottom <= hitboxCoords.top_min[HBAmount2] && playerHitbox.bottom >= hitboxCoords.top_max[HBAmount2] && playerHitbox.left >= hitboxCoords.left[HBAmount2] && playerHitbox.right <= hitboxCoords.right[HBAmount2] && hitboxes[HBAmount2].style.display !== "none") {
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

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount2] && playerHitbox.top <= hitboxCoords.bottom[HBAmount2] && playerHitbox.left >= hitboxCoords.right_min[HBAmount2] && playerHitbox.left <= hitboxCoords.right_max[HBAmount2] && hitboxes[HBAmount2].style.display !== "none") {
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

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount2] && playerHitbox.top <= hitboxCoords.bottom[HBAmount2] && playerHitbox.right >= hitboxCoords.left_min[HBAmount2] && playerHitbox.right <= hitboxCoords.right_max[HBAmount2] && hitboxes[HBAmount2].style.display !== "none") {
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

		if (playerHitbox.top >= hitboxCoords.bottom_min[HBAmount3] && playerHitbox.top <= hitboxCoords.bottom_max[HBAmount3] && playerHitbox.left >= hitboxCoords.left[HBAmount3] && playerHitbox.right <= hitboxCoords.right[HBAmount3] && hitboxes[HBAmount3].style.display !== "none") {
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

		if (playerHitbox.bottom <= hitboxCoords.top_min[HBAmount3] && playerHitbox.bottom >= hitboxCoords.top_max[HBAmount3] && playerHitbox.left >= hitboxCoords.left[HBAmount3] && playerHitbox.right <= hitboxCoords.right[HBAmount3] && hitboxes[HBAmount3].style.display !== "none") {
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

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount3] && playerHitbox.top <= hitboxCoords.bottom[HBAmount3] && playerHitbox.left >= hitboxCoords.right_min[HBAmount3] && playerHitbox.left <= hitboxCoords.right_max[HBAmount3] && hitboxes[HBAmount3].style.display !== "none") {
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

		if (playerHitbox.bottom >= hitboxCoords.top[HBAmount3] && playerHitbox.top <= hitboxCoords.bottom[HBAmount3] && playerHitbox.right >= hitboxCoords.left_min[HBAmount3] && playerHitbox.right <= hitboxCoords.right_max[HBAmount3] && hitboxes[HBAmount3].style.display !== "none") {
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

	setInterval(function(){
		playerHitbox = player.getBoundingClientRect();
		if (LBAmount >= loadboxes.length) {
			LBAmount = 0;
		}

		if ((playerHitbox.top <= loadboxCoords.bottom[LBAmount] && playerHitbox.top >= loadboxCoords.top[LBAmount]) || (playerHitbox.bottom <= loadboxCoords.bottom[LBAmount] && playerHitbox.bottom >= loadboxCoords.top[LBAmount]) || (playerHitbox.top <= loadboxCoords.top[LBAmount] && playerHitbox.bottom >= loadboxCoords.bottom[LBAmount])) {
			if (playerHitbox.left >= loadboxCoords.left[LBAmount] && playerHitbox.right <= loadboxCoords.right[LBAmount] && loadboxes[LBAmount].style.display === "none") {
				if (loadboxes[LBAmount].className.includes("ow1Loadbox")) {
					$("#overworld_start1 *").css("display","none");
					$("#overworld_start2 *").css("display","");
					player.style.marginTop = "420px";
				}
				if (loadboxes[LBAmount].className.includes("ow2Loadbox")) {
					$("#overworld_start2 *").css("display","none");
					$("#overworld_start1 *").css("display","");
					player.style.marginTop = "16px";
				}
			}
		}

		LBAmount++;
	}, 50);

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