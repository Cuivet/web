import { Carousel } from "antd";
import React from "react";
import Pet4 from '../../assets/img/png/pet4.png';
import "./Home.scss";

export default function Home(){
    //const imgs =[Pet1,Pet2,Pet3,Pet4];

    // function Items(){
    //     const item =[];
        
    //         console.log(imgs[i]);
    //         item.push(
    //             <div>
    //                 <h3>{i}</h3>
                    
    //             </div>
    //         )
    //     }
    //     return item;
    // };
    return(
        <Carousel autoplay>
            {/* <div>
                <img src={Pet1} alt="Mascotas" className='carousel-img'></img>                               
            </div>
            <div>
                <img src={Pet2} alt="Mascotas" className='carousel-img'></img>
            </div>
            <div>
                <img src={Pet3} alt="Mascotas" className='carousel-img'></img>
            </div> */}
            <div>
                <img src={Pet4} alt="Mascotas" className='carousel-img'></img>
            </div>
        </Carousel>
    )

}