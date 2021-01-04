import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {

    console.log("Error occured: " + error.message);
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

      if (chunkFailedMessage.test(error.message)) {
          console.log("Loading chunk .. failed error so reloading window to  force app to reload to load the new fresh chunks");
        // window.location.reload(true);
        window.parent.caches.delete("call");
        alert("Press Ctrl+F5 to refresh your browser. If problem persists then please clear your browser cache");
        localStorage.clear();
        console.log("cleared local storage");
        sessionStorage.clear();
        console.log("cleared session storage");
        window.location.reload(true);
      }
    }
  }