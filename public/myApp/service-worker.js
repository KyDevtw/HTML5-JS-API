let cacheName = 'v1'; // v1 只要是字串即可
self.addEventListener('install', function(event) {
    console.log('install:', event);
	// waituntil 同等於 promise
	event.waitUntil(
		// caches.open() 開啟暫存
		caches.open(cacheName).then((cache) => {
			return cache.addAll([
				'/myApp/canvas-draw-app.html',
				'/myApp/manifest.json',
				'/myApp/images/icons/icon-144x144.png',
			]);
		})
	);
});

// !更換版本
self.addEventListener('activate', event=>{
    console.log('activate:', event);
	event.waitUntil(
		caches.keys().then( keyList=>{
			return Promise.all(keyList.map( key=>{
				if (key !== cacheName) {
					// 刪除快取
					return caches.delete(key);
				}
			}));
		})
	);
});


// !沒有網路時使用fetch
self.addEventListener('fetch', function(event) {
	console.log('fetch:', event); // 查看 chrome://inspect/#service-workers
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});