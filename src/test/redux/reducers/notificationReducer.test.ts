import {
  addErrorNotification,
  addNotification,
  resetNotification,
} from "../../../redux/reducers/notificationReducer";
import store from "../../../redux/store";
import { NotificationProps } from "../../../types/components/Notification";

describe("notification reducer", () => {
  let initialNotificationState: NotificationProps;
  let stateAfter: NotificationProps;

  beforeEach(() => {
    initialNotificationState = {
      message: "",
      error: false,
    };
  });

  test("should add a notification", () => {
    store.dispatch(addNotification("notification"));
    stateAfter = store.getState().notificationReducer;

    expect(initialNotificationState.message).toBe("");
    expect(stateAfter.message).toBe("notification");
    expect(stateAfter.error).toBe(false);
  });

  test("should add a error", () => {
    store.dispatch(addErrorNotification("error"));
    stateAfter = store.getState().notificationReducer;

    expect(stateAfter.message).toBe("error");
    expect(stateAfter.error).toBe(true);
  });

  test("should reset notification", () => {
    store.dispatch(addErrorNotification("error"));
    store.dispatch(resetNotification());
    stateAfter = store.getState().notificationReducer;

    expect(stateAfter.message).toBe("");
    expect(stateAfter.error).toBe(false);
  });
});
