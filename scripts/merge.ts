import { writeFileSync } from 'fs';
import data_economy from './data_economy.json';
import education_data from './data_education.json';

// const json: any[] = JSON.parse(readFileSync('scripts/data_merged.json', 'utf8'));
const json: any[] = [];

console.log(json);

const mapping = {
	'Gross enrolment ratio, pre-primary, both sexes (%)': 'enrolment_rate_pre_primary',
	'Gross enrolment ratio, primary, both sexes (%)': 'enrolment_rate_primary',
	'Gross enrolment ratio, secondary, both sexes (%)': 'enrolment_rate_secondary',
	'Annual freshwater withdrawals, total (billion cubic meters)': 'annual_freshwater_withdrawals',
	'Electric power consumption (kWh per capita)': 'electric_power_consumption',
	'Access to electricity (% of population)': 'access_to_electricity',
};

const countries: Map<string, string> = new Map();

[...education_data, ...data_economy].forEach((item) => {
	const country_code = item['Country Code'];
	const country_name = item['Country Name'];
	const series = item['Series'] ?? item['Series Name'];

	countries.set(country_code, country_name);

	if (!series) return;

	Object.entries(item).forEach(([key, value]) => {
		if (!value) value = 'NA';

		const year = Number(key.split(' ')[0]);
		if (!Number.isInteger(year)) return;
		if (year > 2018 || year < 1990) return;

		const found = json.find((item) => item.country_code === country_code && item.year === year);
		if (found) {
			found[mapping[series]] = value;

			const index = json.indexOf(found);
			json[index] = found;
		} else {
			json.push({
				country_name,
				country_code,
				year,
				[mapping[series]]: value,
			});
		}
	});
});

writeFileSync('scripts/data_merged.json', JSON.stringify(json));
writeFileSync('src/assets/data.json', JSON.stringify(json));

console.log(JSON.stringify([...countries]));

console.log('done');
