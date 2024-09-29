import React, { Suspense, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Canvas } from '@react-three/fiber';

import Fox from '../models/Fox';
import Loader from '../components/Loader';
import Alert from '/src/components/Alert';
import useAlert from '../assets/hooks/useAlert';

const Contact = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');
    console.log(formData);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        to_name: 'Sankhapali',
        from_email: formData.email,
        to_email: 'hello@sankhapali.com',
        message: formData.message
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    ).then((result) => {
      console.log(result.text);
      setIsLoading(false);
      showAlert({ text: 'Message sent successfully', type: 'success' });

      setTimeout(() => {
        hideAlert();
        setCurrentAnimation('idle');
      }, 3000);
    }).catch((error) => {
      console.log(error.text);
      setIsLoading(false);
      setCurrentAnimation('idle');
      showAlert({ text: 'Failed to send message', type: 'danger' });
    });
  };

  return (
    <section className='relative flex lg:flex-row flex-col max-container bg-slate-50'>
      {alert.show && <Alert {...alert} />}
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text text-center'>Get in Touch</h1>
        <form className='w-full flex flex-col gap-4 mt-8' onSubmit={handleSubmit}>
          <label htmlFor='name' className='text-black-500 font-semibold'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            className='input'
            placeholder='John Doe'
            required
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label htmlFor='email' className='text-black-500 font-semibold'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            className='input'
            placeholder='John@email.com'
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label htmlFor='message' className='text-black-500 font-semibold'>Message</label>
          <textarea
            id='message'
            name='message'
            rows={4}
            className='textarea'
            placeholder='Type your message here'
            required
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button
            type='submit'
            className='btn'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
