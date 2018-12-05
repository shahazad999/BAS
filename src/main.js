import React, { Component } from 'react';
import ApplicationMenuName from 'terra-application-name/lib/ApplicationMenuName';
import Image from 'terra-image';
import img from './cerner.png';
import Input from 'terra-form-input';
import Button from 'terra-button/lib/Button';
import Textarea from 'terra-form-textarea/lib/Textarea';
import DynamicGrid from 'terra-dynamic-grid/lib/DynamicGrid';
import Checkbox from 'terra-form-checkbox';
import Select from 'react-select';
import Radio from 'terra-form-radio/lib/Radio';
import Card from 'terra-card/lib/Card';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import IconPadlock from 'terra-icon/lib/icon/IconPadlock';
import IconAdd from 'terra-icon/lib/icon/IconAdd';
import IconSearch from 'terra-icon/lib/icon/IconSearch';

const template = {
    'grid-template-columns': '1fr 1fr 1fr 1fr',
    'grid-template-rows': 'auto',
    'grid-gap': '1px',
  };

  const region1 = {
    'grid-column-start': 1,
    'grid-row-start': 2,
  };
  
  const region2 = {
    'grid-column-start': 3,
    'grid-row-start': 2,
  };
  const region3 = {
    'grid-column-start': 1,
    'grid-column-end': 5,
    'grid-row-start': 1,
  };
  const region4 = {
    'grid-column-start': 2,
    'grid-column-end': 3,
    'grid-row-start': 3,
  }

class Main extends Component {
    constructor(props){
        super(props);
        this.state = { url: '', urlResponce: '', context: '', queryResponce: '',
        inputData: '', jsonData:'', selectedAnswers: [], test: 'Long live the King', keyValue: '',
        hash: '', selectedContext: null, context2: [
            { value: 'abc1', label: 'Contex1' },
            { value: 'abc2', label: 'Context2' },
            { value: 'abc3', label: 'Context3' }
          ], contextResponseKeys: ["key1","key2","key3"] , contextResponseKeysSelect: [
            { value: 'Key1', label: 'Key1' },
            { value: 'Key2', label: 'Key2' },
            { value: 'Key3', label: 'Key3' }
          ], selectedkey: null,contextName: '', 
          isRegisterPage: false,  isLoginPage: true, isQueryPage:  false, isInvokePage: false,
          regAssociateID:'', regPassword: '', regRePassword: '', regDepartment:'', regContext: ''
        }
    };
/*****************************
 * Fetches data from the URL
 ****************************/
    fetchURL() {
        const url = this.state.url
        const x = JSON.parse(JSON.stringify(this.state.jsonData))

        let config = {
            method: 'GET',
            headers: {
              'Accept': 'application/json+fhir',
            },
          }
        fetch(url, config)
            .then(response =>  response.json()  )
            .then((response) => this.setState({ jsonData : response}));
        
    }

/**
 * Fetch Blockchain Query Page
 */
    fetchBlockchain() {
        let config ={
            method: 'GET',
            headers: {
                'authorization': 'Bearer '+this.state.auth,
                'content-Type': 'application/json'
                
            },
        }
        fetch('http://localhost:4000' + '/channels/mychannel/chaincodes/bas2', config)
        .then(response =>  response.json() )
        .then((response) => this.setState({ 'queryResponce' : response }));
    }
    instantiate(){
        //create channel using context and install and instantiate chaincode
        //Refer craetechannel.js for now
 
    } 

