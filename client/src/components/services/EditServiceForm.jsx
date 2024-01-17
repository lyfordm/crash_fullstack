import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useGetServiceQuery, useUpdateServiceMutation, useGetAllServicesQuery } from '../../state/api/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditServiceForm = () => {
  const { id } = useParams()
  const { data: serviceData, isLoading: isServiceLoading } = useGetServiceQuery(id);
  const [updateService, { isLoading, isError }] = useUpdateServiceMutation();
  const { refetch: refetchServices } = useGetAllServicesQuery();
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      title: serviceData?.title || '', // Set initial value from API response
      desc: serviceData?.desc || [], // Set initial value from API response
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'desc',
  });

  useEffect(() => {
    if (serviceData) {
      // Set initial values from API response
      setValue('title', serviceData.title);
      setValue('desc', serviceData.desc);
    }
  }, [serviceData, setValue]);

  const onSubmit = async (data) => {
    try {
      // Call the updateService mutation
      await updateService({ id, ...data });
       // Refetch services after editing
       refetchServices();
      // If successful, navigate to /services
      navigate('/services');
    } catch (error) {
      console.error('Error submitting Edit Service form:', error);
      // Handle error state if needed
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Service Form</h2>
      {isServiceLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              {...register('title', {
                required: 'Title is required',
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
            />
            <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
          </div>

          {/* Points array */}
          <div className="mb-4">
            <label htmlFor="points" className="block text-gray-700 text-sm font-bold mb-2">
              Points
            </label>
            {fields.map((point, index) => (
              <div key={point.id} className="flex items-center space-x-2 mb-2">
                <input
                  {...register(`desc.${index}.point`, {
                    required: 'Point is required',
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
                />
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => append({ point: '' })}>
              Add Point
            </button>
            {errors.desc && (
              <p className="text-red-500 text-xs mt-1">At least one point is required</p>
            )}
          </div>

          {/* Add more form fields as needed */}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600"
            disabled={isLoading || fields.length === 0}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default EditServiceForm;
