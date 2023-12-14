export const convertStringWithDotsToNestedObj = (
  str: string,
  value: string,
) => {
  const obj = {};
  let ref = obj;

  const splits = str.split('.');

  splits.forEach((k, index, values) => {
    ref = ref[k] = index == values.length - 1 ? value : {};
  });

  return obj;
};
