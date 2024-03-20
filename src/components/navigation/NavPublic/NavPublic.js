<nav className="navPublic">

      <div className="navPublicTop">
            
            <div className="navTopLogo navTopSection">
                  <div className="navTopLogoWrap navTopWrap">
                        <Link href="/" className="logoImg" />
                  </div>
            </div>

            <div className="navTopNotify navTopSection">
                  <div className="navTopNotifyWrap navTopWrap">
                        <button><FontAwesomeIcon icon={ faSearch } /></button>
                        <button><FontAwesomeIcon icon={ faPlus } /></button>
                        <button><FontAwesomeIcon icon={ faUserPlus } /></button>
                        <button><FontAwesomeIcon icon={ faMessage } /></button>                                                
                        <button><FontAwesomeIcon icon={ faGlobe } /></button>
                  </div>
            </div>

            <div className="navTopAuth navTopSection">
                  <div className="navTopAuthWrap navTopWrap">
                        <button className="buttonAuthLogin"><span><FontAwesomeIcon icon={ faUserLock } /></span>Login</button>
                        <button className="buttonAuthSignup"><span><FontAwesomeIcon icon={ faUserPen } /></span>Signup</button>                                                
                  </div>
            </div>

            <div className="navTopMenu navTopSection">
                  <div className="navTopMenuWrap navTopWrap">
                        <button><FontAwesomeIcon icon={ faBars } /></button>                              
                  </div>
            </div>
            
      </div>

      <div className="navPublicBottom">                               
            <div className="navPublicBottomWrap">
                  <div className="navBottomLink" key={index}><a href={ link.href } title={link.title}><span><FontAwesomeIcon icon={link.icon} /></span><b>{link.title}</b></a></div>
            </div>
      </div>

</nav>