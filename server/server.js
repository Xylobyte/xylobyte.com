const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const mime = require('mime-types');

const hostname = 'localhost' || '127.0.0.1';
const port = 3000 || 'passenger';

// Chemin racine où sont stockés les fichiers publics
const PUBLIC_DIR = path.join(__dirname, '..', 'www');

/**
 * Vérifie l’existence d’un fichier et renvoie son chemin absolu
 * @param {string} urlPath  L’URL telle qu’elle arrive (ex: "/about", "/css/style.css")
 * @returns {Promise<string|null>} Chemin du fichier trouvé ou null
 */
function findFile(urlPath) {
	return new Promise(resolve => {
		// 1️⃣  Si l’URL pointe déjà vers un fichier existant → on l’utilise tel quel
		const exactPath = path.join(PUBLIC_DIR, urlPath);
		fs.stat(exactPath, (err, stats) => {
			if (!err && stats.isFile()) return resolve(exactPath);

			// 2️⃣  Si l’URL est un répertoire (ex: "/about/") → on cherche index.html dedans
			if (!err && stats.isDirectory()) {
				const dirIndex = path.join(exactPath, 'index.html');
				return fs.access(dirIndex, fs.constants.F_OK, e => {
					return resolve(!e ? dirIndex : null);
				});
			}

			// 3️⃣  Si l’URL ne contient pas d’extension, on ajoute .html
			if (!path.extname(urlPath)) {
				const htmlPath = path.join(PUBLIC_DIR, `${urlPath}.html`);
				return fs.access(htmlPath, fs.constants.F_OK, e => {
					return resolve(!e ? htmlPath : null);
				});
			}

			// Aucun fichier trouvé → on renvoie null
			resolve(null);
		});
	});
}

/**
 * Serveur HTTP
 */
const server = http.createServer(async (req, res) => {
	const reqUrl = req.url.split('?')[0]; // on ignore les query‑strings
	const fileToServe = await findFile(reqUrl);

	if (fileToServe) {
		// On trouve un fichier → on l’envoie
		const contentType = mime.lookup(fileToServe) || 'application/octet-stream';
		fs.readFile(fileToServe, (err, data) => {
			if (err) {
				console.error('Erreur de lecture :', err);
				res.writeHead(500);
				res.end('Erreur 500, lecture impossible');
			} else {
				console.log(req.method, fileToServe, contentType);
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(data);
			}
		});
	} else {
		// Aucune correspondance → on renvoie le index.html racine
		const indexPath = path.join(PUBLIC_DIR, 'index.html');
		fs.readFile(indexPath, (err, data) => {
			if (err) {
				console.error('Erreur de lecture index :', err);
				res.writeHead(500);
				res.end('Erreur 500, index non disponible');
			} else {
				console.log(req.method, 'fallback to index.html');
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(data);
			}
		});
	}
});

server.listen(port, hostname, () => {
	console.log(`Serveur démarré sur http://${hostname}:${port}`);
});
