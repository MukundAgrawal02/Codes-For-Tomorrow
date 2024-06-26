import img from "../assets/office.jpg"
const Cards = ({ title, body, onRemove }) => {
  const currentDateTime = new Date().toLocaleString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="flex justify-end p-2">
        <button onClick={onRemove} className="text-gray-600 hover:text-gray-900">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="red"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div className="px-6 py-4">
        <h1 className="text-xl font-bold mb-2 line-clamp-1">{title}</h1>
        <p className="text-gray-700 mb-4 line-clamp-2">{body}</p>
        <div className="text-gray-600 mb-4">
          <p>{currentDateTime}</p>
        </div>
        <div>
          <img
            className="w-full h-32 object-cover"
            src={img}
            alt="Rectangular shape"
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
