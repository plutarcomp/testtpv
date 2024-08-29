import { useForm } from 'react-hook-form';
import BannerRegistro from '../../components/BannerRegistro';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomInput from '../../components/CustomInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../../theme/themes.css';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../auth/authStorage';
import { useState } from 'react';

const loginSchema = z.object({
  username: z.string()
    .min(8, { message: 'Debe contener al menos 8 caracteres' }),
  password: z.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setToken,
    setRefreshToken,
    setRole,
   } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (dataSend) => {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSend),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }
  
      return response.json();
    },
    onSuccess: (data) => {
      setErrorLogin(false);
      setIsLoading(false);
      const { token, refreshToken, role, user } = data;
      setToken(token);
      setRefreshToken(refreshToken);
      setRole(role);
      useAuthStore.setState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
       });
       console.log('Valores user Auth:', data);
       
       
    },
    onError: (err) => {
      setErrorLogin(err.message);
      setIsLoading(false);
      console.error('Login Error:', err.message);
    },
  });

  const onSubmit = (dataSend) => {
    setIsLoading(true);
    mutate(dataSend);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light min-vh-100">
      <div className="container" style={{ maxWidth: '1250px' }}>
        <div className="row shadow-lg">
          <div className="col-lg-6 col-12 d-lg-none p-0">
            <div className="bg-primary text-white p-5 d-flex flex-column justify-content-center align-items-center" style={{
                height: '100%',
                backgroundImage: 'url("/image/fondo_tablet_home.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
              <img src="/image/logo.png" alt="Logo" className="img-fluid mb-3" style={{ maxHeight: '80px' }} />
            </div>
          </div>
          
          {/* Left Section */}
          <div className="col-lg-6 col-12 p-5 bg-white">
            <div className="mx-auto" style={{ maxWidth: '400px' }}>
              <h2 className="mb-3 text-center">Ingresa tu usuario y contraseña</h2>
              <hr className="my-4" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <CustomInput
                    type="text"
                    label="Usuario"
                    placeholder="user@domain.com"
                    error={errors.username?.message}
                    register={register}
                    name="username"
                  />
                </div>
                <div className="mb-4">
                  <CustomInput
                    type="password"
                    label="Contraseña"
                    placeholder="Ingresa contraseña"
                    error={errors.password?.message}
                    register={register}
                    name="password"
                  />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <CustomCheckbox label="Recuérdame" />
                    <a href="#" className="text-primary text-decoration-none small">Olvidé mi contraseña</a>
                  </div>
                  <CustomButton label="Acceder" type="rounded" isLoading={isLoading} />
                  {errorLogin && 
                    <p className='alert alert-danger mt-3 text-center'>
                      No se puede conceder el acceso, revise sus credenciales e intente de nuevo 
                    </p>
                  }
                  <p className="mt-3 small text-secondary">
                    Al registrarse en tu parque vivo, significa que acepta nuestra Política de privacidad y Términos de servicio.
                  </p>
                  <BannerRegistro />
                </div>
              </form>
              <hr className="my-4" />
            </div>
          </div>
          
          {/* Right Section - only visible on large screens */}
          <div className="col-lg-6 p-0 overflow-hidden d-none d-lg-block">
            <div className="h-100 position-relative">
              <img
                src="/image/login_image.png"
                alt="login"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* Logo with background or shadow for better visibility */}
              <div className="position-absolute top-0 start-0 w-100" style={{ zIndex: 2 }}>
                <img
                  src="/image/logo.png"
                  alt="Logo"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;