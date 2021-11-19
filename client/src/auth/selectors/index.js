export const selectIsSignedIn = (state) => !!state.auth.jwtToken;

export const selectIsAuthorising = (state) => state.auth.isAuthorising;

export const selectIsSigningOut = (state) => state.auth.isSigningOut;

export const selectIsInitialising = (state) =>
  state.auth.initialising.length > 0;

export const selectIsAuthStateChanging = (state) =>
  selectIsAuthorising(state) ||
  selectIsSigningOut(state) ||
  selectIsInitialising(state);
