import { ConnectionHandler, DataProcessor } from "./application.js";

import Sha256 from "./sha256.js";

export class Manager {
  constructor(io, deviceid, socket_url, clearCarouselItems, addCarouselItem, setStatus, setCurrentItemIndex, getCarouselItemsDom, getCurrentItemIndex, getCurrentItem) {
    this.io = io;
    this.socket_url = socket_url;
    this.deviceid = deviceid;
    this.durations = [];
    this.carouselTimer = 0;
    this.contentHash = "";
    this.clearCarouselItems = clearCarouselItems;
    this.addCarouselItem = addCarouselItem;
    this.setStatus = setStatus;
    this.setCurrentItemIndex = setCurrentItemIndex;
    this.getCarouselItemsDom = getCarouselItemsDom;
    this.getCurrentItemIndex = getCurrentItemIndex;
    this.getCurrentItem = getCurrentItem;
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
    let contentHash = Sha256.hash(content);
    if(this.contentHash === contentHash) return;
    this.contentHash = contentHash;
    content = JSON.parse(content);
    this.#stopCarousel();
    this.clearCarouselItems();
    this.durations = [];
    this.setCurrentItemIndex(0);

    if(content.type == "slideshow") {
      let items = content.visualMediaInclusionCollection;
      items.sort((a, b) => a.slideshowPosition - b.slideshowPosition);

      items.forEach((item, i) => {
        this.addCarouselItem(item.visualMedia);
        this.durations.push(item.slideDuration * 1000);
      });
      this.#startCarousel();
    } else if (content.type == "visualMedia") {
      this.addCarouselItem(content);
    }
  }

  clearContent() {
    this.#stopCarousel();
    this.durations = [];
    this.clearCarouselItems();
    this.setCurrentItemIndex(0);
  }

  #startCarousel() {
    this.carouselTimer = setTimeout(() => {
      console.log(this.getCurrentItemIndex(), this.durations[this.getCurrentItemIndex()]);
      const elements = this.getCarouselItemsDom().querySelectorAll("img, video");
      const currentElem = elements.item(this.getCurrentItemIndex());
      this.setCurrentItemIndex((this.getCurrentItemIndex() + 1) % elements.length);
      const nextElem = elements.item(this.getCurrentItemIndex());
      if (currentElem?.tagName === "VIDEO") {
        currentElem.pause();
        currentElem.currentTime = 0;
      }
      if (nextElem?.tagName === "VIDEO") nextElem.play();
      console.log(this.getCurrentItem().location);
      this.connectionHandler.sendContentChange(
        this.deviceid,
        this.getCurrentItem().location,
        nextElem?.tagName === "VIDEO" ? "video" : "image"
      );
      this.#startCarousel();
    }, this.durations[this.getCurrentItemIndex()]);
  }

  #stopCarousel() {
    clearTimeout(this.carouselTimer);
  }
}
