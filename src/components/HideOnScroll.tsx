import { useScrollTrigger, Slide } from "@mui/material";

import { HideOnScrollProps } from "../types/components/HideOnScrollProps";

const HideOnScroll = (props: HideOnScrollProps) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
};
export default HideOnScroll;
