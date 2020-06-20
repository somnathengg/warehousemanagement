import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { userColumn } from '../gridcolumn/usercolumn';
import { userDataFields } from '../gridcolumn/userdatafield';
import JqxGrid from 'jqwidgets-framework/jqwidgets-react-tsx/jqxgrid';
import { getAxios } from '../ApiService';
import { updateUserConfig, addUserConfig, fetchAllUser } from '../common/constant';
import { successUpdateUser, successAddUser } from '../common/constant';
import { errorUpdateUser, errorAddUser, errorFetchUser,fetchFirstName,fetchLastName } from '../common/constant';
import { jqxGridProps } from '../common/constant';
import {nestedGridDataFunction} from '../gridcolumn/nested-grid';
import ControlField from './controlField';
import CustomRow from '../dynamic-add/customrow';

function JqxGridComponent() {

    //All state
    const [apiUserCall, setAddUserApiCall] = React.useState(false);
    const [body, setBody] = React.useState({ ...formData });
    const [apiUpdateUserCall, setUpdateUserApiCall] = React.useState(false);
    const [dataEvent, setDataEvent] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState({ edit: false, rownumber: null });
    const [source, setSource] = React.useState([]);
    const [showForm, setshowForm] = React.useState(false);
    const [isView, setIsView] = React.useState({ edit: false, rownumber: null });
    const [extraParam, setExtraParam] = React.useState({searchToken:'',fName:'',lName:''});
    const [showMsg, setShowMsg] = React.useState('');
    const [addressArray, setAddressArray] = React.useState([0]);
    const [ddlFirstName, setDdlFirstName] = React.useState([]);
    const [ddlLastName, setDdlLastName] = React.useState([]);
    const [sourceInit, setSourceInit] = React.useState(false);
    const [controlFieldView, setControlFieldView] = React.useState(false);
    

    const [controlFieldValue, setControlFieldValue] = React.useState({
        id: "", firstname: "", lastname: "", mobile: "", email: "", username: "",addressList:[]
    });

    const gridRef = React.createRef();
    const fnameRef = React.createRef();
    const lnameRef = React.createRef();
    const searchTokenRef = React.createRef();
    const formDataRef=React.createRef();

    function formObjectReset(){
      
    }


    function setViewData(source,rownumber)
    {
            if(source.loadedData){
            setControlFieldView(true);
            setControlFieldValue((previousValue)=>{
                return ({...previousValue,...{
                    id:source.loadedData.response.rows[rownumber].id,
                    firstname:source.loadedData.response.rows[rownumber].firstname,
                    lastname:source.loadedData.response.rows[rownumber].lastname,
                    email:source.loadedData.response.rows[rownumber].email,
                    mobile:source.loadedData.response.rows[rownumber].mobile,
                    username:source.loadedData.response.rows[rownumber].username,
                    addressList:source.loadedData.response.rows[rownumber].addressList
                }});
            })
            setIsView({edit: false, rownumber: null});
            }
    }

    function setEditData(source,rownumber)
    {
            if(source.loadedData){
            setControlFieldView(false);
            setControlFieldValue((previousValue)=>{
                return ({...previousValue,...{
                    id:source.loadedData.response.rows[rownumber].id,
                    firstname:source.loadedData.response.rows[rownumber].firstname,
                    lastname:source.loadedData.response.rows[rownumber].lastname,
                    email:source.loadedData.response.rows[rownumber].email,
                    mobile:source.loadedData.response.rows[rownumber].mobile,
                    username:source.loadedData.response.rows[rownumber].username,
                    addressList:source.loadedData.response.rows[rownumber].addressList
                }});
            })

            setAddressArray(()=>{
               return source.loadedData.response.rows[rownumber].addressList.map((e,index)=>{
                    return index;
                });
            })

            setIsEdit({ edit: false, rownumber: null });
            }
    }

    const formData = { id: "", firstname: "", lastname: "", mobile: "", email: "", username: "" }
    const updateUser = (rowNumber) => {
        showFormHideTable();
        setIsEdit({ edit: true, rownumber: rowNumber });
        setDataEvent(true);
    }
    

    const showUser =(rowNumber)=>{
        showFormHideTable();
        setIsView({ edit: true, rownumber: rowNumber });
        setDataEvent(true);
    }

    const [column, setColumn] = React.useState(userColumn(updateUser,showUser));
    //first name drop down
    React.useEffect(() => {
        if(sourceInit){
        getAxios(fetchFirstName).then(res => {
        setDdlFirstName(res.data.response)
        }).catch(errorDesc => {
        })        
    }
    }, [sourceInit])

    //last name drop down
    React.useEffect(() => {
        if(sourceInit){
        getAxios(fetchLastName).then(res => {
        setDdlLastName(res.data.response)
        console.log('last name response ::::',ddlFirstName);
        }).catch(errorDesc => {
        })        
    }
    }, [sourceInit])

    //React Call fetch all user
    React.useEffect(() => {
        getAxios(fetchAllUser).then(res => {
            setSource(() => {
                return userDataFields(res.data.response, 
                    gridRef.current,
                    fnameRef.current,
                    lnameRef.current,
                    searchTokenRef.current
                    );
            }
            )
            setSourceInit(true);
        }).catch(errorDesc => {
            errorFetchUser(errorDesc)
        })        
    }, [])

    //Add user
    React.useEffect(() => {
        if (apiUserCall) {
            getAxios(addUserConfig(body)).then(res =>
            successAddUser(res, setSource, body,setShowMsg)).catch(errorDesc => { errorAddUser(errorDesc)})
            setAddUserApiCall(false);
            }
    
    }, [apiUserCall])

    
    //Update User
    React.useEffect(() => {
        if (apiUpdateUserCall) {
            getAxios(updateUserConfig(body)).then(res =>
            successUpdateUser(res, setSource, body,setShowMsg)).catch(errorDesc => { errorUpdateUser(errorDesc) })
            setUpdateUserApiCall(false);
            
        }
    }, [apiUpdateUserCall])

    //Show Data for Update
    React.useEffect(() => {
        if (isEdit.edit) {
            setBody(source.loadedData.response.rows[isEdit.rownumber]);
            setEditData(source,isEdit.rownumber);
        }
    }, [isEdit])

    //View Data
    React.useEffect(() => {
        if (isView.edit) {
            setBody(source.loadedData.response.rows[isView.rownumber]);
            setViewData(source,isView.rownumber);
        }
    }, [isView])
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formValue = {};
        const userFormData=new FormData(form);
        let addressField=['city','state','address','pincode'];
        let addressData={};
        for (let index = 0; index < form.elements.length; index++) {
            const element = form.elements[index];
            if(element.type!=='file')
            {
            formValue[element.name] = element.value;
            let elementName=element.name.split('-')[0];
            let elementIndex=element.name.split('-')[1];
            if(elementIndex)
            {
                if(!addressData[elementIndex])
                {
                    addressData[elementIndex]={};
                }
                addressData[elementIndex][elementName]=element.value;
            }
            }
        }
        formValue['addressList']=Object.values(addressData);
        userFormData.append('bean-data',JSON.stringify(formValue));
        setBody(userFormData);
        if (!dataEvent) {
            setAddUserApiCall(true);
        }
        else {
            setUpdateUserApiCall(true);
            setDataEvent(false);
        }
    };

    const renderGridRows = (params) => {
        const data = [];
        if(source.loadedData)
        {
            source.loadedData.response.rows.forEach((element, i) => {
                data[i] = element;
            });
        }
        return data;
    }

    function showFormHideTable ()
    {
        setshowForm(true);
    }

    function pdfBtnOnClick()
    {
        if(gridRef.current)
        {
            gridRef.current.exportdata('pdf', 'user_data');
        }       
    }

    function excelBtnOnClick()
    {
        if(gridRef.current)
        {
            gridRef.current.exportdata('xls', 'user_data');
        }       
    }

    const renderstatusbar =(statusbar) => {
        const style= { float: 'left', marginLeft: '5px' };
        const buttonsContainer = (
            <div style={{ overflow: 'hidden', position: 'relative', margin: '5px' }}>
                <Button className="btn btn-sm btnexport" onClick={excelBtnOnClick}>
                            <i className="fa fa-file-excel-o" ></i> Export To Excel
                            </Button>
                            <Button className="btn btn-sm btnexport" onClick={pdfBtnOnClick}>
                            <i className="fa fa-download" ></i> Download PDF
                            </Button>
            </div>
        );
        statusbar[0].classList.add('export-data-class');
        ReactDOM.render(buttonsContainer, statusbar[0]);
      }
     
     const  rowdetailstemplate={
        rowdetails: '<div id="nestedGrid" style="margin: 10px;"></div>',
        rowdetailsheight: 220,
        rowdetailshidden: true
    }

    const addNewAddressRow=()=>
    {
            setAddressArray((previousValue)=>{
            let number=previousValue.length ? previousValue[previousValue.length-1]+1 : 0;
            let newValue=[...previousValue];
            newValue.push(number);
            return (newValue);
        });
    }
 
 const deleteAddressRow=(rowNumber)=>{
     setAddressArray((previousValue)=>{
        let number=previousValue.indexOf(rowNumber);
        let newValue=[...previousValue];
        newValue.splice(number,1);
        return (newValue);
    });
 }
 
    const nestedData=nestedGridDataFunction(source);
    return (
        <Container>
            <Row>
                <Col>
                <div className="box-container">
                    <div className="box-header">
                    
                    <div className={`page_bar_heading page_bar_top
                    textAlign  ${!showForm?'customHidden':''}` }  >
                    <button className="page_bar_back_btn" 
                            onClick={()=>{setshowForm(previousValue=>!previousValue)}}>
									<i className="page_bar_back_icon fa fa-angle-left">
                                </i>BACK
						</button>
						</div> 
                        <span className={`${showForm?'customHidden':''}` }>Add User</span>
                    </div>
                    <div className="box-content">
                    <div className={`custom-alert alert-success ${!showMsg ? 'alert-hidden' : ''}`}>{showMsg}</div>
                    <Col className={`textAlign ${showForm?'customHidden':''}`} >
                        <Form.Row sm={3} md={3} xs={3} lg={3}>     
                            <Form.Group  as={Col} sm={3}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control size="sm" as="select" 
                                    name="firstnamedropdown"
                                    ref={fnameRef}
                                     onChange={(e)=>{
                                        const dataV=e.currentTarget.value;
                                        setExtraParam((prevValue)=>{
                                        return ({...prevValue,...{fName:dataV}})
                                        });
                                    }}
                                    >
                                    <option value="">Choose...</option>
                                    {
                                        ddlFirstName.map(element=>{
                                        return  <option key={element.id} value={element.code}>{element.code}</option>;
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col} sm={3}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control size="sm" as="select" 
                                    name="lastnamedropdown"
                                    ref={lnameRef}
                                    onChange={(e)=>{
                                        const dataV=e.currentTarget.value;
                                        setExtraParam((prevValue)=>{
                                        return {...prevValue,...{lName:dataV}}
                                        });
                                    }}
                                    >
                                    <option value="">Choose...</option>
                                    {
                                        ddlLastName.map(element=>{
                                        return  <option key={element.id} value={element.code}>{element.code}</option>;
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={3}>
                            <Form.Label className="d-block">&nbsp;</Form.Label>
                            <Form.Control size="sm" name="searchToken"
                                ref={searchTokenRef}
                                onChange={(e)=>{
                                    const dataV=e.currentTarget.value;
                                    setExtraParam((prevValue)=>{
                                    return {...prevValue,...{searchToken:dataV}}
                                    });
                                }}
                                type="text">
                                </Form.Control>
                            </Form.Group>

                            <div className="row">
                            <Form.Group as={Col}>
                            <Form.Label className="d-block">&nbsp;</Form.Label>
                            <Button className="btn btn-sm grey-gallery">
                            <i className="fa fa-search" ></i>Search
                            </Button>

                            </Form.Group>
                            
                            <Form.Group as={Col} >
                            <Form.Label className="d-block">&nbsp;</Form.Label>
                            <Button className="btn btn-sm grey-gallery"
                             onClick={()=>{setshowForm(previousValue=>!previousValue)}}
                             >
                            <i className="fa fa-plus" ></i>Add New
                            </Button>
                            </Form.Group>
                            </div>
                        </Form.Row>
                    </Col>
                    
                    <div>
                    <Form ref={formDataRef} className={!showForm?'customHidden':''} onSubmit={handleSubmit}>
                    <div className="row justify-content-end">
                    <div className="btn-group btn-group-action-btn">
                    <Form.Group as={Col}>
                    <Button type="button" 
                     className="btn btn-sm grey-gallery float-right"
                     onClick={addNewAddressRow}>
                    <i className="fa fa-plus" > Address</i>
                    </Button>
                    </Form.Group>

                    <Form.Group>
                    <Button className="btn btn-sm grey-gallery float-right"
                    onClick={formObjectReset}>
                    <i className="fa fa-times" ></i> Clear
                    </Button>
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Button type="submit" className="btn btn-sm grey-gallery float-right">
                    <i className="fa fa-check-circle" ></i> Save
                    </Button>
                    </Form.Group>
                    </div>
                    </div>
                        <Form.Row className="form-row">
                        <ControlField controlColClass="textAlign"
                                            controlLabel="ID"
                                            controlName="id"
                                            controlType="text"
                                            controlPlaceholder="Enter ID"
                                            val={controlFieldValue.id}
                                            viewOnly={controlFieldView} >
                            </ControlField>
                             <ControlField controlColClass="textAlign"
                                            controlLabel="First Name"
                                            controlName="firstname"
                                            controlType="text"
                                            controlPlaceholder="Enter First Name"
                                            val={controlFieldValue.firstname} 
                                            viewOnly={controlFieldView}>
                            </ControlField>

                            <ControlField controlColClass="textAlign"
                                            controlLabel="Last Name"
                                            controlName="lastname"
                                            controlType="text"
                                            controlPlaceholder="Enter Last Name"
                                            val={controlFieldValue.lastname}
                                            viewOnly={controlFieldView} >
                            </ControlField>
                           
                        </Form.Row>
                        <Form.Row className="form-row">
                           
                             <ControlField controlColClass="textAlign"
                                            controlLabel="UserName"
                                            controlName="username"
                                            controlType="text"
                                            controlPlaceholder="Enter User Name"
                                            val={controlFieldValue.username}
                                            viewOnly={controlFieldView} >
                            </ControlField>

                            <ControlField controlColClass="textAlign"
                                            controlLabel="Email"
                                            controlName="email"
                                            controlType="text"
                                            controlPlaceholder="Enter Email Here"
                                            val={controlFieldValue.email}
                                            viewOnly={controlFieldView} >
                            </ControlField>

                            <ControlField controlColClass="textAlign"
                                            controlLabel="Mobile"
                                            controlName="mobile"
                                            controlType="text"
                                            controlPlaceholder="Enter Mobile"
                                            val={controlFieldValue.mobile}
                                            viewOnly={controlFieldView} >
                            </ControlField>
                        
                        </Form.Row>
                        <Form.Row className="form-row">
                        <Col className="textAlign" >
                                <Form.Label>Signature Image:</Form.Label>
                                <Form.Control size="sm" name="image-file"
                                    type="file"  />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        </Form.Row>
                                    { 
                                        addressArray.map((data,i)=>{
                                            return (
                                              <CustomRow addressData={controlFieldValue.addressList[i]}
                                              custViewOnly={controlFieldView}
                                               indexPosition={i} deleteFunction={deleteAddressRow}
                                                rowNumber={data} key={i}></CustomRow>
                                            )
                                        })
                                    
                                    }
                                
                    </Form>
                    </div>
                    </div>
                    </div>
                </Col>
            </Row>
            
            
            <Row className={showForm?'customHidden':''}>
                <Col>
                <div className="box-container">
                    <div className="box-header">Manager User</div>
                    <div className="box-content">
                    <JqxGrid
                        {...jqxGridProps}
                        ref={gridRef}
                        source={source}
                        columns={column}
                        rendergridrows={renderGridRows}
                        renderstatusbar={renderstatusbar}
                        rowdetails={true} 
                        initrowdetails={nestedData.initrowdetails}
                        rowdetailstemplate={rowdetailstemplate}
                        columngroups={[{ text: 'Action', name: 'action', align: 'center' }]}
                    />
                    </div>
                    </div>
                </Col>
            </Row>
            
        </Container>
    )
}
export default JqxGridComponent;