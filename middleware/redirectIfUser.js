export default function ({ app, redirect, _req }) {
    if (app.store.state.user) {
      if (app.store.state.user.roles.includes("customer")) {
        return redirect({
          name: "panel",
          params: { username: app.store.state.user.username },
        });
      } else if (app.store.state.user.roles.includes("admin")) {
        return redirect("/admin/dashboard");
      } else {
        return redirect({
          name: "panel",
        });
      }
    } else {
      return redirect("/");
    }
  }