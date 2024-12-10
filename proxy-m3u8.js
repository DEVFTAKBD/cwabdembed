const fetch = require('node-fetch'); // Required for HTTP requests

exports.handler = async (event) => {
  // Define mapping for M3U8 files
  const m3u8Files = {
    '/1.m3u8': 'https://fifabd.xyz/OPLLX/play.m3u8?id=245989',
    '/2.m3u8': 'https://demo.com/2.m3u8',
    '/3.m3u8': 'https://demo.com/3.m3u8',
  };

  const path = event.path; // Get the requested path

  // Check if the requested path matches an M3U8 file
  if (m3u8Files[path]) {
    const targetUrl = m3u8Files[path];

    try {
      const response = await fetch(targetUrl);

      // Return the proxied content
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/x-mpegURL',
          'Access-Control-Allow-Origin': '*',
        },
        body: await response.text(),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error fetching M3U8 file: ${error.message}`,
      };
    }
  }

  // Return 404 if the requested path is not mapped
  return {
    statusCode: 404,
    body: 'File not found',
  };
};
