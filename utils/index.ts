export const routeWithParams = (route: string, paramsObject: Record<string, string>): string => {
  return route.replace(/\[(.*?)\]/g, (_, key: string) => {
    for (const [objKey, argument] of Object.entries(paramsObject)) {
      if (objKey === key) {
        return argument;
      }
    }
    return `[${key}]`; // leave unchanged if no match found
  });
};
