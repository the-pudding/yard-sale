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

	function playRound(event) {
		let player = event.target.getAttribute("player");

		let wager = players.p1.data[round].y * 0.2;
		if (players.p1.data[round].y > players.p2.data[round].y) {
			wager = players.p2.data[round].y * 0.2;
		}
		
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
</script>
<div class="body_container">
	<div class="chart_container">
		<span class="reset" on:click={reset}>Reset</span>
		<section>
			<h3>Poorer player <span class="winButton" player="p1" on:click={playRound}>Win</span></h3>
			<div class="stats">
				<div class="wins">Record: {players.p1.wins}-{round-players.p1.wins}</div>
				<div class="winRate">Win pct: {players.p1.rate}%</div>
				<div class="wealth">Wealth: ${ Math.round(players.p1.wealth) }</div>
				<div class="wealth">Net earnings: ${ Math.round(players.p1.wealth - 100) }</div>
			</div>
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
		<h3>Richer player <span class="winButton" player="p2" on:click={playRound}>Win</span></h3>
		<div class="stats">
			<div class="wins">Record: {players.p2.wins}-{round-players.p2.wins}</div>
			<div class="winRate">Win pct: {players.p2.rate}%</div>
			<div class="wealth">Wealth: ${ Math.round(players.p2.wealth) }</div>
			<div class="wealth">Net earnings: ${ Math.round(players.p2.wealth - 1000) }</div>
		</div>
		
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
</div>
<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 40vh;
	}
	.chart_container {
		width:  150%;
		margin-left: -25%;
		display: flex;
		position: relative;
	}
	.body_container  {
		width: 100%;
	}
	.reset {
		position: absolute;
		right: 0px;
		top:  20px;
		background: rgba(0,0,0,0.1);
		color:  #999;
		padding:  5px;
		cursor: pointer;
		-webkit-touch-callout: none;
		-webkit-user-select: none; 
		-khtml-user-select: none; 
		-moz-user-select: none; 
		-ms-user-select: none; 
		user-select: none;
	}
	.reset:hover {
		text-decoration: underline;
	}
	.reset:active {
		color:  black;
	}
	.body_container section {
		flex: 2;
		margin-right:  10px;
	}
	section h3 {
		-webkit-touch-callout: none;
		-webkit-user-select: none; 
		-khtml-user-select: none; 
		-moz-user-select: none; 
		-ms-user-select: none; 
		user-select: none; 
	}
	.winButton {
		cursor: pointer;
		margin:  0 10px;
		padding:  5px;
		font-size:  16px;
		border:  1px solid #aaa;
		background: white;
	}
	.winButton:hover {
		text-decoration: underline;
	}
	.winButton:active{
		background: #ccc;
	}
</style>
