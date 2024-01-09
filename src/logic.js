let pictureIndex = null
let observer = null

function emitChange() {
    observer(pictureIndex)
}

export function observe(o) {
    if (observer) {
        throw new Error('observer already exits')
    }
    observer = o
    emitChange()
}

export function  movePicturePuzzlePart(newPictureIndex) {
    pictureIndex = newPictureIndex
    emitChange()
}
