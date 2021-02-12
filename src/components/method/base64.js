// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object

// Download a Base64-encoded file
  
export function downloadBase64File (base64Data, filename) {
    var element = document.createElement('a')
    element.setAttribute('href', base64Data)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
  
  // Extract an Base64 Image's File Extension
  export function extractImageFileExtensionFromBase64 (base64Data) {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
  }
  
  // Base64 Image to Canvas with a Crop
  export function image64toCanvasRef (canvasRef, image64, pixelCrop) {
    // membuat file image
    const image = new Image()
    image.src = image64

    // ubah persen ke pixel
    const targetX = image.width * pixelCrop.x / 100;
    const targetY = image.height * pixelCrop.y / 100;
    const targetWidth = image.width * pixelCrop.width / 100;
    const targetHeight = image.height * pixelCrop.height / 100;

    let canvas = canvasRef // document.createElement('canvas');
    canvas.width = (pixelCrop.width/100) * targetWidth
    canvas.height =  (pixelCrop.height/100) * targetHeight

    const ctx = canvas.getContext('2d')
    
    // membuat semua menjadi pixel > asalnya %
    ctx.drawImage(      
        image,
        targetX,
        targetY,
        targetWidth,
        targetHeight,
        0,
        0,
        targetWidth,
        targetHeight
        
      )
    }
    

    // membuat base64 menjadi sebuah file
    export function base64StringtoFile (dataurl, filename) {
      var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new File([u8arr], filename, {type:mime});
    
      }
    
    
    
    
      // fungsi membuat base64 menjadi file blob
//   export function makeblob (dataURL) {
//     var BASE64_MARKER = ';base64,';
//     if (dataURL.indexOf(BASE64_MARKER) == -1) {
//         var parts = dataURL.split(',');
//         var contentType = parts[0].split(':')[1];
//         var raw = decodeURIComponent(parts[1]);
//         return new Blob([raw], { type: contentType });
//     }
//     var parts = dataURL.split(BASE64_MARKER);
//     var contentType = parts[0].split(':')[1];
//     var raw = window.atob(parts[1]);
//     var rawLength = raw.length;

//   export function makeblob (dataURL) {
//     var BASE64_MARKER = ';base64,';
//     if (dataURL.indexOf(BASE64_MARKER) == -1) {
//         var parts = dataURL.split(',');
//         var contentType = parts[0].split(':')[1];
//         var raw = decodeURIComponent(parts[1]);
//         return new Blob([raw], { type: contentType });
//     }
//     var parts = dataURL.split(BASE64_MARKER);
//     var contentType = parts[0].split(':')[1];
//     var raw = window.atob(parts[1]);
//     var rawLength = raw.length;

//     var uInt8Array = new Uint8Array(rawLength);

//     for (var i = 0; i < rawLength; ++i) {
//         uInt8Array[i] = raw.charCodeAt(i);
//     }

//     return new Blob([uInt8Array], { type: contentType });
// }