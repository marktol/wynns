export const saveDataToLocalStorage = (id: string, data: any) => {
  localStorage.setItem(id, JSON.stringify(data));
};

export const loadDataFromLocalStorage = (id: string) => {
  const storedData = localStorage.getItem(id);
  if (storedData) {
    return storedData;
  }
  return null;
};
