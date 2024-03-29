import { getBlackboxPictures, postBlackboxPicture } from '@/api/blackbox'
import { ActionContext } from 'vuex';
import { BlackboxStoreType, StoreType } from "./types";

type ActionContextType = ActionContext<BlackboxStoreType, StoreType>

export default {
  namespaced: true,
  state: () => ({}),
  actions: {
    postBlackboxPicture: async function({ commit }: ActionContextType, formData: FormData) {
      return await postBlackboxPicture(formData).then(res => {
        commit('setUserUsedBlackbox', null, { root: true })
        return res
      })
    },
    getBlackboxPictures({ commit }: ActionContextType) {
      getBlackboxPictures(4).then(res => {
        commit('setUserBlackboxPictures', res.data.giveBlackboxPictures.images_paths, { root: true })
        return res
      })
    },
  },
}
