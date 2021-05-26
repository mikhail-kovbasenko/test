export const updateParams = (params, param, value) => {
  const result = { ...params };

  result[param] = value;

  return Object.entries(result).map((item, index) => {
    const symbol = index === 0 ? '?' : '&';
    const [prop, arg] = item;

    return `${symbol}${prop}=${arg}`;
  });
};
