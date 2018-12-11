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
import { relative } from 'path';

const template = {
    'grid-template-columns': '1fr 1fr 1fr ',
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
    'grid-column-end': 4,
    'grid-row-start': 3,
}
const contextAndButtonRegion = {
    'grid-column-start': 1,
    'grid-column-end': 5,
    'grid-row-start': 4,
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "", auth1: '', auth2: '', chaincodeName: 'mycc', channelName: 'mychannel',
            url: '', urlResponce: '', context: '', queryResponce: { "Record": "" }, associateID: "", password: "",
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
        /*       this.parsingJSON = this.parsingJSON.bind(this); */
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
        const { associateID } = this.state;
        let config = {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + netConfig.authToken,
                'content-Type': 'application/json'

            },
        }
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/chaincodes/' + netConfig.chaincodeName + '?peer=' + netConfig.peerName + '&fcn=queryCustom&args=%5B%22%7B%5C%22selector%5C%22:%7B%5C%22associateID%5C%22:%5C%22' + associateID + '%5C%22%7D%7D%22%5D', config)
            .then(response => response.json())
            .then(response => {
                if (response.Record.password === this.state.password) {
                    const contextResponseKeys = response.Record.keys;
                    const contextName = response.Record.contextName;
                    const result = new Array(contextResponseKeys.length);
                    for (var i = 0; i < result.length; i++) {
                        result[i] = {
                            value: contextResponseKeys[i],
                            label: contextResponseKeys[i]
                        }
                        var contextNamesObject = new Object()
                        contextNamesObject.value = contextName;
                        contextNamesObject.label = contextName;
                        this.setState({ selectedContext: contextNamesObject, contextResponseKeysSelect: result, isInvokePage: false, isLoginPage: false, isQueryPage: true, isRegisterPage: false })
                    }



                } else {
                    return alert("Invalid Password")
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
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/chaincodes/' + netConfig.chaincodeName + '?peer=' + netConfig.peerName + '&fcn=queryCustom&args=%5B%22%7B%5C%22selector%5C%22:%7B%5C%22' + this.state.selectedkey.value + '%5C%22:%5C%22' + this.state.keyValue + '%5C%22%7D%7D%22%5D', config)
            .then(response => response.json())
            .then((response) => this.setState({ 'queryResponce': response }));
    }

    registerUser1() {
        let config = {
            method: 'POST',
            headers: {
                'content-Type': 'application/x-www-form-urlencoded'

            },
            body: 'username=Cerner&orgName=Org1'
        }


        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/users', config)
            .then(response => response.json())
            .then((response) => {
                if (response.success === true) {
                    this.setState({ auth1: response.token })
                }
                this.registerUser2();
            }
            );
    }
    registerUser2() {
        let config = {
            method: 'POST',
            headers: {
                'content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username=Cerner&orgName=Org2'
        }
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/users', config)
            .then(response => response.json())
            .then((response) => {
                if (response.success === true) {
                    this.setState({ auth2: response.token })


                }
                this.craeteChannel();

            }
            );
    }
    craeteChannel() {
        //crearte channel
        let config = {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + this.state.auth1,
                'content-Type': 'application/json'
            },
            body: '{ "channelName": "' + netConfig.channelName + '", "channelConfigPath":"../artifacts/channel/mychannel.tx" }'
        }


        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels', config)
            .then(response => response.json())
            .then((response) => {
                if (response.success === true) {
                    //join channel
                    this.joinChannel();

                }
            });
    }
    joinChannel() {
        let config = {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + this.state.auth1,
                'content-Type': 'application/json'
            },
            body: '{ "peers": ["peer0.org1.example.com","peer1.org1.example.com"] }'
        }


        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/peers', config)
            .then(response => response.json())
            .then((response) => {
                if (response.success === true) {
                    //Join Channel org 2
                    this.joinChannel2();
                } else {
                    this.joinChannel();
                }
            });
    }
    joinChannel2() {
        //Join Channel org 2
        let config = {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + this.state.auth2,
                'content-Type': 'application/json'
            },
            body: '{ "peers": ["peer0.org2.example.com","peer1.org2.example.com"] }'
        }
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/peers', config)
            .then(response => response.json())
            .then((response) => {

                if (response.success === true) {
                    //Install Chaincode
                    this.installChaincode();

                } else {
                    this.joinChannel2();
                }
            });
    }
    installChaincode() {
        let config = {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + this.state.auth2,
                'content-Type': 'application/json'

            },
            body: '{ "peers": ["peer0.org2.example.com","peer1.org2.example.com"], "chaincodeName":"' + netConfig.chaincodeName + '", "chaincodePath":"' + netConfig.chaincodePath + '","chaincodeType": "golang","chaincodeVersion":"v1" }'
        }
        //install chaincode org1
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/chaincodes', config)
            .then(response => response.json())
            .then((response) => {
                if (response.success === true) {
                    let config = {
                        method: 'POST',
                        headers: {
                            'authorization': 'Bearer ' + this.state.auth1,
                            'content-Type': 'application/json'

                        },
                        body: '{ "peers": ["peer0.org1.example.com","peer1.org1.example.com"], "chaincodeName":"' + netConfig.chaincodeName + '", "chaincodePath":"' + netConfig.chaincodePath + '","chaincodeType": "golang","chaincodeVersion":"v1" }'
                    }

                    fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/chaincodes', config)
                        .then(response => response.json())
                        .then((response) => {
                            if (response.success === true) {
                                //Instantiate

                                this.instantiate();
                            }
                        });
                }
            });
    }
    instantiate() {
        let config = {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + this.state.auth1,
                'content-Type': 'application/json'
            },
            body: '{"chaincodeName": "' + netConfig.chaincodeName + '", "chaincodeVersion":"v1", "chaincodeType": "golang", "args":[""] }'
        }
        fetch('http://' + netConfig.hostIP + ':' + netConfig.port + '' + '/channels/' + netConfig.channelName + '/chaincodes', config)
            .then(response => response.json())
            .then((response) => {
                if (response.success === true) {
                    this.inItLedger();
                } else {
                    this.instantiate();
                }
            });
    }
    inItLedger() {
        //create channel using context and install and instantiate chaincode
        //Refer craetechannel.js for now
        const { regDepartment, regAssociateID, regPassword, regContext, selectedKeysForInvoke } = this.state;
        var initObject = new Object();
        initObject.departmentName = regDepartment;
        initObject.associateID = regAssociateID;
        initObject.password = regPassword;
        initObject.contextName = regContext;
        initObject.keys = selectedKeysForInvoke;
        var x = JSON.stringify(JSON.stringify(initObject))
        let config = {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + netConfig.authToken,
                'content-Type': 'application/json'
            },
            body: '{ "peers": ["peer0.org1.example.com","peer0.org2.example.com"], "fcn":"initLedger", "args":[' + x + ']}'
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
        parsingJSON(data) {
            const checkBoxSelection = Object.entries(data).map(key => { const y =
                <div>
                    <React.Fragment key={key}>
                        <div >
                            <Checkbox id="Data" name="filter" disabled={this.state.view} labelText={key[0]} onChange={(e) => {
                                // eslint-disable-next-line
                                var jsonArg1 = new Object();
    
                                jsonArg1 = key[0];
                                const { selectedKeysForInvoke } = this.state;
                                if (e.currentTarget.checked) {
                                /*     if(typeof key[1]==='string' ){
                                        selectedKeysForInvoke.push(jsonArg1);
                                    }else {
                                        const nested = this.parsingJSON(key[1]);
                                        return nested;
                                    } */
                                   selectedKeysForInvoke.push(jsonArg1); 
                                } else if (!e.currentTarget.checked) {
                                    selectedKeysForInvoke.splice(selectedKeysForInvoke.values(jsonArg1), 1);
                                }
                                this.setState({ selectedKeysForInvoke });
                            }} />
                        </div>
                    </React.Fragment>
                </div>;
                return y;
            }, []);
            return checkBoxSelection;
        } 

    render() {
        const Header = <div style={{ border: '1px solid lightGray', backgroundColor: '#2481ca', width: '100%', height: '50px', position: 'relative' }} >
            <ApplicationMenuName title="Blockchain-As-A-Service" accessory={<Image src={img} height="80px" width="80px" isFluid />} />
        </div>
        const loggedInHeader = <div style={{ border: '1px solid lightGray', backgroundColor: '#2481ca', width: '100%', height: '50px', position: 'relative' }} >

            <Image src={img} height="100px" width="100px" isFluid style={{ margin: '12px', float: 'left' }} />

            <Button text="Search" variant="emphasis" icon={<IconSearch />} onClick={() => {
                this.setState({ isQueryPage: true, isInvokePage: false, isLoginPage: false, isRegisterPage: false })
            }} style={{ margin: '1px', float: 'left', height: '45px' }} />


            <Button text="Create New" variant="emphasis" onClick={() => {
                this.setState({ isQueryPage: false, isInvokePage: true, isLoginPage: false, isRegisterPage: false })
            }} style={{ margin: '1px', float: 'left', height: '45px', position: 'relative' }} />

            <Button text="Log-Out" variant="emphasis" onClick={() => {
                this.setState({ isQueryPage: false, isInvokePage: false, isLoginPage: true, isRegisterPage: false })
            }} style={{ margin: '1px', float: 'right', height: '45px', position: 'relative' }} />
        </div>
        const loginPage =
            <div>
                {Header}
                <div style={{ margin: 'auto', height: '500px', width: '500px', textAlign: 'center', position: 'relative' }}>
                    <ul>  </ul>

                    <Card style={{ margin: '50px' }}>

                        <Card.Body>
                            <h1>LOGIN</h1>

                            <Input type="text" placeholder="AssociateID" value={this.state.associateID} onChange={(e) => { this.setState({ associateID: e.target.value }) }} required style={{ height: '35px', margin: '5px', width: '350px' }} />

                            <Input type="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} required style={{ height: '35px', margin: '5px', width: '350px' }} />

                            <div style={{ margin: 'auto', textAlign: 'center' }}>
                                <Button onClick={this.onLoginClick} text="Login" icon={<IconPadlock />} variant="action" style={{ margin: 'auto' }} />
                                <Button onClick={() => {
                                    this.setState({ isQueryPage: false, isInvokePage: false, isLoginPage: false, isRegisterPage: true })
                                }} text="Register" icon={<IconEdit />} variant="emphasis" style={{ margin: '6px' }} />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        const registerPage = <div>
            {Header}
            <div style={{ margin: 'auto', width: '500px', height: '700px', textAlign: 'center' }}>
                <Card style={{ margin: '50px' }}>
                    <Card.Body>
                        <h1>REGISTER USER</h1>

                        <Input type="text" placeholder="AssociateID" value={this.state.regAssociateID} onChange={(e) => { this.setState({ regAssociateID: e.target.value }) }} required style={{ height: '35px', margin: '5px', width: '350px' }} />

                        <Input type="password" placeholder="Password" value={this.state.regPassword} onChange={(e) => { this.setState({ regPassword: e.target.value }) }} required style={{ height: '35px', margin: '5px', width: '350px' }} />


                        <Input type="password" placeholder="Re-Enter Password" value={this.state.regRePassword} onChange={(e) => {

                            this.setState({ regRePassword: e.target.value })

                        }} isInvalid={this.state.regRePasswordVerify} error="Passowrds did not Match" style={{ height: '35px', margin: '5px', width: '350px' }} />

                        <Input type="text" placeholder="Department" value={this.state.regDepartment} onChange={(e) => { this.setState({ regDepartment: e.target.value }) }} style={{ height: '35px', margin: '5px', width: '350px' }} />

                        <Input type="text" placeholder="Context" value={this.state.regContext} onChange={(e) => { this.setState({ regContext: e.target.value }) }} required style={{ height: '35px', margin: '5px', width: '350px' }} />

                        <div style={{ margin: 'auto', textAlign: 'center' }}>
                            <Button onClick={() => {
                                this.setState({ isLoginPage: true, isRegisterPage: false })
                            }} text="Back to Login" variant="emphasis" />
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
                for (var i = 0; i < result.length; i++) {
                    result[i] = {
                        value: contextResponseKeys[i],
                        label: contextResponseKeys[i]
                    }
                    this.setState({ testing: result })
                }
            }} text="Register" icon={<IconEdit />} variant="emphasis" style={{ margin: '6px' }} />
            {JSON.stringify(this.state.testing)}
        </div>

        const mainpage1 = <div>
            <ul>
                <Input type="text" placeholder="URL" value={this.state.url} onChange={(e) => { this.setState({ url: e.target.value }) }} required style={{ height: '35px', width: '400px', margin: '5px' }} />
                <Button color="success" size="lg" onClick={() => { this.fetchURL() }} text="Get" variant="action" style={{ margin: '5px', float: 'right' }} />
            </ul>

        </div>

        const mainpage2 = <div>
            <ul>
                <Textarea size="full" type="json" placeholder="Data in JSON format" value={(this.state.inputData)} onChange={(e) => { this.setState({ inputData: e.target.value }) }} style={{ height: '35px', width: '400px', margin: '5px' }} />
                <Button color="success" size="lg" onClick={() => {
                    try {
                        JSON.parse(this.state.inputData)
                    } catch (e) {
                        return alert("Invlaid JSON")
                    }
                    this.setState({ jsonData: JSON.parse(this.state.inputData) })
                }} text="Get" variant="action" style={{ margin: '5px', float: 'right' }} />
            </ul>
        </div>

        // JSON key selection checkbox
        const checkBoxSelection2 = Object.entries(this.state.jsonData).map(key =>
            <div>
                <React.Fragment key={key}>
                    <div >
                        <Checkbox id="Data" name="filter" disabled={this.state.view} labelText={key[0]} onChange={(e) => {
                            // eslint-disable-next-line
                            var jsonArg1 = new Object();

                            jsonArg1 = key[0];
                            const { selectedKeysForInvoke } = this.state;
                            if (e.currentTarget.checked) {
                                if (typeof key[1] === 'string' || key[1] instanceof String) {
                                    selectedKeysForInvoke.push(jsonArg1);
                                }else{
                                    const checkBoxSelections = Object.entries(this.state.jsonData).map(key =>
                                        <div>
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
                                    return checkBoxSelections;
                                    //return this.parsingJSON(key[1]);
                                }
                                
                            } else if (!e.currentTarget.checked) {

                                selectedKeysForInvoke.splice(selectedKeysForInvoke.values(jsonArg1), 1);
                            }
                            this.setState({ selectedKeysForInvoke });
                        }} />
                    </div>
                </React.Fragment>
            </div>
        )
        const checkBoxSelection = Object.entries(this.state.jsonData).map(key =>
            <div>
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
                        {/* this.parsingJSON(this.state.jsonData)}
                        {JSON.stringify(this.state.selectedKeysForInvoke) */}
                        


                    </div>
                </DynamicGrid.Region>
                <DynamicGrid.Region defaultPosition={contextAndButtonRegion}>
                    <div >

                        <div style={{ margin: 'auto', textAlign: 'center' }}>
                            <ul>
                                CONTEXT: <Input type="text" placeholder="Context" value={this.state.regContext} onChange={(e) => { this.setState({ regContext: e.target.value }) }} required style={{ height: '35px', width: '400px', margin: '5px' }} />

                            </ul>
                        </div>

                        <div style={{ margin: 'auto', textAlign: 'center' }}>
                            <Button color="success" size="lg" onClick={() => { this.registerUser1() }} text="Create" variant="action" style={{ margin: '10px' }} />
                            <Button color="success" size="lg" onClick={() => { this.inItLedger() }} text="submit" variant="action" style={{ margin: '10px' }} />
                        </div>
                    </div>
                </DynamicGrid.Region>
            </DynamicGrid>
        </div>


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
        const { queryResponce } = this.state
        const viewQueriedData = Object.entries(queryResponce.Record).map(key => <div>
            <Table isStriped={false}>


                <Table.SingleSelectableRows /**Update Function Comes here */>
                    <Table.Row key="Data">
                        <Table.Cell content={key[0]} key="dataKey" />
                        <Table.Cell content={JSON.stringify(key[1])} key="dataValue" />
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
                                options={this.state.contextNameReciveds} />
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
                <DynamicGrid.Region defaultPosition={contextAndButtonRegion}>
                    <div style={{ margin: 'auto', height: '500px', width: '500px' }}>
                        {viewQueriedData}
                    </div>

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