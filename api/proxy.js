import axios from 'axios';

export default async function handler(req, res) {
    const { file } = req.query;

    if (!file) {
        return res.status(400).send('Error: No file specified.');
    }

    const externalUrl = `https://streamingengine.rtvplus.tv/rtvpluslive/rtvpluslive.stream/master.m3u8${file}`;

    try {
        const response = await axios.get(externalUrl, {
            responseType: 'text', // Ensure M3U8 is treated as text
        });

        // Set headers
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Return M3U8 content
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching M3U8:', error.message);
        res.status(500).send('Error fetching M3U8 file.');
    }
}
