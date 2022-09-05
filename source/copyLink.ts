import { CopyArgs } from './types'
import { formatGithubLink } from './formatters/github'

async function copyLink() {
	const title = document.title || ''
	const url = document.location.href || ''
	const a = prepareLink({ title, url, document })

	const html = formatHtmlLink(a)
	const text = formatMarkdownLink(a)

	copyToClipboard({ html, text })
}

function formatHtmlLink(a: HTMLAnchorElement) {
	// work around apple-notes weird formatting
	const zeroWidthSpace = `&#xfeff;​`

	const noUnderlineAfter = document.createElement('span')
	noUnderlineAfter.innerHTML = zeroWidthSpace
	noUnderlineAfter.style.textDecoration = 'none'

	const noUnderlineBefore = document.createElement('span')
	noUnderlineAfter.innerHTML = ' '
	noUnderlineAfter.style.textDecoration = 'none'

	const html =
		noUnderlineBefore.outerHTML + a.outerHTML + noUnderlineAfter.outerHTML
	return html
}

function formatMarkdownLink(a: HTMLAnchorElement) {
	const markdown = `[${a.textContent}](${a.href})`
	return markdown
}

// TODO https://w3c.github.io/clipboard-apis/#writing-to-clipboard
// from https://stackoverflow.com/a/50067769/548304
function copyToClipboard({ text, html }: CopyArgs) {
	function listener(e) {
		e.clipboardData.setData('text/html', html)
		e.clipboardData.setData('text/plain', text)
		e.preventDefault()
	}

	document.addEventListener('copy', listener)
	document.execCommand('copy')
	document.removeEventListener('copy', listener)
}

function prepareLink({
	title,
	url,
	document,
}: {
	title: string
	url: string
	document: Document
}) {
	let a = document.createElement('a')
	a.href = url
	a.textContent = title

	if (a.hostname === 'github.com') {
		a = formatGithubLink({ a, document })
	}

	return a
}

copyLink()
