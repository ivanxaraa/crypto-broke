import React, { useEffect, useState } from "react"
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";



function DataFecht() {
  
    const [searchTerm, setSearchTerm] = useState("")

    const [posts, setPosts] = useState([])    

    const [highlights, setHighlights] = useState(true) 
    const [marketcapChange, setMarketCapChange] = useState(false) 
    

    const [coinMarketCapProcurar, setCoinMarketCapProcurar] = useState("Bitcoin") 


    const FormatarCurrency = new Intl.NumberFormat('uk', { style: 'currency', currency: 'usd' } );
    const FormatarPercentagem = new Intl.NumberFormat('de-DE', {style: 'percent'});
    
    const [slideUp, setSlideUp] = useState(false) 

    useEffect(()=> {
      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30")
        .then(res => {
          console.log(res)
          setPosts(res.data)
        })
        .catch(err => {
          console.log(err)
        })

      //save atualizar
      const data = localStorage.getItem("marketCapCoin")
      if(data){
        setCoinMarketCapProcurar(JSON.parse(data))
      }
    }, [])


    //save
    
    
    useEffect(()=> {
      localStorage.setItem("marketCapCoin", JSON.stringify(coinMarketCapProcurar))
    })
  
    var array = []
    var array2 = []
    var array3 = []
    var arrayCopia = []
    
    var MarketCapName = ""
    var MarketCapImage = ""
    var MarketCapMarketCap = ""
    var MarketCapPercentage24h = ""
    var MarketCapMensagem = ""

    var MarketCapAtual = 0
  
    function changeMarketCap(){
      MarketCapAtual += 1
    }

    posts.map((coin) => {
    array.push(Number(coin.price_change_percentage_24h))    
    arrayCopia.push(Number(coin.price_change_percentage_24h))  
    array2.push(coin.name)
    array3.push(coin.image)

    

    if(coin.name == coinMarketCapProcurar){
      MarketCapName = coin.name
      MarketCapImage = coin.image
      MarketCapMarketCap = coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")      
      
      MarketCapPercentage24h = coin.market_cap_change_percentage_24h.toFixed(2)     
      if(Number(MarketCapPercentage24h) > 0){
        MarketCapMensagem = " increase over the last day."
      }else{
        MarketCapMensagem = " decrease over the last day."
      }
    }

    })


    function alterarProcuraMarketCap(CoinName){
      setCoinMarketCapProcurar(CoinName)
      setMarketCapChange(!marketcapChange)
    }

  
    function toggleHighlights(){
      setHighlights(!highlights);
      var toggleHighlight = document.getElementById("toggleHighlight");
      toggleHighlight.classList.toggle("active")      
    }
    
    var Big24h = 0
    var BigName = ""
    var BigImage = ""
    var BigMax24h = Math.max.apply(Math, array);
    var BigMin24h = Math.min.apply(Math, array);
    
    var indexx = array.indexOf(BigMax24h) //criar index
    Big24h = Number(array[indexx]) //add html
    BigImage = array3[indexx]
    BigName = array2[indexx]
    array.splice(indexx,1) //remover

    

    var Big24h2 = 0
    var BigName2 = ""
    var BigImage2 = ""

    BigMax24h = Math.max.apply(Math, array);
    indexx = array.indexOf(BigMax24h)
    Big24h2 = Number(array[indexx]) //add html
    BigImage2 = array3[indexx]
    BigName2 = array2[indexx]
    array.splice(indexx,1)
    
    var Big24h3 = 0
    var BigName3 = ""
    var BigImage3 = ""

    BigMax24h = Math.max.apply(Math, array);
    indexx = array.indexOf(BigMax24h)
    Big24h3 = Number(array[indexx]) //add html
    BigImage3 = array3[indexx]
    BigName3 = array2[indexx]


    var Less24h = 0
    var LessName = ""
    var LessImage = ""

    

    BigMin24h = Math.min.apply(Math, arrayCopia);
    indexx = arrayCopia.indexOf(BigMin24h)
    Less24h = Number(arrayCopia[indexx]) //add html
    LessImage = array3[indexx]
    LessName = array2[indexx]
    arrayCopia.splice(indexx,1)

    var Less24h2 = 0
    var LessName2 = ""
    var LessImage2 = ""
    

    BigMin24h = Math.min.apply(Math, arrayCopia);
    indexx = arrayCopia.indexOf(BigMin24h)
    Less24h2 = Number(arrayCopia[indexx]) //add html
    LessImage2 = array3[indexx]
    LessName2 = array2[indexx]
    arrayCopia.splice(indexx,1)



    var Less24h3 = 0
    var LessName3 = ""
    var LessImage3 = ""
    
    
    BigMin24h = Math.min.apply(Math, arrayCopia);
    indexx = arrayCopia.indexOf(BigMin24h)
    Less24h3 = Number(arrayCopia[indexx]) //add html
    LessImage3 = array3[indexx]
    LessName3 = array2[indexx]
    arrayCopia.splice(indexx,1)


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

        <div className="marketcap">
            <div className="marketcap-container">                
                <div className="marketcap-left">                    
                    <div className="marketcap-left-title"><img alt="coinImage" onClick={() => setMarketCapChange(!marketcapChange)} src={MarketCapImage}/><h1>Today's {MarketCapName} Market Cap</h1></div>
                    <div className="marketcap-left-text">The {MarketCapName} market cap is {MarketCapMarketCap} $, a <span style={{color: Number(MarketCapPercentage24h)<0 ? "#FF8B8B" : "#8BFF97" }}>{MarketCapPercentage24h}%</span> {MarketCapMensagem}</div>
                </div>
                <div className="marketcap-right">
                <span>Trendings</span>

                <div className="trending-off" onClick={() => toggleHighlights()}><div id="toggleHighlight" className="trending-off-btn"></div></div>        
                </div>
            </div>
        </div>

        

        {marketcapChange && (
          <div className="changeMarketCapCoin">
            <div className="changeMarketCapCoin-overlay">
            <div className="changeMarketCapCoin-container">
              <div className="changeMarketCapCoin-text">
                <div className="changeMarketCapCoin-header">Market Cap<FontAwesomeIcon onClick={() => setMarketCapChange(!marketcapChange)} class="changeMarketCapCoin-header-icon" icon={faXmark} size="2x"/></div>
                  <div className="changeMarketCapCoin-coins">
            {
                    posts.filter((coin) => {
                      if(searchTerm === ""){
                        return coin
                      } else if((coin.id).toLowerCase().includes(searchTerm.toLowerCase())){
                        return coin
                      }
                    }).map((coin,index) => (

                      <div className="changeMarketCapCoin-box" onClick={() => alterarProcuraMarketCap(coin.name)}>
                        <img src={coin.image} /> {coin.name}
                      </div>
                      
                    ))
                }
                </div>
              </div>
            </div>
            </div>
          </div>
        )}
        
          
        


        {highlights && (
        <div className="trending">            
            <div className="trending-container">
              <div className="trending-text">
                <div className="trending-header">
                  <div className="trending-title">Biggest Gainers <FontAwesomeIcon class="trending-title-icon" icon={faAngleUp} size="2x"/></div>         
                </div>                
                <div className="trending-content">
                  <div className="trending-block"> <img src={BigImage}/> <div className="trending-block-name">{BigName}</div><div className="trending-block-icon-div"><FontAwesomeIcon class="trending-block-icon" icon={faAngleUp} size="2x"/></div><div className="trending-block-percent">{Big24h.toFixed(2)} %</div></div>     
                  <div className="trending-block"> <img src={BigImage2}/> <div className="trending-block-name">{BigName2}</div><div className="trending-block-icon-div"><FontAwesomeIcon class="trending-block-icon" icon={faAngleUp} size="2x"/></div><div className="trending-block-percent">{Big24h2.toFixed(2)} %</div></div>
                  <div className="trending-block"> <img src={BigImage3}/> <div className="trending-block-name">{BigName3}</div><div className="trending-block-icon-div"><FontAwesomeIcon class="trending-block-icon" icon={faAngleUp} size="2x"/></div><div className="trending-block-percent">{Big24h3.toFixed(2)} %</div></div>                          
                </div>
              </div>
            </div>

            <div className="trending-container">
              <div className="trending-text">
                <div className="trending-header">
                  <div className="trending-title">Biggest Losses <FontAwesomeIcon class="trending-title-icon" icon={faAngleDown} size="2x" style={{color: "#FF8B8B"}}/></div>                  
                </div>
                <div className="trending-content">
                  <div className="trending-block"> <img src={LessImage}/> <div className="trending-block-name">{LessName}</div><div className="trending-block-icon-div"><FontAwesomeIcon class="trending-block-icon" style={{color: "#FF8B8B"}} icon={faAngleDown} size="2x"/></div><div className="trending-block-percent" style={{color: "#FF8B8B"}}>{Less24h.toFixed(2)} %</div></div>     
                  <div className="trending-block"> <img src={LessImage2}/> <div className="trending-block-name">{LessName2}</div><div className="trending-block-icon-div"><FontAwesomeIcon class="trending-block-icon" style={{color: "#FF8B8B"}} icon={faAngleDown} size="2x"/></div><div className="trending-block-percent" style={{color: "#FF8B8B"}}>{Less24h2.toFixed(2)} %</div></div>
                  <div className="trending-block"> <img src={LessImage3}/> <div className="trending-block-name">{LessName3}</div><div className="trending-block-icon-div"><FontAwesomeIcon class="trending-block-icon" style={{color: "#FF8B8B"}} icon={faAngleDown} size="2x"/></div><div className="trending-block-percent" style={{color: "#FF8B8B"}}>{Less24h3.toFixed(2)} %</div></div>                          
                </div>
              </div>
            </div>
          </div>
        )}
          <div className="searchBar">
            <input type="text" placeholder=""  onChange={(event)=> {
              setSearchTerm(event.target.value)
            }}/>
            <div className="searchBar-Procurar">Search</div>
          </div>

          <div className="AllCoins">
          {
            
            
            
            posts.filter((coin) => {
              if(searchTerm === ""){
                return coin
              } else if((coin.id).toLowerCase().includes(searchTerm.toLowerCase()) || (coin.symbol).toLowerCase().includes(searchTerm.toLowerCase())){
                return coin
              }
            }).map((coin, index) =>       
              

              <div className="coin-container">                
                <p key={coin.id}>
                <div className="coin-block" id="coin-index">{index+1}</div>
                    <div className="coin-block"><img src={coin.image}/></div>
                    <div key={index} className="coin-block" id="coin-name">{coin.name}</div>
                    <div className="coin-block" id="coin-price">{FormatarCurrency.format(coin.current_price)} </div>
                    <div className="coin-block-changePrices">
                      <div className="coin-block" id="coin-prices24-7" style={{
                        color: coin.price_change_percentage_24h < 0 ? "#FF8B8B" : "#8BFF97"
                        }}>{coin.price_change_percentage_24h.toFixed(2) + " %"}
                      </div>   
                      <div className="coin-block" id="coin-prices24-7" style={{
                        color: coin.price_change_percentage_7d_in_currency < 0 ? "#FF8B8B" : "#8BFF97"
                      }}>{coin.price_change_percentage_7d_in_currency.toFixed(2) + " %"}</div>     
                    </div>                             
                </p>
                </div>                
              
            )
            
              
          }
          </div>
        
        </div>
      </div>
    );

    
  }
  
  export default DataFecht
  

 
