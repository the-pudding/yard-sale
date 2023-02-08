<script>
	import Tip from "$components/helpers/Tip.svelte";
	import { getContext } from "svelte";
	import Yardsale from "$components/yardsale/Yardsale.svelte";
	// import WIP from "$components/helpers/WIP.svelte";
	import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
</script>

<!-- <WIP /> -->
<Yardsale {copy} />
<div class="body_container">
	<p>Like this story? Consider directly supporting the author.</p>
	<Tip text="Send a tip to Alvin Chang" />
</div>
<Footer />

<style>
	.body_container {
		text-align: center;
	}
	p {
		margin-bottom: 16px;
	}
</style>
