const initState = {
    posts: [],
    photos: [],
}

const rootReducer = (state = initState, action) => {
    let newState={};
    switch (action.type) {
        case 'SAVE_POST':
            const post = action.payload;
            console.log("Reducer post\n" + action.payload.photos);
            newState = {
                ...state,
                posts: [
                    ...state.posts,
                    post
                ]
            };
            return newState;

        case 'SAVE_PHOTO':
            const uid = action.payload;
            console.log("Reducer photo" + uid);
            newState = {
                ...state,
                photos: [...state.photos, uid]
            };
            return newState;

        case 'CLEAR_PHOTOS':
            console.log("Reducer photo clear");
            newState = {
                ...state,
                photos: []
            };
            return newState;

        case 'DELETE_POST':
            const id = action.payload;
            console.log("Reducer photo delete post " + action.payload);
            newState = {
                ...state,
                posts: state.posts.filter((item) => item.id !== id)
            };
            return newState;

        default:
            console.log("Reducer default");
            return state;
    }
}

export default rootReducer;