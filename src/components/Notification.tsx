import React from "react";
import { useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { NotificationProps } from "../types/components/Notification";
import useAppDispatch from "../hooks/useAppDispatch";
import { resetNotification } from "../redux/reducers/notificationReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Notification = (props: NotificationProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(resetNotification()), 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Snackbar open>
      <Alert severity={props.error ? "error" : "success"}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
