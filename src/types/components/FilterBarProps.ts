export interface FilterBarProps {
  itemsPerPage: number;
  setItemsPerPage: (props: number) => void;
  categoryFilter: string;
  setCategoryFilter: (props: string) => void;
}
