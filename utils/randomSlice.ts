export const randomSlice = (max: number, slice: number) => {
	const randomIdx = Math.floor(Math.random() * max - slice);
	return randomIdx < 0 ? 0 : randomIdx;
};
