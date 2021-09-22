/* global libraryLicenses, licenseNameToText */

const lightThemeLink = document.createElement("link");
lightThemeLink.setAttribute("rel", "stylesheet");
lightThemeLink.setAttribute("href", "light.css");

chrome.storage.sync.get(["globalTheme"], function (r) {
  let rr = false; //true = light, false = dark
  if (r.globalTheme) rr = r.globalTheme;
  if (rr) {
    document.head.appendChild(lightThemeLink);
  }
});
const vue = new Vue({
  el: "body",
  data: {
    libraries: [],
  },
  methods: {
    msg(message, ...param) {
      return chrome.i18n.getMessage(message, ...param);
    },
  },
});

window.addEventListener("licenses-loaded", () => {
  const searchParams = new URL(location.href).searchParams;
  const libraryParam = searchParams.get("libraries");
  if (typeof libraryParam !== "string") return;
  const libraries = libraryParam.split(",");
  console.log(libraryLicenses, libraries);
  for (const library of libraries) {
    const licenseName = libraryLicenses[library];
    if (!licenseName) continue;
    vue.libraries = [
      ...vue.libraries,
      {
        name: library,
        license: licenseNameToText[licenseName],
      },
    ];
    /*
    chrome.runtime.sendMessage({ licenseName }, ({ licenseText }) => {
      licenseNameToText[licenseName] = licenseText;
      vue.libraries = [
        ...vue.libraries,
        {
          name: library,
          license: licenseText,
        },
      ];
    });
    */
  }
});

document.title = chrome.i18n.getMessage("licensesTitle");
