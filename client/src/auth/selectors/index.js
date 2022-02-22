export const selectIsSignedIn = (state) => !!state.auth.token;

export const selectIsAdmin = (state) => !!state.auth.admin;

export const selectUserName = (state) => state.auth.userName;

export const selectIsAuthorising = (state) => state.auth.isAuthorising;

export const selectIsSigningOut = (state) => state.auth.isSigningOut;

export const selectIsInitialising = (state) =>
  state.auth.initialising.length > 0;

export const selectIsAuthStateChanging = (state) =>
  selectIsAuthorising(state) ||
  selectIsSigningOut(state) ||
  selectIsInitialising(state);
