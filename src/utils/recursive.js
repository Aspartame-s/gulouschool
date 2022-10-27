
export const recursiveFunction = (string, arr) => {
    var targetArr = []
    let path = string
    arr.forEach(item => {
        if (item.children.length) {
            targetArr = targetArr.concat(recursiveFunction(path, item.children))
        } else {
            if (item.path == path) {
                targetArr.push(item)
                return
            }
        }
    })
    return targetArr
}

