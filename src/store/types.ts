import { ITest } from "@/models";

// типизация Vuex https://dev.to/shubhadip/vue-3-vuex-4-modules-typescript-2i2o

export type StoreType = {
  app: {
    isInit: boolean,
    isLogin: boolean
  },
  user: {
    blackbox: {
      is_used: boolean | null,
      pictures: Array<string>
    }
  }
};

export type TestsStoreType = {
  data: Array<ITest>,
  isLoaded: boolean,
};

export type BlackboxStoreType = {};