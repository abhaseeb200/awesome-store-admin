const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-dark-200 drop-shadow-md rounded-md px-5 py-8 mb-3 animate-pulse">
      <div className="p-5 bg-gray-300 dark:bg-dark-600"></div>
      <div className="p-5 my-3 bg-gray-300 dark:bg-dark-600"></div>
      <div className="p-5 bg-gray-300 dark:bg-dark-600"></div>
    </div>
  );
};

export default CardSkeleton;
