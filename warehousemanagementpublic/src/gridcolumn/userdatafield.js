import { jqx } from 'jqwidgets-framework/jqwidgets-react-tsx/jqxgrid';
import { BASE_URL, FETCH_ALL_USER } from '../common/constant';
export const userDataFields = (data, gridRef,fname,lname,searchToken) => {
    const dataField = {
        datatype: "json",
        datafields: [
            { name: 'firstname' , type : 'string'},
            { name: 'lastname' , type : 'string'},
            { name: 'mobile', type : 'string'},
            { name: 'username' , type : 'string'},
            { name: 'email' , type : 'string'},
            { name: 'id' ,type : 'string'}
        ],
        url: BASE_URL + FETCH_ALL_USER,
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        cache: false,
        filter: function () {
            if (gridRef) {
                gridRef.updatebounddata('filter');
            }
        },
        sort: function () {
            if (gridRef) {
                gridRef.updatebounddata('sort');
            }
        },
        processdata: function (data) {
            return data;
        },
        totalrecords: 0,
        beforeprocessing: (data) => {
            dataField.totalrecords = data.response.totalRecords;
        }
    }

    return new jqx.dataAdapter(dataField,
        {
            formatData: function (data) {
                data['extraParam'] = 
                {
                'ddlFname':fname ? fname.value:'',
                'ddlLname':lname ? lname.value:'',
                'UserSearchToken':searchToken ? fname.value:''
                };
                return JSON.stringify(data);
            }
        });
};