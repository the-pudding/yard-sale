<script>
	import { fade } from 'svelte/transition';
	import { range } from "d3";
	import { LayerCake, Svg } from "layercake";
	import Line from "$components/charts/Line.svelte";
	import AxisX from "$components/charts/AxisX.svg.svelte";
	import AxisY from "$components/charts/AxisY.svg.svelte";

	let winningPlayer = "p1";
	let round = 0;
	let roundMax = 10;
	let players = {
		"p1": {
			"wins": 0,
			"rate": 0,
			"wealth": 100,
			"minmax": [70,130],
			"mood": "sad",
			"data": [{
				x: 0,
				y: 100
			}]
		},
		"p2": {
			"wins": 0,
			"rate": 0,
			"wealth": 1000,
			"minmax": [700,1300],
			"mood": "sad",
			"data": [{
				x: 0,
				y: 1000
			}]
		}
	}

	const x = "x";
	const y = "y";
	const p = 30;
	const padding = {
		top: p,
		left: 50,
		bottom: p,
		right: p
	};
	const formatTickY = d => "$"+d;
	let wagerData = getWager();


	let playerWinOrder = ["p1","p2","p1","p2","p1","p1","p2","p2","p2","p1","p1","p1","p2","p2"];
	// Playing one round of the a coin flip.
	// Triggered on "Win" button click
	function playRound(event) {
		// Setting the latest winner
		// let player = event.target.getAttribute("player");
		let gamesPlayed = players.p1.data.length;
		if (gamesPlayed < playerWinOrder.length - 1) {
			winningPlayer = playerWinOrder[gamesPlayed-1];
		} else {
			winningPlayer = playerWinOrder[Math.round(Math.random()*(playerWinOrder.length-1) )];
		}
		players.p1.latest = winningPlayer == "p1" ? "win" : "lost";
		players.p2.latest = winningPlayer == "p2" ? "win" : "lost"; 
		
		// Calculating wager
		wagerData = getWager();

		let wager = wagerData[0];
		
		// Updating player info based on who won
		console.log(winningPlayer);
		players[winningPlayer].wins += 1;
		round += 1;
		players.p1.rate = Math.round(players.p1.wins / round * 100);
		players.p2.rate = Math.round(players.p2.wins / round * 100);
		players.p1.mood = players.p1.rate >= 51 ? "happy" : "sad";
		players.p2.mood = players.p2.rate >= 50 ? "happy" : "sad"; 
		if (winningPlayer == "p1") {
			players.p1.data.push({"x": round, "y": players.p1.wealth += wager});
			players.p2.data.push({"x": round, "y": players.p2.wealth -= wager});
		} else {
			players.p1.data.push({"x": round, "y": players.p1.wealth -= wager});
			players.p2.data.push({"x": round, "y": players.p2.wealth += wager});
		}

		// Updating chart settings
		if (players.p1.wealth > players.p1.minmax[1]) {
			players.p1.minmax[1] = players.p1.wealth * 1.1;
		}
		if (players.p1.wealth < players.p1.minmax[0]) {
			players.p1.minmax[0] = players.p1.wealth * 0.9;
		}
		if (players.p2.wealth > players.p2.minmax[1]) {
			players.p2.minmax[1] = players.p2.wealth * 1.1;
		}
		if (players.p2.wealth < players.p2.minmax[0]) {
			players.p2.minmax[0] = players.p2.wealth * 0.9;
		}

		if (round > 9) {
			roundMax = null;
		}

		// Getting new wager data for interface
		wagerData = getWager();
	}

	function reset() {
		playerWinOrder = ["p1","p2"];
		round = 0;
		roundMax = 10;
		players = {
			"p1": {
				"wins": 0,
				"rate": 0,
				"wealth": 100,
				"minmax": [70,120],
				"mood": "happy",
				"data": [{
					x: 0,
					y: 100
				}]
			},
			"p2": {
				"wins": 0,
				"rate": 0,
				"wealth": 1000,
				"minmax": [900,1100],
				"mood": "happy",
				"data": [{
					x: 0,
					y: 1000
				}]
			}
		}
		wagerData = [20,"Player 1"];
	}

	function getWager() {
		let w = players.p1.data[round].y * 0.2;
		let poorerPlayer = "You (poorer player)"; 
		if (players.p1.data[round].y > players.p2.data[round].y) {
			w = players.p2.data[round].y * 0.2;
			poorerPlayer = "Richer player";
		}
		return [w, poorerPlayer];
	}

	function comma(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function formatMoney(d, plusminus) {
		if (d >= 0) {
			if (plusminus && d > 0) {
				return "+$" + comma(Math.round(d));
			}
			return "$" + comma(Math.round(d));
		}
		return "-$" + comma((Math.abs(Math.round(d))));
	}
</script>
<div class="interactive_container">
	<div class="ysm_container">
		<!-- Top text -->
		<div class="fullInfo">
			<div class="wager_amount">
				Flip a coin to see who wins <strong>{formatMoney(wagerData[0])}</strong>
			<!-- 	<div class="fullInfoSub">(20% of {wagerData[1]}'s wealth)</div> -->
			</div>
			{#if players.p1.data.length == 1}
				<button class="flipButton button bounce" player="" on:click={playRound}>Flip coin</button>
			{:else}
				<button class="flipButton button" player="" on:click={playRound}>Flip coin</button>
			{/if}
		</div>
		<!-- TWO CHARTS -->
		<div class="chart_container extrawide">

			<!-- PLAYER 1 CONTAINER -->
			<section>
				<figure>
					<div class="profile profile1">
						<div class="headshot bg-{players.p1.mood}" style="background-image:url(assets/yardsale/art/player1-{players.p1.mood}.png)">
							{#if players.p1.wins == 0 && players.p2.wins == 0}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>Flip the coin.</div>
							{/if}
							{#if players.p1.wins == 1 && players.p2.wins == 0}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>I won! Now I can wager more.</div>
							{/if}
							{#if players.p1.wins == 0 && players.p2.wins == 1}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>Now my turn to win!</div>
							{/if}
							{#if players.p1.rate < 45 && players.p1.latest == "lost" && players.p2.wins > 2 && round < 20}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>Let me win half the time!</div>
							{/if}
							{#if players.p1.wins == 1 && players.p2.wins ==1}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>I'm 1-1, but I lost money?</div>
							{/if}
							{#if players.p1.rate == 50 && players.p1.wins > 1 && players.p1.wealth < players.p2.wealth && round < 20}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>I've won 50%, but I lost money!?</div>
							{/if}
							{#if players.p1.rate == 50 && players.p1.wins >= 5 && players.p1.wins < 3 && players.p1.wealth < players.p2.wealth}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>When I lose, I have less to wager!</div>
							{/if}
						</div>
						<div class="playerName">
							<strong>You (poorer player)</strong>
							<br>{ formatMoney(players.p1.wealth) }
							<br>{players.p1.wins}-{round-players.p1.wins} ({players.p1.rate}%)
						</div>

						<!-- Winner buttons -->
						<!-- {#if players.p1.data.length > 3}
						<div class="winButton button winp1" player="p1" on:click={playRound}>Win</div>
						{/if} -->
						{#if winningPlayer == "p2" && round > 0}
						<div class="winWords">Lose</div>
						{:else if winningPlayer == "p1" && round > 0}
						<div class="winWords happyWords">Win</div>
						{/if}
					</div>
					<LayerCake 
					data={players.p1.data}
					{x}
					{y}
					{padding}
					xDomain={ [0, roundMax] } 
					yDomain={ [players.p1.minmax[0], players.p1.minmax[1]] } 
					>
					<Svg>
						<AxisY formatTick={formatTickY} baseTick=100 />
						<AxisX />
						<Line 
						strokeWidth="5"
						stroke="#420070"
						/>
					</Svg>
					</LayerCake>
				</figure>
			</section>

			<!-- PLAYER 2 CONTAINER -->
			<section>
				<figure>
					<div class="profile profile2">
						<div class="headshot bg-{players.p2.mood}" style="background-image:url(assets/yardsale/art/player4-{players.p2.mood}.png)">
							
							{#if players.p2.rate < 45 && players.p2.latest == "lost" && players.p1.wins > 2 &&  players.p1.wins < 8}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>This is unfair.</div>
							{/if}
						</div>
						<div class="playerName"><strong>Richer player</strong>
							<br>{ formatMoney(players.p2.wealth) }
							<br>{players.p2.wins}-{round-players.p2.wins} ({players.p2.rate}%)
						</div>
						<!-- {#if players.p1.data.length > 3}
						<div class="winButton button winp2" player="p2" on:click={playRound}>Win</div>
						{/if} -->
						{#if winningPlayer == "p1" && round > 0}
						<div class="winWords">Lose</div>
						{:else if winningPlayer == "p2" && round > 0}
						<div class="winWords happyWords">Win</div>
						{/if}
					</div>
					<LayerCake
					data={players.p2.data}
					{x}
					{y}
					{padding}
					xDomain={ [0, roundMax] } 
					yDomain={ [players.p2.minmax[0], players.p2.minmax[1]] } 
					>
					<Svg>
						<AxisY formatTick={formatTickY} baseTick=1000 />
						<AxisX />
						<Line 
						strokeWidth="5"
						stroke="#420070"
						/>
					</Svg>
					</LayerCake>
				</figure>
			</section>
		</div>
		<div class="resetContainer extrawide">
			<button class="reset" on:click={reset}>Reset</button>
		</div>
	</div>
</div>
<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 50vh;
		position: relative;
	}
	.chart_container, .resetContainer {
		display: flex;
		position: relative;
	}
	.ysm_container  {
		width: 100%;
		max-width:700px;
		margin: 0px auto;
		padding: 0 10px;
		color:  var(--category-bg-purple);
		-webkit-touch-callout: none;
		-webkit-user-select: none; 
		-khtml-user-select: none; 
		-moz-user-select: none; 
		-ms-user-select: none; 
		user-select: none; 
	}
	
	.ysm_container section {
		flex: 2;
	}
	.ysm_container section figure {
		background: #fff; 
		padding: 60px 5px 5px;
		border: 1px solid var(--category-purple2);
	}
	.ysm_container section:nth-child(1) {
		margin-right:  5px;
	}
	.ysm_container section:nth-child(2) {
		margin-left:  5px;
	}
	@media only screen and (max-width: 550px) {
		.chart_container, .resetContainer {
			display: block;
			position: relative;
		}
		.ysm_container section {
			flex: 1;
			margin: 0px !important;
		}
		figure {
			margin: 0.3rem auto;
			width: 100%;
			height: 38vh;
		}
	}

	
	.profile_container {
		display: block;
		width: 100%;
		position: relative;
		height: 50px;
	}
	.profile {
		position: absolute;
		width: 100%;
		top: 10px;
		left: 10px;
	}
	.playerName {
		position: absolute;
		width: calc(100% - 60px);
		top: 0px;
		left: 60px;
		line-height: 1.2em;
	}
	.headshot {
		position: absolute;
		width: 50px;
		height: 60px;
		background-color: #cdcdcd;
		border: 1px solid var(--category-purple2);
		background-size: 120% auto;
		background-repeat: no-repeat;
		background-position: 30% 2px;
	}
	.headshot.bg-happy {
		background-color: #f5cd49;
	}
	@media only screen and (max-width: 550px) {
		.profile {
			margin: 0 !important;
		}
		.fullInfo {
			margin-top: 0;
		}
	}
	.winWords {
		position: absolute;
		right: 20px;
		top: 0px;
		width: 60px;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		color: black;
		background: #ccc;
	}
	.happyWords.winWords {
		background: #f5cd49;
	}
	.winButton {
		position: absolute;
		right: 20px;
		top: 0px;
		width: 60px;
	}
	.flipButton {
		margin: 10px auto;
		width: 160px;
		font-weight: bold;
		font-size:  16px;
	}
	@media only screen and (max-width: 500px) {
		.wager_amount {
			text-align: center;
		}
		.fullInfo {
			text-align: right;
		}
	}
	.speechBubble {
		width: 300%;
		bottom: 110%;
		left: 10%;
	}

</style>
