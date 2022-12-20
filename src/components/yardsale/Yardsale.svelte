<script>
	export let copy;
	// import Header from "$components/Header.svelte";
	// import Footer from "$components/Footer.svelte";

	import YardsaleScrolly from "$components/yardsale/Yardsale.scrolly.svelte";
	import YardsaleCopy from "$components/yardsale/Yardsale.copy.svelte";
	import YardsaleHed from "$components/yardsale/Yardsale.hed.svelte";
	import YardsaleQuote from "$components/yardsale/Yardsale.quote.svelte";
	import YardsaleMathSimulation from "$components/yardsale/Yardsale.mathsimulation.svelte";
	import YardsaleYSM from "$components/yardsale/Yardsale.YSM.svelte";
</script>

<div id="body">
	<!-- SECTION 1 -->
	<YardsaleScrolly words="{copy.scrolly1}" container="scrolly1" />
	<YardsaleHed />
	<YardsaleCopy hed="" words="{copy.Nutgraf}" />
	<YardsaleScrolly words="{copy.scrolly2}" container="scrolly2" />
	<YardsaleCopy hed="" words="{copy.Nutgraf2}" />
	<YardsaleScrolly words="{copy.scrolly3}" container="scrolly3" />
	<YardsaleCopy hed="" words="{copy.IntroSection1}" />
	<YardsaleMathSimulation />
	<YardsaleCopy hed="" words="{copy.IntroSection2}" />

	<!-- SECTION 2 -->
	<YardsaleCopy hed="{copy.MiddleHed}" words="{copy.MiddleSection1}" />
	<YardsaleYSM redist="-1" />
	<YardsaleCopy hed="" words="{copy.MiddleSection2}" />
	<YardsaleQuote words="{copy.Quote1}" person="Gabriel Zucman" image="gz" />
	<YardsaleCopy hed="" words="{copy.MiddleSection3}" />
	<YardsaleQuote words="{copy.Quote2}" person="Bruce M. Boghosian" image="bb" />
	<YardsaleCopy hed="" words="{copy.MiddleSection4}" />

	<!-- SECTION 3 -->
	<YardsaleCopy hed="{copy.EndHed}" words="{copy.EndSection1}" />
	<YardsaleYSM redist="1" />
	<YardsaleCopy hed="" words="{copy.EndSection2}" />
	<img alt="watch on side" class="watch_bottom" src="assets/yardsale/art/thewatch.png" />
	<YardsaleCopy hed="So, the watch" words="{copy.EndSection3}" />

	<!-- READ MORE -->
	<YardsaleCopy hed="{copy.ReadMoreHed}" words="{copy.readmore}" />
</div>

<footer />
