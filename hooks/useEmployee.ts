"use client";

import { api } from "@/lib/axios";
import { Employee } from "@/types/employe.types";
import {useMutation, useQueryClient } from "@tanstack/react-query";

const useEmployee = () => {
  const queryClient = useQueryClient();

  const saveNewEmployeeMutation = useMutation({
    mutationFn: async (employee: Employee) => {
      const res = await api.post("/employee", employee);
      return res.data.user as Employee;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },

    onError: (error) => {
      console.log("Error creating employee:", error);
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: async (employee: Employee) => {
      const res = await api.put(`/employee/${employee._id}`, employee);
      return res.data.user as Employee;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },

    onError: (error) => {
      console.log("Error updating employee:", error);
    },
  });

  const getAllEmployeeMutation = useMutation({
    mutationFn: async () => {
      const res = await api.get("/employee");
      return res.data.users as Employee[];
    },
    onError: (error) => {
      console.log("Error fetching employees:", error);
    },
  })
  return {
    saveNewEmployee: saveNewEmployeeMutation.mutateAsync,
    updateEmployee: updateEmployeeMutation.mutateAsync,
    getAllEmployee: getAllEmployeeMutation.mutateAsync,
    isSaving: saveNewEmployeeMutation.isPending,
    isUpdating: updateEmployeeMutation.isPending,
  };
};

export default useEmployee;
