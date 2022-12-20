<script>
	import { setContext } from "svelte";
	import { browser } from "$app/env";
	import Meta from "$components/Meta.svelte";
	import Index from "$routes/Index.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";

	export let data;

	version();

	const preloadFont = [
		"https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2",
		"https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2"
	];
	const title = "Why the super rich are inevitable";
	const description = "Why some mathematicians argue the economy is designed to create a few super rich people – unless we stop it.";
	const keywords = "yard sale model, inequality, oligarchy, redistribution";
	const url = "https://pudding.cool/2022/12/yard-sale";
	// const { title, description, url, keywords } = copy;
	setContext("copy", copy);
	setContext("data", data.data);
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />
<Index />
