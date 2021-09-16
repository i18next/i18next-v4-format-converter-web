export function download(filename, str, type = 'octet/stream') {
    const blob = typeof str === 'string' ? new Blob([str], { type }) : str;
  
    /*
    else if (userAgent.match('FxiOS')) { //FF iOS
      alert("Cannot display on FF iOS");
    }
    */
  
    if (window.navigator.msSaveOrOpenBlob) {
      // IE 11+
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else if (window.navigator.userAgent.match('CriOS')) {
      // Chrome iOS
      const reader = new FileReader();
      reader.onloadend = function () {
        window.open(reader.result);
      };
      reader.readAsDataURL(blob);
    } else if (
      window.navigator.userAgent.match(/iPad/i) ||
      window.navigator.userAgent.match(/iPhone/i)
    ) {
      // Safari & Opera iOS
      const url = window.URL.createObjectURL(blob);
      window.location.href = url;
    } else {
      const a = document.createElement('a');
      a.style.display = 'none';
      document.body.appendChild(a);
  
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }
  