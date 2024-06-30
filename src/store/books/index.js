import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
export default{
    namespaced:true,
    state() {
        return {
            books: [],
            selectedGenres:[],
            search:'',
            comments: [],
            userComments: [],
            userFavorites: [],
            categories:[],
            sortOption: 0,
        }
    },
    getters,
    mutations,
    actions
}