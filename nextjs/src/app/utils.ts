export function isHomeBrokerClosed() {
  const currentDate = new Date();
  const closeDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    18,
    0,
    0
  );

  return currentDate > closeDate;
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
