function copyToClipboard(element) {
    const input = document.createElement('input')
    input.value = element.innerText

    element.appendChild(input)
    input.select()
    document.execCommand("Copy")

    element.removeChild(input)
}
