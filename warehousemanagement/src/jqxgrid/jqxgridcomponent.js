import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { userColumn } from '../gridcolumn/usercolumn';
import { userDataFields } from '../gridcolumn/userdatafield';
import JqxGrid from 'jqwidgets-framework/jqwidgets-react-tsx/jqxgrid';
import { getAxios } from '../ApiService';
import { updateUserConfig, addUserConfig, deleteUserConfig, fetchAllUser } from '../common/constant';
import { successUpdateUser, successAddUser, successDeleteUser } from '../common/constant';
import { errorUpdateUser, errorAddUser, errorDeleteUser, errorFetchUser } from '../common/constant';
import { jqxGridProps } from '../common/constant';

function JqxGridComponent() {

    const idRef = React.createRef();
    const firstnameRef = React.createRef();
    const lastnameRef = React.createRef();
    const mobileRef = React.createRef();
    const usernameRef = React.createRef();
    const emailRef = React.createRef();
    const gridRef = React.createRef();
    const fnameRef = React.createRef();
    const lnameRef = React.createRef();
    const searchTokenRef = React.createRef();

    
    function formObjectReset(){
        idRef.current.value="";
        firstnameRef.current.value="";
        lastnameRef.current.value="";
        mobileRef.current.value="";
        usernameRef.current.value="";
        emailRef.current.value="";
        gridRef.current.value="";
        fnameRef.current.value="";
        lnameRef.current.value="";
        searchTokenRef.current.value="";
    }


    function setViewData(source,rownumber)
    {
            idRef.current.value = source.loadedData.response.rows[rownumber].id;
            firstnameRef.current.value = source.loadedData.response.rows[rownumber].firstname;
            lastnameRef.current.value = source.loadedData.response.rows[rownumber].lastname;
            mobileRef.current.value = source.loadedData.response.rows[rownumber].mobile;
            usernameRef.current.value = source.loadedData.response.rows[rownumber].username;
            emailRef.current.value = source.loadedData.response.rows[rownumber].email;
            idRef.current.readOnly=true;
            firstnameRef.current.readOnly=true;
            lastnameRef.current.readOnly=true;
            mobileRef.current.readOnly=true;
            usernameRef.current.readOnly=true;
            emailRef.current.readOnly=true;
            setIsView({edit: false, rownumber: null});
    }

    function setEditData(source,rownumber)
    {
            idRef.current.value = source.loadedData.response.rows[rownumber].id;
            firstnameRef.current.value = source.loadedData.response.rows[rownumber].firstname;
            lastnameRef.current.value = source.loadedData.response.rows[rownumber].lastname;
            mobileRef.current.value = source.loadedData.response.rows[rownumber].mobile;
            usernameRef.current.value = source.loadedData.response.rows[rownumber].username;
            emailRef.current.value = source.loadedData.response.rows[rownumber].email;
            setIsEdit({ edit: false, rownumber: null });
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
    const [apiUserCall, setAddUserApiCall] = React.useState(false);
    const [body, setBody] = React.useState({ ...formData });
    const [apiUpdateUserCall, setUpdateUserApiCall] = React.useState(false);
    const [dataEvent, setDataEvent] = React.useState(false);
    const [column, setColumn] = React.useState(userColumn(updateUser,showUser));
    const [isEdit, setIsEdit] = React.useState({ edit: false, rownumber: null });
    const [source, setSource] = React.useState([]);
    const [showForm, setshowForm] = React.useState(false);
    const [isView, setIsView] = React.useState({ edit: false, rownumber: null });
    const [extraParam, setExtraParam] = React.useState({searchToken:'',fName:'',lName:''});


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
            })
        }).catch(errorDesc => {
            errorFetchUser(errorDesc)
        })
    }, [])

    //Add user
    React.useEffect(() => {
        if (apiUserCall) {
            getAxios(addUserConfig(body)).then(res =>
            successAddUser(res, setSource, body)).catch(errorDesc => { errorAddUser(errorDesc)})
            setAddUserApiCall(false);
            formObjectReset();
            }
    
    }, [apiUserCall])

    //Update User
    React.useEffect(() => {
        if (apiUpdateUserCall) {
            getAxios(updateUserConfig(body)).then(res =>
            successUpdateUser(res, setSource, body)).catch(errorDesc => { errorUpdateUser(errorDesc) })
            setUpdateUserApiCall(false);
            formObjectReset();
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
        for (let index = 0; index < form.elements.length; index++) {
            const element = form.elements[index];
            formValue[element.name] = element.value;
        }
        setBody(formValue);
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
            source.loadedData.response.rows.forEach((element, i) => {
                data[i] = element;
            });
        return data;
    }

    function showFormHideTable ()
    {
        setshowForm(true);
    }

    return (
        <Container>
            <Row>
                <Col>
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
                                    <option value="somnath">somnath</option>
                                    <option value="rahul">rahul</option>
                                    <option value="manoj">manoj</option>
                                    <option value="nahid">nahid</option>
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
                                    <option value="shirsat">shirsat</option>
                                    <option value="kedar"> kedar</option>
                                    <option value="khan">khan</option>
                                    <option value="yadav">yadav</option>
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
                            <i class="fa fa-search" ></i>Search
                            </Button>
                            </Form.Group>
                            
                            <Form.Group as={Col} >
                            <Form.Label className="d-block">&nbsp;</Form.Label>
                            <Button className="btn btn-sm grey-gallery"
                             onClick={()=>{setshowForm(previousValue=>!previousValue)}}
                             >
                            <i class="fa fa-plus" ></i>Add New
                            </Button>
                            </Form.Group>
                            </div>
                        </Form.Row>
                    </Col>
                    
                    <div>
                    <div className={`page_bar_heading page_bar_top
                    textAlign  ${!showForm?'customHidden':''}` }  >
                    <button className="page_bar_back_btn" 
                            onClick={()=>{setshowForm(previousValue=>!previousValue)}}>
									<i className="page_bar_back_icon fa fa-angle-left">
                                </i>BACK
								</button>
						</div> 
                    <Form className={!showForm?'customHidden':''} onSubmit={handleSubmit}>
                    <div className="row justify-content-end">
                    <div className="btn-group">
                    <Form.Group as={Col}>
                    <Form.Label className="d-block">&nbsp;</Form.Label>
                    <Button className="btn btn-sm grey-gallery float-right">
                    <i class="fa fa-times" ></i>Clear
                    </Button>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label  className="d-block">&nbsp;</Form.Label>
                    <Button type="submit" className="btn btn-sm grey-gallery float-right">
                    <i class="fa fa-check-circle" ></i>Save
                    </Button>
                    </Form.Group>
                    </div>
                    </div>
                        <Form.Row>
                            <Col className="textAlign">
                                <Form.Label>ID:</Form.Label>
                                <Form.Control size="sm" name="id" ref={idRef}
                                    type="text" placeholder="Enter ID" />
                            </Col>
                            <Col className="textAlign">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control size="sm" name="firstname"
                                    ref={firstnameRef}
                                    type="text" placeholder="Enter First Name" />
                            </Col>
                            <Col className="textAlign">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control size="sm" name="lastname"
                                    ref={lastnameRef}
                                    type="text" placeholder="Enter Last Name" />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col className="textAlign">
                                <Form.Label>UserName:</Form.Label>
                                <Form.Control size="sm" name="username"
                                    ref={usernameRef}
                                    type="text" placeholder="Enter Username here" />
                            </Col>
                            <Col className="textAlign">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control size="sm" name="email"
                                    ref={emailRef}
                                    type="text" placeholder="Enter Email here" />
                            </Col>

                            <Col className="textAlign">
                                <Form.Label>Mobile:</Form.Label>
                                <Form.Control size="sm" name="mobile"
                                    ref={mobileRef}
                                    type="text" placeholder="Enter Mobile" />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                        </Form.Row>
                    </Form>
                    </div>
                    
                </Col>
            </Row>
            
            
            <Row className={showForm?'customHidden':''}>
                <Col>
                    <JqxGrid
                        {...jqxGridProps}
                        ref={gridRef}
                        source={source}
                        columns={column}
                        rendergridrows={renderGridRows}
                        columngroups={[{ text: 'Action', name: 'action', align: 'center' }]}
                    />
                </Col>
            </Row>
            
        </Container>
    )
}
export default JqxGridComponent;