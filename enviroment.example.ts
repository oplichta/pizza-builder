// Template for pointing the app at your OWN Firebase project.
//
// You do not need this to run the app - enviroment.ts is committed with a working Firebase
// config (public client identifiers, see the comment there). Copy this file over enviroment.ts
// only if you want your own backing data instead of the demo project's.
//
// Your Firestore needs an "ingredients" collection of { name, visible, pizzaId } documents,
// where "name" matches an SVG in public/images/ - otherwise the builder renders empty.
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT",
        storageBucket: "YOUR_PROJECT.firebasestorage.app",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
      },
    // Get your own free public token (starts with "pk.") at https://account.mapbox.com/access-tokens/
    // Restrict it to your deployed domain there for extra safety.
    mapboxAccessToken: 'YOUR_MAPBOX_PUBLIC_TOKEN',
    // Pizzeria location used as the delivery route's starting point.
    pizzeriaOrigin: [18.591345, 54.409251] as [number, number],
  };
