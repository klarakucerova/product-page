
function Header({ conditionClass }) {
  return (

    <div className="header">  
        <h1 className="logo">
            <svg className="icon-svg--logo" width="40" height="40"><use xlinkHref="#icon-logo"></use></svg>
            <span className="">MacBook Air</span>
        </h1>
    </div>
    
  );
}

export default Header;
