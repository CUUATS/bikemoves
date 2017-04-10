import { ToastController } from 'ionic-angular';

// Source: http://stackoverflow.com/questions/37042602/how-to-combine-object-properties-in-typescript
export function extend(...args: any[]): any {
  const newObj = {};
  for (const obj of args) {
    for (const key in obj) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// Based on: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
export function pad(n: number, w: number, z='0') {
  let d = n.toString();
  return (d.length >= w) ? d : new Array(w - d.length + 1).join(z) + d;
}

// Source: http://stackoverflow.com/questions/12168909/blob-from-dataurl
export function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(',')[1]),
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0],
    ab = new ArrayBuffer(byteString.length),
    ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ab], {type: mimeString});
}

export function getOptions(labels: any[]) {
  return labels.map((label, i) => {
    return {
      value: i,
      label: label
    }
  });
}

export function notify(toastCtrl: ToastController, msg: string, duration = 3000) {
  let toast = toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
  return toast;
}

// Source: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export function format(value: number, places = 0, sep = ','): string {
  let parts = value.toFixed(places).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return parts.join('.');
}
