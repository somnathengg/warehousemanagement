import { userDataFields } from '../gridcolumn/userdatafield';

export const BASE_URL = `http://localhost:9000/ReactDemo/`;
export const FETCH_ALL_USER = `getAllUserForJqxTable`;
export const FETCH_FIRSTNAME = `getFirstNameList`;
export const FETCH_LASTNAME = `getLastNameList`;
export const FETCH_BY_USER_NAME = (firstname, mobile) => `userByUserNameAndMobile?firstname=${firstname}&mobile=${mobile}`;
export const DELETE_USER_BY_ID = (id) => `deleteUser?id=${id}`;
export const ADD_USER = `saveUserMst`;
export const FILE_UPLOAD = `fileupload`;
export const EXCEL_FILE_UPLOAD = `excelFileUpload`;
export const UPDATE_USER = `updateUserMst`;
export const UPDATE_USER_FILE_UPLOAD = `updateUserMstByFile`;


export const fetchAllUser = {
    headers: { 'ContentType': 'json' },
    url: FETCH_ALL_USER,
    method: 'POST',
    data:{
    }
};

export const fetchFirstName = {
    headers: { 'ContentType': 'json' },
    url: FETCH_FIRSTNAME,
    method: 'GET'
};

export const fetchLastName = {
    headers: { 'ContentType': 'json' },
    url: FETCH_LASTNAME,
    method: 'GET'
};

export const successFetchUser = (response, setSource) => {
    const persons = response.data;
    setSource(persons);
    return response.data;
};
export const errorFetchUser = (error) => {
    console.log('Error in API Calling Due To ::' + error);
    return error;
};

export const addUserConfig = (body) => {
    return (
        {
            headers: { 'Content-Type': 'application/json' },
            url: ADD_USER,
            method: 'POST',
            data: body
        })
};

export const successAddUser = (response, setSource, body,setShowMsg,formObjectReset) => {
    if (response.data) {
        setSource(function (existingData) {
            const updatedResponse = [...existingData.loadedData.response.rows];
            updatedResponse.push(response.data.response);
            return userDataFields(updatedResponse);
        })
        setShowMsg(response.data.message)
        formObjectReset();
    }
    return response.data;
};
export const errorAddUser = (error) => {
    console.log('Error in API Calling Due To ::' + error);
    return error;
};


export const fetchUserByNameAndMobile = (parameters1, parameters2) =>
    ({
        headers: { 'ContentType': 'json' },
        url: FETCH_BY_USER_NAME(parameters1, parameters2),
        method: 'GET'
    });

export const deleteUserConfig = (parameters1) =>
    ({
        headers: { 'ContentType': 'json' },
        url: DELETE_USER_BY_ID(parameters1),
        method: 'GET'
    });

export const successDeleteUser = (response, setSource, id, setLoading) => {
    setSource(function (existingData) {
        const updatedData = existingData.loadedData.filter(element => {
            return element.id !== id;
        })
        return userDataFields(updatedData);
    })
    alert(response.data.message);
};

export const errorDeleteUser = (error) => {
    console.log('Error in API Calling Due To ::' + error);
    return error;
};

export const successfetchUserByNameAndMobile = (response) => {
    return response;
};
export const errorfetchUserByNameAndMobile = (error) => {
    console.log('Error in API Calling Due To ::' + error);
    return error;
};


export const updateUserConfig = (body) => {
    return (
        {
            headers: { 'Content-Type': 'application/json' },
            url: UPDATE_USER,
            method: 'POST',
            data: body
        })
};

export const successUpdateUser = (response, setSource, body) => {
    if (response.data) {
        setSource(function (existingData) {
            //console.log('update existing data ', existingData);
            const updatedData = existingData.loadedData.response.rows.map(element => {
                if (element.id == body.id) {
                    return body;
                }
                return element;
            })
            return userDataFields(updatedData);
        })
        alert(response.data.message);
    }
    return response.data;
};
export const errorUpdateUser = (error) => {
    console.log('Error in API Calling Due To ::' + error);
    return error;
};

export const jqxGridProps = {
    pageable: true,
    autoheight: true,
    sortable: true,
    altrows: true,
    enabletooltips: true,
    editable: true,
    selectionmode: 'multiplecellsadvanced',
    filterable: true,
    showfilterrow: true,
    width: '100%',
    editable: false,
    groupable: true,
    virtualmode: true,
    pagesize:5
}




