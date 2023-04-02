import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Input } from '@/components'
import { signIn } from 'next-auth/react'

import type { AuthInput } from '@/types'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

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

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: inputs.email,
        password: inputs.password,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [inputs.email, inputs.password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        ...inputs,
      })
      login()
    } catch (error) {
      console.log(error)
    }
  }, [inputs, login])

  return (
    <div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image src='/images/logo.png' alt='Logo' width={48} height={48} />
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
            <button
              onClick={variant === 'login' ? login : register}
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGithub size={30} />
              </div>
            </div>
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
