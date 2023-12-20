// import { UserState } from "../../../types/User/UserState";
// import { createStore } from "../../../redux/store";
// import server from "../../shared/server";
// import userReducer, {
//   authenticateUserAsync,
//   clearUserError,
//   clearUserSuccess,
//   deleteUserAsync,
//   fetchAllUsersAsync,
//   loginUserAsync,
//   registerUserAsync,
// } from "../../../redux/reducers/userReducer";
// import { mockToken } from "../../mockData/mockToken";
// import { mockUsers } from "../../mockData/mockUsers";
// import { UserRegister } from "../../../types/User/UserRegister";

// let store = createStore();
// let initialUserState: UserState;

// beforeAll(() => server.listen());

// beforeEach(() => {
//   store = createStore();
//   initialUserState = store.getState().userReducer;
// });

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());

// describe("User reducer", () => {
//   test("should clear error message", () => {
//     const errorState = { ...initialUserState, error: "error" };
//     const stateAfter = userReducer(errorState, clearUserError());

//     expect(stateAfter.error).toBe("");
//   });

//   test("should clear success message", () => {
//     const successState = { ...initialUserState, success: "success" };
//     const stateAfter = userReducer(successState, clearUserSuccess());

//     expect(stateAfter.success).toBe("");
//   });

//   test("should fetch all users", async () => {
//     await store.dispatch(fetchAllUsersAsync());
//     const stateAfter = store.getState().userReducer;

//     expect(stateAfter.users).toHaveLength(3);
//     expect(stateAfter.loading).toBeFalsy();
//     expect(stateAfter.error).toBe("");
//   });

//   test("should authenticate user", async () => {
//     const result = await store.dispatch(authenticateUserAsync(mockToken));
//     const stateAfter = store.getState().userReducer;

//     expect(result.payload).toEqual(mockUsers[2]);
//     expect(stateAfter.currentUser).toEqual(mockUsers[2]);
//     expect(stateAfter.loading).toBeFalsy();
//     expect(stateAfter.error).toBe("");
//   });

//   test("should not authenticate falsy token", async () => {
//     const result = await store.dispatch(authenticateUserAsync("falsyToken"));
//     const stateAfter = store.getState().userReducer;

//     expect(result.payload).toContain("status code 400");
//     expect(stateAfter.currentUser).toBeUndefined();
//     expect(stateAfter.error).toContain("status code 400");
//   });

//   test("should login user", async () => {
//     const credentials = {
//       email: mockUsers[2].email,
//       password: mockUsers[2].password,
//     };
//     const result = await store.dispatch(loginUserAsync(credentials));
//     const stateAfter = store.getState().userReducer;

//     expect(result.payload).toEqual(mockUsers[2]);
//     expect(stateAfter.currentUser).toEqual(mockUsers[2]);
//     expect(stateAfter.loading).toBeFalsy();
//     expect(stateAfter.error).toBe("");
//   });

//   test("should not login user with wrong credentials", async () => {
//     const credentials = {
//       email: mockUsers[2].email,
//       password: "wrong",
//     };
//     const result = await store.dispatch(loginUserAsync(credentials));
//     const stateAfter = store.getState().userReducer;

//     expect(result.payload).toContain("status code 400");
//     expect(stateAfter.currentUser).toBeUndefined();
//     expect(stateAfter.error).toContain("status code 400");
//   });

//   test("should register new user", async () => {
//     const newUser: UserRegister = {
//       email: "test@mail.com",
//       password: "password",
//       name: "Test Name",
//       role: "customer",
//       avatar: "https://i.imgur.com/fpT4052.jpeg",
//     };
//     await store.dispatch(registerUserAsync(newUser));
//     const stateAfter = store.getState().userReducer;

//     expect(initialUserState.users).toHaveLength(0);
//     expect(stateAfter.users).toHaveLength(1);
//     expect(stateAfter.currentUser).toBeDefined();
//     expect(stateAfter.loading).toBeFalsy();
//     expect(stateAfter.error).toBe("");
//     expect(stateAfter.success).toContain("Welcome");
//   });

//   test("should not register uncomplete user", async () => {
//     const incompleteUser: any = {
//       email: "test@mail.com",
//       name: "Test Name",
//       role: "customer",
//       avatar: "https://i.imgur.com/fpT4052.jpeg",
//     };
//     const result = await store.dispatch(registerUserAsync(incompleteUser));
//     const stateAfter = store.getState().userReducer;

//     expect(result.payload).toContain("status code 400");
//     expect(stateAfter.currentUser).toBeUndefined();
//     expect(stateAfter.error).toContain("status code 400");
//   });

//   test("should delete an existing user", async () => {
//     await store.dispatch(fetchAllUsersAsync());
//     const stateBefore = store.getState().userReducer;

//     const result = await store.dispatch(deleteUserAsync(1));
//     const stateAfter = store.getState().userReducer;

//     expect(stateBefore.users).toHaveLength(3);
//     expect(result.payload).toBe(1);
//     expect(stateAfter.users).toHaveLength(2);
//     expect(stateAfter.users[0].id).not.toBe(1);
//   });

//   test("should not delete user with wrong id", async () => {
//     await store.dispatch(fetchAllUsersAsync());
//     const stateBefore = store.getState().userReducer;

//     const result = await store.dispatch(deleteUserAsync(4));
//     const stateAfter = store.getState().userReducer;

//     expect(stateBefore.users).toHaveLength(3);
//     expect(result.payload).toContain("status code 400");
//     expect(stateAfter.users).toHaveLength(3);
//   });
// });
export {};
