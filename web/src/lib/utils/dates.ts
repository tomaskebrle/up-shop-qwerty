/**
 * Wrapper funkce pro parsování data z URL search paramu
 *
 * @param  {string|null} dateString string ze kterého to vytvoří Date nebo null
 */
export function get_date_from_string(dateString: string | null) {
	if (dateString) {
		return new Date(dateString);
	}
	return null;
}

/**
 * Odstraňuje měsíce z data
 *
 * @param  {Date} date Datum od kterého odstarnit měsíce
 * @param  {number} months Kolik měsíců odstranit
 */
export function subtract_month(date: Date, months: number) {
	date.setMonth(date.getMonth() - months);
	return date;
}

export function get_minute_sklonovani(minutes:number){
  if(minutes == 1){
    return "minuta"
  } else if(minutes <= 4) {
    return "minuty"
  }
  return "minut"
}