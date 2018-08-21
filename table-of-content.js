(function() {
    const headings = document.querySelectorAll('h2, h3')
    const toc = document.getElementById('toc')
    const parentHeading = {
        level: undefined,
        node: undefined,
    }
    let subUl
    let li

    const getHeadingLevel = (heading) => {
        const headingLevelAsString = heading.tagName.replace('H', '')
        return parseInt(headingLevelAsString)
    }

    const getIdFromHeading = heading => heading.innerText
        .toLocaleLowerCase()
        .replace(/(,|;|\.|:)/g, '') // remove , ; . :
        .replace(/ /g, '-') // replace space with -

    const getId = (curHeading, parentHeading) => curHeading.level > parentHeading.level
        ? `${getIdFromHeading(parentHeading.node)}-${getIdFromHeading(curHeading.node)}`
        : getIdFromHeading(curHeading.node)

    const createLink = (text, id) => {
        const link = document.createElement('a')
        link.href = `#${id}`
        link.innerText = text
        return link
    }

    const addIdToHeading = (heading, id) => {
        heading.id = id
    }

    for (let i = 0; i < headings.length; i++) {
        const curHeading = {
            level: getHeadingLevel(headings[i]),
            node: headings[i]
        }

        if (!parentHeading.level || curHeading.level <= parentHeading.level) {
            parentHeading.level = curHeading.level
            parentHeading.node = curHeading.node
        }

        const id = getId(curHeading, parentHeading)
        const link = createLink(curHeading.node.innerText, id)

        if (curHeading.node.tagName === 'H3') {
            if (!subUl) {
                subUl = document.createElement('ul')
                li.appendChild(subUl)
                toc.appendChild(li)
            }
            const subLi = document.createElement('li')
            subLi.appendChild(link)
            subUl.appendChild(subLi)
        } else {
            subUl = null
            li = document.createElement('li')
            li.appendChild(link)
            toc.appendChild(li)
        }

        addIdToHeading(curHeading.node, id)
    }
})()
