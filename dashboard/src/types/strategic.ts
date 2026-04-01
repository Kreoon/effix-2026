export interface StrategicFiltersState {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  countries: string[];
  channels: string[];
  campaignTypes: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
}
