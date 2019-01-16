var upCode = 87,
downCode = 83,
leftCode = 65,
rightCode = 68,
useCode = 70,
slashCode = 32;

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
	var using = false;
	var menuOpen = false;
	var movementSpeed = 4;

	document.addEventListener('keydown', function(event) {
		if(event.keyCode === upCode && menuOpen === false) {
			var element = document.getElementById('player'),
			style = window.getComputedStyle(element),
			top = style.getPropertyValue('margin-top');

			if (top !== "0px") {
				var newTopNum = parseInt(top) - movementSpeed,
				newTop = newTopNum + "px";
				
				player.marginTop = newTop;
			}
		} else if(event.keyCode === rightCode && menuOpen === false) {
			var element = document.getElementById('player'),
			style = window.getComputedStyle(element),
			side = style.getPropertyValue('margin-left');

			if (side !== "712px") {
				var newSideNum = parseInt(side) + movementSpeed,
				newSide = newSideNum + "px";
				
				player.marginLeft = newSide;
			}
		} else if(event.keyCode === leftCode && menuOpen === false) {
			var element = document.getElementById('player'),
			style = window.getComputedStyle(element),
			side = style.getPropertyValue('margin-left');

			if (side !== "0px") {
				var newSideNum = parseInt(side) - movementSpeed,
				newSide = newSideNum + "px";
				
				player.marginLeft = newSide;
			}
		} else if(event.keyCode === downCode && menuOpen === false) {
			var element = document.getElementById('player'),
			style = window.getComputedStyle(element),
			top = style.getPropertyValue('margin-top');

			if (top !== "456px") {
				var newTopNum = parseInt(top) + movementSpeed,
				newTop = newTopNum + "px";
				
				player.marginTop = newTop;
			}
		} else if(event.keyCode === slashCode) {
			if(slashing === false && menuOpen === false) {
				slashing = true;
				console.log("slash");
				document.getElementById("player").src = "images/playerSlash.png";
				setTimeout(function(){
					document.getElementById("player").src = "images/player.png";
				}, 150);
			}
		} else if(event.keyCode === useCode) {
			if(using === false && menuOpen === false) {
				using = true;
				console.log("use");

			}
		} else if(event.keyCode === 73) {
			if(menuOpen === false) {
				menuOpen = true;
				document.getElementById("inventoryMenu").style.left = "0";
			} else {
				menuOpen = false;
				document.getElementById("inventoryMenu").style.left = "-131px";
			}
		}
	});
	document.addEventListener('keyup', function(event) {
		if(event.keyCode === slashCode) {
			slashing = false;
		} else if (event.keyCode === useCode) {
			using = false;
		}
	});
}