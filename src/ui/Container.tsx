interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mt-[100px] sm:mx-8 mx-2 min-h-[50vh]">{children}</div>;
};

export default Container;
