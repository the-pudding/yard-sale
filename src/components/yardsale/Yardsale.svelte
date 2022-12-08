<script>
	export let copy;
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";

	import YardsaleScrolly from "$components/yardsale/Yardsale.scrolly.svelte";
	import YardsaleCopy from "$components/yardsale/Yardsale.copy.svelte";
	import YardsaleQuote from "$components/yardsale/Yardsale.quote.svelte";
	import YardsaleMathSimulation from "$components/yardsale/Yardsale.mathsimulation.svelte";
	import YardsaleYSM from "$components/yardsale/Yardsale.YSM.svelte";
</script>

<div id="body">
	<!-- SECTION 1 -->
	<YardsaleScrolly words={copy.scrolly1} container="scrolly1" />
	<YardsaleCopy hed={copy.Hed} words={copy.Nutgraf} />
	<YardsaleScrolly words={copy.scrolly2} container="scrolly2" />
	<YardsaleScrolly words={copy.scrolly3} container="scrolly3" />
	<YardsaleCopy hed="" words={copy.IntroSection1} />
	<YardsaleMathSimulation />
	<YardsaleCopy hed="" words={copy.IntroSection2} />


	<!-- SECTION 2 -->
	<YardsaleCopy hed={copy.MiddleHed} words={copy.MiddleSection1} />
	<YardsaleYSM redist=-1 />
	<YardsaleCopy hed="" words={copy.MiddleSection2} />
	<YardsaleQuote words={copy.Quote1} person="Gabriel Zucman" image="zucman"/>
	<YardsaleCopy hed="" words={copy.MiddleSection3} />
	<YardsaleQuote words={copy.Quote2} person="Bruce M. Boghosian" image="boghosian"/>
	<YardsaleCopy hed="" words={copy.MiddleSection4} />
			
	<!-- SECTION 3 -->
	<YardsaleCopy hed={copy.EndHed} words={copy.EndSection1} />
	<YardsaleYSM redist=1 />
	<YardsaleCopy hed="" words={copy.EndSection2} />
	<YardsaleCopy hed="" words={copy.EndSection3} />
		
	<!-- Methods -->
	<YardsaleCopy hed="Methods" words={copy.Methods} />

</div>


<Footer />