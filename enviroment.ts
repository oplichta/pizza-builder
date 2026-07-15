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
    // Get your own free public token (starts with "pk.") at https://account.mapbox.com/access-tokens/
    mapboxAccessToken: 'REPLACE_WITH_YOUR_OWN_MAPBOX_PUBLIC_TOKEN',
    // Pizzeria location: Obrońców Wybrzeża 1, 80-398 Gdańsk - the delivery route's starting point.
    pizzeriaOrigin: [18.591345, 54.409251] as [number, number],
  };