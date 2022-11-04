<script>
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
			"minmax": [70,120],
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
		wagerData = getWager();

		let wager = wagerData[0];
		
		players[player].wins += 1;
		round += 1;
		players.p1.rate = Math.round(players.p1.wins / round * 100);
		players.p2.rate = Math.round(players.p2.wins / round * 100);

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

	function formatMoney(d) {
		if (d >= 0) {
			return "$" + Math.round(d);
		}
		return "-$" + Math.abs(Math.round(d));
	}
</script>
<div class="body_container">
	<div class="profile_container">
		<div class="profile">
			<div class="headshot">

			</div>
			<h3>Player 1</h3>
			<div class="stats ysm_data">
				<div class="wins">Record: {players.p1.wins}-{round-players.p1.wins} ({players.p1.rate}%)</div>
				<div class="wealth">Wealth: { formatMoney(players.p1.wealth) }</div>
				<div class="wealth">Net earnings: { formatMoney(players.p1.wealth - 100) }</div>
			</div>
		</div>

		<div class="profile">
			<div class="headshot">
				
				
			</div>
			<h3>Player 2</h3>
			<div class="stats ysm_data">
				<div class="wins">Record: {players.p2.wins}-{round-players.p2.wins} ({players.p2.rate}%)</div>
				<div class="wealth">Wealth: { formatMoney(players.p2.wealth) }</div>
				<div class="wealth">Net earnings: { formatMoney(players.p2.wealth - 1000) }</div>
			</div>
			
		</div>

	</div>
	<div class="fullInfo">
		<div class="wager_amount">
			Wager: {formatMoney(wagerData[0])}
			<div class="wager_info">(20% of {wagerData[1]}'s wealth)</div>
		</div>
		<div class="winButton button winp1" player="p1" on:click={playRound}>Player 1 wins</div>
		<div class="winButton button winp2" player="p2" on:click={playRound}>Player 2 wins</div>
	</div>
	<div class="chart_container">
		<section>
			<figure>
				<LayerCake 
				data={players.p1.data}
				{x}
				{y}
				{padding}
				xDomain={ [0, roundMax] } 
				yDomain={ [players.p1.minmax[0], players.p1.minmax[1]] } 
				>
				<Svg>
					<AxisY formatTick={formatTickY} />
					<AxisX />
					<Line 
					strokeWidth="3"
					stroke="purple"
					/>
				</Svg>
			</LayerCake>
		</figure>
	</section>
	<section>
		<figure>
			<LayerCake
			data={players.p2.data}
			{x}
			{y}
			{padding}
			xDomain={ [0, roundMax] } 
			yDomain={ [players.p2.minmax[0], players.p2.minmax[1]] } 
			>
			<Svg>
				<AxisY formatTick={formatTickY} />
				<AxisX />
				<Line 
				strokeWidth="3"
				stroke="purple"
				/>
			</Svg>
		</LayerCake>
	</figure>
</section>
</div>
<div class="resetContainer">
	<div class="reset" on:click={reset}>Reset</div>
</div>
</div>
<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 40vh;
	}
	.chart_container, .resetContainer {
		width:  150%;
		margin-left: -25%;
		display: flex;
		position: relative;
		font-family: "National 2 Web"; 
	}
	@media only screen and (max-width: 1100px) {
		.chart_container, .resetContainer {
			width:  100%;
			margin-left: 0%;
		}
	}
	.body_container  {
		width: 100%;
		margin-top: 50px;
		font-family: "National 2 Web";
				-webkit-touch-callout: none;
		-webkit-user-select: none; 
		-khtml-user-select: none; 
		-moz-user-select: none; 
		-ms-user-select: none; 
		user-select: none; 
	}
	
	.body_container section {
		flex: 2;
		margin-right:  10px;
	}
	.fullInfo {
		margin-top: 10px; 
		position: relative;
		width: 100%;
		text-align: center;
		/*border: 1px solid #ccc;*/
		padding: 5px;
		line-height: 1.1em;
	}
	.wager_amount {
		text-transform: uppercase;
	}
	.wager_info {
		text-transform: none;
		font-weight: normal;
		font-size: 14px;
		color: #888;
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
		height: 120px;
	}
	.profile {
		position: absolute;
		width: calc(50% - 120px);
	}
	.profile:nth-child(1) {
		left: 0px;
		margin-left: 120px;
	}
	.profile:nth-child(2) {
		right: 0px;
		margin-right: 120px;
		text-align: right;
	}
	.headshot {
		width: 100px;
		height: 120px;
		background: white;
		position: absolute;
		top: 0;
		border: 1px solid #000;
	}
	.profile:nth-child(1) .headshot {
		left: -120px;
	}
	.profile:nth-child(2) .headshot {
		right: -120px;
	}
	.winButton {
		position: absolute;
		display: inline-block;
		width: 100px;
		bottom: 0;
		height: 100%;
	}
	.winp1 {
		left:  0px;
	}
	.winp2 {
		right: 0;
	}
</style>
