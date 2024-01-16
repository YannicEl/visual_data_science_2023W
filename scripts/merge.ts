import { readFileSync, writeFileSync } from 'fs';
import education_data from './data_education.json';

const json: any[] = JSON.parse(readFileSync('scripts/data_merged.json', 'utf8'));

console.log(json);

const mapping = {
	'Gross enrolment ratio, pre-primary, both sexes (%)': 'enrolment_rate_pre_primary',
	'Gross enrolment ratio, primary, both sexes (%)': 'enrolment_rate_primary',
	'Gross enrolment ratio, secondary, both sexes (%)': 'enrolment_rate_secondary',
};

education_data.forEach((item) => {
	const country = item['Country Code'];
	const series = item['Series'];

	Object.entries(item).forEach(([key, value]) => {
		if (!value) return;

		const year = Number(key.split(' ')[0]);
		if (!Number.isInteger(year)) return;

		const found = json.find((item) => item.country === country && item.year === year);
		if (found) {
			found[mapping[series]] = value;

			const index = json.indexOf(found);
			json[index] = found;
		} else {
			json.push({
				country,
				year,
				[mapping[series]]: value,
			});
		}
	});
});

writeFileSync('scripts/data_merged.json', JSON.stringify(json));

console.log('done');
