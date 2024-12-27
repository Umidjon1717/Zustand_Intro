import { create } from 'zustand';

const useUserStore = create((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
}));

export default useUserStore;
