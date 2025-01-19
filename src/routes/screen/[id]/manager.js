import { ConnectionHandler, DataProcessor } from "./application.js";

import Sha256 from "./sha256.js";

export class Manager {
  constructor(io, deviceid, socket_url, clearCarouselItems, addCarouselItem, setStatus, setCurrentItemIndex, getCarouselItemsDom, getCurrentItemIndex, getItems) {
    this.io = io;
    this.socket_url = socket_url;
    this.deviceid = deviceid;
    this.durations = [];
    this.carouselTimer = 0;
    this.contentHash = "";
    this.contentName = "";
    this.clearCarouselItems = clearCarouselItems;
    this.addCarouselItem = addCarouselItem;
    this.setStatus = setStatus;
    this.setCurrentItemIndex = setCurrentItemIndex;
    this.getCarouselItemsDom = getCarouselItemsDom;
    this.getCurrentItemIndex = getCurrentItemIndex;
    this.getItems = getItems;
  }

  run() {
    this.connectionHandler = new ConnectionHandler(this.io, this.deviceid, this.socket_url);
    const dataProcessor = new DataProcessor(this);
    this.connectionHandler.register("connect", () =>
      dataProcessor.statusHandler(),
    );
    this.connectionHandler.register("content", (content) =>
      dataProcessor.contentHandler(content),
    );
  }

  removeStatus() {
    this.setStatus(false);
  }

  setContent(content) {
    let contentjson = JSON.parse(content);
    if(contentjson.type == "slideshow") {
      contentjson.visualMediaInclusionCollection.sort((a, b) => a.slideshowPosition - b.slideshowPosition);
    }
    let contentHash = Sha256.hash(JSON.stringify(contentjson));
    if(this.contentHash === contentHash) return;
    content = contentjson;
    this.contentHash = contentHash;
    this.contentName = content?.name ?? "Unknown content name";
    this.#stopCarousel();
    this.clearCarouselItems();
    this.durations = [];
    this.setCurrentItemIndex(0);

    if(content.type == "slideshow") {
      let items = content.visualMediaInclusionCollection;

      items.forEach((item, i) => {
        this.addCarouselItem(item.visualMedia);
        this.durations.push(item.slideDuration * 1000);
      });
    } else if (content.type == "visualMedia") {
      this.addCarouselItem(content);
      this.durations.push(5000);
    }
    this.#startCarousel();
  }

  clearContent() {
    this.#stopCarousel();
    this.durations = [];
    this.clearCarouselItems();
    this.setCurrentItemIndex(0);
  }

  #startCarousel() {
    this.carouselTimer = setTimeout(() => {
      const elements = this.getCarouselItemsDom().querySelectorAll("img, video");
      const currentElem = elements.item(this.getCurrentItemIndex());
      this.setCurrentItemIndex((this.getCurrentItemIndex() + 1) % elements.length);
      const nextElem = elements.item(this.getCurrentItemIndex());
      if (currentElem?.tagName === "VIDEO" && elements.length > 1) {
        currentElem.pause();
        currentElem.currentTime = 0;
      }
      if (nextElem?.tagName === "VIDEO" && !(!nextElem?.paused && nextElem?.currentTime > 0 && !nextElem?.ended)) nextElem.play();
      this.connectionHandler.sendContentChange(
        this.deviceid,
        this.contentName,
        this.getItems(),
        this.getCurrentItemIndex()
      );
      this.#startCarousel();
    }, this.durations[this.getCurrentItemIndex()]);
  }

  #stopCarousel() {
    clearTimeout(this.carouselTimer);
  }
}
