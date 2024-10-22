# Basemap vs Hybrid

## Survey: Locating oneself on a map using panoramic images. Investigating the difference between Google's Basemap and Hybrid Map.

This test is based on the @googlemaps/js-samples located at
https://github.com/googlemaps/js-samples
And an Update form: https://github.com/s81863/Testdesign.git
We modified it to display 8 static Street View Panoramas sequentially. Additionally a Map of type google-map is displayed.

## Setup

### Linux
Enter your Google Maps JavaScript API Key and your DNS in `./build_files/.env`.

Build the project via Vite and Node.js. See: `./build_files/cloud_shell_instructions.md`

Host the project on a webserver. E.g. Nginx.

Enter your DNS in `/backend/server.js`.

Setup your backend Server using Node.js and Express.
