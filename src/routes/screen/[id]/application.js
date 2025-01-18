export {
    ConnectionHandler,
    DataProcessor
}

class ConnectionHandler {
    constructor(io, deviceid, socket_url) {
        this.io = io;
        this.socket = io(socket_url + "?id=" + deviceid);
    }

    register(event, handler) {
        this.socket.on(event, handler);
    }

    unregister(event, handler) {
        this.socket.off(event, handler);
    }
    
    sendContentChange(deviceId, contentName, medias, current) {
        this.socket.emit("changeContent", {
          "deviceid": deviceId,
          "contentname": contentName,
          "medias": medias,
          "current": current
        });
      }
}

class DataProcessor {
    constructor(manager) {
        this.manager = manager;
    };

    statusHandler() {
        this.manager.removeStatus();
    }

    contentHandler(content) {
        console.log(content)
        if (!content) return this.manager.clearContent();
        this.manager.setContent(content);
    }
}
