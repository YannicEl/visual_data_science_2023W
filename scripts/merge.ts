import data from './data.json';

console.log(fs);

const json: any[] = [];

data.forEach((item) => {
	const country = item['Country Code'];

	json.push({
		country,
	});
});
