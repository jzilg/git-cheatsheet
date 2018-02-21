(function() {
    const subHeadings = document.querySelectorAll('h2, h3')
    const toc = document.getElementById('toc')
    const prevUl = {
        wasH3: false,
        ul: null,
    }

    for (let i = 0; i < subHeadings.length; i++) {
        const heading = subHeadings[i]
        const id = heading.innerText.toLocaleLowerCase()

        const li = document.createElement('li')
        let link = document.createElement('a')
        link.href = `#${id}`
        link.innerText = heading.innerText

        li.appendChild(link)

        if (heading.tagName === 'H3') {
            if (!prevUl.wasH3) {
                prevUl.ul = document.createElement('ul')
            }
            prevUl.ul.appendChild(li)
            prevUl.wasH3 = true

            toc.appendChild(prevUl.ul)
        } else {
            prevUl.wasH3 = false
            toc.appendChild(li)
        }

        heading.id = id
    }    
})()
