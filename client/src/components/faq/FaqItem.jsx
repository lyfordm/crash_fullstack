import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useDeleteFAQMutation } from '../../state/faq/faqApi';
import { useNavigate } from 'react-router-dom';

const FaqItem = ({ item, refetchFAQs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const [deleteFaq, { isLoading: isDeletingLoading, isError: isDeleteError }] = useDeleteFAQMutation();
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      // Make API call to delete FAQ
      await deleteFaq(item._id);
      // Optionally, you can trigger a refetch of FAQs after deletion
      // refetchFAQs();
        // Refetch FAQs after deletion
        refetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };
  const handleUpdate = () => {
    // Navigate to the edit page with the FAQ ID
    navigate(`/faq/edit/${item._id}`);
  };




  return (
    <div className='p-3 lg:p-5 rounded-[12px] border border-solid border-borderColor mb-5 cursor-pointer'>
      <div className='flex items-center justify-between gap-5' onClick={toggleAccordion}>
        <h4 className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor'>
          {item.question}
        </h4>
        <div
          className={`${isOpen && ' border-none'} w-7 h-7 lg:h-8  rounded flex items-center justify-center`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && (
        <div className='mt-4 cursor-pointer'>
          <p className='text-[14px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor'>
            {item.answer}
          </p>
          <div className='flex gap-4 mt-2 '>
            <CiEdit color='green' size={24} onClick={handleUpdate} />
            <MdDelete color='red' size={24} onClick={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
