/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';

const getImagePaths = (folderPath) => {
	const directoryPath = path.join(import.meta.dirname, folderPath);
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
			const buffer = fs.readFileSync(`${directoryPath}/${file.name}`)
			const { width, height } = imageSize(buffer);
			return {
				name: file.name,
				width,
				height,
				aspectRatio: width / height,
			};
		});

	return files;
};

const groupPicturesByMonth = (folderPath) => {
	const pictures = getImagePaths(folderPath);
	const picturesByMonth = pictures.reduce((monthsObj, picture) => {
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

	return picturesByMonth;
};

export default {
	// generate a random string for service worker versioning, such as "36f4-1234-8c7a"
	random() {
		const segment = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

		return `${segment()}-${segment()}-${segment()}`;
	},
	year() {
		return new Date().getFullYear();
	},
	picturesOfCats: getImagePaths('../../src/public/images/cats'),
	catsByMonth: groupPicturesByMonth('../../src/public/images/cats'),
	picturesOfTravel: getImagePaths('../../src/public/images/travel'),
	travelByMonth: groupPicturesByMonth('../../src/public/images/travel'),
};
