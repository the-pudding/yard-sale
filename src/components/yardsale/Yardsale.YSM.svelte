<script>
	import { onMount } from 'svelte';
	import Range from "$components/helpers/Range.svelte";
	import { fade } from 'svelte/transition';
	let players = [];
	let players_redist = [];
	let ticks = [];
	let windowHeight;
	let playerNumber = 100;
	let startingAmount = 1000;
	let worldrecord = 0;
	let highestNumber = 0;
	let maxWager = 20;
	let round = 0;
	let roundLimit = 0;
	let chartWidth, chartHeight;
	let redistribution = 0.5;
	let redistributionPot = 0;
	let running = false;
	let loaded = 0;
	export let redist;

	function generatePlayers() {
		players = [];
		players_redist = [];
		for (let i in [...Array(playerNumber).keys()]) {
			let player = {
				"wealth": 1000,
				"id": i,
				"order": 0,
				"height": 0
			} 
			let player_redist  = {
				"wealth": 1000,
				"id": i,
				"order": 0,
				"height": 0
			} 
			players.push(player);
			players_redist.push(player_redist);
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
		players_redist = shuffle(players_redist); 
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
			
			///// REDISTRIBUTION
			
			let player1_r = players_redist[i];
			let player2_r = players_redist[i+1];
			let playerOrder_r = player1_r.wealth > player2_r.wealth ? [player1_r, player2_r] : [player2_r, player1_r]; // array with [wealthierPlayer, poorerPlayer] 
			let wager_r = playerOrder_r[1].wealth * maxWager/100; // the second player in the playerOrder array is poorer
			let payouts_r = Math.random() > 0.5 ? [wager_r, -wager_r] : [-wager_r, wager_r]; // randomize who wins, and return array of payouts
			
			// Adding the payout
			players_redist[i].wealth = players_redist[i].wealth + payouts_r[0];
			players_redist[i + 1].wealth = players_redist[i + 1].wealth + payouts_r[1];

			// Adding a portion to the redistribution pot
			redistributionPot += players_redist[i].wealth * redistribution/100;
			redistributionPot += players_redist[i + 1].wealth * redistribution/100;

			// Taking redistributed amount away from player
			players_redist[i].wealth = players_redist[i].wealth - (players_redist[i].wealth * redistribution/100);
			players_redist[i + 1].wealth = players_redist[i + 1].wealth - (players_redist[i + 1].wealth * redistribution/100);
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


	function sortPlayers() {
		// Redistribute the pot
		for (var i = 0; i < players_redist.length; i++) {
			players_redist[i].wealth = players_redist[i].wealth + redistributionPot / 100;
		}
		players.sort(dynamicSort("wealth"));
		players_redist.sort(dynamicSort("wealth"));
		// Iterating through player to determine highest number AND to give players the redistributed pot
		worldrecord = 0;
		highestNumber = 0;
		for (let i = 0; i < players.length; i++) {
			players[i].wealth = players[i].wealth; // + redistributionPot / 100;
			if (players[i].wealth > worldrecord) {
				worldrecord = players[i].wealth;
			}
		};
		
		if (worldrecord > 40000) {
			highestNumber = 120000;
		} else if (worldrecord > 8000) {
			highestNumber = 50000;
		} else {
			highestNumber = 10000;
		}

		// Giving some breathing room for the highest number
		// highestNumber = highestNumber <= 200 ? 200 : highestNumber * 1.2;
		// setting the ticks based on the highest number
		ticks = [];
		for (var i = 0; i < highestNumber; i += highestNumber/5) {
			ticks.push(i);
		}
		for (var i = 0; i < players.length; i++) {
			players[i].order = i;
			players[i].height = (players[i].wealth / highestNumber) * chartHeight;
			players[i].height = players[i].height < 2 ? 2 : players[i].height;
		}
		
		for (var i = 0; i < players_redist.length; i++) {
			players_redist[i].order = i;
			players_redist[i].height = (players_redist[i].wealth / highestNumber) * chartHeight;
			players_redist[i].height = players_redist[i].height < 2 ? 2 : players_redist[i].height;
		}
	}

	function reset() {
		round = 0;
		roundLimit = 0;
		redistributionPot = 0;
		generatePlayers();
		sortPlayers();
	}

	
	generatePlayers();
	sortPlayers();	

	$: {
		chartHeight = windowHeight - 50;
		generatePlayers();
		sortPlayers();
	}

	// Utilities

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

<!-- If redistribution is on, display the options -->
{#if redist == 1}

<div class="body_container">
	<p><strong>Maximum wager:</strong> What is the maximum percentage of wealth each person is willing to wager each round?</p>
	<div class="toolbar ysm_data fullInfo">
		<div class="toolItem">
			<Range min=1 max=100 bind:value={maxWager} dis={running}/>
			<div class="toolValue">{maxWager}%</div>
		</div>
	</div>


	<p><strong>Redistribution:</strong> How much of each player's wealth should be redistributed to everyone else after each round?</p>
	<div class="toolbar ysm_data fullInfo">
		<div class="toolItem">
			<Range min=0 max=5 step=0.1 bind:value={redistribution} dis={running}/>
			<div class="toolValue">{redistribution.toFixed(1)}%</div>
		</div>
	</div>

	<p>This time players will be willing to bet <strong>{maxWager}%</strong> of their wealth each game. After each round, we'll tax every player <strong>{redistribution.toFixed(1)}%</strong> and disperse it evenly to all players.</p>
	<p>Let's track how people playing <span class="purple">with redistribution</span> fare compared to people playing <span class="yellow">without redistribution</span>.</p>
</div>
{/if}

<!-- YSM -->
<div class="interactive_container">
	<div class="ysm_container">
		<div class="chartArea" bind:clientWidth={chartWidth} bind:clientHeight={windowHeight}>
			<div class="toolLabel">Round: <span class="toolValue">{comma(round)}</span></div>
			<div class="toolItem">
				{#if !running}
				<button class="toolLabel button" on:click={playGame}>
					{#if round < 999}
					Play 1,000 rounds
					{:else}
					Another 1,000 rounds
					{/if}
				</button>
				{:else}
				<button class="toolLabel button" disabled>Simulating...</button>
				{/if}
			</div>	
			{#if chartWidth > 0}
			<svg>
				{#each ticks as tick}
				<line x1=0 x2={chartWidth} y1={chartHeight - (tick / highestNumber * chartHeight) } y2={chartHeight - (tick / highestNumber * chartHeight)}></line>
				<text class="chartText" x=0 y={chartHeight - (tick / highestNumber * chartHeight) - 5}>${comma(tick)}</text>
				{/each}
				{#each players as player}
					{#if redist == 1}
						<rect class="player player{player.order} faded" x={player.order * ((chartWidth-100) / playerNumber) + 50 } width={chartWidth / 200} height={player.height} y={chartHeight - player.height}></rect>
					{:else}
						<rect class="player player{player.order}" x={player.order * ((chartWidth-100) / playerNumber) + 50 } width={chartWidth / 200} height={player.height} y={chartHeight - player.height}></rect>
					{/if}
				{/each}
				{#if redist == 1}
					{#each players_redist as player}
					<rect class="player player{player.order} redist" x={player.order * ((chartWidth-100) / playerNumber) + 50 } width={chartWidth / 200} height={player.height} y={chartHeight - player.height}></rect>
					{/each}
				{/if}

			{#if !running}
			
				{#if redist == 1}
				{#each players as player}
						{#if player.order == 99 && round > 100}
							<text class="player2Text red" width={200} x={player.order * ((chartWidth-100) / playerNumber) + 50} y={chartHeight - player.height - 7} in:fade={{ delay: 200 }}>Richest w/o redistribution: ${comma(Math.round(player.wealth))}</text>
						{/if}
					{/each}
				
					{#each players_redist as player}
					{#if player.order == 0}
					<text class="player1Text" x={player.order * ((chartWidth-50) /playerNumber) + 45 } y={chartHeight - player.height - 7} in:fade={{ delay: 200 }}>Poorest: ${comma(Math.round(player.wealth))}</text>
					{/if}
					{#if player.order == 99 }
					<text class="player2Text" width={200} x={player.order * ((chartWidth-100) / playerNumber) + 50} y={chartHeight - player.height - 7} in:fade={{ delay: 200 }}>Richest: ${comma(Math.round(player.wealth))}</text>
					{/if}
					{/each}
				{:else}
					{#each players as player}
						{#if player.order == 0}
						<text class="player1Text" x={player.order * ((chartWidth-50) /playerNumber) + 45 } y={chartHeight - player.height - 7} in:fade={{ delay: 200 }}>Poorest: ${comma(Math.round(player.wealth))}</text>
						{/if}
						{#if player.order == 99 }
						<text class="player2Text" width={200} x={player.order * ((chartWidth-100) / playerNumber) + 50} y={chartHeight - player.height - 7} in:fade={{ delay: 200 }}>Richest: ${comma(Math.round(player.wealth))}</text>
						{/if}
					{/each}
				{/if}
			{/if}
			</svg>
			{/if}
		</div>
		<div class="resetContainer">
			<button class="reset button" on:click={reset}>Reset</button>
		</div>
	</div>
</div>

<style>
	.interactive_container {
		margin: 1.5%;
		width: 97%;
	}
	.ysm_container {
		background: white;
		padding: 20px 0 0px;
		border: 1px solid var(--category-purple2);
	}
	.toolbar {
		position: relative;
		margin-bottom: 10px;
		text-align: center;
	}
	.toolItem {
		text-align: right;
		position: absolute;
		right: 20px;
		top: 0px;
		width: 200px;
	}
	.toolbar .toolItem {
		width: calc(100% - 60px);
		position: relative;
		margin: 20px 10px;
	}
	.chartArea {
		position: relative;
	}
	.chartArea .toolLabel {
		color: black !important;
		font-size: 16px;
		line-height: 1.5em;
		max-width: 500px;
		/* margin: 0 auto; */
		right: 0px;
		left: auto;
		width: 200px;
	}
	@media only screen and (max-width: 500px) {
		.chartArea .toolItem, .chartArea .toolLabel {
			position: static !important;
			display: block;
			text-align: center;
			margin: 0px auto;
			width: 80%;
		}
		.chartArea .toolLabel {
			margin: 0px auto 10px !important;
		}
		.resetContainer {
			margin-top: 80px
		}
	}
	.toolbar .toolValue {
		color: var(--category-bg-purple);
		position: absolute;
		left: 102%;
		top: 0px;
		font-size: 20px;
	}
	.toolValue {
		margin-top: -24px;
		font-weight: bold;
		margin-bottom: 20px;
		color: var(--category-bg-purple);
	}
	.ysm_container {
		width: 100%;
		max-width:700px;
		margin: 10px auto 0;
	}
	.chartArea { height: 60vh; max-height: 500px; min-height: 300px; margin-bottom: 10px; padding: 10px; box-sizing: border-box; }
	svg { width: calc(100% - 30px); height: 100%; }
	.chartArea .toolLabel { position: absolute; left: 10px; top: 10px }
</style>
