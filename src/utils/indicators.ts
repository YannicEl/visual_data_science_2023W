const mapping = {
	enrolment_rate_pre_primary: 'Gross enrolment ratio, pre-primary, both sexes (%)',
	enrolment_rate_primary: 'Gross enrolment ratio, primary, both sexes (%)',
	enrolment_rate_secondary: 'Gross enrolment ratio, secondary, both sexes (%)',
	annual_freshwater_withdrawals: 'Annual freshwater withdrawals, total (billion cubic meters)',
	electric_power_consumption: 'Electric power consumption (kWh per capita)',
	access_to_electricity: 'Access to electricity (% of population)',
} as const;

export function indicatorToName(indicator: keyof typeof mapping): string {
	return mapping[indicator];
}
