export function copyToClipboard(data) {
  // Attempt to use the newer clipboard API when possible
  const { clipboard } = navigator
  if (clipboard) {
    clipboard.writeText(data)
    return
  }

  // creates a tiny temporary text area to copy text out of
  // see https://stackoverflow.com/a/30810322/591374 for details
  const textArea = document.createElement('textarea')
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = data
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}
