<script>
	import wordmark from "$svg/wordmark.svg";
	import Tip from "$components/helpers/Tip.svelte";
</script>

<header>
	<div class="tip">
		<Tip />
	</div>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div>
</header>

<style>
	.wordmark {
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: #000;
	}

	.tip {
		position: absolute;
		top: 16px;
		right: 16px;
	}
</style>
