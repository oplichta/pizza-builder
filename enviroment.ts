// This file is committed on purpose - it holds public client identifiers, not secrets.
//
// A Firebase web API key identifies the project; it is not a credential. It ships inside every
// client bundle by design, so hiding it here would protect nothing. In a Firebase app, access
// control lives in Firestore Security Rules, not in concealing the config. See the
// "Configuration" section of README.md for the full reasoning.
//
// Server-side secrets never belong here - those live in .env, which is gitignored.
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyDyj1-Qst7PjRNnx3KbXi7imVjMYmsz3KI",
        authDomain: "pizza-builder-afa89.firebaseapp.com",
        projectId: "pizza-builder-afa89",
        storageBucket: "pizza-builder-afa89.firebasestorage.app",
        messagingSenderId: "1016501391766",
        appId: "1:1016501391766:web:b72e3b67618e75e748cdb7",
        measurementId: "G-4S3RL8WB7L"
      },
    // Needed only by the /delivery map. Grab a free public token (starts with "pk.") at
    // https://account.mapbox.com/access-tokens/ and restrict it to your domain. Left as a
    // placeholder so the repo never ships someone else's quota; the rest of the app runs without it.
    mapboxAccessToken: 'REPLACE_WITH_YOUR_OWN_MAPBOX_PUBLIC_TOKEN',
    // Pizzeria location: Obrońców Wybrzeża 1, 80-398 Gdańsk - the delivery route's starting point.
    pizzeriaOrigin: [18.591345, 54.409251] as [number, number],
  };