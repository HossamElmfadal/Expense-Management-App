import React, { useState, useEffect } from "react";
import { Form, Input, Modal, message, Select, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from "./../components/Layout/Layout";
import axios from 'axios'
import Spinner from "../components/Spinner";
import moment from 'moment';
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;


const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [editTable, setEditTable] = useState(null)

  //Table Data
  const columns = [
    {
      title:'Date',
      dataIndex:'date',
      render : (text) => <span >{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:'Montant',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Catégorie',
      dataIndex:'category'
    },
    {
      title:'Référence',
      dataIndex:'reference'
    },
    {
      title:'Déscription',
      dataIndex:'description'
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render: (text,record) => (
        <div>
          <EditOutlined 
          onClick={() =>{
            setEditTable(record)
            setShowModal(true)
          }}/>
          <DeleteOutlined className="mx-2" onClick={() => {handleDelete(record)}}/>
        </div>
      )
    }
  ]

  //getAll Transactions


  //useEffect
  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transactions/get-transaction', {
          userid: user._id,
          frequency,
          selectedDate,
          type
        })
        setLoading(false)
        setAllTransaction(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error('Fetch issus with transaction')
      }
    }
    getAllTransaction();
  }, [frequency, selectedDate, type])
  
//Delete 
const handleDelete = async (record) => {
  try {
    setLoading(true)
    await axios.post('/transactions/delete-transaction', {transactionId:record._id})
    setLoading(false)
    message.success('Transaction supprimée')
  } catch (error) {
    setLoading(false)
    console.log(error)
    message.error('Impossible de supprimer')
  }
}


  //form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editTable){
        await axios.post('/transactions/edit-transaction', {
          payload: {
          ...values,
          userid: user._id
        },
        transactionId: editTable._id
      })
        setLoading(false)
        message.success('Transaction modifiée avec succès')
      } else{
        await axios.post('/transactions/add-transaction', {
          ...values,
           userid: user._id})
           setLoading(false)
           message.success('Transaction ajoutée avec succès')
      }
      setShowModal(false)
      setEditTable(null)
    } catch (error) {
      setLoading(false)
      message.error("Erreur lors de l'ajout ")
    }
  }

  return (
    <Layout>
      { loading && <Spinner />}
      <div className="">
      <div className="filters">
          <div>
            <h6>Date</h6>
            <Select value={frequency} onChange={(values) => setFrequency(values) }>
              <Select.Option value='7'>1 Semaine</Select.Option>
              <Select.Option value='30'> 1 Mois</Select.Option>
              <Select.Option value='365'> 1 Année</Select.Option>
              <Select.Option value='custom'>Personnaliser</Select.Option>
            </Select>
            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
            
          </div>

          <div>
            <h6>Type</h6>
            <Select value={type} onChange={(values) => setType(values) }>
              <Select.Option value='all'>&nbsp;TOUT&nbsp;</Select.Option>
              <Select.Option value='Revenu'>REVENU</Select.Option>
              <Select.Option value='Frais'>FRAIS</Select.Option>
            </Select>
            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
            
          </div>
          <div className="switch-icons">
            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')}/>
            <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')}/>
          </div>
          <div>

            <button 
              className="btn btn-primary" 
              onClick={() => setShowModal(true)}
            >Ajouter</button>
          </div>
      </div>
      </div>

      <div className="content">
        {viewData === 'table' ? (         
        <Table  columns={columns} dataSource={allTransaction} /> 
      ) : (
          <Analytics allTransaction={allTransaction}/>
         )
         }
      </div>
        <Modal 
          title={editTable ? 'Modifier une transaction' : 'Ajouter une transaction'}
          open = {showModal}
          visible ={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout='vertical' onFinish={handleSubmit} initialValues={editTable}> 
            <Form.Item label='Montant' name='amount'>
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Type" name='type'>
              <Select>
                <Select.Option value='Revenu'>Revenu</Select.Option>
                <Select.Option value='Frais'>Frais</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Catégorie" name='category'>
              <Select>
                <Select.Option value='salary'>Salaire</Select.Option>
                <Select.Option value='Nourriture'>Nourriture</Select.Option>
                <Select.Option value='Materiels'>Materiels</Select.Option>
                <Select.Option value='Factures'>Factures</Select.Option>
                <Select.Option value='Frais'>Frais</Select.Option>
                <Select.Option value='Impôt'>Impôt</Select.Option>
                <Select.Option value='Transport'>Transport</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label='Date' name='date'> 
              <Input type='date'/>
            </Form.Item>

            <Form.Item label='Référence' name='reference'> 
              <Input type='text'/>
            </Form.Item>

            <Form.Item label='Déscription' name='description'> 
              <Input type='text'/>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">  
                {""}
                Enregistrer
              </button>
            </div>

          </Form>    
        </Modal>
    </Layout>
  );
};

export default HomePage;
