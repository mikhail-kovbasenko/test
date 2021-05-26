export const getPathName = string => {
	const index = string.indexOf('/', 1);

	const result = string.substr(0, index);

	return index > 0 ? result : string;
}