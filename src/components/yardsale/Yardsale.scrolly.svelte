<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { fade } from 'svelte/transition';
	export let words;
	export let hed;
	export let dek;
	let currentStage = 0;
	let value = 0;

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
		"0": 1,
		"1": 1,
		"2": 2,
		"3": 3,
		"4": 4,
		"5": 5,
		"6": 4,
		"7": 4,
		"8": 5,
		"9": 6,
		"10": 6,
		"11": 6,
		"12": 6
	}

	$: {
		newScroll(value)
	}
	function newScroll(v) {
		currentStage = v == undefined ? 0 : stageLookup[v];
	}
	
</script>

<section id="scrolly">
	<div class="scrollyBackground">
		<img src="assets/yardsale/{currentStage}.jpg" alt="stageImage"/>
		{#if value == undefined}
			<div class="hedContainer">
				<h1>Why the rich get richer</h1>
				<div class="dek">...according to simple math</div>
				<!-- <h1 class="hed">{hed}</h1> -->
				<!-- <div class="dek">{dek}</div> -->
			</div>
		{/if}
	</div>
	<Scrolly bind:value>
		{#each words as text, i}
		{@const active = value === i}
		<div class="step" class:active>
			<p>{@html convertToHTML(text + "<span style='color: #aaa;font-size:10px;margin-left:5px;'>" + i + "</span>")}</p>
		</div>
		{/each}
	</Scrolly>
	<!-- <div class="spacer" /> -->
</section>

<style>
	.hedContainer {
		position: absolute;
		left: 50%;
		transform:  translateX(-50%);
		top:  0%;
		max-width: 500px;
		font-family:  "National 2 Web";
		width:  100%;
		text-align:  center;
		-webkit-text-stroke: 1px black;
   color: black;
   text-shadow:
       3px 3px 0 #fff,
     -1px -1px 0 #fff,  
      1px -1px 0 #fff,
      -1px 1px 0 #fff,
       1px 1px 0 #fff;
	}
	.hedContainer h1 {
		font-size: 70px;
		font-weight:  bold;
		line-height:  1.1em;
		/*text-transform: uppercase;*/
	}
	.hedContainer .dek {
		font-size: 26px;
		font-style:  italic;
	} 
	#scrolly {
		max-width:  1100px;
		margin: 0 auto;
	}
	.scrollyBackground {
		position: sticky;
		/*top: 4em;*/
		top:  0;
		width:  100%;
		height:  100vh;
		min-height:  500px;
		z-index: -1;
		overflow: hidden;
	}
	.scrollyBackground img {
		position: absolute;
		width:  100%;
	}
	.scrollyBackground .hidden {
		opacity:  0;
	}
	.spacer {
		height: 75vh;
	}

	.step {
		height: 100vh;
		text-align: left;
		z-index: 100;
	}

	.step p {
		font-family:  "National 2 Web";
		width: 100%;
		max-width: 400px;
		margin-left:  5px;
		border:  1px solid #000;
		padding: 1rem;
		background:  white;
		font-size:  18px;
	}

</style>
