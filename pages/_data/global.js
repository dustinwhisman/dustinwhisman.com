/* eslint-env node */
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

const getImagePaths = () => {
	const directoryPath = path.join(import.meta.dirname, '../../src/public/images/cats');
	const files = fs
		.readdirSync(directoryPath, { withFileTypes: true })
		.filter((file) => !file.isDirectory() && file.name.endsWith('.jpg'))
		.sort((a, b) => {
			if (a.name < b.name) {
				return 1;
			}

			if (a.name > b.name) {
				return -1;
			}

			return 0;
		})
		.map((file) => {
			const { width, height } = sizeOf(`${directoryPath}/${file.name}`);
			return {
				name: file.name,
				width,
				height,
				aspectRatio: width / height,
			};
		});

	return files;
};

const picturesOfCats = getImagePaths();
const catsByMonth = picturesOfCats.reduce((monthsObj, picture) => {
	const date = picture.name.substring(4, 12);
	const monthSlug = `${date.slice(0, 4)}-${date.slice(4, 6)}`;
	const monthDisplayName = new Date(monthSlug).toLocaleDateString(undefined, {
		timeZone: 'UTC',
		year: 'numeric',
		month: 'long',
	});

	return {
		...monthsObj,
		[monthSlug]: {
			name: monthDisplayName,
			pictures: [...(monthsObj[monthSlug]?.pictures ?? []), picture],
		},
	};
}, {});

export default {
	// generate a random string for service worker versioning, such as "36f4-1234-8c7a"
	random() {
		const segment = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

		return `${segment()}-${segment()}-${segment()}`;
	},
	year() {
		return new Date().getFullYear();
	},
	picturesOfCats: getImagePaths(),
	catsByMonth,
};
