import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function CountDown (props){
  let hour = props.time.hour;
  let minute = props.time.minute;
  let second = props.time.second;
  React.useEffect(() => {
    const interval = setInterval(()=>{
    props.tick()},1000);
    return () => clearInterval(interval);
  },[props.time]);
  return(
    <div className = "count-down">
    <p><span className = "discount">距结束</span><span className = "time">{hour < 10 ? "0" : ""}{hour}</span>:<span className = "time">{minute < 10 ? "0" : ""}{minute}</span>:<span className = "time">{second < 10 ? "0" : ""}{second}</span></p>
    </div>
  );
}

class TopInfo extends React.Component{
  render(){
    return(
      <div>
      <p className = "title">淘抢购</p>
      <CountDown time = {this.props.time} tick = {() => this.props.tick()}/>
      <a className = "change-button" onClick = {() => this.props.onClick()}>换一换</a>
      </div>
    );
  }
}

class ProgressBar extends React.Component{
  render(){
    return(
      <div className = "progress" style={{width: this.props.progress + '%'}}></div>
    )
  }
}
class ProductBox extends React.Component{
  render(){
    const i = this.props.index;
    const name = this.props.name;
    const discount = this.props.discount;
    const priceNow = this.props.priceNow;
    const price = this.props.price;
    const src = this.props.src;
    const stockNum = this.props.stockNum;
    const boughtNum = 100-stockNum;
    const progress = boughtNum;
    return(
      <div className = "product-box">
        <div className = "image-box">
          <img className = "product-image" src = {src} alt = {name}/>
        </div>
        <div className = "info-box">
          <div className = "name-box">
          <p>{name}</p>
          </div>
          <p className = "discount">{discount}</p>
          <ProgressBar progress = {progress}/>
          <p><span className = "percentage">{boughtNum}%</span><span className = "boughtNum">已抢{boughtNum}件</span></p>
          <p className = "price-list"><span className = "priceNow">{priceNow}</span><span className = "pricePrev">{price}</span></p>
          <button onClick = {() => this.props.onClick(i)}>抢</button>
        </div>
      </div>
    )
  }
}
class TaoQiangGou extends React.Component{
  constructor(props){
    super(props);
    const products = Array(6).fill(null);
    products[0] = {index: 0, id:"qiang1", name: "买一送一蛋黄酥60枚", discount: "前2小时前50件5折", priceNow: "￥29.9", price: "￥155", stockNum: 100, src:"./images/qiang1.jpg"};
    products[1] = {index: 1, id:"qiang2",name: "卫龙腊肠辣条牛油火锅370g", discount: "前2小时前450件5折", priceNow: "￥29.9", price: "￥155", stockNum: 100, src:"./images/qiang2.jpg"};
    products[2] = {index: 2, id:"qiang3",name: "云南蒙自甜石榴新鲜水果5斤", discount: "前1小时前51件折", priceNow: "￥25.8", price: "￥58.8", stockNum: 100, src:"./images/qiang3.jpg"};
    products[3] = {index: 3, id:"qiang4",name: "龙韵家用多功能冲击钻220V手电钻手枪钻小手电转钻电动工具螺丝刀", discount:  "前15分钟前50件5折", priceNow: "￥79", price: "￥158", stockNum: 100, src:"./images/qiang4.jpg"};
    products[4] = {index: 4, id:"qiang5",name: "大闸蟹鲜活1.8两", discount: "前30分钟前100件5折", priceNow: "￥96", price: "￥398", stockNum: 100, src:"./images/qiang5.jpg"};
    products[5] = {index: 5, id:"qiang6",name: "cynbern昔本近视泳镜防雾高清", discount: "前15分钟前50件5折", priceNow: "￥39.9", price: "￥298", stockNum: 100, src:"./images/qiang6.jpg"};
    this.state = {
      products: products,
      start: 0,
      time: {hour: 0, minute: 5, second:0}
    }
  }
  handleClick(i){
    const products = this.state.products.slice();
    products[i].stockNum -= 1;
    this.setState({
      products: products
    })


  }
  changeProducts(){
    let start = this.state.start;
    let products = this.state.products;
    if(start + 3 < products.length){
      start += 3;
    }else{
      start = start + 3 - products.length ;
    }
    this.setState({
      start: start,
    })
  }
  tick(){
    let hour = this.state.time.hour;
    let minute = this.state.time.minute;
    let second = this.state.time.second;
    if (hour === 0 && minute === 0 && second === 0){
      alert("Time's up");
    }else if (minute === 0 && second === 0){
      hour -= 1;
      minute = 59;
      second = 59;
    }else if (second === 0){
      minute -= 1;
      second = 59;
    }else{
      second -= 1;
    }
    this.setState({
      time: {hour: hour, minute: minute, second: second}
    })
  }


  render(){
    const curStart = this.state.start;
    const products = this.state.products;
    let productList;
    if (curStart+3 < products.length){
      productList = products.slice(curStart, curStart+3);
    }else{
      productList = products.slice(curStart, products.length);
      productList = productList.concat(products.slice(0,3 - products.length+ curStart));
    }
    for(let i = 0; i<3; i++){
      console.log(productList[i].name);
      console.log(productList[i].stockNum);
    }
    return (
      <div>
      <TopInfo time = {this.state.time} onClick = {() => this.changeProducts() } tick = {() => this.tick()}/>
      <div className = "products-container">
      {productList.map((product,index) =>{
        return <ProductBox key = {product.id}
        index = {product.index}
        name = {product.name}
        discount = {product.discount}
        priceNow = {product.priceNow}
        price = {product.price}
        src = {product.src}
        stockNum = {product.stockNum}
        onClick = {(i) => this.handleClick(i)}
        />
      })}
      </div>
      </div>
    );
  }
}
ReactDOM.render(
  <TaoQiangGou />,
  document.getElementById('root')
);

serviceWorker.unregister();
