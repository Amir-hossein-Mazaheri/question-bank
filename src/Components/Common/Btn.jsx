function Btn(props) {
  const { type = "button", children, className, ...others } = props;

  return (
    <button
      className={`rounded-full px-5 py-2 font-medium ${className}`}
      type={type}
      {...others}
    >
      {children}
    </button>
  );
}

export default Btn;
