export interface FilterableItem {
  createdAt: string;
  updatedAt?: string;
}

export const filterByDateRange = <T extends FilterableItem>(
  items: T[],
  startDate: string,
  endDate: string,
  dateField: keyof T = 'createdAt'
): T[] => {
  if (!startDate && !endDate) {
    return items;
  }

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Set end date to end of day if provided
  if (end) {
    end.setHours(23, 59, 59, 999);
  }

  return items.filter((item) => {
    const itemDate = new Date(item[dateField] as string);
    
    if (start && itemDate < start) {
      return false;
    }
    
    if (end && itemDate > end) {
      return false;
    }
    
    return true;
  });
};

export const getDefaultDateRange = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    startDate: sevenDaysAgo.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
  };
};
