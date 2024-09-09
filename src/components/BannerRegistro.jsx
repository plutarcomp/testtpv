import PropTypes from 'prop-types';
import '../theme/themes.css';

const BannerRegistro = (urlprogram) => {
    const url = '/register/'+urlprogram.programa;
    return (
        <div className="custom-banner-container mt-4">
            <div className='custom-banner'>
                <div className="banner-text-wrapper">
                    <span className="banner-text">
                        ¿Aún no tienes cuenta? <a href={url} className="text-primary text-decoration-none font-weight-normal">Regístrate</a>
                    </span>
                </div>
            </div>
        </div>
      );
}

BannerRegistro.propTypes = {
    urlprogram: PropTypes.string
}

export default BannerRegistro