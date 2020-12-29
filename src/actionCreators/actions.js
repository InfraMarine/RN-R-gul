export const saveWord = (payload) => {
    return {
        type: "SAVE_WORD",
        payload,
    }
}

export const savePost = (payload) => {
    return {
        type: "SAVE_POST",
        payload,
    }
}

export const savePhoto = (payload) => {
    return {
        type: "SAVE_PHOTO",
        payload
    }
}

export const clearPhotos = (payload) => {
    return {
        type: "CLEAR_PHOTOS",
        payload
    }
}

export const deletePost = (payload) => {
    return {
        type: "DELETE_POST",
        payload
    }
}