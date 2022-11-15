<script>
	import { onMount } from 'svelte';
	let players = [];
	let ticks = [];
	let windowHeight = 300;
	let playerNumber = 100;
	let startingAmount = 1000;
	let highestNumber = 0;
	let maxWager = 20;
	let round = 0;
	export let roundLimit;
	let chartWidth;
	export let increment;

	let stepHeight = 600;
	let stepWidth = 600;
	let panelHeight = stepWidth * 0.8;
	let chartHeight = panelHeight - 50;

	function generatePlayers() {
		players = [];
		for (let i in [...Array(playerNumber).keys()]) {
			let player = {
				"wealth": startingAmount,
				"id": i,
				"order": 0,
				"height": 0,
				"is_it_me": 0
			} 
			players.push(player);
		}
	}

	function playGame() {
		round = 0;
		setInterval(function() {
			if (round < roundLimit) {
				for (var i = 0; i < increment; i++) {
					playRounds();
					sortPlayers();
				}
				
			} else if (round != roundLimit) {
				round = 0;
			}
		}, 10);
	}

	function playRounds() {
		players = shuffle(players); // randomize the array order to get random pairings
		for (let i = 0; i < players.length; i+=2) { // iterate through all 50 games. each game gets players[i] and players[i+1].
			let player1 = players[i];
			let player2 = players[i+1];
			let playerOrder = player1.wealth > player2.wealth ? [player1, player2] : [player2, player1]; // array with [wealthierPlayer, poorerPlayer] 
			let wager = playerOrder[1].wealth * maxWager/100; // the second player in the playerOrder array is poorer
			let payouts = Math.random() > 0.5 ? [wager, -wager] : [-wager, wager]; // randomize who wins, and return array of payouts
			players[i].wealth = players[i].wealth + payouts[0];
			players[i + 1].wealth = players[i + 1].wealth + payouts[1];
		}
		round+= 1;
	}
	
	function sortPlayers() {
		highestNumber = 2000;
		players.sort(dynamicSort("wealth"));

		players.forEach(function(d) {
			if (d.wealth > highestNumber) {
				highestNumber = d.wealth;
			}
		});
		// setting the ticks based on the highest number
		
		if (highestNumber > 50000) {
			highestNumber = 100000;
		} else if (highestNumber > 10000) {
			highestNumber = 50000;
		} else if (highestNumber > 2000) {
			highestNumber = 10000;
		}
		let highestTick = highestNumber;
		ticks = [];

		for (var i = 0; i < highestTick; i += highestTick/5) {
			ticks.push(i);
		}
		for (var i = 0; i < players.length; i++) {
			players[i].is_it_me = i == 0 ? 1 : 0; 
			players[i].order = i;
			players[i].height = (players[i].wealth / highestNumber) * windowHeight;
		}


	}


	$: {
		stepWidth = stepWidth;
		stepHeight = stepHeight;
		panelHeight = stepWidth * 0.8; 
		chartHeight = panelHeight - 50;
		increment = increment;
		roundLimit = roundLimit;
		generatePlayers();
		sortPlayers();
		playGame();
	}


	// UTILTIES
	function dynamicSort(property) {
		let sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}

	function shuffle(array) {
		let currentIndex = array.length,  randomIndex;
		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
		return array;
	}

	function comma(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

</script>

<div class="body_container"  bind:clientHeight={stepHeight} bind:clientWidth={stepWidth}>	
	<div class="chartArea" bind:clientWidth={chartWidth} style="height:{panelHeight}px;">
		<svg>
			{#each ticks as tick}
			<line x1=0 x2={chartWidth} y1={ chartHeight - (tick / highestNumber * chartHeight) } y2={chartHeight - (tick / highestNumber * chartHeight)}></line>
			<text class="chartText" x=0 y={chartHeight - (tick / highestNumber * chartHeight) - 5}>${comma(tick)}</text>
			{/each}
			{#each players as player}
			<rect class="player player{player.is_it_me}" x={player.order * ((chartWidth-50) /playerNumber) + 50 } width={chartWidth / 200} height={player.height} y={chartHeight - player.height}></rect>
			{/each}
		</svg>
	</div>
	<div class="toolbar ysm_data">
		<div class="toolItem roundItem">
			<div class="toolLabel">Round: <span class="toolValue">{comma(round)}</span></div>
		</div>
	</div>
</div>
<style>
	.toolbar {
		position: absolute;
		left:  10px;
		top: 20px;
		width: 100%;
		height: 20px;
		margin-top: 10px;
	}
	.toolLabel {
		display: inline-block;
/*		color: white;*/
/*		font-weight: bold;*/
/*		background: var(--category-bg-purple);*/
	}
	.body_container { padding:  20px; width: 100%; height:  100%;}
	.chartArea {  width: 100%; margin-bottom: 10px; }
	svg { width: 100%; height: 100%; }
	.toolLabel { margin-bottom: 20px; }
	.player {
		fill:  #6e016b;
	}
	.player.player1 {
		fill: yellow;
	}
	svg line {
		stroke-dasharray: 4px 4px;
/*		stroke: var(--color-gray-300);*/
		stroke: rgba(0,0,0,0.2);
		transition: all 100ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
	}
	svg text {
		font-family: "National 2 Web";
		fill: #000;
		transition: all 100ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
	}
</style>
