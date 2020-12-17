import { useState } from 'react'
import { message } from 'antd'
import { getBase64 } from 'utils'
import { upload as uploadAPI } from 'core/api'

export function useUpload(initUrls = [], options) {
  const [state, setState] = useState({
    loading: false,
    imgSources: initUrls,
    files: [],
  })

  async function onChange(info) {
    const { file } = info
    let fileList = [...info.fileList]

    // limit number of image can upload
    if (options?.limit) {
      fileList = fileList.splice(0 - options.limit)
    }

    setState({ ...state, files: fileList })

    if (file.status === 'done') {
      try {
        setState((prevState) => ({ ...prevState, loading: true }))

        const getImageUrls = [...fileList].map((item) => getBase64(item.originFileObj))
        const imgSources = await Promise.all(getImageUrls)

        setState((prevState) => ({ ...prevState, loading: false, imgSources, files: fileList }))

        // afterLoadFile hook run after file loaded
        if (typeof options?.afterLoadFile === 'function') {
          options.afterLoadFile(file)
        }
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  async function upload(getIds = false) {
    const userToken = ''
    if (userToken) {
      const { files } = state

      const promises = files.map((file) => {
        return uploadAPI({ file })
      })

      try {
        const responses = await Promise.all(promises)

        return !getIds ? responses.map((data) => data.url) : responses.map((data) => data.upload?.id)
      } catch (e) {
        throw new Error(e)
      }
    }

    message.error('Upload error!')
    return []
  }

  return {
    ...state,
    setState,
    upload,
    uploadProps: { onChange, fileList: state.files },
  }
}
