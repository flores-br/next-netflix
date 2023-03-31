import React, { useCallback, useState } from 'react'
import { Input } from '@/components'

import type { AuthInput } from '@/types'

const Auth = () => {
  const [inputs, setInputs] = useState<AuthInput>({
    name: '',
    email: '',
    password: '',
  })

  const [variant, setVariant] = useState<'login' | 'register'>('login')

  const toggleVariant = useCallback(() => {
    setVariant(prev => (prev === 'login' ? 'register' : 'login'))
  }, [])

  return (
    <div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='Logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  label='Username'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputs(prev => ({ ...prev, name: e.target.value }))
                  }
                  id='name'
                  value={inputs.name}
                />
              )}
              <Input
                label='Email'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs(prev => ({ ...prev, email: e.target.value }))
                }
                id='email'
                type='email'
                value={inputs.email}
              />
              <Input
                label='Password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs(prev => ({ ...prev, password: e.target.value }))
                }
                id='password'
                type='password'
                value={inputs.password}
              />
            </div>
            <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth