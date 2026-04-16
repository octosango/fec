export const DAYS = ['月', '火', '水', '木', '金'] as const;
export const PERIODS = [1, 2, 3, 4, 5, 6] as const;

/** Period time ranges as [start, end] in minutes since midnight */
const PERIOD_RANGES: [number, number][] = [
	[540, 640], // 1限: 9:00-10:40
	[650, 750], // 2限: 10:50-12:30
	[800, 900], // 3限: 13:20-15:00
	[910, 1010], // 4限: 15:10-16:50
	[1020, 1120], // 5限: 17:00-18:40
	[1130, 1230] // 6限: 18:50-20:30
];

/** Returns current period (1-6); during breaks returns the upcoming period; 0 after the last period */
export function getCurrentPeriod(): number {
	const now = new Date();
	const minutes = now.getHours() * 60 + now.getMinutes();
	for (let i = 0; i < PERIOD_RANGES.length; i++) {
		if (minutes <= PERIOD_RANGES[i][1]) {
			return i + 1;
		}
	}
	return 0;
}

/** Returns 0-4 (Mon-Fri) or -1 if weekend */
export function getCurrentDayOfWeek(): number {
	const jsDay = new Date().getDay();
	if (jsDay >= 1 && jsDay <= 5) return jsDay - 1;
	return -1;
}
