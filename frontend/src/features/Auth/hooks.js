import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser, registerUser } from "./queries";

// ✅ React Query Hooks
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Invalidate or update global state
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear user cache
      queryClient.removeQueries(["currentUser"]);
    },
  });
};
