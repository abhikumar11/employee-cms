"use client";

import { api } from "@/lib/axios";
import { Employee } from "@/types/employe.types";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useEmployee = () => {
  const queryClient = useQueryClient();

  const saveNewEmployeeMutation = useMutation({
    mutationFn: async (employee: Employee) => {
      const res = await api.post("/employee", employee);
      return res.data.data.user as Employee;
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

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/employee/${id}`);
      return id;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },

    onError: (error) => {
      console.log("Error deleting employee:", error);
    },
  });

  const getAllEmployeeQuery =  useQuery({
  queryKey: ["employee"],
  queryFn: async () => {
    const res = await api.get("/employee");
     return res.data.employees ?? [];
  },
});
  return {
    employees: getAllEmployeeQuery.data,
    isLoading: getAllEmployeeQuery.isLoading,
    saveNewEmployee: saveNewEmployeeMutation.mutateAsync,
    updateEmployee: updateEmployeeMutation.mutateAsync,
    deleteEmployee: deleteEmployeeMutation.mutateAsync,
    isSaving: saveNewEmployeeMutation.isPending,
    isUpdating: updateEmployeeMutation.isPending,
    isDeleting: deleteEmployeeMutation.isPending,
  };
};

export default useEmployee;
