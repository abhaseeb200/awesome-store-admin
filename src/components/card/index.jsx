const Card = ({ children }) => {
  return (
    <div className="bg-white drop-shadow-md rounded-md px-5 mb-3">
      {children}
    </div>
  );
};

const CardHeading = ({title}) => {
  return <div className="text-lg text-gray-600 font-medium py-6">{title}</div>;
};

export { Card, CardHeading };