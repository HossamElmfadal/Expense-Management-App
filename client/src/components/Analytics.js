import React from 'react'
import { Progress } from 'antd'

const Analytics = ({ allTransaction }) => {
    //Category
    const categories = [
        'salaire',
        'Nourriture',
        'Materiels',
        'Factures',
        'Frais',
        'Impôt',
        'Transport'
    ];

    //total transaction
    const totalTransactions = allTransaction.length
    const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'Revenu') 
    const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'Frais') 
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransactions) * 100
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransactions) * 100


    //total turnover
    const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.Montant, 0)
    const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === 'Revenu').reduce((acc, transaction) => acc + transaction.Montant,0)
    const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === 'Frais').reduce((acc, transaction) => acc + transaction.Montant, 0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100


    return (
    <>
        <div className='row m-3' >
            <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total des transactions : {totalTransactions}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-succes'> Revenu : { totalIncomeTransactions.length } </h5>
                        <h5 className='text-danger'> Frais : { totalExpenseTransactions.length } </h5>
                        <div>
                            <Progress type='circle' strokeColor={'black'} className='mx-2' percent={totalIncomePercent.toFixed(0)}/>
                            <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>
            </div>
           
            
            {/* <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total de chiffre d'affaires : {totalTurnover}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-succes'> Revenu : { totalIncomeTurnover } </h5>
                        <h5 className='text-danger'> Frais : { totalExpenseTurnover } </h5>
                        <div>
                            <Progress type='circle' strokeColor={'black'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                            <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)}/>
                        </div>
                    </div>
                </div>
            </div> */}
            </div>

        {/* <div className='row m-3'>
            <div className='col-md-4'>
                <h4>Category Income</h4>
                {
                    categories.map(category => {
                        const Montant = allTransaction.filter(
                            (transaction) => transaction.type === 'income' &&
                            transaction.category === category
                            )
                            .reduce((acc, transaction) => acc + transaction.Montant, 0 )
                            return(
                                Montant > 0 && ( 
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <Progress
                                         percent={((Montant/totalIncomeTurnover) * 100).toFixed(0)}/>
                                    </div>
                                </div>
                                )
                            )
                    })
                }
            </div>
        
        <div className='col mt-6'>
            <div className='col-md-6'>
                <h4>Category Expense</h4>
                {
                    categories.map(category => {
                        const Montant = allTransaction.filter(
                            (transaction) => transaction.type === 'Frais' &&
                            transaction.category === category
                            )
                            .reduce((acc, transaction) => acc + transaction.Montant, 0 )
                            return(
                                Montant > 0 && ( 
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <Progress
                                         percent={((Montant/totalExpenseTurnover) * 100).toFixed(0)}/>
                                    </div>
                                </div>
                                )
                            )
                    })
                }
            </div>
        </div>
        </div> */}
    </>
  )
}

export default Analytics