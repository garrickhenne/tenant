import { useNavigate } from "react-router-dom";
import IconClose from "./icons/IconClose";

const MapModal = ({ landlords, openModal, data, closeModal }) => {
  const navigate = useNavigate();

  return (
    <main className='relative z-50' onClick={closeModal} >
      <div className='p-1 gap-y-2 absolute w-52 bg-white rounded-lg flex flex-col text-black overflow-y-auto'>
        <IconClose onClick={closeModal} />
        <p className="text-start text-lg font-medium hover:bg-slate-200 min-w-full pl-3 transition-colors rounded-full" onClick={() => navigate(`/landlords/${data.landlordId}`)}>{data.firstName} {data.lastName}</p>
      </div>
    </main>
  );
};

export default MapModal;
