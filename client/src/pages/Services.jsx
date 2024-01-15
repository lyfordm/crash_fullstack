import { Link } from "react-router-dom"
import { useGetAllServicesQuery } from "../state/services/serviceApi"
import ServiceCard from "../components/services/ServicesCard"

const Services = () => {
  const { data, isLoading, isError, refetch: refetchServices} = useGetAllServicesQuery()
  console.log("data from api",data)
  return (
    <div className="section__width mt-3">
      <div className="container">
      <div className="container">
        <div className="flex items-center justify-between md:flex-row sm:flex-row">
          <div className="heading"><h3>Our Services</h3></div>
          <div>
            <Link to="/services/create">
            <button className="btn">
              Create Service
            </button>
            </Link>
          </div>
        </div>
        <div className="section__width grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {data?.map((item, index) => (
          <ServiceCard item={item}  key={index} refetchServices={refetchServices}/>
        ))}
      </div>
      </div>
      </div>
    </div>
  )
}

export default Services