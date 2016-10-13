self.addEventListener('install', e => {
	e.waitUntil(
	caches.open('connfa').then(cache => {
		return cache.addAll([
			// pages
			'/',
			'/sessions',
			'/bofs',
			'/socialevents',
			'/socialmedia',
			'/scheduler',
			'/floors',
			'/locations',
			'/speakers',
			'/pages',
			// js
			'/app.js',
			'/vendor.js',
			'/polyfills.js',
			'/app.css',
			// images
			'/public/images/favicon.png',
			'/assets/default.gif',
			'/assets/bg_nav_drawer_header.jpg?t=1',
			'/assets/photo-icon.svg',
			'/assets/place.svg',
			'/assets/roboto-medium-webfont.eot',
			'/assets/roboto-medium-webfont.svg',
			'/assets/roboto-medium-webfont.ttf',
			'/assets/roboto-medium-webfont.woff',
			'/assets/roboto-regular-webfont.eot',
			'/assets/roboto-regular-webfont.svg',
			'/assets/roboto-regular-webfont.ttf',
			'/assets/roboto-regular-webfont.woff',
			'/assets/search-icon.svg',
			'/assets/speaker-icon.svg',
			// fonts
			'/assets/roboto-medium-webfont.ttf',
			'/assets/roboto-regular-webfont.ttf',
			'/assets/roboto-medium-webfont.woff',
			'/assets/roboto-regular-webfont.woff',
		])
			.then(() => self.skipWaiting());
})
)
});

self.addEventListener('activate',  event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
	caches.match(event.request).then(response => {
		return response || fetch(event.request);
})
);
});

