<script>
	import { onMount } from 'svelte';
	import Range from "$components/helpers/Range.svelte";
	let players = [];
	let ticks = [];
	let windowHeight = 300;
	let playerNumber = 100;
	let startingAmount = 100;
	let highestNumber = 0;
	let maxWager = 20;
	let round = 0;
	let roundLimit = 0;
	let chartWidth;
	let redistribution = 0;
	let redistributionPot = 0;
	let running = false;
	export let redist;

	function generatePlayers() {
		players = [];
		for (let i in [...Array(playerNumber).keys()]) {
			let player = {
				"wealth": startingAmount,
				"id": i,
				"order": 0,
				"height": 0
			} 
			players.push(player);
		}
	}

	function playGame() {
		setInterval(function() {
			running = false;
			if (round < roundLimit) {
				playRounds();
				running = true;
			}
		}, 1)
		roundLimit += 1000;
	}

	function playRounds() {
		players = shuffle(players); // randomize the array order to get random pairings
		redistributionPot = 0;
		for (let i = 0; i < players.length; i+=2) { // iterate through all 50 games. each game gets players[i] and players[i+1].
			let player1 = players[i];
			let player2 = players[i+1];
			let playerOrder = player1.wealth > player2.wealth ? [player1, player2] : [player2, player1]; // array with [wealthierPlayer, poorerPlayer] 
			let wager = playerOrder[1].wealth * maxWager/100; // the second player in the playerOrder array is poorer
			let payouts = Math.random() > 0.5 ? [wager, -wager] : [-wager, wager]; // randomize who wins, and return array of payouts

			// Adding the payout
			players[i].wealth = players[i].wealth + payouts[0];
			players[i + 1].wealth = players[i + 1].wealth + payouts[1];

			// Adding a portion to the redistribution pot
			redistributionPot += players[i].wealth * redistribution/100;
			redistributionPot += players[i + 1].wealth * redistribution/100;

			// Taking redistributed amount away from player
			players[i].wealth = players[i].wealth - (players[i].wealth * redistribution/100);
			players[i + 1].wealth = players[i + 1].wealth - (players[i + 1].wealth * redistribution/100);
		}
		round+= 1;
		sortPlayers();
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

	function sortPlayers() {
		highestNumber = 0;
		players.sort(dynamicSort("wealth"));
		// Iterating through player to determine highest number AND to give players the redistributed pot
		for (let i = 0; i < players.length; i++) {
			players[i].wealth = players[i].wealth + redistributionPot / 100;
			if (players[i].wealth > highestNumber) {
				highestNumber = players[i].wealth;
			}
		};
		highestNumber = highestNumber * 1.2;
		// Giving some breathing room for the highest number
		// highestNumber = highestNumber <= 200 ? 200 : highestNumber * 1.2;
		// setting the ticks based on the highest number
		let highestTickRounder = 100; //Math.pow(10,highestNumber.toString().length-2);
		let highestTick = Math.round(highestNumber / highestTickRounder)*highestTickRounder * 2;
		ticks = [];
		// for (var i = 0; i < highestTick; i += highestTick/10) {
		// 	ticks.push(i);
		// }
		for (var i = 0; i < highestTick; i += highestTick/10) {
			ticks.push(i);
		}
		for (var i = 0; i < players.length; i++) {
			players[i].order = i;
			players[i].height = (players[i].wealth / highestNumber) * windowHeight;
		}
	}

	function reset() {
		round = 0;
		roundLimit = 0;
		generatePlayers();
		sortPlayers();
	}
	generatePlayers();
	sortPlayers();	

	$: {
		redistribution = redistribution;
		startingAmount = startingAmount;
		generatePlayers();
		sortPlayers();
	}
</script>

<div class="body_container">
	<div class="toolbar ysm_data">
		{#if redist == 1}
			<!-- <div class="toolItem">
				<div class="toolLabel">Starting amount for each player: <span class="toolValue">${startingAmount}</span></div>
				<Range min=100 max=2000 bind:value={startingAmount} on:change={generatePlayers}/>
				
			</div> -->
			<!-- <div class="toolItem">
				<div class="toolLabel">Wager: <span class="toolValue">{maxWager}% of poorer player's wealth</span></div>
				<Range min=1 max=100 bind:value={maxWager}/>
				
			</div> -->
			<div class="toolItem">
				<div class="toolLabel">Redistribution: <span class="toolValue">{redistribution}% of everyone's wealth redistributed each round</span></div>
				<Range min=0 max=100 bind:value={redistribution}/>
				
			</div>
		{/if}
		<div class="toolItem roundItem">
			<div class="toolLabel">Round: <span class="toolValue">{round}</span></div>
		</div>
		<div class="toolItem">
			{#if !running}
				<button class="toolLabel button" on:click={playGame}>
				{#if round < 999}
					Play 1,000 rounds
				{:else}
					Play another 1,000 rounds
				{/if}
				</button>
			{:else}
				<button class="toolLabel button" disabled>Simulating...</button>
			{/if}
		</div>	
	</div>
	
	<div class="chartArea" bind:clientWidth={chartWidth}>
		<svg>
			{#each ticks as tick}
			<line x1=0 x2={chartWidth} y1={300 - (tick / highestNumber * 300) } y2={300 - (tick / highestNumber * 300)}></line>
			<text class="chartText" x=0 y={300 - (tick / highestNumber * 300) - 5}>${comma(tick)}</text>
			{/each}
			{#each players as player}
			<rect class="player" x={player.order * ((chartWidth-50) /playerNumber) + 50 } width={chartWidth / 200} height={player.height} y={windowHeight - player.height}></rect>
			{/each}
		</svg>
	</div>
	<div class="resetContainer">
	<div class="reset button" on:click={reset}>Reset</div>
</div>
</div>

<style>
	.toolbar {
		position: relative;
	}
	.body_container { padding:  20px;}
	.chartArea { height: 300px; width: 100%; margin-bottom: 10px; }
	svg { width: 100%; height: 100%; }
	.toolLabel { margin-bottom: 20px; }
	.player {
		fill:  #9e9ac8;
	}
	svg line {
		stroke-dasharray: 4px 4px;
		stroke: var(--color-gray-300);
		transition: all 100ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
	}
	svg text {
		font-family: "National 2 Web"; 
		transition: all 100ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
	}
</style>
