function Container({ children, className }) {
    return ( 
        <div className={`md:px-14 md:py-7 px-8 py-3 ${className}`}>
            {children}
        </div>
     );
}

export default Container;