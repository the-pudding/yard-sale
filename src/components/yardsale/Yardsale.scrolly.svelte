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
		"scrolly1-0": [1, -10, -10, 120],
		"scrolly1-1": [1, -70, -60, 250],
		"scrolly1-2": [2, -70, -60, 250],
		"scrolly2-0": [3, 0, 0, 100],
		"scrolly2-1": [4, 0, 0, 100],
		"scrolly2-2": [5, 0, 0, 100],
		"scrolly2-3": [4, 0, 0, 100],
		"scrolly2-4": [4, 0, 0, 100],
		"scrolly2-5": [5, 0, 0, 100],
		"scrolly2-6": [5, 0, 0, 100],
		"scrolly2-7": [5, 0, 0, 100],
		"scrolly2-8": [5, 0, 0, 100],
		"scrolly2-9": [5, 0, 0, 100],
		"scrolly3-0": [6, 0, 0, 100, 2, 1],
		"scrolly3-1": [6, 0, 0, 100, 2, 1],
		"scrolly3-2": [6, 0, 0, 100, 10000, 20],
		"scrolly3-3": [6, 0, 0, 100, 10000, 1000]
	}

	$: {
		newScroll(value)
		currentStage = currentStage;
		stepWidth = stepWidth;
		stepHeight = stepHeight;
		panelHeight = stepWidth * 0.8;
	}
	function newScroll(v) {
		v = v == undefined ? currentStageNumber : v;
		currentStageNumber = v;
		currentStage = v == undefined ? stageLookup[container + "-0"] : stageLookup[container + "-" + v];
	}
	
</script>

<section class="scrolly" id={container}>
	<div class="scrollyBackground" bind:clientHeight={stepHeight} bind:clientWidth={stepWidth} style="height:{panelHeight}px;">
		{#if container != "scrolly3"}
			<img src="assets/yardsale/{currentStage[0]}.jpg" alt="stageImage" style="left: {currentStage[1]}%; top: {currentStage[2]}%; width: {currentStage[3]}%;"/>
		{:else}
			<YardsaleYSMIntro roundLimit={currentStage[4]} increment={currentStage[5]} />
		{/if}
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
		border: 2px solid #000;
	}
	
	.scrollyBackground img {
		position: absolute;
		width:  100%;
		max-width: none !important;
		transition: all 1200ms cubic-bezier(0.250, 0.100, 0.250, 1.000); 
		transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
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