    render(){

        const Header = <div style={{ border: '1px solid lightGray', backgroundColor: '#2481ca', width: '100%', height: '50px', position: 'relative' }} >
            <ApplicationMenuName title="Blockchain-As-A-Service" accessory={<Image src={img} height="80px" width="80px" isFluid />} />
        </div>
        const loggedInHeader = <div style={{ border: '1px solid lightGray', backgroundColor: '#2481ca', width: '100%', height: '50px', position: 'relative' }} >
            <ApplicationMenuName title={<div style={{float: 'right'}}>
           
           <Button text="Search" variant="emphasis" icon={<IconSearch />} onClick={() => {
                            this.setState({ isQueryPage: true, isInvokePage: false, isLoginPage:false, isRegisterPage: false})
                        }}  style={{ margin: '1px', float: 'right', height:'45px' }} />
           
       
       <Button text="Create" variant="emphasis" icon={<IconAdd />}  onClick={() => {
                            this.setState({ isQueryPage: false, isInvokePage: true, isLoginPage:false, isRegisterPage: false})
                        }} style={{ margin: '1px', float: 'right', height:'45px' }}  />
       
          </div>} accessory={<Image src={img} height="80px" width="80px" isFluid />} />
        </div>
        const loginPage = 
        <div>
           {Header}
        <div  style={{ margin: 'auto', height: '500px', width: '400px', textAlign:'left', position:'relative'}}> 
            <ul>  </ul>

            <Card>
                
                <Card.Body>  
                <h1>LOGIN</h1>
                    <ul>
                        <Input type="text" placeholder ="AssociateID" value={this.state.username} onChange={this.handleChangeUsername} required  style={{ height: '35px', margin: '5px'}}/> 
                    </ul>
                    <ul>
                        <Input type="password" placeholder ="Password" value={this.state.password} onChange={this.handleChangePassword} required  style={{ height: '35px',  margin: '5px'}}/>
                    </ul>
                    <div style={{ margin: 'auto', textAlign:'center'}}>
                        <Button  onClick={() => {
                             this.setState({ isQueryPage: false, isInvokePage: true, isLoginPage:false, isRegisterPage: false})
                        }} text="Login" icon = {<IconPadlock/>}variant="action" style={{margin: 'auto'}} />
                        <Button  onClick={() => {
                             this.setState({ isQueryPage: false, isInvokePage: false, isLoginPage:false, isRegisterPage: true})
                        }} text="Register" icon={<IconEdit />} variant="emphasis" style={{margin: '6px'}} />
                    </div>                    
                </Card.Body>
            </Card>
        </div>
        </div>
       const registerPage = <div>
           {Header}
           <div style={{margin: '50px'}}>
           <Card>
                <Card.Body> 
                    <h1>REGISTER USER</h1> 
                    <ul>
                        <Input type="text" placeholder ="AssociateID" value={this.state.regAssociateID} onChange={(e) => {this.setState({regAssociateID: e.target.value})}} required  style={{ height: '35px', margin: '5px'}}/> 
                    </ul>
                    <ul>
                        <Input type="password" placeholder ="Password" value={this.state.regPassword} onChange={(e) => {this.setState({regPassword: e.target.value})}} required  style={{ height: '35px',  margin: '5px'}}/>
                    </ul>
                    <ul>
                        <Input type="password" placeholder ="Re-Enter Password" value={this.state.regRePassword} onChange={(e) => {this.setState({regRePassword: e.target.value})}} required  style={{ height: '35px',  margin: '5px'}} />
                    </ul>
                    <ul>
                        <Input type="text" placeholder ="Department" value={this.state.regDepartment} onChange={(e) => {this.setState({regDepartment: e.target.value})}} required  style={{ height: '35px',  margin: '5px'}}/>
                    </ul>
                    <ul>
                        <Input type="text" placeholder ="Context" value={this.state.regContext} onChange={(e) => {this.setState({regContext: e.target.value})}} required  style={{ height: '35px',  margin: '5px'}}/>
                    </ul>
                    <div style={{ margin: 'auto', textAlign:'center'}}>
                         <Button  onClick={() => {
                                this.setState({ isQueryPage: false, isInvokePage: false, isLoginPage: true, isRegisterPage: false})
                        }} text="Register" icon={<IconEdit />} variant="emphasis" style={{margin: '6px'}} />
                    </div>                    
                </Card.Body>
            </Card>
       </div>
       </div>

        const mainpage1 = <div>

            <ul>
                <Input type="text" placeholder ="URL" value={this.state.url} onChange={(e) => { this.setState({ url: e.target.value})}} required  style={{ height: '35px', width: '400px', margin: '5px'}}/> 
                <Button color="success" size="lg" onClick={() => { this.fetchURL()}} text="Get" variant="action" style={{ margin: '5px'}} />
            </ul>

        </div>
        const mainpage2 = <div>
            <ul>
                <Textarea size="full" type="json" placeholder= "Data in JSON format" value={(this.state.inputData)} onChange={(e) => {this.setState({inputData: e.target.value})}} style={{height: '200px', width: '400px', margin: '5px'}}/>
                <Button color="success" size="lg" onClick={() => {
                        try {
                            JSON.parse(this.state.inputData)
                        } catch(e){
                            return alert("Invlaid JSON")
                        }
                    
                        this.setState({jsonData: JSON.parse(this.state.inputData)})
                    
                    
                    
                    }} text="Get" variant="action" style={{ margin: '5px'}} />
            </ul>
           
              
        </div>
        // JSon key selection checkbox
        const checkBoxSelection = Object.entries(this.state.jsonData).map(key => 
            <div >  
                <React.Fragment key={key}>
                    <div >
                        <Checkbox id="Data" name="filter" disabled={this.state.view} labelText={key[0]} onChange={(e) => {
                            // eslint-disable-next-line
                            var jsonArg1 = new Object();
                         
                            jsonArg1 = key[0];
                            const { selectedAnswers } = this.state;
                            if (e.currentTarget.checked) {
                              selectedAnswers.push(jsonArg1);
                            } else if (!e.currentTarget.checked) {
                              selectedAnswers.splice(selectedAnswers.values(jsonArg1), 1);                       
                            }
                            this.setState({ selectedAnswers });  
                            }} />
                    </div>
                  </React.Fragment>
            </div>           
            )

        //Main Invoke Page
        const invokePage = <div>
            <DynamicGrid defaultTemplate={template}>
                <DynamicGrid.Region defaultPosition={region3}>
            {loggedInHeader}
            </DynamicGrid.Region>
            <DynamicGrid.Region defaultPosition={region1}>
            {mainpage1}
        
            </DynamicGrid.Region>
            <DynamicGrid.Region defaultPosition={region2}>
            {mainpage2}
            </DynamicGrid.Region>
            <DynamicGrid.Region defaultPosition={region4}>
            

            <div style={{ margin: 'auto' ,justifyContent: 'center'}}>
            {checkBoxSelection}
            <ul>
                <Input type="text" placeholder ="Context" value={this.state.contextName} onChange={(e) => { this.setState({ contextName: e.target.value})}} required  style={{ height: '35px', width: '400px', margin: '5px'}}/> 
            </ul>
            <Button color="success" size="lg" onClick={() => { this.instantiate()}} text="submit" variant="action"  />
            </div>
            </DynamicGrid.Region>
        </DynamicGrid>
        </div>

        const radio = Object.entries(this.state.contextResponseKeys).map(key => 
            <div style={{margin: 'auto', position: 'relative',paddingLeft: '20px'}}>  
            <React.Fragment key={key}>
                <div style={{ width:'500px', margin:'auto', fontSize: '20px',  float: "right"}}>
                <Radio id={key} labelText={key[1]}  isInline /> 
                <Select
        value={this.state.selectedkey}
        onChange={(selectedkey) => { this.setState({ selectedkey})}}
        options={this.state.contextResponseKeys}  />
                </div>
            </React.Fragment>
        </div>  ) 
        
        //Select key for the context to search
        const queryPageSelectkey = <div style={{ height: '35px', width: '400px', margin: '5px'}}>
           <Select
        value={this.state.selectedkey}
        onChange={(selectedkey) => { this.setState({ selectedkey})}}
        options={this.state.contextResponseKeysSelect}  />
        <Input type="text" placeholder ="Value" value={this.state.keyValue} onChange={(e) => { 
            if (this.state.hash.length === 0){
                this.setState({ keyValue: e.target.value})
            } else {
                this.setState({ hash: '', keyValue: e.target.value})
            }
            }       
            } required  style={{ height: '35px', width: '400px', margin: '5px'}}/> 
       
    
  
        </div>

        const customSearch = Object.entries(this.state.contextResponseKeys).map(key =>  
        <div style={{margin: 'auto', position: 'relative',paddingLeft: '20px'}}>  
        <React.Fragment key={key}>
            <div style={{ width:'500px', margin:'auto', fontSize: '20px',  float: "right"}}>
                {key[1]} :  <Input type="text" placeholder ={key[1]}  onChange={(e) => {
                    
                }} required  style={{ height: '35px', width: '400px', margin: '5px'}}/> 
        
            </div>
        </React.Fragment>
        </div>           )

    
        const queryPageleft = <div>
         
        <Input type="text" placeholder ="Hash" value={this.state.hash} onChange={(e) => { this.setState({ hash: e.target.value})}} required  style={{ height: '35px', width: '400px', margin: '5px'}}/> 
        
      
        </div>

        const queryPage = <div >
            <DynamicGrid defaultTemplate={template}>
            <DynamicGrid.Region defaultPosition={region3}>
            {loggedInHeader}
            
            <div style={{ height: '35px', width: '400px', margin: 'auto'}}>
          <Select 
        value={this.state.selectedContext}
        onChange={(selectedContext) => { this.setState({ selectedContext})}}
        options={this.state.context2}  />
          </div>
            </DynamicGrid.Region>
            <DynamicGrid.Region defaultPosition={region1}>

            {queryPageleft}
            
            </DynamicGrid.Region>
            <DynamicGrid.Region defaultPosition={region2}>
            {queryPageSelectkey}
            
             
            </DynamicGrid.Region>
            <DynamicGrid.Region defaultPosition={region4}>
          
            <ul>
            <Button color="success" size="lg" onClick={() => { this.queryBlockchain()}} text="submit" variant="action"  style ={{margin: 'auto', float: 'right', position: 'relative'}}/>
      
            </ul>
          
            </DynamicGrid.Region>
        </DynamicGrid>
        </div>
        let result;
        const {isRegisterPage, isLoginPage, isQueryPage, isInvokePage} =this.state;
        if (isRegisterPage){
            result = registerPage
        }else if(isLoginPage) {
            result = loginPage
        } else if(isQueryPage) {
            result = queryPage
        } else if (isInvokePage){
            result = invokePage
        }
        return(
            <div>
                
                {result}

                
                
             </div>
            
        );
    }
    
}


export default Main;