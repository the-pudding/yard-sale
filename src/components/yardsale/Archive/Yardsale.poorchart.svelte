<script>
	import { range } from "d3";
	import { LayerCake, Svg } from "layercake";
	import Line from "$components/charts/Line.svelte";
	import AxisX from "$components/charts/AxisX.svg.svelte";
	import AxisY from "$components/charts/AxisY.svg.svelte";
	import poorData from "$data/yardsale-poorchart.csv";

	const data = poorData.map((d) => ({
		x: d.round,
		y: d.value
	}));

	const x = "x";
	const y = "y";
	const p = 20;
	const padding = {
		top: p,
		left: 30,
		bottom: p,
		right: p
	};
	export let hed; 
	export let dek; 
	const formatTickY = d => "$"+d;
</script>
<div class="body_container">
	<section>
		<h3>{hed}</h3>
		<div class='dek'>{dek}</div>
		<figure>
			<LayerCake 
			{data}
			{x}
			{y}
			{padding}
			xDomain={ [0, 10] } 
			yDomain={ [70, 130] } 
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
<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 40vh;
	}
</style>
