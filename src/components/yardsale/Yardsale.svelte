<script>
	export let copy;
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";

	import YardsaleScrolly from "$components/yardsale/Yardsale.scrolly.svelte";
	import YardsaleCopy from "$components/yardsale/Yardsale.copy.svelte";
	import YardsalePoorChart from "$components/yardsale/Yardsale.poorchart.svelte";
	import YardsaleRichChart from "$components/yardsale/Yardsale.richchart.svelte";
	import YardsaleParetoChart from "$components/yardsale/Yardsale.paretochart.svelte";
	import YardsaleFedChart from "$components/yardsale/Yardsale.fedchart.svelte";
	import YardsaleTop400 from "$components/yardsale/Yardsale.top400.svelte";
	import YardsaleYSM from "$components/yardsale/Yardsale.YSM.svelte";
	import YardsaleYSM2 from "$components/yardsale/Yardsale.YSM2.svelte";
</script>

<div id="top">
	<div class="body_container">
		<h1>{copy.Hed}</h1>
		<h3>{copy.Dek}</h3>
	</div>
</div>

<div id="body">
	<!-- SECTION 1 -->
	<YardsaleScrolly words={copy.scrolly} />
	<YardsaleCopy words={copy.IntroSection1} />
	<YardsalePoorChart />
	<YardsaleCopy words={copy.IntroSection2} />
	<YardsaleRichChart />
	<YardsaleCopy words={copy.IntroSection3} />

	<!-- SECTION 2 -->
	<YardsaleCopy hed={copy.MiddleHed} words={copy.MiddleSection1} />
	<YardsaleParetoChart />
	<YardsaleCopy words={copy.MiddleSection2} />
	<YardsaleFedChart />
	<YardsaleCopy words={copy.MiddleSection3} />
	<YardsaleYSM />
	<YardsaleCopy words={copy.MiddleSection4} />

	<!-- SECTION 3 -->
	<YardsaleCopy hed={copy.EndHed} words={copy.EndSection1} />
	<YardsaleYSM2 />
	<YardsaleCopy words={copy.EndSection2} />
	<YardsaleTop400 />
	<YardsaleCopy words={copy.EndSection3} />

</div>

<style>
	#top, #body {
		box-sizing: border-box;
	}
	h1 { font-weight:  bold; }
	h3 {
		font-size:  18px;
	}
</style>


<Footer />