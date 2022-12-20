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
		<div class="quoteImage" style="background-image:url(assets/yardsale/art/{image}.png)"></div>
		<div class="quote">{@html words}</div>
		<p class="citation">—{person}</p>
	</blockquote>
</div>

<style>
	.quote {
		font-style: italic;
		color: #443045;
	}
	.quoteImage {
		float: left;
		margin: 0 10px 10px 0;
		width: 100px;
		height: 100px;
		background-color: var(--category-purple);
		background-size: 100% 100%;
	}
	@media only screen and (max-width: 500px) {
		.quoteImage {
			width: 80px;
			height: 80px;
		}
	}
	.citation {
		text-align: right;
	}
</style>
