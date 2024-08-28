import '../theme/themes.css';

const BannerRegistro = () => {
    return (
        <div className="custom-banner-container mt-4">
            <div className='custom-banner'>
                <div className="banner-text-wrapper">
                    <span className="banner-text">
                        ¿Aún no tienes cuenta? <a href="#" className="text-primary text-decoration-none font-weight-normal">Regístrate</a>
                    </span>
                </div>
            </div>
        </div>
      );
}

export default BannerRegistro