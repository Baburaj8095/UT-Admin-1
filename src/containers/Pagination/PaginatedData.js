import React,{Component, useState} from 'react';
//import json_data from '../Pagination/fake_data.json';
import Paginator from 'react-paginate';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';

import Pagination from '@material-ui/lab/Pagination';

import classes2 from './PaginatedData.module.css';
import Spinner from '../../components/Spinner/Spinner';
import ReadMore from '../ReadMore/ReadMore';

import DottedMenu from '../../components/Buttons/DottedMenu/DottedMenu';




const useStyles = theme=>({
    root: {
        maxWidth: 340,
       // minWidth:290,
        maxHeight: 390,
        // maxHeight: 330,
        margin: 9.8,
        
      },
      paginatorReact : {
        '& > *': {
            marginTop: theme.spacing(2),
          },
      },

      scroller: {
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::-webkit-scrollbar': {
                   width: '5px',
         },
         '&::-webkit-scrollbar-thumb': {
            background: '#39ff14',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#00ffff', 
          },

      },
      
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
  
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
});



class PaginatedData extends Component{

        state={
            token: null,
            dataItems:[],
            isLoading: false,
            pageNumber: 0,
    }
        

    //start of componentDidMount
   async componentDidMount(){

    this.setState({
        isLoading: true  
        });


         //get the jwt token. later store or access the token from locaStorage
            const body = {username: 'guest', password: 'user'};
            const authApi = "/2/authenticate";

            const resp= await axios.post(authApi, body);
            this.setState({token: resp.data.id_token});

            //get the product list
            const api = "/products";
            const jwtToken ='Bearer '+this.state.token;


            axios.get(api, {
                headers: {
                'Authorization': jwtToken,
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'App-Token' : 'A14BC'
                }
            })
            .then(product => {
            //console.log("token inside the get method: ", this.state.token);
            console.log("product: ",product.data);
            this.setState({
                dataItems: product.data,
                isLoading: false,
                
                })
            })
            .catch(error =>{
                this.setState({
                    isLoading: false,
                    
                    });
                    });

   } //end of componentDidMount


    //method to change the paginator number
        changePage = ({selected}) =>{
                this.setState({pageNumber: selected})
            }



   render(){


    const {classes} = this.props;

    const itemsPerPage = 11;
    const pagesVisited = this.state.pageNumber * itemsPerPage;

    const pageCount = Math.ceil(this.state.dataItems.length / itemsPerPage);
    let displayItems = '';
   

    //conditional rendering

    if(this.state.isLoading){
        return <Spinner />
    }else{

        displayItems = this.state.dataItems.slice(pagesVisited, pagesVisited + itemsPerPage)
                                           .map((product)=>{
    
                                            if(product.inventories.length !== 0){
                                        
                                                return(

                                                        <Card className={classes.root} key={product.id} justify="center">
                                                            <CardContent>
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        <div>
                                                                            {product.name}
                                                                        </div>
                                                                    </td>

                                                                    <th>
                                                                        <div style={{float:'right'}}>
                                                                            {/* <button className={classes2.CartButton} onClick={() => this.addToCartAction(product)}>Dot menu</button>   */}
                                                                            <DottedMenu className={classes2.CartButton}/>
                                                                        </div>
                                                                    </th>
                                                                </tr>
                                                                                                                       
                                                                <tr>
                                                                    <td>
                                                                        <Typography className={classes.productName} color="textSecondary">
                                                                            {product.description.slice(0, 50)}...
                                                                            {/* <ReadMore desc={product.description}  style={{width:'20px', height:'20px'}}/> */}
                                                                        </Typography>
                                                                    </td> 
                                                            
                                                                    <th >
                                                                        <img src={product.productImage} alt={product.name} className={classes2.Images}/>
                                                                    </th>
                                                                </tr>
                                                                
                                                                </table>
                                                                                      
                                                            </CardContent>

                                                
                                                        </Card>

                                                    )
                                                }

                                                    
                                                    return null;

                                            } )

            }





   //final return of render()         
return (
    
    <div className={classes.scroller}> 
           
           <Grid container  style={{margin:'5px', justifyContent: 'center'}}>
              {displayItems}
           </Grid> 

            {/* <div className={classes.paginatorReact}>
                <Pagination className={classes2.paginationButtons}
                            count={pageCount}
                            onChange={this.changePage}
                            
                            variant="outlined"
                            color="secondary"/>
            </div> */}

            <Paginator
                previousLabel = {"<"}
                nextLabel = {">"}
                pageCount = {pageCount}
                onPageChange = {this.changePage}
                containerClassName={classes2.paginationButtons}
                previousLinkClassName = {classes2.previousButton}
                nextLinkClassName={classes2.nextButton}
                disabledClassName = {classes2.paginationDisabled}
                activeClassName = {classes2.activePageNumberButton}
                
                />
                    
        </div>

        

)
                

   }

  


}

export default withStyles(useStyles) (PaginatedData);
// const isItems = users.length < 4 ? true : false;

    // const hideNextBtn = users.length >= pagesVisited ? true: false;

    // const hidePreBtn = pagesVisited <= 4 ? true: false;