
function Header({ conditionClass }) {
    return (
        <>
            <div className="preheader">
                <span>This is just a demo store for practicing React.js skills. Thank you for being here</span><svg className="icon-svg--heart" width="40" height="40"><use xlinkHref="#icon-heart"></use></svg>
            </div>
            <header className="header">  
                <h1 className="logo">
                    <svg className="icon-svg--logo" width="40" height="40"><use xlinkHref="#icon-logo"></use></svg><span className="">MacBook Air</span>
                </h1>
            </header>
        </>
    );
}

export default Header;
