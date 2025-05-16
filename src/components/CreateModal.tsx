"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState, AppDispatch } from "@/store";
import { closeCreateModal } from "@/store/uiSlice";
import { addProduct } from "@/store/productSlice";

interface FormValues {
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const CreateModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.ui.isCreateModalOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
    const newProduct : any = {
      id: Date.now().toString(),
      ...data,
    };

    dispatch(addProduct(newProduct));
    dispatch(closeCreateModal());
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded p-6 max-w-md w-full space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New Product</h2>

        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className={`w-full p-2 border rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <select
          {...register("category", { required: "Category is required" })}
          className={`w-full p-2 border rounded ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}

        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className={`w-full p-2 border rounded resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <input
          type="number"
          placeholder="Price"
          step="0.01"
          min="0"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Price must be at least 0" },
          })}
          className={`w-full p-2 border rounded ${
            errors.price ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}

        <input
          type="text"
          placeholder="Image URL"
          {...register("image", {
            required: "Image URL is required",
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i,
              message: "Enter a valid image URL",
            },
          })}
          className={`w-full p-2 border rounded ${
            errors.image ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => {
              dispatch(closeCreateModal());
              reset();
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModal;
