// import './copyLink';
import browser from 'webextension-polyfill'

browser.browserAction.onClicked.addListener((info, tab) => {
	browser.tabs.executeScript({
		file: 'copyLink.js',
	})
})
