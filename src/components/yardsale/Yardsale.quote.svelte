<script>
	export let words;
	export let person;
	export let image;
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
	<blockquote>
		<div class="quoteImage"></div>
		{@html words}
		<p>–{person}</p>
	</blockquote>
</div>

<style>
	.quoteImage {
		float: left;
		margin: 0 10px 10px 0;
		width: 100px;
		height: 100px;
		background: rgba(0,0,0,0.4);
	}
</style>
