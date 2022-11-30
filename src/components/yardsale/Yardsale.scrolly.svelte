<script>
	import { onMount } from 'svelte';
	import YardsaleYSMIntro from "$components/yardsale/Yardsale.YSMIntro.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { fade } from 'svelte/transition';
	export let words; // words from google doc
	
	export let container; // container name, ie "scrolly3"
	let currentStageNumber = 0; // stage number
	let currentStage; // full stage name, ie "scrolly3-1"

	let value = 0; // current step, binded to scroll 
	let stepHeight = 600;
	let stepWidth = 600;
	let panelHeight = stepWidth * 0.8;
	let bgColor = "#000"
	let bgOpacity = 1;
	let r = 0;
	let currentText;
	let currentLocation = 0;
	let progress;

	// Keyframes for each stage
	const stageLookup = {
		"scrolly1-0": [
			{"image":"pawnshop", "xmetric":"left", "x":0, "ymetric": "top", "y":0, "width": 105, "opacity": 1},
			{"image":"watch-zoom", "xmetric":"left", "x":0, "ymetric": "top","y":0, "width": 105, "opacity": 0},
			{"image":"phone", "xmetric":"left","x":-50, "ymetric": "top", "y":20, "width": 30, "opacity": 0},
			{"image":"plus-minus", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 105, "opacity": 0}
			],
		"scrolly1-1": [
			{"image":"pawnshop", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 0},
			{"image":"watch-zoom", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 1},
			{"image":"phone", "xmetric":"left","x":10, "ymetric": "top", "y":20, "width": 30, "opacity": 1},
			{"image":"plus-minus", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 0}
			],
		"scrolly1-2": [
			{"image":"pawnshop", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 0},
			{"image":"watch-zoom", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 1},
			{"image":"phone", "xmetric":"left","x":10, "ymetric": "top", "y":20, "width": 30, "opacity": 1},
			{"image":"plus-minus", "xmetric":"left","x":-20, "ymetric": "top", "y":-20, "width": 140, "opacity": 0}
			],
		"scrolly1-3": [
			{"image":"pawnshop", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"watch-zoom", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0},
			{"image":"phone", "xmetric":"left","x":-50, "ymetric": "top", "y":20, "width": 30, "opacity": 0},
			{"image":"plus-minus", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 1}
			],
		"scrolly1-4": [
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
			{"image":"player1-happy", "xmetric":"left","x":-20, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": -20, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":50, "ymetric": "top", "y":200, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":50, "ymetric": "top", "y":200, "width": 10, "opacity": 0}
			],
		"scrolly2-2": [
			{"image":"the-100", "xmetric":"left","x":-50, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":-35, "ymetric": "bottom", "y":-60, "width": 60, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": -35, "ymetric": "bottom", "y":-60, "width": 60, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":50, "ymetric": "top", "y":200, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":50, "ymetric": "top", "y":33, "width": 10, "opacity": 0}
			],
		"scrolly2-3": [
			{"image":"the-100", "xmetric":"left","x":-50, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":33, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":33, "width": 12, "opacity": 0}
			],
		"scrolly2-4": [
			{"image":"the-100", "xmetric":"left","x":-50, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player2-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width":10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":40, "width":12, "opacity": 1}
			],
		"scrolly2-5": [
			{"image":"the-100", "xmetric":"left","x":-50, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":-20, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": -20, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":40, "width": 12, "opacity": 1}
			],
		"scrolly2-6": [
			{"image":"the-100", "xmetric":"left","x":0, "ymetric": "top", "y":0, "width": 100, "opacity": 0.3},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 1},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":33, "width": 12, "opacity": 0}
			],
		"scrolly2-7": [
			{"image":"the-100", "xmetric":"left","x":-20, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":-35, "ymetric": "bottom", "y":-60, "width": 60, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x":-35, "ymetric": "bottom", "y":-60, "width": 60, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":33, "width": 12, "opacity": 0}
			],
		"scrolly2-8": [
			{"image":"the-100", "xmetric":"left","x":-20, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-sad", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":200, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":33, "width": 10, "opacity": 0}
			],
		"scrolly2-9": [
			{"image":"the-100", "xmetric":"left","x":-20, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-sad", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":33, "width": 10, "opacity": 1},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":33, "width": 12, "opacity": 0}
			],
		"scrolly2-10": [
			{"image":"the-100", "xmetric":"left","x":-20, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-sad", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":40, "width": 12, "opacity": 1}
			],
		"scrolly2-11": [
			{"image":"the-100", "xmetric":"left","x":-20, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-sad", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":40, "width": 12, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			],
		"scrolly2-12": [
			{"image":"the-100", "xmetric":"left","x":-20, "ymetric": "top", "y":-50, "width": 200, "opacity": 0.1},
			{"image":"player1-full", "xmetric":"left","x":5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player3-full", "xmetric":"right","x": 5, "ymetric": "bottom", "y":5, "width": 30, "opacity": 0},
			{"image":"player1-happy", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player2-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-happy", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"player3-sad", "xmetric":"right","x": 5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 0},
			{"image":"coin-flipping", "xmetric":"left","x":45, "ymetric": "top", "y":40, "width": 10, "opacity": 0},
			{"image":"coin-tails", "xmetric":"left","x":44, "ymetric": "top", "y":40, "width": 12, "opacity": 1},
			{"image":"player1-sad", "xmetric":"left","x":5, "ymetric": "top", "y":33, "width": 30, "opacity": 1},
			],
		"scrolly3-0": {"roundLimit":2, "increment":1},
		"scrolly3-1": {"roundLimit":2, "increment":1},
		"scrolly3-2": {"roundLimit":10000, "increment":4}
	}

	// Game info for each stage
	const wealthLookup = {
		"0": {
			"player1": 600,
			"player2": 600,
			"wager": 0,
			"player1Words": "",
			"player2Words": "",
			"player1Record": "0 - 0",
			"player2Record": "0 - 0"
		},
		"1": {
			"player1": 1000,
			"player2": 1000,
			"wager": 0,
			"player1Words": "",
			"player2Words": "",
			"player1Record": "0 - 0",
			"player2Record": "0 - 0"
		},
		"2": {
			"player1": 1000,
			"player2": 1000,
			"wager": 200,
			"player1Words": "I have $1,000 and can only afford to bet 20%.",
			"player2Words": "OK let's do $200.",
			"player1Record": "0 - 0",
			"player2Record": "0 - 0"
		},
		"3": {
			"player1": 1000,
			"player2": 1000,
			"wager": 200,
			"player1Words": "Heads!",
			"player2Words": "",
			"player1Record": "0 - 0",
			"player2Record": "0 - 0"
		},
		"4": {
			"player1": 800,
			"player2": 1200,
			"wager": 200,
			"player1Words": "It's tails. I lost.",
			"player2Words": "I won $200!",
			"player1Record": "0 - 1",
			"player2Record": "1 - 0"
		},
		"5": {
			"player1": 800,
			"player2": 1200,
			"wager": 200,
			"player1Words": "",
			"player2Words": "",
			"player1Record": "0 - 1",
			"player2Record": "1 - 0"
		},
		"6": {
			"player1": 800,
			"player2": 1200,
			"wager": 200,
			"player1Words": "",
			"player2Words": "",
			"player1Record": "0 - 1",
			"player2Record": "1 - 0"
		},
		"7": {
			"player1": 800,
			"player2": 1200,
			"wager": 240,
			"player1Words": "",
			"player2Words": "I won last game. So I want to bet 20% of my money – $240.",
			"player1Record": "0 - 1",
			"player2Record": "1 - 0"
		},
		"8": {
			"player1": 800,
			"player2": 1200,
			"wager": 160,
			"player1Words": "That's too much. I lost my first game, so I can only bet 20% of my money – $160.",
			"player2Words": "OK fine.",
			"player1Record": "0 - 1",
			"player2Record": "1 - 0"
		},
		"9": {
			"player1": 800,
			"player2": 1200,
			"wager": 160,
			"player1Words": "Tails!",
			"player2Words": "",
			"player1Record": "0 - 1",
			"player2Record": "1 - 0"
		},
		"10": {
			"player1": 960,
			"player2": 1040,
			"wager": 160,
			"player1Words": "I won!",
			"player2Words": "Ugh.",
			"player1Record": "1 - 1",
			"player2Record": "1 - 1"
		},
		"11": {
			"player1": 960,
			"player2": 1040,
			"wager": 160,
			"player1Words": "Wait, why am I not back to $1,000?",
			"player2Words": "",
			"player1Record": "1 - 1",
			"player2Record": "1 - 1"
		},
		"12": {
			"player1": 960,
			"player2": 1040,
			"wager": 160,
			"player1Words": "",
			"player2Words": "",
			"player1Record": "1 - 1",
			"player2Record": "1 - 1"
		}
	}

	
	// Runs on new stage
	function newScroll(v) {
		v = v == undefined ? currentStageNumber : v;
		currentStageNumber = v;
		currentStage = v == undefined ? stageLookup[container + "-0"] : stageLookup[container + "-" + v];

		// sets backgroudn colors for scrolly
		if (container == "scrolly1" && currentStageNumber == 0) {
			bgColor = "#000";
			bgOpacity = 1;
		} else if (container == "scrolly3") {
			bgColor = "#c8becf";
			bgOpacity = 0.5;
		}  else {
			bgColor = "#7c6a85";
			bgOpacity = 1;
		}
	}


	// Keeping track + ticking up numbers in the comic's game info section
	let gameinfo = {
		"player1": 1000,
		"player2": 1000,
		"wager": 200
	}
	setInterval(function() {
		for (var key in gameinfo) {
			updateWealth(key);
		}
	},5);

	function updateWealth(item) {
		if (gameinfo[item] < wealthLookup[currentStageNumber][item]) {
			gameinfo[item] = gameinfo[item] + 1;
		} else if (gameinfo[item] > wealthLookup[currentStageNumber][item]) {
			gameinfo[item] = gameinfo[item] - 1;
		}
	}

	// Utility functions
	function comma(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

	let currentProgress = 0;
	function getProgress() {
		try {
			currentProgress = (currentStageNumber + (progress[currentStageNumber]/2) ) / words.length;
		} catch {
			currentProgress = 0;
		}	
		if (currentProgress > 1) { currentProgress = 1; }
	}
	

	$: {
		newScroll(value)
		currentStage = currentStage;
		stepWidth = stepWidth;
		stepHeight = stepHeight;
		panelHeight = stepWidth;
		currentText = words[currentStageNumber];
		progress = progress;
		getProgress();
	}
	
</script>
<div class="interactive_container">
	<section class="scrolly" id={container}>
		<div class="scrollyBackground" bind:clientHeight={stepHeight} bind:clientWidth={stepWidth} style="background:{bgColor}; max-height:{panelHeight}px; ">
			<div class="scrollyImageContainer">
				<!-- If it's not the third scrolly, display the comic -->
				{#if container != "scrolly3"}
				{#each currentStage as { image, xmetric, x, ymetric, y, width, opacity }, i}
				<img class="{image}" src="assets/yardsale/art/{image}.png" alt="stageImage" style="{xmetric}: {x}%; {ymetric}: {y}%; width: {width}%; opacity:{opacity};" in:fade={{ delay: 0 }} out:fade/>
				{/each}

				<!-- Speech bubbles -->
				{#if container == "scrolly2" && wealthLookup[currentStageNumber].player1Words != "" }
				<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>{wealthLookup[currentStageNumber].player1Words}</div>
				{/if}
				{#if container == "scrolly2" && wealthLookup[currentStageNumber].player2Words != "" }
				<div class="speechBubble player2bubble" in:fade={{ delay: 600 }} out:fade>{wealthLookup[currentStageNumber].player2Words}</div>
				{/if}
				{:else}
				<!-- YSM simulation -->
				<YardsaleYSMIntro roundLimit={currentStage.roundLimit} increment={currentStage.increment} bind:round={r}/>
				{/if}

				<!-- Comic coin flip overlay data -->
				<div class="gameContainer">
					{#if container == "scrolly2" && [1,2,3,4,5,7,8,9,10,11,12].indexOf(currentStageNumber) != -1 }
					<div class="player1 wealthNumber" in:fade={{ delay: 400 }} out:fade>
						<div class="gameInfoItem brighter">Player 1</div>
						<div class="gameInfoItem">{wealthLookup[currentStageNumber].player1Record}</div>
						<div class="gameInfoItem">${comma(gameinfo.player1)}</div>
						<div class="gameInfoItem">
							<div class="gameInfoFullbar">
								<div class="gameInfoBar" style="width:{gameinfo.player1/20}%"></div>
							</div>
						</div>
					</div>
					<div class="player2 wealthNumber" in:fade={{ delay: 400 }} out:fade>
						<div class="gameInfoItem brighter">Player 2</div>
						<div class="gameInfoItem">{wealthLookup[currentStageNumber].player2Record}</div>
						<div class="gameInfoItem">${comma(gameinfo.player2)}</div>
						<div class="gameInfoItem">
							<div class="gameInfoFullbar">
								<div class="gameInfoBar" style="width:{gameinfo.player2/20}%"></div>
							</div>
						</div>
					</div>
					{/if}
					{#if container == "scrolly2" && [2,3,7,8,9].indexOf(currentStageNumber) != -1 }
					<div class="wager" in:fade={{ delay: 0 }} out:fade>
						<div class="gameInfoItem brighter">Wager</div>
						<div class="gameInfoItem">${comma(gameinfo.wager)}</div>
					</div>
					{/if}
				</div>
				<!-- Scroll down hint on stage 1 -->
				{#if container == "scrolly1" && currentStageNumber < 1}
				<div class="scrolldown_hint" out:fade></div>
				{/if}

				<div class="fuzzy" style="opacity:{bgOpacity};"></div>
			</div>
			<!-- {#if currentText != ""}
			<div class="comicText">
				{#if container == "scrolly3" && currentStageNumber == 2 && r == 10000}
				<p>Whoa, you lost all your money. Meanwhile, one person ended up with nearly all of the wealth!</p>
				{:else}
				{@html convertToHTML(currentText)}
				{/if}
			</div>
			{/if} -->

			<!-- <div class="scrollIndicator">
				{#each words as text, i}
				<div class="scrollIndicatorStage" style="top: {i/words.length * 100}%"></div>
				{/each}
				<div class="scrollIndicatorPosition" style="height:{100 * currentProgress}%"></div>
			</div> -->
		</div>

		<style>
			.scrollIndicator {
				position: absolute;
				right: 0px;
				height: 100%;
				width: 5px;
				top: 0;
				background: rgba(255,255,255,0.1);
			}
			.scrollIndicatorStage, .scrollIndicatorPosition {
				position: absolute;
				left: 0px;
				width: 100%;
				height: 2px;
				background: #000;
			}
			.scrollIndicatorPosition {
				background: var(--category-bg-purple);
				transition: all 20ms cubic-bezier(0.250, 0.250, 0.750, 0.750);
				transition-timing-function: cubic-bezier(0.250, 0.250, 0.750, 0.750);
			}
		</style>

		<div class="scrollyContainer">
			<Scrolly bind:value bind:progress={progress}>
				{#each words as text, i}
				{@const active = value === i}
				{#if text != ""}
				<div class="step step{i}" class:active>
					{#if container == "scrolly3" && currentStageNumber == 2 && r > 1500 && r < 4500}
					<p>Still simulating 10,000 rounds...</p>
					{:else if container == "scrolly3" && currentStageNumber == 2 && r > 4500 && r < 10000}
					<p>Seriously, just wait...</p>
					{:else if container == "scrolly3" && currentStageNumber == 2 && r == 10000}
					<p>Whoa, you lost all your money. Meanwhile, one person ended up with nearly all of the wealth!</p>
					{:else}
					<p>{text}</p>
					{/if}
				</div>
				{:else}
				<div class="step step{i} stepHidden" class:active>
					<p>{text}</p>
				</div>
				{/if}
				{/each}
			</Scrolly>
		</div>
	</section>
</div>

<style>
	.interactive_container {
		padding: 10px 0;
		font-family: "National 2 Web", sans-serif;
	}

	.gameContainer {
		display: block;
		position: absolute;
		top: 40px;
		width: 100%;
		color: white;
		font-size: 22px;
		line-height: 1.3em;
		font-family: "National 2 Web", sans-serif;
	}
	.gameContainer .brighter {
		color: var(--category-purple);
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 2px;
	}
	.gameContainer .wealthNumber {
		position: absolute;
		top: 0px;
		width: 50%;
	}

	.gameContainer .wager {
		position: absolute;
		text-align: center;
		width: 100%;
		left: 0%;
	}
	@media only screen and (max-width: 640px) { 
		.gameContainer {
			top: 20px;
			font-size: 15px;
			line-height: 18px;
		}
	}
	.gameContainer .player1 {
		left: 5%;
		text-align: left;
	}
	.gameContainer .player2 {
		right: 5%;
		text-align: right;
	}
	.gameInfoItem {
		width: 100%;
		position: relative;
	}
	.gameInfoFullbar {
		width: 70%;
		position: absolute;
		height: 20px;
		border: 2px solid var(--category-bg-purple);
		background: var(--category-purple2);
		left: 0;
		top: 0;
		margin-top: 4px;
	}
	@media only screen and (max-width: 640px) { 
		.gameInfoFullbar {
			height: 10px;
		}
	}
	.gameInfoBar {
		height: 100%;
		background: var(--category-bg-purple);	
		position: absolute;
		left: 0;
		top: 0;
	}
	.player2 .gameInfoFullbar, .player2 .gameInfoBar  {
		left: auto;
		right: 0;
	}
	.scrolly {
		max-width:  1100px;
		margin: 0px auto;
		min-height: 100vh;
	}
	.scrollyContainer {
		width: 100%;
		margin-top: -200px;
		z-index: 3;
		pointer-events: none;
	}
	.scrollyBackground {
		position: sticky;
		top:  2.5vh;
		width:  90%;
		margin: 0 auto;
		height:  95vh;
		border: 1px solid #000;
		max-width: 95vh;
		z-index: -1;
	}
	.scrollyImageContainer {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		overflow: hidden;
	}

	.fuzzy {
		animation: grain 20s steps(10) infinite;
		content: "";
		background-image: url("assets/yardsale/grain.png");
		height: 500%;
		width: 500%;
		opacity: 1;
		position: absolute;
		left: -125%;
		top: -125%;
		pointer-events: none;
	}
	@keyframes grain {
		0%, 100% { transform:translate(0, 0) }
		10% { transform:translate(-5%, -10%) }
		20% { transform:translate(8%, 5%) }
		30% { transform:translate(-7%, -5%) }
		40% { transform:translate(5%, 20%) }
		50% { transform:translate(-15%, -10%) }
		60% { transform:translate(0%, 0%) }
		70% { transform:translate(0%, -12%) }
		80% { transform:translate(-10%, 12%) }
		90% { transform:translate(10%, -10%) }
	}
	.scrolldown_hint {
		position: absolute;
		width: 0; 
		height: 0; 
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 15px solid var(--category-purple2);
		right: 20px;
		bottom: 20px;
		margin-left: -5px;
		opacity: 0.4;
		z-index: 1000;
		animation: bounce 1s ease infinite;
	}
	.scrollyBackground img {
		position: absolute;
		width:  100%;
		max-width: none !important;
		transition: all 800ms cubic-bezier(0.250, 0.100, 0.250, 1.000); 
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
	}
	.player1-happy, .player2-happy, .player3-happy {
		background: #c5b3c7;
	} 
	.player1-sad, .player2-sad, .player3-sad {
		background: #c5b3c7;

	}

	.scrollyBackground .hidden {
		opacity:  0;
	}
	.step {
		display: block;
		height: 100vh;
		text-align: left;
		width: 100%;
		min-width: 200px;
		box-sizing: border-box;
	}
	.step.stepHidden {
		opacity: 0;
		pointer-events: none;
	}
	.step > p {
		font-family: "National 2 Web";
		max-width: 500px;
		margin: 0 auto;
		background:  rgba(0,0,0,0.8);
		font-size:  18px;
		padding:  10px;
		box-sizing: border-box;
		color: white;
		text-shadow: -1px -1px 6px rgba(0, 0, 0, 0.5);
	}

	@media only screen and (max-width: 640px) {
		.scrollyBackground {
			margin: 0% auto;
			min-height: none;
			float: none;
			width:  96%;
		}
		.step > p {
			width: 90%;
		}
	}

</style>
