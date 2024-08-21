import React,{useEffect, useState} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Register = () => {
const navigate = useNavigate()
const [loading,setLoading] = useState(false)
    //from submit
    const submitHandler = async (values) => {
      try {
        setLoading(true)
        await axios.post('/users/register',values)
        message.success('Inscription effectuée avec succès ')
        setLoading(false)
        navigate('/login')
      } catch(error){
        setLoading(false)
        message.error("Erreur")
      }
    };

    //prevent for login user
    useEffect(() => {
      if (localStorage.getItem('user')){
        navigate('/')
      }
    },[navigate])
  return (
    <>
      <div className='register-page'>
        {loading && <Spinner />}
        <Form className='register_form' layout="vertical" onFinish={submitHandler}>
          <h1 className='insc'>Inscription</h1>
          <Form.Item  label="Nom" name="name"> 
              <Input className='register_input' type='email' />
          </Form.Item>
          <Form.Item  label="Email" name="email"> 
              <Input className='register_input' type='email'/>
          </Form.Item>
          <Form.Item label="Mot de passe" name="password"> 
              <Input className='register_input' type='password'/>
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link className='inscrit' to="/login">Déja inscrit ? Cliquez ici</Link>
            <button className='btn btn-primary'>S'inscrire</button>        
          </div>
        </Form>
      </div>
    </>
  )
}

export default Register