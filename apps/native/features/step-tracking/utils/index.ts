const getUntilNow = () => {
  const end = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  return { start, end };
};

const getDayRange = (range: number) => {
  return Array.from({ length: range }, (_, i) => {
    const end = new Date();
    end.setDate(end.getDate() - i);
    end.setHours(23, 59, 59, 999);

    const start = new Date(end);
    start.setHours(0, 0, 0, 0);

    return { start, end };
  });
};

export { getUntilNow, getDayRange };
