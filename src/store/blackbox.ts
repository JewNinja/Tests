import { ITest } from "@/models";
import { getBlackboxPictures, postBlackboxPicture } from '@/api/blackbox'

export default {
  namespaced: true,
  state: () => ({}),
  actions: {
    postBlackboxPicture: async function({ commit }: any, formData: any) {
      return await postBlackboxPicture(formData).then(res => {
        commit('setUserUsedBlackbox', null, { root: true })
        return res
      })
    },
    getBlackboxPictures({ commit }: any) {
      getBlackboxPictures(4).then(res => {
        commit('setUserBlackboxPictures', res.data.giveBlackboxPictures.images_paths, { root: true })
        return res
      })
    },
  },
}
