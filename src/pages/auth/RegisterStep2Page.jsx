import { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomDateInput from '../../components/CustomDateInput'
import CustomButton from '../../components/CustomButton';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMatch, useNavigate, Link, useLocation } from '@tanstack/react-router';
import { useIsProgramaExist } from '../../hooks/useIsProgramaExist';
import Modal from '../../components/modal/Modal';
import './registerpage.css'

const loginSchema = z.object({
  email: z.string()
    .email({ message: 'Debe ser un correo electrónico válido' })
    .min(8, { message: 'Debe contener al menos 8 caracteres' }),
  password: z.string()
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .refine((value) => /[A-Z]/.test(value), { message: 'Debe contener al menos una letra mayúscula' })
  .refine((value) => /[a-z]/.test(value), { message: 'Debe contener al menos una letra minúscula' })
  .refine((value) => /\d/.test(value), { message: 'Debe contener al menos un número' })
  .refine((value) => /[\W_]/.test(value), { message: 'Debe contener al menos un carácter especial' }),
  confirmPassword: z.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  phone: z.string()
    .length(10, { message: 'El teléfono debe tener exactamente 10 números' }),
  program: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

const RegisterStep2Page = () => {
  const location = useLocation();
  const { userId } = location.state;

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [errorRegister, setErrorRegister] = useState(null);
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(true);
  const [errorDob, setErrorDob] = useState('');

  const [cpValue, setCpValue] = useState('');
  const [triggerQuery, setTriggerQuery] = useState(false);
  
  const { params } = useMatch('/:programa/register');
  const programa = params.programa;
  const { programaNotFound } = useIsProgramaExist(programa);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['zip-code', cpValue],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/zip-code/${cpValue}`);
      return response.json();
    },
    enabled: triggerQuery && cpValue !== '',
  });

  if (error) {
    console.error('Error al obtener el código postal:', error);
  }
  if (data && data.statusCode === 404) {
    console.log('Código postal no encontrado  en la base de datos');
    
  }else if (isSuccess && data) {
    
     
      console.log('Valores de CP:', data.asentamientos[0]);



  }

  const { mutate } = useMutation({
    mutationFn: async (dataSend) => {
      const response = await fetch(`${import.meta.env.VITE_API_AUTH_URL}/users/register`, {
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
      setErrorRegister(false);
      setIsLoadingBtn(false);
      console.log('Data:', data);
      navigate({ to: `/${programa}/register/step2`, state: { userId: data.id } });
       
    },
    onError: (err) => {
      setErrorRegister(err.message);
      setIsLoadingBtn(false);
      console.error('Login Error:', err.message);
    },
  });


  const onSubmit = async (data) => {
    console.log('Valor de programa:', data);
    setIsLoadingBtn(true)
    data.phone = '+52' + data.phone
    data.role = 4
    data.program = parseInt(data.program)
    data.isactive = true
    console.log('valores', data)
    mutate(data)
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setIsValid(true);
      setErrorDob('');
      if (value.length === 5) {
        SearchCP(e);
      }
    } else {
      setIsValid(false);
      setErrorDob('El código postal debe contener solo números');
    }
  };

  const SearchCP = (e) => {
    console.log('Search CP:', e.target.value);
    console.log('Valor URL:', `${import.meta.env.VITE_API_BACKEND_URL}/zip-code/${cpValue}`);
    setCpValue(e.target.value);
    setTriggerQuery(true);
    

 }

  return (
    <>
    { programaNotFound && (
      <Modal isOpen={programaNotFound} onClose={()=>{}}>
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Lo sentimos</h4>
        <p>El programa que estas tratando de acceder no se encuentra o esta temporalmente deshabilitado.</p>
        <hr/>
        <p className="mb-0">Verifica la url e intenta de nuevo.</p>
      </div>
    </Modal>)}
    Valor de UserID
    {userId}

      <div className="header-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center logo-container">
              <div className="logo-circle">
                <img src="/image/logo.png" alt="logo" className='inner-logo' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="mb-3 text-center">Crear perfil</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container d-flex justify-content-center">
            <div className="p-2 column-limited">
              <CustomInput
                type="text"
                label="Nombre(s)"
                placeholder="Ingresa nombre"
                error={errors.name?.message}
                register={register}
                name="name"
              />
              <CustomInput
                  type="text"
                  label="Apellido paterno"
                  placeholder="Ingresa apellido paterno"
                  error={errors.lastname?.message}
                  showErrors={true}
                  register={register}
                  name="lastname"
              />
              <CustomInput
                    type="text"
                    label="CURP"
                    placeholder="Ingresa CURP"
                    error={errors.curp?.message}
                    showErrors={true}
                    register={register}
                    name="curp"
              />
              <CustomInput
                    type="text"
                    label="Calle"
                    placeholder="Ingresa calle"
                    error={errors.street?.message}
                    showErrors={true}
                    register={register}
                    name="street"
                  />
                  {isSuccess && data?.asentamientos?.length >0 && (
                    <>
                      <label className="form-label">Delegación o municipio</label>
                      <input disabled type="text" className="inputCustom form-control mb-3" value={data.asentamientos[0].municipio} />
                    </>
                  )}
              
              <CustomInput
                    type="text"
                    label="Número interior"
                    placeholder="Ingresa número interior"
                    error={errors.unit?.message}
                    showErrors={true}
                    register={register}
                    name="unit"
                  />
            </div>
            <div className="p-2 column-limited">
              <CustomInput
                  type="text"
                  label="Apellido materno"
                  placeholder="Ingresa apellido materno"
                  error={errors.phone?.message}
                  register={register}
                  name="phone"
                />
              <CustomDateInput
                label="Fecha de nacimiento"
                name="dob"
                placeholder="Selecciona una fecha"
                error={errors.dob?.message}
                register={register}
                min="1950-01-01" // Optional minimum date
                max="2006-12-31" // Optional maximum date
                showErrors={true}
              />
              <div className="position-relative">
                <label className="form-label">Código postal</label>
                <input
                  type="text"
                  className={`inputCustom form-control mb-3 ${!isValid ? 'is-invalid' : ''}`}
                  placeholder="Ingresa código postal"
                  maxLength={5}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    {errorDob}
                  </div>
                )}
                {isLoading && (
                  <div className="loading-overlay d-flex align-items-center justify-content-center">
                    <div className="spinner-border spinner-border-sm text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              <CustomInput
                  type="text"
                  label="Número exterior"
                  placeholder="Ingresa número exterior"
                  error={errors.apartment?.message}
                  register={register}
                  name="apartment"
                />
              {isSuccess && data?.asentamientos?.length >0 && (
                <>
                  <label className="form-label">Colonia</label>
                  <input disabled type="text" className="inputCustom form-control mb-3" value={data.asentamientos[0].asentamiento} />
                </>
              )}
              {isSuccess && data?.asentamientos?.length >0 && (
                <>
                  <label className="form-label">Estado</label>
                  <input disabled type="text" className="inputCustom form-control mb-3" value={data.asentamientos[0].estado} />
                </>
              )}
            </div>
          </div>


          <div className='container column-limited'>
            <CustomButton label="Continuar" type="rounded" isLoading={isLoadingBtn} />
            {errorRegister && (
              <>
                <p className='alert alert-danger mt-3 text-center'>
                  No se puede crear el usuario<br/>
                  {errorRegister}
                </p>
              </>
            )
            }
          </div>
          <div className='container column-limited mt-3 d-flex justify-content-center'>
            <Link to={`/${programa}/login`} className="text-primary text-decoration-none small text-center">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterStep2Page