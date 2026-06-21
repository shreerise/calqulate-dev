/* Calqulate Vitals — service worker (push notifications + installable PWA). */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Incoming push → show a branded notification.
self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : "" };
  }

  // Brand name kept first/above the fold per requirement.
  const title = payload.title || "Calqulate.net";
  const options = {
    body: payload.body || "Your weekly health update is ready.",
    icon: payload.icon || "/logo.webp",
    badge: "/logo.webp",
    tag: payload.tag || "calqulate-update",
    data: { url: payload.url || "/dashboard" },
    requireInteraction: false,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Click → focus an existing tab or open the dashboard.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/dashboard";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(target) && "focus" in client) return client.focus();
      }
      return self.clients.openWindow(target);
    }),
  );
});
