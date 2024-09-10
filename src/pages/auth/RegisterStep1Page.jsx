import { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useMatch, useNavigate, Link } from '@tanstack/react-router';
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

const RegisterStep1Page = () => {
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [errorRegister, setErrorRegister] = useState(null);
  const navigate = useNavigate();

  const { params } = useMatch('/:programa/register');
  const programa = params.programa;
  const { data, programaNotFound } = useIsProgramaExist(programa);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const password = watch('password');

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
                <img src="/image/logo.png" alt="logo" className='inner-logo' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2 className="mb-3 text-center">Crear cuenta</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container d-flex justify-content-center">
            <div className="p-2 column-limited">
              <CustomInput
                type="text"
                label="Correo electrónico"
                placeholder="user@domain.com"
                error={errors.email?.message}
                register={register}
                name="email"
              />
               <CustomInput
                    type="password"
                    label="Contraseña"
                    placeholder="Ingresa contraseña"
                    error={errors.password?.message}
                    showErrors={true}
                    register={register}
                    name="password"
                  />
                  <div className="d-flex">
                    <div className='p-2 list-error'>
                      <ul>
                        <li className={password?.length >= 8 ? 'list-error-go' : 'list-error-not'}>
                          Mínimo 8 caracteres
                        </li>
                        <li className={/[A-Z]/.test(password) ? 'list-error-go' : 'list-error-not'}>
                          Una letra mayúscula
                        </li>
                        <li className={/[a-z]/.test(password) ? 'list-error-go' : 'list-error-not'}>
                          Una letra minúscula
                        </li>
                      </ul>
                    </div>
                    <div className="p-2 list-error">
                      <ul>
                        <li className={/\d/.test(password) ? 'list-error-go' : 'list-error-not'}>
                          Un número
                        </li>
                        <li className={/[\W_]/.test(password) ? 'list-error-go' : 'list-error-not'}>
                          Un carácter especial
                        </li>
                      </ul>
                    </div>
                  </div>

            </div>
            <div className="p-2 column-limited">
              <CustomInput
                  type="text"
                  label="Teléfono movil"
                  placeholder="1234567890"
                  error={errors.phone?.message}
                  register={register}
                  name="phone"
                />
                <CustomInput
                    type="password"
                    label="Validar contraseña"
                    placeholder="Ingresa contraseña"
                    error={errors.confirmPassword?.message}
                    register={register}
                    name="confirmPassword"
                  />
            </div>
          </div>
          {data && (
            <input type="hidden" value={data.id} {...register('program')} />
          )}

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

export default RegisterStep1Page