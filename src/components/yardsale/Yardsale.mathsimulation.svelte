<script>
	import { fade } from 'svelte/transition';
	import { range } from "d3";
	import { LayerCake, Svg } from "layercake";
	import Line from "$components/charts/Line.svelte";
	import AxisX from "$components/charts/AxisX.svg.svelte";
	import AxisY from "$components/charts/AxisY.svg.svelte";
	// import poorData from "$data/yardsale-poorchart.csv";
	let round = 0;
	let roundMax = 10;
	let players = {
		"p1": {
			"wins": 0,
			"rate": 0,
			"wealth": 100,
			"minmax": [70,130],
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
			"minmax": [700,1300],
			"mood": "happy",
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

	function playRound(event) {
		let player = event.target.getAttribute("player");
		players.p1.latest = player == "p1" ? "win" : "lost";
		players.p2.latest = player == "p2" ? "win" : "lost"; 
		wagerData = getWager();

		let wager = wagerData[0];
		
		players[player].wins += 1;
		round += 1;
		players.p1.rate = Math.round(players.p1.wins / round * 100);
		players.p2.rate = Math.round(players.p2.wins / round * 100);

		players.p1.mood = players.p1.rate >= 51 ? "happy" : "sad";
		players.p2.mood = players.p2.rate >= 50 ? "happy" : "sad"; 

		if (player == "p1") {
			players.p1.data.push({"x": round, "y": players.p1.wealth += wager});
			players.p2.data.push({"x": round, "y": players.p2.wealth -= wager});
		} else {
			players.p1.data.push({"x": round, "y": players.p1.wealth -= wager});
			players.p2.data.push({"x": round, "y": players.p2.wealth += wager});
		}
		if (round > 9) {
			roundMax = null;
		}
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
		wagerData = getWager();
		console.log(players)
	}

	function reset() {
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
	}

	function getWager() {
		let w = players.p1.data[round].y * 0.2;
		let poorerPlayer = "Player 1"; 
		if (players.p1.data[round].y > players.p2.data[round].y) {
			w = players.p2.data[round].y * 0.2;
			poorerPlayer = "Player 2";
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
		<div class="fullInfo">
			<div class="wager_amount">
				Winner gets <strong>{formatMoney(wagerData[0])}</strong>
				<div class="wager_info">(20% of {wagerData[1]}'s wealth)</div>
			</div>
		</div>
		<div class="chart_container extrawide">

			<!-- PLAYER 1 CONTAINER -->
			<section>
				<figure>
					<div class="profile profile1">
						<div class="headshot bg-{players.p1.mood}" style="background-image:url(assets/yardsale/art/player1-{players.p1.mood}.png)">
							{#if players.p1.wins == 0 && players.p2.wins == 0}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>I'm poorer, so I can only bet 20% of my money.</div>
							{/if}
							{#if players.p1.wins == 1 && players.p2.wins == 0}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>Yes! I win $20!</div>
							{/if}
							{#if players.p1.rate < 45 && players.p1.latest == "lost" && players.p2.wins > 2}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>Let me win half the time!</div>
							{/if}
							{#if players.p1.rate == 50 && players.p1.wins > 2 && players.p1.wealth < players.p2.wealth}
							<div class="speechBubble player1bubble" in:fade={{ delay: 0 }} out:fade>I've won 50%, but I lost money!?</div>
							{/if}
						</div>
						<div class="playerName">
							<strong>Player 1</strong>
							<br>{ formatMoney(players.p1.wealth) }
							<br>{players.p1.wins}-{round-players.p1.wins} ({players.p1.rate}%)
						</div>

						<!-- Winner buttons -->
						{#if round == 0}
						<div class="winButton button winp1 bounce" player="p1" on:click={playRound}>Win</div>
						{:else}
						<div class="winButton button winp1" player="p1" on:click={playRound}>Win</div>
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
						words={ formatMoney(players.p1.wealth - 100, true) }
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
					<div class="playerName"><strong>Player 2</strong>
						<br>{ formatMoney(players.p2.wealth) }
						<br>{players.p2.wins}-{round-players.p2.wins} ({players.p2.rate}%)
					</div>
					<div class="winButton button winp2" player="p2" on:click={playRound}>Win</div>
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
					words={ formatMoney(players.p2.wealth - 1000, true) }
					/>
				</Svg>
			</LayerCake>
		</figure>
	</section>
</div>
<div class="resetContainer extrawide">
	<div class="reset" on:click={reset}>Reset</div>
</div>
</div>
</div>
<style>
	.interactive_container {
		padding: 2px 0;
	}
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 50vh;
		position: relative;
	}
	.chart_container, .resetContainer {
		display: flex;
		position: relative;
		font-family: "National 2 Web"; 
	}
	.ysm_container  {
		width: 100%;
		max-width:700px;
		margin: 0px auto;
		padding: 0 10px;
		font-family: "National 2 Web";
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
		background: #eee; 
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
			font-family: "National 2 Web"; 
		}
		.ysm_container section {
			flex: 1;
			margin:  0px !important;
		}
		figure {
			margin: 1rem auto;
			width: 100%;
			height: 35vh;
		}
	}
	.fullInfo { 
		position: relative;
		width: 100%;
		text-align: center;
		padding: 5px;
		line-height: 1.1em;
		font-size: 24px;
		margin: 10px 0;
	}
	.wager_info {
		text-transform: none;
		font-weight: normal;
		font-size: 14px;
		color: var(--category-bg-purple);
	}
	h3 {
		font-weight: 500;
		margin: 0 0 5px 0;
	}
	.body_container section:nth-child(2) {
		text-align: right;
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
		left: 5px;
	}
	.playerName {
		position: absolute;
		width: calc(100% - 60px);
		top: 0px;
		left: 60px;
		line-height: 1.2em;
	}
	.profile1 {
		left: 5px;
	}
	.headshot {
		width: 50px;
		height: 60px;
		background: #b1a4ba;
		position: absolute;
		top: 0;
		border: 1px solid var(--category-bg-purple);
		background-size: 120% auto;
		background-repeat: no-repeat;
		background-position: 30% 2px;
		box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.4) inset;
		-webkit-box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.4) inset;
		-moz-box-shadow: 0px -1px 25px 0px rgba(0,0,0,0.4) inset; 
	}
	@media only screen and (max-width: 550px) {
		.profile {
			margin: 0 !important;
		}
		.fullInfo {
			margin-top: 0;
		}
	}
	.headshot.bg-sad {
		background-color: var(--category-purple);
	}
	.headshot.bg-happy {
		background-color: var(--category-purple);
	}
	.winButton {
		position: absolute;
		right: 20px;
		top: 0px;
		width: 60px;
	}
	.winButton.bounce {
		animation: bounce 1s ease infinite;
	}

	.speechBubble {
		width: 240%;
		bottom: 110%;
		color: black;
	}
	.speechBubble {
		left: 2%;
	}
	.speechBubble:before {
		border-right: 3px solid transparent;
		left: 30%;
		right: auto;
	}

</style>
