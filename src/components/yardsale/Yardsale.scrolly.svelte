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
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":28, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-3": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":40, "width": 20, "opacity": 1}
			],
		"scrolly2-4": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"player1-full", "xmetric":"left","x":-20, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": -20, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":40, "width": 20, "opacity": 1}
			],
		"scrolly2-5": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.3},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-6": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.3},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player1-happy", "xmetric":"left","x":-20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player3-happy", "xmetric":"right","x": -20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player1-sad", "xmetric":"left","x":-20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-7": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.3},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player1-happy", "xmetric":"left","x":-20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player3-happy", "xmetric":"right","x": -20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player1-sad", "xmetric":"left","x":-20, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":200, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-8": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":28, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":28, "width": 20, "opacity": 0}
			],
		"scrolly2-9": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 0},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":28, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":40, "ymetric": "top", "y":40, "width": 20, "opacity": 1}
			],
		"scrolly3-0": [[1], 0, 0, 100, 2, 1],
		"scrolly3-1": [[1], 0, 0, 100, 2, 1],
		"scrolly3-2": [[1], 0, 0, 100, 10000, 20],
		"scrolly3-3": [[1], 0, 0, 100, 10000, 1000]
	}

	let wealthLookup = {
		"0": {
			"player1": 1000,
			"player2": 1000,
			"wager": 200
		},
		"1": {
			"player1": 1000,
			"player2": 1000,
			"wager": 200
		},
		"2": {
			"player1": 1000,
			"player2": 1000,
			"wager": 200
		},
		"3": {
			"player1": 800,
			"player2": 1200,
			"wager": 200
		},
		"4": {
			"player1": 800,
			"player2": 1200,
			"wager": 200
		},
		"5": {
			"player1": 800,
			"player2": 1200,
			"wager": 200
		},
		"6": {
			"player1": 800,
			"player2": 1200,
			"wager": 240
		},
		"7": {
			"player1": 800,
			"player2": 1200,
			"wager": 160
		},
		"8": {
			"player1": 800,
			"player2": 1200,
			"wager": 160
		},
		"9": {
			"player1": 640,
			"player2": 1360,
			"wager": 160
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
	
</script>

<section class="scrolly" id={container}>
	<div class="scrollyBackground" bind:clientHeight={stepHeight} bind:clientWidth={stepWidth} style="height:{panelHeight}px;">
		{#if container != "scrolly3"}
		{#each currentStage as { image, xmetric, x, ymetric, y, width, opacity }, i}
			<img class="{image}" src="assets/yardsale/art/{image}.png" alt="stageImage" style="{xmetric}: {x}%; {ymetric}: {y}%; width: {width}%; opacity:{opacity};" in:fade={{ delay: 0 }} out:fade/>
		{/each}
		{:else}
		<YardsaleYSMIntro roundLimit={currentStage[4]} increment={currentStage[5]} />
		{/if}
		
		<div class="gameContainer">
			{#if container == "scrolly2" && [1,2,3,4,5,6,7,8,9].indexOf(currentStageNumber) != -1 }
			<div class="player1">Wealth: ${gameinfo.player1}</div>
			<div class="player2">Wealth: ${gameinfo.player2}</div>
			{/if}
			{#if container == "scrolly2" && [1,2,6,7,8].indexOf(currentStageNumber) != -1 }
			<div class="wager">Wager: ${gameinfo.wager}</div>
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

<style>
	.gameContainer {
		position: absolute;
		top: 25%;
		width:100%;
		font-family: "National 2 Web", sans-serif;
		font-weight:bold;
	}
	.gameContainer div {
		position: absolute;
		text-align: center;
		background: rgba(0,0,0,0.8);
		color: white;
		padding: 2px;
	}
	.player1 {
		left: 10%;
	}
	.player2 {
		right: 10%;
	}
	.wager {
		width:110px;
		left:50%;
		margin-left:-55px;
		margin-top: 100px;
	}
	.scrolly {
		max-width:  1100px;
		margin: 10px auto;
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
		background: rgb(118,102,135);
		background: linear-gradient(0deg, rgba(118,102,135,1) 0%, rgba(190,174,207,1) 72%, rgba(219,195,223,1) 100%);
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
		border: 3px solid #000;
	} 
	.player1-sad, .player2-sad, .player3-sad {
		background: #85658f !important;
		border: 3px solid #000;
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
		font-family:  "Tiempos Text Web", serif;
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
