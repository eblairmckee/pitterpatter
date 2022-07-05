/** Fisher Yates Algorithm */
export const shuffle = <T extends unknown>(arr: T[]) => {
	// copy original array
	const array = arr.slice();
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};
