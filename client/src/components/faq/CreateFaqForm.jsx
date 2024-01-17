import React from "react";
import { useForm } from "react-hook-form";
import { useCreateFAQMutation, useGetAllFAQsQuery } from "../../state/api/api";
import { useNavigate } from "react-router-dom";

const CreateFaqForm = () => {
  const [create, { isLoading, isError }] = useCreateFAQMutation();
  const { refetch: refetchFAQs } = useGetAllFAQsQuery();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Call the createFAQ mutation
      await create(data);
      console.log("data submitted", data)
        // Refetch FAQs after creation
        refetchFAQs();
      // If successful, navigate to /faq
      navigate("/faq");
    } catch (error) {
      console.error("Error submitting FAQ form:", error);
      // Handle error state if needed
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">FAQ Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Question field */}
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Question
          </label>
          <input
            id="question"
            name="question"
            {...register("question", {
              required: "Question is required",
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.question?.message}
          </p>
        </div>

        {/* Answer field */}
        <div className="mb-4">
          <label
            htmlFor="answer"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            {...register("answer", { required: "Answer is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
          ></textarea>
          <p className="text-red-500 text-xs mt-1">{errors.answer?.message}</p>
        </div>

        {/* Add more form fields as needed */}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isError && (
          <p className="text-red-500 text-xs mt-2">Error submitting the form.</p>
        )}
      </form>
    </div>
  );
};

export default CreateFaqForm;
