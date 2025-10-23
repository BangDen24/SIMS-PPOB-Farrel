import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/payment/${service.service_code}`);
  };
  return (
    <div
      key={service.service_code}
      className="font-semibold rounded-lg cursor-pointer w-[90%] hover:scale-105 transition-transform duration-200 flex flex-col items-center gap-2"
      onClick={handleClick}
    >
      <img
        src={service.service_icon}
        alt={service.service_name}
        className="w-12 h-auto"
      />
      <p className="text-wrap text-center w-16  text-[10px]">
        {service.service_name}
      </p>
    </div>
  );
};

export default ServiceCard;
