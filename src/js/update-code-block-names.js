const updateCodeBlockNames = () => {
	const codeBlocks = document.querySelectorAll('pre[tabindex="0"]');
	codeBlocks.forEach((codeBlock, index) => {
		codeBlock.setAttribute('aria-label', `Code sample ${index + 1}`);
	});
};

updateCodeBlockNames();
