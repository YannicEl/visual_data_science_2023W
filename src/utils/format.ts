export function formatDate(date: string): string {
	return new Intl.DateTimeFormat([...navigator.languages], {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	}).format(new Date(date));
}
