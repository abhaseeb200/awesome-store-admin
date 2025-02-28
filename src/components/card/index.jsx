const Card = ({ className, children }) => {
  return (
    <div className={`${className} bg-white drop-shadow-md rounded-md mb-3 dark:bg-dark-200`}>
      {children}
    </div>
  );
};

const CardHeading = ({title}) => {
  return <div className="text-lg text-gray-600 dark:text-gray-200 font-medium">{title}</div>;
};

export { Card, CardHeading };
