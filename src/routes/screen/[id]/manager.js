import { ConnectionHandler, DataProcessor } from "./application.js";

import Sha256 from "./sha256.js";

export class Manager {
  constructor(io, deviceid, socket_url, clearCarouselItems, addCarouselItem, setStatus, setCurrentItem, getCarouselItemsDom, getCurrentItem) {
    this.io = io;
    this.socket_url = socket_url;
    this.deviceid = deviceid;
    this.durations = [];
    this.carouselTimer = 0;
    this.contentHash = "";
    this.clearCarouselItems = clearCarouselItems;
    this.addCarouselItem = addCarouselItem;
    this.setStatus = setStatus;
    this.setCurrentItem = setCurrentItem;
    this.getCarouselItemsDom = getCarouselItemsDom;
    this.getCurrentItem = getCurrentItem;
  }

  run() {
    const connectionHandler = new ConnectionHandler(this.io, this.deviceid, this.socket_url);
    const dataProcessor = new DataProcessor(this);
    connectionHandler.register("connect", () =>
      dataProcessor.statusHandler(),
    );
    connectionHandler.register("content", (content) =>
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
    this.setCurrentItem(0);

    if(content.type == "slideshow") {
      content.visualMediaInclusionCollection.forEach((item, i) => {
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
    this.setCurrentItem(0);
  }

  #startCarousel() {
    this.carouselTimer = setTimeout(() => {
      console.log(this.getCurrentItem(), this.durations[this.getCurrentItem()]);
      const elements = this.getCarouselItemsDom().querySelectorAll("img, video");
      const currentElem = elements.item(this.getCurrentItem());
      this.setCurrentItem((this.getCurrentItem() + 1) % elements.length);
      const nextElem = elements.item(this.getCurrentItem());
      if (currentElem?.tagName === "VIDEO") {
        currentElem.pause();
        currentElem.currentTime = 0;
      }
      if (nextElem?.tagName === "VIDEO") nextElem.play();
      this.#startCarousel();
    }, this.durations[this.getCurrentItem()]);
  }

  #stopCarousel() {
    clearTimeout(this.carouselTimer);
  }
}
