// import notificationReducer, {
//   addErrorNotification,
//   addNotification,
//   resetNotification,
// } from "../../../redux/reducers/notificationReducer";
// import { NotificationProps } from "../../../types/components/Notification";

// let initialState: NotificationProps;

// describe("notification reducer", () => {
//   beforeEach(() => {
//     initialState = {
//       message: "",
//       error: false,
//     };
//   });

//   test("should add a notification", () => {
//     const stateAfter = notificationReducer(
//       initialState,
//       addNotification("notification")
//     );

//     expect(initialState.message).toBe("");
//     expect(stateAfter.message).toBe("notification");
//     expect(stateAfter.error).toBe(false);
//   });

//   test("should add a error", () => {
//     const stateAfter = notificationReducer(
//       initialState,
//       addErrorNotification("error")
//     );

//     expect(stateAfter.message).toBe("error");
//     expect(stateAfter.error).toBe(true);
//   });

//   test("should reset notification", () => {
//     const stateBefore = notificationReducer(
//       initialState,
//       addErrorNotification("error")
//     );

//     const stateAfter = notificationReducer(stateBefore, resetNotification());

//     expect(stateBefore.message).toBe("error");
//     expect(stateBefore.error).toBe(true);
//     expect(stateAfter.message).toBe("");
//     expect(stateAfter.error).toBe(false);
//   });
// });
export {};
