export default function ({ app, redirect, _route, _req }) {
  if (!app.store.state.user || !app.store.state.isAuthenticated) {
    return redirect("/auth/login");
  }
}