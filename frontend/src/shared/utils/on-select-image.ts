export const onSelectImage = async (event: any): Promise<string | ArrayBuffer | null> => {
	const reader = new FileReader()
	return new Promise((resolve) => {
		if (event.target.files && event.target.files.length > 0) {
			reader.onload = () => {
				resolve(reader.result)
				reader.onload = null
			}
			reader.readAsDataURL(event.target.files[0])
		}
	})
}
