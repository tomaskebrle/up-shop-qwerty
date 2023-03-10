/**
 * Wrapper funkce pro parsování data z URL search paramu
 *
 * @param  {string|null} date_string string ze kterého to vytvoří Date nebo null
 */
export function get_date_from_string(date_string: string | null) {
	if (date_string) {
		return new Date(date_string);
	}
	return null;
}

/**
 * Odstraňuje měsíce z data
 *
 * @param  {Date} date Datum od kterého odstarnit měsíce
 * @param  {number} months Kolik měsíců odstranit
 */
export function subtract_month(date: Date, months: number = 1) {
	date.setMonth(date.getMonth() - months);
	return date;
}

export function subtract_week(date: Date, weeks = 1) {
	date.setDate(date.getDate() - weeks * 7);
	return date;
}

export function subtract_year(date: Date, years = 1) {
	date.setFullYear(date.getFullYear() - years);
	return date;
}

export function subtract_day(date: Date, days = 1) {
	date.setDate(date.getDate() - days);
	return date;
}

export function get_minute_sklonovani(minutes: number) {
	if (minutes == 1) {
		return 'minuta';
	} else if (minutes <= 4) {
		return 'minuty';
	}
	return 'minut';
}

export function get_date_in_ddmmyyyy(date: Date) {
	return `${pad(`${date.getDate()}`)}-${pad(`${date.getMonth() + 1}`)}-${date.getFullYear()}`;
}

export function get_date_from_ddmmyyyy(date_string: string) {
	const [day, month, year] = date_string.split('-');
	// Month is 0-indexed, so we subtract 1
	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function get_date_from_yyyymmdd(date_string: string) {
	const [year, month, day] = date_string.split('-');
	// Month is 0-indexed, so we subtract 1
	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function get_date_in_yyyymmdd(date: Date) {
	const month = `${date.getMonth() + 1}`;
	return `${date.getFullYear()}-${pad(`${date.getMonth() + 1}`)}-${pad(`${date.getDate()}`)}`;
}

export function date_to_pocketbase(date: Date | null) {
	if (date) {
		date.setUTCHours(0, 0, 0, 0);
		date.setDate(date.getDate());
		return date.toISOString();
	}
	return null;
}

function pad(str: string, length: number = 2) {
	return str.length === 2 ? str : '0' + str;
}
