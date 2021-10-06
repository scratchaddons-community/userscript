import chrome from "../../libraries/common/chrome.js";

const groups = () => [
  // Only popup:
  {
    id: "recentlyUsed",
    name: chrome.i18n.getMessage("recentlyUsed"),
    addonIds: [],
    expanded: true,
    iframeShow: true,
    fullscreenShow: false,
  },
  {
    id: "runningOnTab",
    name: chrome.i18n.getMessage("runningOnThisPage"),
    addonIds: [],
    expanded: true,
    iframeShow: true,
    fullscreenShow: false,
  },
  {
    // Needed to create addonListObjs items for non-enabled addons
    id: "_iframeSearch",
    name: "",
    addonIds: [],
    expanded: true,
    iframeShow: true,
    fullscreenShow: false,
  },

  {
    id: "featuredNew",
    name: chrome.i18n.getMessage("featuredNew"),
    addonIds: [],
    expanded: true,
    iframeShow: false,
    fullscreenShow: true,
  },
  {
    id: "new",
    name: chrome.i18n.getMessage("newGroup"),
    addonIds: [],
    expanded: new URLSearchParams(window.location.search).get("source") === "updatenotif",
    iframeShow: false,
    fullscreenShow: true,
  },
  {
    id: "enabled",
    name: chrome.i18n.getMessage("enabled"),
    addonIds: [],
    expanded: true,
    iframeShow: true,
    fullscreenShow: true,
  },
  {
    id: "recommended",
    name: chrome.i18n.getMessage("recommended"),
    addonIds: [],
    expanded: true,
    iframeShow: false,
    fullscreenShow: true,
  },
  {
    id: "featured",
    name: chrome.i18n.getMessage("featured"),
    addonIds: [],
    expanded: true,
    iframeShow: false,
    fullscreenShow: true,
  },
  {
    id: "forums",
    name: chrome.i18n.getMessage("forums"),
    addonIds: [],
    expanded: false,
    iframeShow: false,
    fullscreenShow: true,
  },
  {
    id: "others",
    name: chrome.i18n.getMessage("others"),
    addonIds: [],
    expanded: true,
    iframeShow: false,
    fullscreenShow: true,
  },
  {
    id: "beta",
    name: chrome.i18n.getMessage("beta"),
    addonIds: [],
    expanded: false,
    iframeShow: false,
    fullscreenShow: true,
  },
];

export default async () => {
  await chrome.i18n.init();
  return groups;
};
