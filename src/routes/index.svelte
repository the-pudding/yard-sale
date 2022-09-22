<script>
	import { getContext } from "svelte";
	import Yardsale from "$components/yardsale/Yardsale.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	// import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
</script>

<!-- <WIP /> -->
<Yardsale copy={copy}/>
<!-- <Footer /> -->
