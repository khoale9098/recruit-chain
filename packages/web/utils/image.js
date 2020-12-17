import { message } from 'antd'

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export function checkImageExt(file) {
  return file.type === 'image/jpeg' || file.type === 'image/png'
}

export function checkFileSize(file, limit = 2) {
  return file.size / 1024 / 1024 < limit
}

export function beforeUpload(file, t) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error(t('error_message_avatar_type'))
  }

  const isLt2M = file.size / 1024 / 1024 < 10

  if (!isLt2M) {
    message.error(t('error_message_avatar_size', { count: 10 }))
  }

  return isJpgOrPng && isLt2M
}

export function classifyUserAvatars(avatars) {
  if (!Array.isArray(avatars)) return null

  const output = { defaultAvt: null, normals: [] }

  function classify(avt) {
    if (avt.isDefault) {
      output.defaultAvt = avt
      return
    }
    output.normals = [...output.normals, avt]
  }
  avatars.forEach(classify)

  return output
}
