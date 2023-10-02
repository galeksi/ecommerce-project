import Pagination from "@mui/material/Pagination";
import { PaginationBarProps } from "../types/components/PaginationBarProps";
import { Stack } from "@mui/material";

const PaginationBar = (props: PaginationBarProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value);
  };

  return (
    <Stack sx={{ alignItems: "center", p: 3 }}>
      <Pagination
        count={props.count}
        page={props.page}
        onChange={handleChange}
        color="primary"
        size="large"
      />
    </Stack>
  );
};

export default PaginationBar;
