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
    
    sendContentChange(deviceId, current_url, type) {
        this.socket.emit("changeContent", {
          "deviceid": deviceId,
          "currenturl": current_url,
          "type": type
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
        if (!content) return this.manager.clearContent();
        this.manager.setContent(content);
    }
}
