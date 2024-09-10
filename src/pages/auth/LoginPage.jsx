import { useForm } from 'react-hook-form';
import BannerRegistro from '../../components/BannerRegistro';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';
import CustomInput from '../../components/CustomInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../../theme/themes.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../auth/authStorage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import Modal from '../../components/modal/Modal';

const loginSchema = z.object({
  email: z.string()
  .email({ message: 'Debe ser un correo electrónico válido' })
    .min(8, { message: 'Debe contener al menos 8 caracteres' }),
  password: z.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [programaNotFound, setProgramaNotFound] = useState(false);

  const navigate = useNavigate();
  const programa = useParams({ from: '/$programa/login' })

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

  const { data, error } = useQuery({
    queryKey: ['programa', programa.programa],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_AUTH_URL}/programs/findbyurlname/${programa.programa}`);
      return response.json();
    },
  });

  useEffect(() => {
    if (error) {
      console.error('Error al obtener el programa:', error);
    }
    if (data && data.statusCode === 404) {
      setProgramaNotFound(true);
    }
  }, [data, error]);

  const { mutate } = useMutation({
    mutationFn: async (dataSend) => {
      const response = await fetch(`${import.meta.env.VITE_API_AUTH_URL}/auth/login`, {
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
      setIsLoadingBtn(false);
      const { token, refreshToken, role, user } = data;
      setToken(token);
      setRefreshToken(refreshToken);
      setRole(role);
      useAuthStore.setState({
        id: user.id,
        email: user.email,
        phone: user.phone,
        program: programa.programa
       });
       console.log('Valores user Auth:', data);

       navigate({ to: `/${programa.programa}/dashboard` });
       
    },
    onError: (err) => {
      setErrorLogin(err.message);
      setIsLoadingBtn(false);
      console.error('Login Error:', err.message);
    },
  });

  const onSubmit = (dataSend) => {
    dataSend.programurl = programa.programa;
    console.log('Valores a enviar:', dataSend)
    setIsLoadingBtn(true);
    mutate(dataSend);
  };

  return (
    <>
    <Modal isOpen={programaNotFound} onClose={()=>{}}>
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Lo sentimos</h4>
        <p>El programa que estas tratando de acceder no se encuentra o esta temporalmente deshabilitado.</p>
        <hr/>
        <p className="mb-0">Verifica la url e intenta de nuevo.</p>
      </div>
    </Modal>
    <div className="d-flex justify-content-center align-items-center bg-light min-vh-100">
      <div className="container" style={{ maxWidth: '1250px' }}>
        <div className="row shadow-lg">
          <div className="col-lg-6 col-12 d-lg-none p-0">
            <div className="bg-primary text-white p-5 d-flex flex-column justify-content-center align-items-center" style={{
                height: '100%',
                backgroundImage: 'url("/images/fondo_tablet_home.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
              <img src="/images/logo.png" alt="Logo" className="img-fluid mb-3" style={{ maxHeight: '80px' }} />
            </div>
          </div>
          <div
            className="position-absolute d-flex justify-content-center align-items-center d-none d-lg-block"
            style={{
              top: '40%',   // Custom vertical offset
              left: '55%',  // Custom horizontal offset
              transform: 'translate(-40%, -60%)',  // Custom centering adjustment
              width: '25vw',
              height: '26vw',
              maxHeight: '403px',
              backgroundImage: 'url("/images/center_circle.png")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <img
                src="/images/logo.png"
                alt="Logo"
                className="img-fluid"
                style={{ 
                  maxWidth: '80%', 
                  maxHeight: '80%', 
                  margin: 'auto',
                  display: 'block',
                }}
              />
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
                    label="Correo electrónico"
                    placeholder="user@domain.com"
                    error={errors.email?.message}
                    register={register}
                    name="email"
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
                  <CustomButton label="Acceder" type="rounded" isLoading={isLoadingBtn} />
                  {errorLogin && 
                    <p className='alert alert-danger mt-3 text-center'>
                      No se puede conceder el acceso, revise sus credenciales e intente de nuevo 
                    </p>
                  }
                  <p className="mt-3 small text-secondary">
                    Al registrarse en tu parque vivo, significa que acepta nuestra Política de privacidad y Términos de servicio.
                  </p>
                  <BannerRegistro urlprogram={programa.programa}/>
                </div>
              </form>
              <hr className="my-4" />
            </div>
          </div>
          
          {/* Right Section - only visible on large screens */}
          <div className="col-lg-6 p-0 overflow-hidden d-none d-lg-block">
            <div className="h-100 position-relative">
              <img
                src="/images/login_image.png"
                alt="login"
                className="img-fluid w-100 h-100"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default LoginPage;