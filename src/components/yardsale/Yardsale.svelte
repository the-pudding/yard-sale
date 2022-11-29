<script>
	export let copy;
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";

	import YardsaleScrolly from "$components/yardsale/Yardsale.scrolly.svelte";
	import YardsaleCopy from "$components/yardsale/Yardsale.copy.svelte";
	import YardsaleMathDiagram from "$components/yardsale/Yardsale.mathdiagram.svelte";
	import YardsaleMathSimulation from "$components/yardsale/Yardsale.mathsimulation.svelte";
	import YardsalePoorChart from "$components/yardsale/Yardsale.poorchart.svelte";
	import YardsaleRichChart from "$components/yardsale/Yardsale.richchart.svelte";
	import YardsaleParetoChart from "$components/yardsale/Yardsale.paretochart.svelte";
	import YardsaleFedChart from "$components/yardsale/Yardsale.fedchart.svelte";
	import YardsaleTop400 from "$components/yardsale/Yardsale.top400.svelte";
	import YardsaleYSM from "$components/yardsale/Yardsale.YSM.svelte";
</script>

<div id="body">
	<!-- SECTION 1 -->
	<YardsaleScrolly words={copy.scrolly1} container="scrolly1" />
	<YardsaleScrolly words={copy.scrolly2} container="scrolly2" />
	<YardsaleScrolly words={copy.scrolly3} container="scrolly3" />
	<YardsaleCopy hed="" words={copy.IntroSection1} />
	<YardsaleMathSimulation />
	<YardsaleCopy hed="" words={copy.IntroSection2} />


	<!-- SECTION 2 -->
	<YardsaleCopy hed={copy.MiddleHed} words={copy.MiddleSection1} />
	<!-- <YardsaleParetoChart /> -->
	<!-- <YardsaleFedChart /> -->
	<!-- <YardsaleCopy hed="" words={copy.MiddleSection2} /> -->
	<YardsaleYSM redist=-1 />
	<YardsaleCopy hed="" words={copy.MiddleSection2} />

	<!-- SECTION 3 -->
	<YardsaleCopy hed={copy.EndHed} words={copy.EndSection1} />
	<YardsaleYSM redist=1 />
	<YardsaleCopy hed="" words={copy.EndSection2} />
	<!-- <YardsaleTop400 /> -->
	<!-- <YardsaleCopy hed="" words={copy.EndSection3} /> -->

</div>


<Footer />