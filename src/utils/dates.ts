export const getDateString = (local: string, year: number, month: number) =>
	new Date(year, month).toLocaleDateString(local, { month: 'long', year: 'numeric' });
