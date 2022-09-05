import { FormatterArgs } from '../types'

type GithubStatus = 'Open' | 'Closed' | 'Merged' | null

function getStatus({ document }): GithubStatus {
	const status = document.querySelector('.gh-header-meta .State')
	const statusText = status?.textContent?.trim()
	if (statusText === 'Open') return 'Open'
	if (statusText === 'Closed') return 'Closed'
	if (statusText === 'Merged') return 'Merged'
	return null
}

function getTitle({ document }: { document: Document }) {
	const title = document.querySelector('.gh-header-title .js-issue-title')
	const titleText = title?.textContent?.trim()
	return titleText
}

function getStatusEmoji({
	status,
	isPullRequest,
}: {
	status: GithubStatus
	isPullRequest: boolean
}) {
	if (isPullRequest) {
		if (status === 'Open') return '🟩'
		if (status === 'Closed') return '🟥'
		if (status === 'Merged') return '🟪'
	}
	if (status === 'Open') return '🟢'
	if (status === 'Closed') return '🔴'
	if (status === 'Merged') return '🟣'
	return ''
}

export function formatGithubLink({ a, document }: FormatterArgs) {
	const isIssue = a.href.match(
		/https:\/\/github.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/,
	)
	if (isIssue) {
		const [, owner, repo, issue] = isIssue
		const title = getTitle({ document })
		const status = getStatus({ document })
		const emoji = getStatusEmoji({ status, isPullRequest: false })
		a.textContent = `${emoji} ${formatRepoName({ repo })}#${issue} ${title}`
		return a
	}

	const isPr = a.href.match(
		/https:\/\/github.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/,
	)
	if (isPr) {
		const [, owner, repo, pr] = isPr
		const title = getTitle({ document })
		const status = getStatus({ document })
		const emoji = getStatusEmoji({ status, isPullRequest: true })
		a.textContent = `${emoji} ${formatRepoName({ repo })}#${pr} ${title}`
		return a
	}

	return a
}

function formatRepoName({ repo }: { repo: string }) {
	const mappings = {
		'woocommerce-payments': 'WCPay',
		'woocommerce-payments-server': 'WCPay-Server',
		'woocommerce-subscriptions-core': 'subs-core',
		'woocommerce-subscriptions': 'WC Subs',
	}

	return mappings[repo] || repo
}
