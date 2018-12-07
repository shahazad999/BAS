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
import './App.css';
import netConfig from './config';
import InputField from 'terra-form-input/lib/InputField';
import Table from 'terra-table';


import Channel from './createChannel';

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
    constructor(props) {
        super(props);
        this.state = {
            url: '', urlResponce: '', context: '', queryResponce: {"key1": "value1", "key2": "value2"}, associateID: "", password: "",
            inputData: '', jsonData: '', selectedKeysForInvoke: [], test: 'Long live the King', keyValue: '',
            hash: '', selectedContext: { value: 'abc', label: 'Context' }, contextNameRecived: [
                { value: 'abc1', label: 'Contex1' },
                { value: 'abc2', label: 'Context2' },
                { value: 'abc3', label: 'Context3' }
            ], contextResponseKeys: ["key1", "key2", "key3"], contextResponseKeysSelect: [
                { value: 'Key1', label: 'Key1' },
                { value: 'Key2', label: 'Key2' },
                { value: 'Key3', label: 'Key3' }
            ], selectedkey: null, contextName: '', regRePasswordVerify: false, testing: [],
            isRegisterPage: false, isLoginPage: true, isQueryPage: false, isInvokePage: false,
            regAssociateID: '', regPassword: '', regRePassword: '', regDepartment: '', regContext: '', selectedKeysForInvoke: [],
        }
        this.onLoginClick = this.onLoginClick.bind(this);
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
            .then(response => response.json())
            .then((response) => this.setState({ jsonData: response }));

    }

    /**
     * Fetch User Details form Blockchain
     */
    onLoginClick() {
        const {associateID} =this.state;
        let config = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + netConfig.authToken,
                'content-Type': 'application/json'

            },
        }
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/chaincodes/' + netConfig.chaincodeName + '?peer=' + netConfig.peerName + '&fcn=queryCustom&args=%5B%22%7B%5C%22selector%5C%22:%7B%5C%22username%5C%22:%5C%22' +associateID+ '%5C%22%7D%7D%22%5D', config)
            .then(response => response.json())
            .then(response => {
                //if (response.password === this.state.password) 
                {
/*                     Object.entries(response.keys).map(key => {
                        var contextKeysObject = new Object();
                        
                        contextKeysObject.value = key[1];
                        contextKeysObject.label = key[1];
                        const x = [];
                        x.push(contextKeysObject);
                        this.setState({ contextResponseKeysSelect: x ,  isInvokePage: false, isLoginPage: false, isQueryPage: true,isRegisterPage: false })
                        

                    }) */
                    const  contextResponseKeys  = response.keys;
                    const result = new Array(contextResponseKeys.length);
                    for (var i= 0; i <result.length; i++){
                        result[i]= {
                            value: contextResponseKeys[i],
                            label: contextResponseKeys[i]
                        }
                        this.setState({ contextResponseKeysSelect: result ,  isInvokePage: false, isLoginPage: false, isQueryPage: true,isRegisterPage: false })
                    }

                    Object.entries(response.contexts).map(key => {
                        var contextNamesObject =new Object()
                        contextNamesObject.value = key[1];
                        contextNamesObject.label = key[1];
                        this.setState({ selectedContext: contextNamesObject, isInvokePage: false, isLoginPage: false, isQueryPage: true,isRegisterPage: false })
                    })

                }
            })
    }


    /**
     * Fetch Blockchain Query Page
     */
    fetchBlockchainHash() {
        let config = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + netConfig.authToken,
                'content-Type': 'application/json'

            },
        }
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/chaincodes/' + netConfig.chaincodeName + '?peer=' + netConfig.peerName + '&fcn=queryCustom&args=%5B%22%7B%5C%22selector%5C%22:%7B%5C%22_rev%5C%22:%5C%22' + this.state.hash + '%5C%22%7D%7D%22%5D', config)
            .then(response => response.json())
            .then((response) => this.setState({ 'queryResponce': response }));
    }
    fetchBlockchainCustom() {
        let config = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + netConfig.authToken,
                'content-Type': 'application/json'

            },
        }
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/chaincodes/' + netConfig.chaincodeName + '?peer=' + netConfig.peerName + '&fcn=queryCustom&args=%5B%22%7B%5C%22selector%5C%22:%7B%5C%22' + this.state.contextResponseKeysSelect.value + '%5C%22:%5C%22' + this.state.keyValue + '%5C%22,%5C%22payerId%5C%22:%5C%22' + this.state.username + '%5C%22%7D%7D%22%5D', config)
            .then(response => response.json())
            .then((response) => this.setState({ 'queryResponce': response }));
    }
    instantiate() {
        //create channel using context and install and instantiate chaincode
        //Refer craetechannel.js for now
        const { regDepartment, regAssociateID, regPassword, regContext, selectedKeysForInvoke } = this.state;
        var j = ['"' + regDepartment + '"', '"' + regAssociateID + '"', '"' + regPassword + '"', '"' + regContext + '"', '"' + selectedKeysForInvoke + '"'];


        let config = {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + netConfig.authToken,
                'content-Type': 'application/json'
            },
            body: '{ "peers": ["peer0.org1.example.com","peer0.org2.example.com"], "fcn":"initLedger", "args":[' + j + ']}'
        }

        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/chaincodes/' + netConfig.chaincodeName, config)
            .then(response => response.json())
            .then(response => {
                if (response.length === 0 && response[0] !== 'E') {

                } else {
                    alert("Failed")
                }
            })
    }

    render() {
        const Header = <div style={{ border: '1px solid lightGray', backgroundColor: '#2481ca', width: '100%', height: '50px', position: 'relative' }} >
            <ApplicationMenuName title="Blockchain-As-A-Service" accessory={<Image src={img} height="80px" width="80px" isFluid />} />
        </div>
        const loggedInHeader = <div style={{ border: '1px solid lightGray', backgroundColor: '#2481ca', width: '100%', height: '50px', position: 'relative' }} >
            <ApplicationMenuName title={<div style={{ float: 'right' }}>

                <Button text="Search" variant="emphasis" icon={<IconSearch />} onClick={() => {
                    this.setState({ isQueryPage: true, isInvokePage: false, isLoginPage: false, isRegisterPage: false })
                }} style={{ margin: '1px', float: 'right', height: '45px' }} />


                <Button text="Create New" variant="emphasis" onClick={() => {
                    this.setState({ isQueryPage: false, isInvokePage: true, isLoginPage: false, isRegisterPage: false })
                }} style={{ margin: '1px', float: 'right', height: '45px' }} />

            </div>} accessory={<Image src={img} height="80px" width="80px" isFluid />} />
        </div>
        const loginPage =
            <div>
                {Header}
                <div style={{ margin: 'auto', height: '500px', width: '400px', textAlign: 'left', position: 'relative' }}>
                    <ul>  </ul>

                    <Card>

                        <Card.Body>
                            <h1>LOGIN</h1>
                            <ul>
                                <Input type="text" placeholder="AssociateID" value={this.state.associateID} onChange={(e) => { this.setState({associateID: e.target.value})}} required style={{ height: '35px', margin: '5px' }} />
                            </ul>
                            <ul>
                                <Input type="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.setState({password: e.target.value})}} required style={{ height: '35px', margin: '5px' }} />
                            </ul>
                            <div style={{ margin: 'auto', textAlign: 'center' }}>
                                <Button onClick={ this.onLoginClick}text="Login" icon={<IconPadlock />} variant="action" style={{ margin: 'auto' }} />
                                <Button onClick={() => {
                                    this.setState({ isQueryPage: false, isInvokePage: false, isLoginPage: false, isRegisterPage: true })
                                }}  text="Register" icon={<IconEdit />} variant="emphasis" style={{ margin: '6px' }} />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        const registerPage = <div>
            {Header}
            <div style={{ margin: '50px' }}>
                <Card>
                    <Card.Body>
                        <h1>REGISTER USER</h1>
                        <ul>
                            <Input type="text" placeholder="AssociateID" value={this.state.regAssociateID} onChange={(e) => { this.setState({ regAssociateID: e.target.value }) }} required style={{ height: '35px', margin: '5px' }} />
                        </ul>
                        <ul>
                            <Input type="password" placeholder="Password" value={this.state.regPassword} onChange={(e) => { this.setState({ regPassword: e.target.value }) }} required style={{ height: '35px', margin: '5px' }} />
                        </ul>
                        <ul>
                            <Input type="password" placeholder="Re-Enter Password" value={this.state.regRePassword} onChange={(e) => {

                                this.setState({ regRePassword: e.target.value })

                            }} isInvalid={this.state.regRePasswordVerify} error="Passowrds did not Match" style={{ height: '35px', margin: '5px' }} />
                        </ul>
                        <ul>
                            <Input type="text" placeholder="Department" value={this.state.regDepartment} onChange={(e) => { this.setState({ regDepartment: e.target.value }) }} style={{ height: '35px', margin: '5px' }} />
                        </ul>
                        <ul>
                            <Input type="text" placeholder="Context" value={this.state.regContext} onChange={(e) => { this.setState({ regContext: e.target.value }) }} required style={{ height: '35px', margin: '5px' }} />
                        </ul>
                        <div style={{ margin: 'auto', textAlign: 'center' }}>
                            <Button onClick={() => {
                                const { regAssociateID, regContext, regDepartment, regPassword } = this.state;
                                if (regAssociateID.length > 0 && regContext.length > 0 && regDepartment.length > 0 && regPassword.length > 0) {
                                    if (this.state.regPassword === this.state.regRePassword) {
                                        this.setState({ isQueryPage: false, isInvokePage: true, isLoginPage: false, isRegisterPage: false })
                                    } else {
                                        alert("Passwords did not match")
                                    }
                                } else {
                                    alert("Please fill in all the feilds")
                                }

                            }} text="Register" icon={<IconEdit />} variant="emphasis" style={{ margin: '6px' }} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>

        const navPage = <div>
            {Header}
            {this.state.contextResponseKeys}
            {JSON.stringify(this.state.contextResponseKeysSelect)}
            <Button onClick={() => {
                                const { contextResponseKeys } = this.state;
                                const result = new Array(contextResponseKeys.length);
                                for (var i= 0; i <result.length; i++){
                                    result[i]= {
                                        value: contextResponseKeys[i],
                                        label: contextResponseKeys[i]
                                    }
                                    this.setState({testing: result})
                                }
                            }} text="Register" icon={<IconEdit />} variant="emphasis" style={{ margin: '6px' }} />
                            {JSON.stringify(this.state.testing)}
                        


        </div>

        const mainpage1 = <div>

            <ul>
                <Input type="text" placeholder="URL" value={this.state.url} onChange={(e) => { this.setState({ url: e.target.value }) }} required style={{ height: '35px', width: '400px', margin: '5px' }} />
                <Button color="success" size="lg" onClick={() => { this.fetchURL() }} text="Get" variant="action" style={{ margin: '5px' }} />
            </ul>

        </div>
        const mainpage2 = <div>
            <ul>
                <Textarea size="full" type="json" placeholder="Data in JSON format" value={(this.state.inputData)} onChange={(e) => { this.setState({ inputData: e.target.value }) }} style={{ height: '200px', width: '400px', margin: '5px' }} />
                <Button color="success" size="lg" onClick={() => {
                    try {
                        JSON.parse(this.state.inputData)
                    } catch (e) {
                        return alert("Invlaid JSON")
                    }
                    this.setState({ jsonData: JSON.parse(this.state.inputData) })
                }} text="Get" variant="action" style={{ margin: '5px' }} />
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
                            const { selectedKeysForInvoke } = this.state;
                            if (e.currentTarget.checked) {
                                selectedKeysForInvoke.push(jsonArg1);
                            } else if (!e.currentTarget.checked) {
                                selectedKeysForInvoke.splice(selectedKeysForInvoke.values(jsonArg1), 1);
                            }
                            this.setState({ selectedKeysForInvoke });
                        }} />
                    </div>
                </React.Fragment>
            </div>
        )
        const { regDepartment, regAssociateID, regPassword, regContext, selectedKeysForInvoke } = this.state;
        var j = ['"' + regDepartment + '"', '"' + regAssociateID + '"', '"' + regPassword + '"', '"' + regContext + '"', '"' + selectedKeysForInvoke + '"'];
        var x = JSON.stringify(j)
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
                    <div style={{ margin: 'auto', justifyContent: 'center' }}>
                        {checkBoxSelection}
                        <ul>
                            <Input type="text" placeholder="Context" value={this.state.regContext} onChange={(e) => { this.setState({ regContext: e.target.value }) }} required style={{ height: '35px', width: '400px', margin: '5px' }} />
                        </ul>
                        {x}
                        <Button color="success" size="lg" onClick={() => { this.instantiate() }} text="submit" variant="action" />
                    </div>
                </DynamicGrid.Region>
            </DynamicGrid>
        </div>

        const radio = Object.entries(this.state.contextResponseKeys).map(key =>
            <div style={{ margin: 'auto', position: 'relative', paddingLeft: '20px' }}>
                <React.Fragment key={key}>
                    <div style={{ width: '500px', margin: 'auto', fontSize: '20px', float: "right" }}>
                        <Radio id={key} labelText={key[1]} isInline />
                        <Select
                            value={this.state.selectedkey}
                            onChange={(selectedkey) => { this.setState({ selectedkey }) }}
                            options={this.state.contextResponseKeys} />
                    </div>
                </React.Fragment>
            </div>)

        //Select key for the context to search
        const queryPageSelectkey = <div style={{ height: '35px', width: '400px', margin: '5px' }}>
            <Select
                value={this.state.selectedkey}
                onChange={(selectedkey) => { this.setState({ selectedkey }) }}
                options={this.state.contextResponseKeysSelect} />
            <Input type="text" placeholder="Value" value={this.state.keyValue} onChange={(e) => {
                if (this.state.hash.length === 0) {
                    this.setState({ keyValue: e.target.value })
                } else {
                    this.setState({ hash: '', keyValue: e.target.value })
                }
            }
            } required style={{ height: '35px', width: '400px', margin: '5px' }} />
            <ul>

                <Button color="success" size="lg" onClick={() => { this.fetchBlockchainCustom() }} text="Search" variant="action" style={{ margin: 'auto', float: 'right', position: 'relative' }} />

            </ul>



        </div>

        const customSearch = Object.entries(this.state.contextResponseKeys).map(key =>
            <div style={{ margin: 'auto', position: 'relative', paddingLeft: '20px' }}>
                <React.Fragment key={key}>
                    <div style={{ width: '500px', margin: 'auto', fontSize: '20px', float: "right" }}>
                        {key[1]} :  <Input type="text" placeholder={key[1]} onChange={(e) => {

                        }} required style={{ height: '35px', width: '400px', margin: '5px' }} />

                    </div>
                </React.Fragment>
            </div>)


        const queryPageleft = <div>
            <Input type="text" placeholder="Hash" value={this.state.hash} onChange={(e) => { this.setState({ hash: e.target.value }) }} required style={{ height: '35px', width: '400px', margin: '5px' }} />
        </div>
        /**
         * View the querid Data
         */
        const viewQueriedData = Object.entries(this.state.queryResponce).map(key => <div>
            <Table isStriped={false}>
                <Table.Header>
                    <Table.HeaderCell content="Key" key="NAME" minWidth="small" />
                    <Table.HeaderCell content="Value" key="ADDRESS" minWidth="medium" />
                </Table.Header>
                <Table.SingleSelectableRows /**Update Function Comes here */>
                    <Table.Row key="PERSON_0">
                        <Table.Cell content={key[0]} key="NAME" />
                        <Table.Cell content={JSON.stringify(key[1])} key="ADDRESS" />
                      </Table.Row>
                </Table.SingleSelectableRows>
            </Table>
        </div>)

        const queryPage = <div >
            <DynamicGrid defaultTemplate={template}>
                <DynamicGrid.Region defaultPosition={region3}>
                    {loggedInHeader}
                    <ul>
                        <div style={{ height: '35px', width: '400px', margin: 'auto', }}>
                            <Select
                                value={this.state.selectedContext}
                                onChange={(selectedContext) => { this.setState({ selectedContext }) }}
                                options={this.state.contextNameRecived} />
                        </div>
                    </ul>
                </DynamicGrid.Region>
                <DynamicGrid.Region defaultPosition={region1}>
                    {queryPageleft}
                    <ul>
                        <Button color="success" size="lg" onClick={() => { this.fetchBlockchainHash() }} text="Search" variant="action" style={{ margin: 'auto', float: 'right', position: 'relative' }} />

                    </ul>
                </DynamicGrid.Region>
                <DynamicGrid.Region defaultPosition={region2}>
                    {queryPageSelectkey}


                </DynamicGrid.Region>
                <DynamicGrid.Region defaultPosition={region4}>

                    {viewQueriedData}

                </DynamicGrid.Region>
            </DynamicGrid>
        </div>
        let result;
        const { isRegisterPage, isLoginPage, isQueryPage, isInvokePage } = this.state;
        if (isRegisterPage) {
            result = registerPage
        } else if (isLoginPage) {
            result = loginPage
        } else if (isQueryPage) {
            result = queryPage
        } else if (isInvokePage) {
            result = invokePage
        }
        return (
            <div className="Animation-enter.Animation-enter-active">
                {result}
                
            </div>

        );
    }

}


export default Main;