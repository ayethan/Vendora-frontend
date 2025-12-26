export const loadLocation = () => {
  try {
    const serializedLocation = sessionStorage.getItem('location');
    if (serializedLocation === null) {
      return undefined;
    }
    return JSON.parse(serializedLocation);
  } catch (err) {
    return undefined;
  }
};

export const saveLocation = (location) => {
  try {
    const serializedLocation = JSON.stringify(location);
    sessionStorage.setItem('location', serializedLocation);
  } catch {
    // ignore write errors
  }
};
