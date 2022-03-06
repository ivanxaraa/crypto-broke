import React, { createElement, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAngleDown, faCirclePlus, faAngleUp, faMagnifyingGlass, faTrash, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'



const Portfolio = () => {
  const [modal, setModal] = useState(false);  
  const [modal2, setModal2] = useState(false); 
  const [modal3, setModal3] = useState(false); 
  const [posts, setPosts] = useState([])  
  const [searchTerm, setSearchTerm] = useState("")

  const [estadoAtual, AtualizarEstado] = useState(null)


  const [earnings, setEarnings] = useState(0)

  const [amount, setAmount] = useState()

  const [minhasCoins, setMinhasCoins] = useState([])
  const [coinSelecionada, setCoinSelecionada] = useState(null)

  const [slideUp, setSlideUp] = useState(false) 

  useEffect(()=> {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30")
      .then(res => {        
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })

      //save atualizar
      const data = localStorage.getItem("MinhasCoin")
      const data2 = localStorage.getItem("MyEarnings")
      if(data){
        setMinhasCoins(JSON.parse(data))
      }
      if(data2){
        setEarnings(JSON.parse(data2))
      }

  }, [])


  useEffect(()=> {
    localStorage.setItem("MinhasCoin", JSON.stringify(minhasCoins))
    localStorage.setItem("MyEarnings", JSON.stringify(earnings))
  })


  

  const toggleAddCoin = () => {
    setModal(!modal);
  };

  const toggleAddCoin2 = () => {

    setModal2(!modal2);
  };

  const toggleAddCoin3 = (coin) => {
    AtualizarEstado(coin)
    setModal3(!modal3);
  };

  

  if (modal) {
    document.body.classList.add("active-model");
  } else {
    document.body.classList.remove("active-model");
  }

 


  function dadosCoinSelecionada(image, name, price, price24h){    
    AtualizarEstado(name)
    toggleAddCoin();    
    setCoinSelecionada([image, name, price, price24h])    
    toggleAddCoin2()
  }

  function quantia(amount){
    
    
    toggleAddCoin2();    
            
    
    if(minhasCoins){

    if(!(minhasCoins.toString().includes(coinSelecionada[1].toString())))    {
      
      var amountEmDolares = amount * coinSelecionada[2]
      setEarnings(earnings + amountEmDolares)
    
      setCoinSelecionada(coinSelecionada.push(amount, amountEmDolares.toFixed(2)))

      if(minhasCoins){      
        //aqui
        setMinhasCoins(minhasCoins.concat([coinSelecionada]))
        }else{
        setMinhasCoins([coinSelecionada])    
      }
      
    }
  }
  }

 
  

  function removeCoin(coinSelecionada, index){
    
    setMinhasCoins(minhasCoins.filter(coin => coin[1] !== coinSelecionada[1]))
    setEarnings(earnings - coinSelecionada[5])
  }


  function changeQuantidade(newAmount){    
    

    minhasCoins.map((coin) => {      
      
      if(coin[1] == estadoAtual){        
        coin[4] = newAmount       
        coin[5] = newAmount * coin[2]    
        coin[5] = coin[5].toFixed(2)         
      }
    })
    toggleAddCoin3()
    atualizarEarnings()
  }


  function atualizarEarnings(){
    var total = 0
    minhasCoins.map((coin) => {
      total += Number(coin[5])
    })
    setEarnings(total)
  }


  const FormatarCurrency = new Intl.NumberFormat('uk', { style: 'currency', currency: 'usd' } );


      //slide up
      window.onscroll = function (){ SlideUp()}    
      function SlideUp(){
        if(window.pageYOffset > 0){
          setSlideUp(true)
        }else{
          setSlideUp(false)
        }
      }
    
      function goTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }


  return (
    
    <div>      
      
      <div className="background">
            <div className="background-circle"></div>
            <div className="background-circle2"></div>
        </div>

        {slideUp && (
        <div className="slideUp" id="slideup-btn">
          <div className="slideUp-container" onClick={() => goTop()}>
              <FontAwesomeIcon icon={faAngleUp} size="2x"/>
          </div>
        </div>
      )}

      <div className="dentro">
        <div className="Earnings">          
          
          <div className="Earnings-Text">
            <div className="Earnings-left">
              <div className="Earnings-Title">My Earnings</div>
              <div className="Earnings-Text-Earn">{earnings.toFixed(2) + " USD"}</div>
            </div>
            <div className="Earnings-Button">
              <div onClick={toggleAddCoin} className="addCoin-Btn">
                  <FontAwesomeIcon  className="addCoin-Coin-Btn-icon" icon={faCirclePlus} size="2x"/>
                  <div className="addCoin-Btn-Text">Add Coin</div>                          
              </div>
              
            </div>
          </div>
          
        </div>

        
        {modal && (
          <div className="addCoin">
            <div className="addCoin-Overlay"></div>
            <div className="addCoin-Content">
              <div className="addCoin-header">
                Select Coin
                <FontAwesomeIcon  className="addCoin-close" icon={faXmark} onClick={toggleAddCoin} size="2x"/>
                
              </div>

              


              <div className="addCoin-coins">
                {/**/}

                <div className="portfolio-searchBar">
                  <input type="text" placeholder=""  onChange={(event)=> {
                    setSearchTerm(event.target.value)
                  }}/>
                  <div className="portfolio-searchBar-Procurar"><FontAwesomeIcon  className="addCoin-Coin-Container-texto-icon" icon={faMagnifyingGlass} size="2x"/></div>
                </div>

                {
                    posts.filter((coin) => {
                      if(searchTerm === ""){
                        return coin
                      } else if((coin.id).toLowerCase().includes(searchTerm.toLowerCase())){
                        return coin
                      }
                    }).map((coin,index) => (
                      <div className="addCoin-Coin-Container" key={index} onClick={() => dadosCoinSelecionada(coin.image,coin.name,coin.current_price,coin.price_change_percentage_24h)}>
                          <img src={coin.image} />
                          <div className="addCoin-Coin-Container-texto">
                              <p>{coin.name}</p>                            
                          </div>
                          <FontAwesomeIcon  className="addCoin-Coin-Container-texto-icon" icon={faAngleDown} size="2x"/>
                      </div>
                    ))
                }

                

                {/**/}
              </div>
            </div>
          </div>
          
        )}

        {modal2 && (

          <div className="quantidade">
            <div className="quantidade-overlay"></div>
            <div className="quantidade-container">
              <div className="quantidade-header">
                <div className="quantidade-title">Quantidade {estadoAtual}</div>
                <FontAwesomeIcon  className="quantidade-close" icon={faXmark} onClick={toggleAddCoin2} size="2x"/>
              </div>
              <div className="quantidade-content">
                <FontAwesomeIcon  className="quantidade-submit" icon={faAngleDown} size="2x" onClick={() => { quantia((document.getElementById("quantidade-escolher").value)   ) }}/>
                <input type="text" id="quantidade-escolher"/>                
              </div>
            </div>
          </div>

        )}

        

        
        <div className="Header-Portfolio">
            <p className="Header-Portfolio-name">Name</p>
            <p className="Header-Portfolio-price">Coin Price</p>
            <p className="Header-Portfolio-price">Holdings</p>
            <p className="Header-Portfolio-qt">Amount</p>       
            <p className="Header-Portfolio-24h">Last 24h</p>       
        </div>

        <div className="Portfolio" id="Portfolio">

          {
            modal3 && (
              <div className="quantidade">
              <div className="quantidade-overlay"></div>
              <div className="quantidade-container">
                <div className="quantidade-header">
                  <div className="quantidade-title">Alterar Quantidade de {estadoAtual}</div>
                  <FontAwesomeIcon  className="quantidade-close" icon={faXmark} onClick={toggleAddCoin3} size="2x"/>
                </div>
                <div className="quantidade-content">
                  <FontAwesomeIcon  className="quantidade-submit" icon={faAngleDown} size="2x" onClick={() => { changeQuantidade(document.getElementById("quantidade-alterar").value) } /* aqui altera */}/> 
                  <input type="text" id="quantidade-alterar"/>                
                </div>
              </div>
            </div>
            )
          }

          {
            minhasCoins && (
            minhasCoins.map((coin, index) => (                            
              <div className="Portfolio-Container">                
                <img src={coin[0]} />
                <div class='Portfolio-Container-div1'>
                  <p class='Portfolio-Container-p1'>{coin[1]}</p>
                </div>
                <div class='Portfolio-Container-div2'>
                  <p class='Portfolio-Container-p2'>{coin[2].toFixed(2) + " USD"}</p>
                </div>
                <div class='Portfolio-Container-div3'>
                  <div class='Portfolio-Container-p3'>{coin[5] + " USD"}</div>
                </div>
                <div class='Portfolio-Container-Quantidade-div'>
                  <div class='Portfolio-Container-Quantidade' id='quant-coin'>{coin[4]}</div>
                </div>
                <div class='Portfolio-Container-24horas' style={{color: coin[3] > 0 ? "#8BFF97" : "#FF8B8B"}}>{coin[3].toFixed(2) + " %"}</div>
                
                <div className="Portfolio-icons">                  
                  <FontAwesomeIcon className="portfolio-icon-remove" onClick={() => toggleAddCoin3(coin[1])  } icon={faPenToSquare} size="2x"/>
                  <FontAwesomeIcon className="portfolio-icon-remove" onClick={() => removeCoin(coin, index)} icon={faTrash} size="2x"/>
                </div>
              </div>              
            ))
            )
          }

        </div>
         

      </div>
    </div>
    
  );
  
};


export default Portfolio;

