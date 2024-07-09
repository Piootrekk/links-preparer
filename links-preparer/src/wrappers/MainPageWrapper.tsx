type MainPageWrapperProps = {
  children: React.ReactNode;
};

const MainPageWrapper: React.FC<MainPageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center py-20 gap-y-6">
      <h1 className="text-4xl font-bold">Link preparer</h1>
      {children}
    </div>
  );
};

export default MainPageWrapper;
