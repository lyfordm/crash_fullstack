import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";


import { useDeleteServiceMutation } from "../../state/api/api";

const ServiceCard = ({ item, refetchServices }) => {
  const [deleteService, { isLoading, isError }] = useDeleteServiceMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Make API call to delete service
      await deleteService(item._id);
      // Optionally, you can trigger a refetch of FAQs after deletion
      // refetchServices();
      // Refetch Services after deletion
      refetchServices();
    } catch (error) {
      console.error("Error deleting Service:", error);
    }
  };

  const handleUpdate = () => {
      // refetchServices();
      // Refetch Services before editing
      refetchServices();
    // Navigate to the edit page with the Service Id
    navigate(`/services/edit/${item._id}`);
  };

  return (
    <div className="py-[30px] px-3 lg:px-5 border border-solid border-borderColor rounded-md">
      <h2 className="text-[26px] text-center leading-9 text-headingColor font-[700]">
        {item.title}
      </h2>
      <ul className="list-disc text-[16px] leading-7 font-[400] mt-4 px-5">
        {item.desc.map((point, index) => (
          <li key={index}>{point.point}</li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-[30px]">
        {/* Add any additional content or actions here */}
        <div className="flex gap-4 mt-2">
          <CiEdit color="green" size={24} onClick={handleUpdate} />
          <MdDelete color="red" size={24} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
