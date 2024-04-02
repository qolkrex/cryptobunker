export const combinations = (array:any) => {
  const combi = [];
  combi.push(array);
  combi.push(array.slice().reverse());

  for (let i = 0; i < array.length; i++) {
    let array2 = array.filter((arr:any) => array[i] !== arr);
    combi.push([array[i]]);
    combi.push(array2);
    combi.push(array2.slice().reverse());
    for (let j = 0; j < array2.length; j++) {
      let array3 = [array[i], array2[j]];
      combi.push(array3);
    }
  }
  return combi;
};

export const inArray = (needle:any, haystack:any) => {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
};
