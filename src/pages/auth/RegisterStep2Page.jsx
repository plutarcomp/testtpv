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

const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/;

const registerSchema = z.object({
  name: z.string()
    .min(1, { message: 'Debe capturar un nombre' }),
  lastname: z.string()
  .min(1, { message: 'Debe capturar un apellido paterno' }),
  curp: z.string().regex(curpRegex, "Formato CURP invalido"),
  street: z.string()
  .min(1, { message: 'Debe capturar una calle' }),
  unit: z.string(),
  lastname2: z.string()
  .min(1, { message: 'Debe capturar un apellido materno' }),
  dob: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" })
    .transform(val => new Date(val)),
  apartment: z.string()
  .min(1, { message: 'Debe capturar un número exterior' }),
  asentamientoId: z.string().min(1, { message: 'Debe seleccionar una colonia' }),
});

const RegisterStep2Page = () => {
  const location = useLocation();
  const { userId } = location.state;

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [errorRegister, setErrorRegister] = useState(null);
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [errorCp, setErrorCp] = useState('');

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
    resolver: zodResolver(registerSchema),
  });

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['zip-code', cpValue],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/zip-code/${cpValue}`);
      return response.json();
    },
    enabled: triggerQuery && cpValue !== '',
  });

  const cpNotFound = data?.statusCode === 404;

  if (error) {
    console.error('Error al obtener el código postal:', error);
  }
  if (data && data.statusCode === 404) {
    console.log('Código postal no encontrado  en la base de datos');
   
    
  }else if (isSuccess && data) {
    console.log('Valores de CP:', data);
  }

  const { mutate } = useMutation({
    mutationFn: async (dataSend) => {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/user-profiles/register`, {
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
      console.log('Data respuesta despues de profile:', data);
      navigate({ to: `/${programa}/login` });
    },
    onError: (err) => {
      setErrorRegister(err.message);
      setIsLoadingBtn(false);
      console.error('Login Error:', err.message);
    },
  });


  const onSubmit = async (data) => {
    console.log('Valor de registro:', data);
    setIsLoadingBtn(true)
    data.userId = userId
    data.asentamientoId = parseInt(data.asentamientoId)
    mutate(data)
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setIsValid(true);
      setErrorCp('');
      if (value.length === 5) {
        SearchCP(e);
      }
    } else {
      setIsValid(false);
      setErrorCp('El código postal debe contener solo números');
    }
  };

  const handleInputOnBlur = (e) => {
    if (e.target.value.length < 5) {
      setIsValid(false);
      setErrorCp('El código postal debe contener 5 dígitos');
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
      <div className="header-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center logo-container">
              <div className="logo-circle">
                <img src="/images/logo.png" alt="logo" className='inner-logo' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="mb-3 text-center">Crear perfil</h2>
        <div className="text-center mb-3">
          <img src="/images/step-two.png" alt="step2" className="img-fluid" />
        </div>
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
                  placeholder="Ingresa apellido materno"
                  error={errors.lastname?.message}
                  register={register}
                  name="lastname"
                />
                <CustomInput
                  type="text"
                  label="CURP"
                  placeholder="Ingresa CURP"
                  error={errors.curp?.message}
                  register={register}
                  name="curp"
                />
                <CustomInput
                  type="text"
                  label="Calle"
                  placeholder="Ingresa Calle"
                  error={errors.street?.message}
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
                  error={errors.lastname2?.message}
                  register={register}
                  name="lastname2"
                />
              <CustomDateInput
                label="Fecha de nacimiento"
                placeholder="Selecciona una fecha"
                error={errors.dob?.message}
                register={register}
                min="1950-01-01" // Optional minimum date
                max="2006-12-31" // Optional maximum date
                name="dob"
                />
              <div className="position-relative mb-3">
                <label className="form-label">Código postal</label>
                <input
                  type="text"
                  className={`inputCustom form-control ${!isValid || cpNotFound ? 'is-invalid' : ''}`}
                  placeholder="Ingresa código postal"
                  maxLength={5}
                  onChange={handleInputChange}
                  onBlur={handleInputOnBlur}
                  disabled={isLoading}
                  name='cp'
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    {errorCp}
                  </div>
                )}
                {cpNotFound && (
                  <div className="text-danger mt-1 sm">
                    <small>Código postal no encontrado</small>
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
              {isSuccess && data?.asentamientos?.length > 0 && (
                <>
                  <label className="form-label">Colonia</label>
                  <select 
                    className="inputCustom form-select mb-3" 
                    {...register('asentamientoId')} // Register this input with useForm
                    name='asentamientoId'>
                    {data?.asentamientos.map((asentamiento) => (
                      <option key={asentamiento.id} value={asentamiento.id}>{asentamiento.nombre_unido}</option>
                    ))}
                  </select>
                  {errors.asentamientoId && (
                    <div className="text-danger">{errors.asentamientoId.message}</div>
                  )}
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
      <div className="footer-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <img src="/images/bottom-decor.png" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterStep2Page