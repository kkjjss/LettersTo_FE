import create from 'zustand';

interface Store {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  nickname: string;
  setNickname: (value: string) => void;
}

const useStore = create<Store>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: value => set(() => ({isLoggedIn: value})),

  isLoading: true,
  setIsLoading: value => set(() => ({isLoading: value})),

  nickname: 'Aaa',
  setNickname: value => set(() => ({nickname: value})),
}));

export default useStore;
