import React,{useEffect, useState} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Login = () => {
const [loading,setLoading] =useState(false)
const navigate = useNavigate()
     //from submit
    const submitHandler = async (values) => {
      try {
        setLoading(true)
        const {data} = await axios.post('/users/login',values)
        setLoading(false)
        message.success('Vous êtes Connecté')
        localStorage.setItem('user', 
          JSON.stringify({...data.user ,password:''}))
        navigate('/')
    } catch (error) {
        setLoading(false)
        message.error("Nom d'utilisateur ou mot de passe incorrect")
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
          <h1 className='insc'>Se connecter</h1>

          <Form.Item label="Email" name="email"> 
              <Input className='register_input' type='email'/>
          </Form.Item>
          <Form.Item label="Mot de passe" name="password"> 
              <Input className='register_input' type='password'/>
          </Form.Item>
          <div className="d-flex justify-content-between" >
            <Link className='inscrit' to="/register">Non inscrit ? Cliquez ici</Link> 
            <button className='btn btn-primary'>Se connecter</button>        
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login