exports.convertFormData = (data) => {
  const convertedData = {};
  const reqData = data;
  for (const key in reqData) {
    const keys = key.split(/\[|\]\[|\]/).filter((k) => k.length > 0);
    let obj = convertedData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) {
        if (keys[i + 1] === "") {
          obj[keys[i]] = [];
        } else {
          obj[keys[i]] = {};
        }
      }
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = reqData[key].trim();
  }
  return convertedData;
};
