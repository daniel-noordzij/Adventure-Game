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

	var player = document.getElementById('player').style;
	var slashing = false;
	var slashTimer = false;
	var using = false;
	var menuOpen = false;
	var movementSpeed = 4;
	var pressedKeys = [];
	var element = document.getElementById('player'),
	style = window.getComputedStyle(element);
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
	});

	setInterval(function() {
		if(pressedKeys[upCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "0px") {
				var newTopNum = parseInt(top) - movementSpeed,
				newTop = newTopNum + "px";
					
				player.marginTop = newTop;
			}
				
		}
		if(pressedKeys[rightCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "712px") {
				var newSideNum = parseInt(side) + movementSpeed,
				newSide = newSideNum + "px";
					
				player.marginLeft = newSide;
			}
				
		}
		if(pressedKeys[leftCode] === true && menuOpen === false) {
			var side = style.getPropertyValue('margin-left');

			if (side !== "0px") {
				var newSideNum = parseInt(side) - movementSpeed,
				newSide = newSideNum + "px";
					
				player.marginLeft = newSide;
			}
				
		}
		if(pressedKeys[downCode] === true && menuOpen === false) {
			var top = style.getPropertyValue('margin-top');

			if (top !== "456px") {
				var newTopNum = parseInt(top) + movementSpeed,
				newTop = newTopNum + "px";
					
				player.marginTop = newTop;
			}
				
		}
		if(pressedKeys[slashCode] === true) {
			if(slashing === false && menuOpen === false) {
					slashing = true;
					console.log("slash");
					document.getElementById("player").src = "images/playerSlash.png";
					setTimeout(function(){
						document.getElementById("player").src = "images/player.png";
					}, 150);
			}
		}
		if(pressedKeys[useCode] === true) {
			if(using === false && menuOpen === false) {
				using = true;
				console.log("use");

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
/*	setInterval(function(){
		if (pressedKeys.length >= 1 && keyAmount === 0) {
			pressedKeys = [];
		}
	}, 1000);*/


}