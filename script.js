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
	var pressedKeys = [];
	var player = document.getElementById('player'),
	style = window.getComputedStyle(player);
	var slashTime = 5000;


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

	function getPosition(elem) {
	 	var pos, width, height;
		pos = $(elem).position();
		width = $(elem).width();
		height = $(elem).height();
		return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
	}

	function comparePositions(p1, p2) {
		var r1, r2;
		r1 = p1[0] < p2[0] ? p1 : p2;
		r2 = p1[0] < p2[0] ? p2 : p1;
		return r1[1] > r2[0] || r1[0] === r2[0];
	}

	function getOverlap(a, b) {
		var pos1 = getPosition(a),
			pos2 = getPosition(b);
		return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
	}

	// var test = getOverlap();


	setInterval(function() {
		if(pressedKeys[upCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "0px") {
				var newTopNum = parseInt(top) - movementSpeed,
				newTop = newTopNum + "px";
					
				player.style.marginTop = newTop;
			}
				
		}
		if(pressedKeys[rightCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "712px") {
				var newSideNum = parseInt(side) + movementSpeed,
				newSide = newSideNum + "px";
					
				player.style.marginLeft = newSide;
			}
				
		}
		if(pressedKeys[leftCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "0px") {
				var newSideNum = parseInt(side) - movementSpeed,
				newSide = newSideNum + "px";
					
				player.style.marginLeft = newSide;
			}
				
		}
		if(pressedKeys[downCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "456px") {
				var newTopNum = parseInt(top) + movementSpeed,
				newTop = newTopNum + "px";
					
				player.style.marginTop = newTop;
			}
				
		}
		if(pressedKeys[slashCode] === true) {
			if(slashing === false && menuOpen === false) {
					slashing = true;
					player.src = "images/playerSlash.png";
					setTimeout(function(){
						player.src = "images/player.png";
					}, 150);
			}
		}
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
	});
}