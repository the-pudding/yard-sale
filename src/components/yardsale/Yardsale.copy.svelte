<script>
	export let words;
	export let hed;
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
</script>
<div class="body_container">
	{#if hed != ""}
	<h2>{hed}</h2>
	{/if}
	<p>
		{@html convertToHTML(words)}
	</p>
</div>
