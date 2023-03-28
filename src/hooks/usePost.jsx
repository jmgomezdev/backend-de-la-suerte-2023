"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePost = (key, fn, properties = {}) => {
  const queryClient = useQueryClient();
  return useMutation((data) => fn(data), {
    onError: (error, _newTodo) => {
      console.error(error);
    },
    onSuccess: (data, varibles, context) => {
      console.log("MUTATION SUCCESS");
      queryClient.invalidateQueries(key);
    },
    ...properties,
  });
};
