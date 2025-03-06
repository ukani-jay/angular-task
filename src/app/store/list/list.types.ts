export interface ListItem {
  id: number;
  name: string;
  description: string;
}

export interface ListState {
  items: ListItem[];
  loading: boolean;
  error: string | null;
} 