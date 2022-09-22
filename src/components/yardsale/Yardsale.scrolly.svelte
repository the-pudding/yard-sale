<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	export let words;

	let value = 0;
	$: {
		newScroll(value)
	}
	function newScroll(v) {

	}
	
</script>

<section id="scrolly">
	<div class="scrollyBackground">
		<img src="assets/yardsale/test.jpg" alt="cat"/>
	</div>
	<Scrolly bind:value>
		{#each words as text, i}
		{@const active = value === i}
		<div class="step" class:active>
			<p>{text}</p>
		</div>
		{/each}
	</Scrolly>
	<!-- <div class="spacer" /> -->
</section>

<style>
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
	.spacer {
		height: 75vh;
	}

	.step {
		height: 80vh;
		text-align: left;
		z-index: 100;
	}

	.step p {
		width: 100%;
		max-width: 500px;
		margin-left:  5px;
		border:  1px solid #000;
		padding: 1rem;
		background:  white;
		font-size:  23px;
/*		background: var(--color-gray-100);*/
}
</style>
