// Template for the deploy-time environment. Copy to enviroment.local.ts and fill in the token.
//
// Why this file exists: enviroment.ts (committed) ships a placeholder Mapbox token, so a fresh
// clone builds and runs without anyone's credentials. The `deploy` build configuration in
// angular.json swaps in enviroment.local.ts instead, which is gitignored and holds the real
// token - so the deployed bundle gets a working map while the repository never carries the token.
//
// If enviroment.local.ts is missing, `npm run deploy` fails loudly rather than quietly
// publishing a demo with a dead map.
//
// Everything except mapboxAccessToken should stay identical to enviroment.ts.
export const environment = {
    production: true,
    firebaseConfig: {
        apiKey: 'AIzaSyDyj1-Qst7PjRNnx3KbXi7imVjMYmsz3KI',
        authDomain: 'pizza-builder-afa89.firebaseapp.com',
        projectId: 'pizza-builder-afa89',
        storageBucket: 'pizza-builder-afa89.firebasestorage.app',
        messagingSenderId: '1016501391766',
        appId: '1:1016501391766:web:b72e3b67618e75e748cdb7',
        measurementId: 'G-4S3RL8WB7L',
    },
    // Your public "pk." token from https://account.mapbox.com/access-tokens/ - restrict it to the
    // domain you deploy to. Keep a copy in .env (MAPBOX_TOKEN) so it survives a clean checkout.
    mapboxAccessToken: 'YOUR_MAPBOX_PUBLIC_TOKEN',
    // Pizzeria location: Obrońców Wybrzeża 1, 80-398 Gdańsk - the delivery route's starting point.
    pizzeriaOrigin: [18.591345, 54.409251] as [number, number],
};
