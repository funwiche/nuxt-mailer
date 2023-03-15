// const Cookie = {
//   get(key) {
//     return Object.fromEntries(
//       document.cookie.split(";").map((el) => el.trim().split("="))
//     )?.[key];
//   },
//   getAll() {
//     return Object.fromEntries(
//       document.cookie.split(";").map((el) => el.trim().split("="))
//     );
//   },
//   set(key, value) {
//     if (!key) return;
//     document.cookie = `${key}=${value}`;
//   },
//   remove(key) {
//     if (!key) return;
//     document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
//   },
//   removeAll() {
//     document.cookie = ``;
//     document.cookie.split(";").forEach((cookie) => {
//       const [key, value] = cookie.split("=");
//       if (key)
//         document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
//     });
//   },
// };
setTheme();
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setTheme);
function setTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  document.cookie = `device_mode=${theme}`;
  theme = document.cookie.includes("theme=dark")
    ? "dark"
    : document.cookie.includes("theme=light")
    ? "light"
    : theme;
  document.documentElement.setAttribute("data-mode", theme);
  document.documentElement.style.setProperty("color-scheme", theme);
}
