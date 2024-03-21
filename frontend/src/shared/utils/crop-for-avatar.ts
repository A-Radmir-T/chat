import { PixelCrop } from 'react-image-crop'

export const cropForAvatar = async (
	imgEl: HTMLImageElement,
	crop: PixelCrop,
): Promise<Blob | unknown> => {
	const canvas = document.createElement('canvas')

	const scaleX = imgEl.naturalWidth / imgEl.width
	const scaleY = imgEl.naturalHeight / imgEl.height

	const ctx = canvas.getContext('2d')
	const pixelRatio = window.devicePixelRatio

	if (!ctx) {
		throw new Error('No 2d context')
	}

	canvas.width = crop.width * pixelRatio * scaleX
	canvas.height = crop.height * pixelRatio * scaleY

	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
	ctx.imageSmoothingQuality = 'high'

	ctx.drawImage(
		imgEl,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width * scaleX,
		crop.height * scaleY,
	)

	const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'))

	return imageBlob
}
