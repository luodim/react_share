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
    handleLoad(img)
  }
}