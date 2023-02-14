import create from "zustand";

const useStore = create(() => ({
  auth: false,
  user: [],
  token: "",
  token_expire: 0,
}));

export default useStore;
