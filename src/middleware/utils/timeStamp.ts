export const nowISOTimestamp = (dt: number = Date.now()): string => {
  const timestamp = new Date(dt).toISOString();
  return `${timestamp} [API]:`;
};
