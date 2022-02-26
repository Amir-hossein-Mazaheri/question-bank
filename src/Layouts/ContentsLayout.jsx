function ContentsLayout({ children }) {
  return (
    <div className="flex flex-col gap-5 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
      {children}
    </div>
  );
}

export default ContentsLayout;
