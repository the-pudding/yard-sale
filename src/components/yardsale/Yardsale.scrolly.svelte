<script>
	import { onMount } from 'svelte';
	import YardsaleYSMIntro from "$components/yardsale/Yardsale.YSMIntro.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { fade } from 'svelte/transition';
	export let words;
	export let container;
	let currentStage;
	let currentStageNumber = 0;
	let value = 0;
	let stepHeight = 600;
	let stepWidth = 600;
	let panelHeight = stepWidth * 0.8;
	let bgColor = "#000"

	let gameinfo = {
		"player1": 1000,
		"player2": 1000,
		"wager": 200
	}

	function convertToHTML(text) {
		let finalText = [];
		let textArray = text.split("\n");
		textArray.forEach(function(line) {
			if (line.indexOf("Component|") != -1) {
				let compName = line.split("|")[1];
				line = `<svelte:component this=${compName}></svelte:component>`
			}
			finalText.push(line);
		})
		return "<p>" + finalText.join("</p><p>") + "</p>";
	}

	let stageLookup = {
		"scrolly1-0": [
			{"image":"pawnshop", "xmetric":"left", "x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 1},
			{"image":"watch-zoom", "xmetric":"left", "x":0, "ymetric": "top","y":0, "width": 100, "opacity": 0},
			{"image":"phone", "xmetric":"left","x":-50, "ymetric": "top", "y":20, "width": 30, "opacity": 0},
			{"image":"plus-minus", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0}
			],
		"scrolly1-1": [
			{"image":"pawnshop", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 0},
			{"image":"watch-zoom", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 1},
			{"image":"phone", "xmetric":"left","x":10, "ymetric": "top", "y":20, "width": 30, "opacity": 1},
			{"image":"plus-minus", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 0}
			],
		"scrolly1-2": [
			{"image":"pawnshop", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"watch-zoom", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"phone", "xmetric":"left","x":-50, "ymetric": "top", "y":20, "width": 30, "opacity": 0},
			{"image":"plus-minus", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 1}
			],
		"scrolly2-0": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 1},
			{"image":"player1-full", "xmetric":"left","x":-30, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x":-30, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0}
			],
		"scrolly2-1": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.3},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player1-happy", "xmetric":"left","x":-20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": -20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":200, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":45, "ymetric": "top", "y":200, "width": 10, "opacity": 0}
			],
		"scrolly2-2": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":200, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-3": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":28, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-4": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":40, "width": 20, "opacity": 1}
			],
		"scrolly2-5": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":-20, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": -20, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":40, "width": 20, "opacity": 1}
			],
		"scrolly2-6": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.3},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-7": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-8": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":200, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-9": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":28, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-10": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":40, "width": 20, "opacity": 1}
			],
		"scrolly3-0": {"roundLimit":2, "increment":1},
		"scrolly3-1": {"roundLimit":2, "increment":1},
		"scrolly3-2": {"roundLimit":10000, "increment":10},
		"scrolly3-3": {"roundLimit":10000, "increment":1000},
	}

	let wealthLookup = {
		"0": {
			"player1": 0,
			"player2": 0,
			"wager": 0,
			"player1Words": "",
			"player2Words": ""
		},
		"1": {
			"player1": 800,
			"player2": 800,
			"wager": 0,
			"player1Words": "",
			"player2Words": ""
		},
		"2": {
			"player1": 1000,
			"player2": 1000,
			"wager": 200,
			"player1Words": "I can only afford to bet 20%.",
			"player2Words": "Same here."
		},
		"3": {
			"player1": 1000,
			"player2": 1000,
			"wager": 200,
			"player1Words": "Heads!",
			"player2Words": ""
		},
		"4": {
			"player1": 800,
			"player2": 1200,
			"wager": 200,
			"player1Words": "Aww, I lost.",
			"player2Words": "I won $200!"
		},
		"5": {
			"player1": 800,
			"player2": 1200,
			"wager": 200,
			"player1Words": "I'll win next time.",
			"player2Words": ""
		},
		"6": {
			"player1": 800,
			"player2": 1200,
			"wager": 200,
			"player1Words": "",
			"player2Words": ""
		},
		"7": {
			"player1": 800,
			"player2": 1200,
			"wager": 240,
			"player1Words": "",
			"player2Words": "I want to bet $240, since that's 20% of my money."
		},
		"8": {
			"player1": 800,
			"player2": 1200,
			"wager": 160,
			"player1Words": "A $240 wager is too much for me. Let's bet $160.",
			"player2Words": ""
		},
		"9": {
			"player1": 800,
			"player2": 1200,
			"wager": 160,
			"player1Words": "Heads!",
			"player2Words": ""
		},
		"10": {
			"player1": 640,
			"player2": 1360,
			"wager": 160,
			"player1Words": "Lost again...",
			"player2Words": "Two wins in a row!"
		}
	}

	$: {
		newScroll(value)
		currentStage = currentStage;
		stepWidth = stepWidth;
		stepHeight = stepHeight;
		panelHeight = stepWidth;
	}
	function newScroll(v) {
		v = v == undefined ? currentStageNumber : v;
		currentStageNumber = v;
		currentStage = v == undefined ? stageLookup[container + "-0"] : stageLookup[container + "-" + v];

		if (container == "scrolly1" && currentStageNumber == 0) {
			bgColor = "#000";
		} else {
			bgColor = "rgb(118,102,135)";
		}
	}
	setInterval(function() {
		updateWealth("player1");
		updateWealth("player2");
		updateWealth("wager");
	},5);

	function updateWealth(item) {
		if (gameinfo[item] < wealthLookup[currentStageNumber][item]) {
			gameinfo[item] = gameinfo[item] + 1;
		} else if (gameinfo[item] > wealthLookup[currentStageNumber][item]) {
			gameinfo[item] = gameinfo[item] - 1;
		}
	}

	function comma(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
</script>
<div class="interactive_container">
<section class="scrolly" id={container}>
	<div class="scrollyBackground" bind:clientHeight={stepHeight} bind:clientWidth={stepWidth} style="background:{bgColor};height:{panelHeight}px;">
		{#if container != "scrolly3"}
		{#each currentStage as { image, xmetric, x, ymetric, y, width, opacity }, i}
		<img class="{image}" src="assets/yardsale/art/{image}.png" alt="stageImage" style="{xmetric}: {x}%; {ymetric}: {y}%; width: {width}%; opacity:{opacity};" in:fade={{ delay: 0 }} out:fade/>
		{/each}
		{#if container == "scrolly2" && wealthLookup[currentStageNumber].player1Words != "" }
		<div class="speechBubble player1bubble" in:fade={{ delay: 400 }} out:fade>{wealthLookup[currentStageNumber].player1Words}</div>
		{/if}
		{#if container == "scrolly2" && wealthLookup[currentStageNumber].player2Words != "" }
		<div class="speechBubble player2bubble" in:fade={{ delay: 400 }} out:fade>{wealthLookup[currentStageNumber].player2Words}</div>
		{/if}
		{:else}
		<YardsaleYSMIntro roundLimit={currentStage.roundLimit} increment={currentStage.increment} />
		{/if}
		
		<div class="gameContainer">
			{#if container == "scrolly2" && [2,3,4,5,7,8,9,10].indexOf(currentStageNumber) != -1 }
			<div class="player1 wealthNumber" in:fade={{ delay: 400 }} out:fade>${comma(gameinfo.player1)}</div>
			<div class="player2 wealthNumber" in:fade={{ delay: 400 }} out:fade>${comma(gameinfo.player2)}</div>
			{/if}
			{#if container == "scrolly2" && [2,3,7,8,9].indexOf(currentStageNumber) != -1 }
			<div class="wager" in:fade={{ delay: 0 }} out:fade>Wager<br><span>${comma(gameinfo.wager)}</span></div>
			{/if}
		</div>
		
	</div>
	<div class="scrollyContainer">
		<Scrolly bind:value top={400}>
			{#each words as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{@html convertToHTML(text + "<span style='color: #aaa;font-size:10px;margin-left:5px;'>" + i + "</span>")}</p>
			</div>
			{/each}
		</Scrolly>
	</div>
</section>
</div>

<style>
	.gameContainer {
		position: absolute;
		top: 28%;
		width:100%;
		font-family: "National 2 Web", sans-serif;
	}
	.gameContainer div {
		position: absolute;
		text-align: center;
	}
	.gameContainer .wealthNumber {
		position: absolute;
		color: white;
		background: #333;
		padding: 2px;
		font-size: 13px;
	}
	.gameContainer .wager {
		color: white;
		width:110px;
		left:50%;
		margin-left:-55px;
		margin-top: -100px;
		line-height:27px;
	}
	.gameContainer .wager span {
		font-size:30px;
	}
	.player1 {
		left: 5%;
	}
	.player2 {
		right: 5%;
	}
	.scrolly {
		max-width:  1100px;
		margin: 0px auto;
	}
	.scrollyContainer {
		width: 38%;
	}
	.scrollyBackground {
		position: sticky;
		/*top: 4em;*/
		float: right;
		top:  2rem;
		width:  59%;
		margin-right: 1%;
		/*border: 2px solid #000;*/
		height:  auto;
		/*min-height:  500px;*/
		z-index: 2;
		overflow: hidden;
		border: 3px solid #000;
	}
	
	.scrollyBackground img {
		position: absolute;
		width:  100%;
		max-width: none !important;
		transition: all 800ms cubic-bezier(0.250, 0.100, 0.250, 1.000); 
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
	}
	.player1-happy, .player2-happy, .player3-happy {
		background: #e28aff !important;
		border: 2px solid #333;
		box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.75) inset;
		-webkit-box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.75) inset;
		-moz-box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.75) inset; 
	} 
	.player1-sad, .player2-sad, .player3-sad {
		background: rgb(118,102,135) !important;
		border: 2px solid #333;
		box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.75) inset;
		-webkit-box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.75) inset;
		-moz-box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.75) inset;
	}
	
	.scrollyBackground .hidden {
		opacity:  0;
	}
	.step {
		display: block;
		height: 100vh;
		text-align: left;
		z-index: 100;
		width: 100%;
		min-width: 200px;
		margin-left:  5px;
		opacity:  1;
		box-sizing: border-box;
	}
/*	.step.active {
		opacity:  1;
	}*/
	.step > p {
		font-family: "National 2 Web";
		width: 100%;
		/*border:  1px solid #000;*/
		/*padding: 1rem;*/
		/*background:  white;*/
		font-size:  23px;
		padding:  4rem 0;
		box-sizing: border-box;
	}
	@media only screen and (max-width: 640px) {

		.scrollyContainer {
			width: 98%;
			margin: 0 1%;
		}
		.scrollyBackground {
			width:  98%;
			margin: 1%;
			min-height: none;
			float: none;
		}
		.step > p {
			padding: 0rem 1%;
			width: 98%;
			font-size: 18px;
		}
	}

</style>
