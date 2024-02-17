import logo from './logo.svg';
import './App.css';
import Category from './Category';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  let [finalCategory,setFinalCategory]=useState([])
  let [finalPro,setFinalProduct]=useState([])
  let [catName,setCatName]=useState('')

  
  let getCategory=()=>{
    axios.get('https://dummyjson.com/products/categories')
    .then((res)=>res.data)
    .then((finalRes)=>{
      setFinalCategory(finalRes)
    })
  }


  let getProducts=()=>{
    axios.get('https://dummyjson.com/products')
    .then((proRes)=>proRes.data)
    .then((finalRes)=>{
      setFinalProduct(finalRes.products)
    })
  }

  useEffect(()=>{
    getCategory();
    getProducts();
  },[])


  useEffect(()=>{
    if(catName!==""){
      axios.get(`https://dummyjson.com/products/category/${catName}`)
      .then((proRes)=>proRes.data)
      .then((finalRes)=>{
        setFinalProduct(finalRes.products)
      })
      console.log("hello")
      console.log(catName)
    }
  },[catName])


  let pitems=finalPro.map((products,index)=>{
    return(
      <ProductItems key={index} pdata={products} />
    )
  })

  return (
    <>
    <div className='py-[40px]'>
       <div className='max-w-[1170px] mx-auto'>
          <h1 className='text-center text-[40px] font-bold mb-[40px]'>Our Products</h1>
          <div className='grid grid-cols-[30%_auto] gap-[20px]'>
            <div>
              <Category finalCategory={finalCategory}  setCatName={setCatName} />
            </div>

            <div>
              <div className='grid grid-cols-3 gap-5'>
                    { 
                      finalPro.length>=1 ?
                      pitems
                      :
                      'No Data Found'
                      }  

              </div>
            </div>
          </div>
       </div>
     
    </div>
    
    </>
  );
}

export default App;

function ProductItems({pdata}){
  return(
        <div className='shadow-lg text-center pb-4'>
        <img src= {pdata.thumbnail} className='w-[100%] h-[220px]' />                  
        <h3>{pdata.title}</h3>
        
        <b>{pdata.price}</b>
      </div>
  )
}
