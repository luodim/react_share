export const onLoadImg = (file, handleLoad) => {
  const reader = new FileReader()
  if (!file) return
  reader.readAsDataURL(file)
  reader.onload = (e) => {
  	handleCompressImg(e.target.result, (img) => handleLoad(img))
  }
}

export const handleCompressImg = (imgUri, handleLoad) => {
  if (!imgUri) return ''
  let img = new Image()
  img.src = imgUri
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let aspectRatio = img.width / img.height
    console.log(`aspectRatio is ${aspectRatio}`)
    canvas.width = 1080
    canvas.height = canvas.width / aspectRatio
    console.log(`width is ${canvas.width}, height is ${canvas.height}`)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    handleLoad(canvas.toDataURL('image/jpeg'))
  }
}

export const dataURL2Blob = (url) => {
  let arr = url.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n);
  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let file = new Blob([u8arr], {type:mime})
  file.name = `pic_${new Date().getTime()}`
  console.log(`file size is ${file.size}`)
  return file
}

export const canvas2DataURL = (canvas)=> {
  let quality = 0.8
  return canvas.toDataURL('image/png', quality)
}