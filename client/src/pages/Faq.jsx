import { Link } from "react-router-dom"
import { useGetAllFAQsQuery} from "../state/api/api"
import FaqItem from "../components/faq/FaqItem"

const Faq = () => {
  const { data, isLoading, isError, refetch: refetchFAQs } = useGetAllFAQsQuery();
  console.log(data)
  return (
    <div className="section__width mt-3">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="heading"><h3>Our FAQs</h3></div>
          <div>
            <Link to="/faq/create">
            <button className="btn">
              Create FAQ
            </button>
            </Link>
          </div>
        </div>
      <ul className="mt-[38px]">
        {data?.map((item,index) => <FaqItem item={item} key={index} refetchFAQs={refetchFAQs}/>)}
    </ul>
      </div>
    </div>
  )
}

export default Faq